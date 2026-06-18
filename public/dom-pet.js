(function () {
  const PET_ROOT = '/pets/fox/red';

  const STATES = {
    IDLE:       'idle',
    WALK:       'walk',
    RUN:        'walk_fast',
    LIE:        'lie',
    SWIPE:      'swipe',
    WALL_CLIMB: 'wall_climb',
    WALL_HANG:  'wall_hang',
    WALL_NAP:   'wall_nap',
  };

  // ── Size constants ─────────────────────────────────────────────────────────
  const VISUAL_SIZE  = 42;   // px the element renders at
  const COLLISION_W  = 15;   // narrow collision box
  const COLLISION_H  = 36;   // slightly shorter than visual
  const MAX_JUMP_H   = 220;
  const MAX_JUMP_W   = 200;

  // ── Platform helpers ───────────────────────────────────────────────────────
  let _platCache = null, _platCacheTime = 0;

  function getPlatforms() {
    const now = performance.now();
    if (_platCache && now - _platCacheTime < 400) return _platCache;

    const clientW = document.documentElement.clientWidth;
    const scrollH = document.documentElement.scrollHeight;
    const solids  = Array.from(document.querySelectorAll('[data-solid="true"]'));
    const raw     = [];
    let id = 0;

    for (const el of solids) {
      const r = el.getBoundingClientRect();
      if (r.width < 30 || r.height < 10) continue;   // skip tiny elements
      raw.push({
        id, el,
        left:   r.left   + window.scrollX,
        right:  r.right  + window.scrollX,
        top:    r.top    + window.scrollY,
        bottom: r.bottom + window.scrollY,
        width:  r.width,
        height: r.height,
      });
      id++;
    }

    // Remove any platform fully contained inside another (e.g. badge spans inside cards)
    const plats = raw.filter(p =>
      !raw.some(other =>
        other.id !== p.id &&
        other.left  <= p.left  &&
        other.right >= p.right &&
        other.top   <= p.top   &&
        other.bottom >= p.bottom
      )
    );

    // Synthetic floor
    plats.push({ id: 'floor', el: null,
      left: 0, right: clientW,
      top: scrollH, bottom: scrollH + 1,
      width: clientW, height: 1 });

    _platCache = plats; _platCacheTime = now;
    return plats;
  }

  function getCurrentPlatform(x, y, w, h, platforms) {
    const feetY = y + h, cx = x + w / 2;
    let best = null, bestD = Infinity;
    for (const p of platforms) {
      if (cx < p.left || cx > p.right) continue;
      const d = Math.abs(feetY - p.top);
      if (d < 10 && d < bestD) { best = p; bestD = d; }
    }
    return best;
  }

  function getPlatformUnderPoint(wx, wy, platforms) {
    let best = null, bestD = Infinity;
    for (const p of platforms) {
      if (wx < p.left || wx > p.right) continue;
      if (wy < p.top) continue;
      const d = wy - p.top;
      if (d < bestD) { best = p; bestD = d; }
    }
    return best;
  }

  // ── DomPet class ───────────────────────────────────────────────────────────
  class DomPet {
    constructor(spawnRect) {
      const clientW = document.documentElement.clientWidth;
      
      let initialX = clientW / 2;
      let initialY = document.documentElement.scrollHeight - COLLISION_H;

      if (spawnRect) {
        initialX = spawnRect.left + window.scrollX + spawnRect.width / 2 - COLLISION_W / 2;
        initialY = spawnRect.top + window.scrollY - COLLISION_H;
      } else {
        // Find footer if possible
        const footer = document.querySelector('footer [data-solid="true"]');
        if (footer) {
          const r = footer.getBoundingClientRect();
          initialX = r.left + window.scrollX + r.width / 2 - COLLISION_W / 2;
          initialY = r.top + window.scrollY - COLLISION_H;
        }
      }

      this.x = initialX;
      this.y = initialY;

      this.vx = 0; this.vy = 0;
      this.facingRight = Math.random() > 0.5;
      this.grounded    = false;
      this.w = COLLISION_W;
      this.h = COLLISION_H;

      // Stuck detection
      this.lastX      = this.x;
      this.stuckTimer = 0;

      // Wall-climb state
      this.wallState = null;
      this.wallTimer = 0;
      this.wallRect  = null;
      this.wallSide  = null;

      // Swipe anim
      this.isDoingSwipe = false;
      this.swipeTimer   = 0;

      // Physics
      this.gravity   = 1200;
      this.jumpForce = -580;
      this.speed     = 120;

      // ── State Machine ──────────────────────────────────────────────────
      this.behaviorState = 'IDLE';
      this.behaviorTimer = 2.0;
      this.movingTimer = 0;

      // ── DOM sprite ───────────────────────────────────────────────────────
      this.element = document.createElement('div');
      this.element.style.cssText =
        `position:absolute;width:${VISUAL_SIZE}px;height:${VISUAL_SIZE}px;z-index:999999;pointer-events:none;`;
      this.img = document.createElement('img');
      this.img.style.cssText = 'width:100%;height:100%;image-rendering:pixelated;';
      this.element.appendChild(this.img);
      document.body.appendChild(this.element);

      this.lastTime = performance.now();
      this.setAnimation(STATES.IDLE);
      requestAnimationFrame(t => this.loop(t));
    }

    setAnimation(state) {
      if (!this.img) return;
      
      // Determine the visual state since we don't have wall climbing assets
      let visualState = state;
      if (state === STATES.WALL_CLIMB) visualState = STATES.WALK;
      if (state === STATES.WALL_HANG)  visualState = STATES.IDLE;
      if (state === STATES.WALL_NAP)   visualState = STATES.LIE;

      // Handle rotation/flip
      let transform = this.facingRight ? 'scaleX(1)' : 'scaleX(-1)';
      
      if (state === STATES.WALL_CLIMB || state === STATES.WALL_HANG || state === STATES.WALL_NAP) {
         // Rotate the fox so his feet touch the wall
         const rot = this.wallSide === 'LEFT' ? 'rotate(90deg)' : 'rotate(-90deg)';
         // When rotated, the flip might need adjusting, but simple scaleX is fine
         transform += ` ${rot}`;
      }
      this.element.style.transform = transform;

      if (this.currentState === state) return;
      this.currentState = state;
      
      this.img.src = `${PET_ROOT}_${visualState}_8fps.gif`;
    }

    // ── Behavior State Machine ────────────────────────────────────────────────
    updateBehavior() {
      const r = Math.random();
      if (r < 0.2) {
        this.behaviorState = 'SLEEP';
        this.behaviorTimer = 10 + Math.random() * 15;
        this.vx = 0;
      } else if (r < 0.4) {
        this.behaviorState = 'IDLE';
        this.behaviorTimer = 3 + Math.random() * 5;
        this.vx = 0;
      } else if (r < 0.7) {
        this.behaviorState = 'WALK';
        this.behaviorTimer = 4 + Math.random() * 6;
        this.facingRight = Math.random() > 0.5;
        this.vx = this.facingRight ? this.speed : -this.speed;
      } else {
        this.behaviorState = 'RUN';
        this.behaviorTimer = 5 + Math.random() * 10;
        this.facingRight = Math.random() > 0.5;
        this.vx = this.facingRight ? this.speed * 1.5 : -this.speed * 1.5;
      }
    }

    startWallClimb(side, rect) {
      this.wallState   = 'CLIMBING';
      this.wallTimer   = 1.5 + Math.random() * 2; // climb for 1.5 - 3.5s
      this.wallRect    = rect;
      this.wallSide    = side;
      this.facingRight = (side === 'RIGHT');
      this.vx = 0;
      this.vy = -130;
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    loop(time) {
      const dt = Math.min((time - this.lastTime) / 1000, 0.1);
      this.lastTime = time;

      this.behaviorTimer -= dt;
      if (this.behaviorTimer <= 0 && !this.wallState && this.grounded) {
        this.updateBehavior();
      }

      if (this.wallState) {
        this.handleWallStateMachine(dt);
      } else {
        this.handleNormalPhysics(dt);
      }

      // ── Visual position ──────────────────────────────────────────────────
      const voxX = -(VISUAL_SIZE - COLLISION_W) / 2;
      let extraX = 0;
      if (this.wallState) extraX = this.wallSide === 'RIGHT' ? -16 : 0;

      this.element.style.left = Math.round(this.x + voxX + extraX) + 'px';
      this.element.style.top  = Math.round(this.y - (VISUAL_SIZE - COLLISION_H)) + 'px';

      requestAnimationFrame(t => this.loop(t));
    }

    // ── Wall state machine ────────────────────────────────────────────────────
    handleWallStateMachine(dt) {
      let ny = this.y + this.vy * dt;

      if (this.wallState === 'CLIMBING') {
        this.wallTimer -= dt;
        this.vy = -130;
        this.setAnimation(STATES.WALL_CLIMB);

        // ── Reached the top of the wall rect → land on card surface ─────
        if (this.wallRect && ny + this.h <= this.wallRect.top + 2) {
          const snapX = this.wallSide === 'RIGHT'
            ? this.wallRect.left + 2
            : this.wallRect.right - this.w - 2;
          const cW = document.documentElement.clientWidth;
          this.x      = Math.max(0, Math.min(snapX, cW - this.w));
          this.y      = this.wallRect.top - this.h;
          this.vy     = 0;
          this.vx     = this.wallSide === 'RIGHT' ?  this.speed * 0.3 : -this.speed * 0.3;
          this.grounded = true;
          this.wallState = null;
          this.wallRect  = null;
          this.behaviorState = 'WALK';
          this.behaviorTimer = 3;
          _platCache = null;
          return;
        }

        // Climbing up the screen edge (no wallRect)
        if (!this.wallRect && ny <= 0) { ny = 0; this.wallTimer = 0; }

        if (this.wallTimer <= 0) {
          this.wallState = 'NAPPING';
          this.wallTimer = 15.0 + Math.random() * 10.0; // Sleep on wall for 15-25s
          this.vy = 0;
        }
        this.y = ny;

      } else if (this.wallState === 'NAPPING') {
        this.wallTimer -= dt;
        this.vy = 0;
        this.setAnimation(STATES.WALL_NAP);
        if (this.wallTimer <= 0) {
           this.wallState = 'JUMPING_DOWN';
        }

      } else if (this.wallState === 'JUMPING_DOWN') {
        this.wallState = null;
        this.wallRect  = null;
        this.vy  = -80;
        this.vx  = this.wallSide === 'RIGHT' ? -this.speed : this.speed;
        this.facingRight = this.vx > 0;
        this.behaviorState = 'WALK';
        this.behaviorTimer = 3;
        this.setAnimation(STATES.WALK);
      }
    }

    // ── Normal physics ────────────────────────────────────────────────────────
    handleNormalPhysics(dt) {
      if (this.isDoingSwipe) {
        this.swipeTimer -= dt;
        this.setAnimation(STATES.SWIPE);
        if (this.swipeTimer <= 0) this.isDoingSwipe = false;
      }

      this.vy += this.gravity * dt;
      let nx = this.x + this.vx * dt;
      let ny = this.y + this.vy * dt;

      const platforms = getPlatforms();
      this.grounded   = false;

      // Floor
      const scrollH = document.documentElement.scrollHeight;
      if (ny + this.h >= scrollH) {
        ny = scrollH - this.h;
        this.vy = 0;
        this.grounded = true;
      }

      // Screen edges → wall climb
      const clientW = document.documentElement.clientWidth;
      if (nx <= 0) {
        nx = 0;
        this.startWallClimb('LEFT', null); return;
      } else if (nx + this.w >= clientW) {
        nx = clientW - this.w;
        this.startWallClimb('RIGHT', null); return;
      }

      // Platform AABB (One-way jump-through)
      for (const p of platforms) {
        if (p.id === 'floor') continue;
        if (nx < p.right && nx + this.w > p.left) {
          if (this.vy >= 0) {
            const prevFeet = this.y + this.h;
            const newFeet  = ny + this.h;
            if (prevFeet <= p.top + 16 && newFeet >= p.top) {
              ny = p.top - this.h;
              this.vy = 0;
              this.grounded = true;
            }
          }
        }
      }

      this.x = nx; this.y = ny;

      // ── Behaviour Execution ────────────────────────────────────────────────
      if (this.grounded && !this.isDoingSwipe) {
        // Continuous movement tracking
        if (this.vx !== 0) {
          this.movingTimer += dt;
          if (this.movingTimer > 15) {
             this.behaviorState = 'SLEEP';
             this.behaviorTimer = 10 + Math.random() * 10;
             this.vx = 0;
             this.movingTimer = 0;
          }
        } else {
          this.movingTimer = 0;
        }

        // Stuck detection
        const moved = Math.abs(this.x - this.lastX);
        if (this.vx !== 0 && moved < 0.5) {
          this.stuckTimer += dt;
        } else {
          this.stuckTimer = 0;
        }
        this.lastX = this.x;

        if (this.stuckTimer > 0.45) {
          this.vy = this.jumpForce * 0.75; // Jump to get unstuck
          this.grounded = false;
          this.stuckTimer = 0;
        }

        if (this.behaviorState === 'SLEEP') {
          this.setAnimation(STATES.LIE);
        } else if (this.behaviorState === 'IDLE') {
          this.setAnimation(STATES.IDLE);
        } else if (this.behaviorState === 'WALK' || this.behaviorState === 'RUN') {
          this.setAnimation(this.behaviorState === 'RUN' ? STATES.RUN : STATES.WALK);
          
          // Edge / gap check
          const lookX = this.facingRight ? this.x + this.w + 10 : this.x - 10;
          const lookY = this.y + this.h + 4;
          let groundAhead = (lookY >= document.documentElement.scrollHeight);
          if (!groundAhead) {
            for (const p of platforms) {
              if (lookX > p.left && lookX < p.right && lookY > p.top && lookY < p.bottom + 20)
                { groundAhead = true; break; }
            }
          }
          if (!groundAhead) {
            // Randomly jump off edge, or turn around
            if (Math.random() < 0.5) {
              if (!this.isDoingSwipe) { this.isDoingSwipe = true; this.swipeTimer = 0.22; }
              this.grounded = false;
            } else {
              this.facingRight = !this.facingRight;
              this.vx = -this.vx;
            }
          }

          // Random jump
          if (Math.random() < 0.005) {
             this.vy = this.jumpForce * (0.6 + Math.random() * 0.4);
             this.grounded = false;
          }
        }
      } else if (!this.grounded && !this.isDoingSwipe) {
        this.setAnimation(STATES.WALK);
      }
    }
  }

  window.createDomPet = function (spawnRect) { new DomPet(spawnRect); };
})();
