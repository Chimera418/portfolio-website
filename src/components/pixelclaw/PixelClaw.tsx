import React, { useState, useRef, useEffect } from 'react'
import './style.css'

/* =========================
   CONFIG
   ========================= */
const GW = 320
const GH = 360
const TOYS = ['bear', 'bunny', 'golem', 'cucumber', 'penguin', 'robot'] as const
type ToyType = typeof TOYS[number]

const TOY_SIZES: Record<ToyType, { w: number, h: number }> = {
  bear: { w: 40, h: 54 },
  bunny: { w: 40, h: 58 },
  golem: { w: 40, h: 54 },
  cucumber: { w: 32, h: 56 },
  penguin: { w: 48, h: 44 },
  robot: { w: 40, h: 60 }
}

const MACHINE_BUFFER = { x: 36, y: 16 }
const MACHINE_TOP_H = 140
const MACHINE_BOTTOM_H = 140
const MAX_ARM_LENGTH = GH - MACHINE_BOTTOM_H - MACHINE_TOP_H - MACHINE_BUFFER.y

interface ToyState {
  id: number
  type: ToyType
  x: number
  y: number
  grabbed: boolean
}

interface PixelClawProps {
  className?: string
  onSuccess?: () => void
  targetLabel?: string
  targetToy?: string
}

export default function PixelClaw({ className, onSuccess, targetLabel, targetToy }: PixelClawProps) {
  // Determine target
  const [target] = useState<ToyType>(() => {
    if (targetToy && TOYS.includes(targetToy as ToyType)) return targetToy as ToyType
    return TOYS[Math.floor(Math.random() * TOYS.length)]
  })
  
  const label = targetLabel || `Pixel ${target}`

  // Machine state
  const [phase, setPhase] = useState<'idle' | 'dropping' | 'grabbed' | 'retracting' | 'returning' | 'releasing' | 'win'>('idle')
  const [clawX, setClawX] = useState(MACHINE_BUFFER.x)
  const [clawY, setClawY] = useState(MACHINE_TOP_H - MACHINE_BUFFER.y)
  const [armH, setArmH] = useState(0)
  
  // Toys
  const [pile, setPile] = useState<ToyState[]>([])
  
  // Refs for loops
  const requestRef = useRef<number>()
  const keys = useRef({ up: false, down: false, left: false, right: false })
  
  // Message
  const [msg, setMsg] = useState('')

  // Keyboard controls
  useEffect(() => {
    const keyMap: Record<string, keyof typeof keys.current> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const dir = keyMap[e.key]
      if (dir) {
        e.preventDefault()
        keys.current[dir] = true
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (phase === 'idle') setPhase('dropping')
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const dir = keyMap[e.key]
      if (dir) keys.current[dir] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [phase])

  // Init toys
  useEffect(() => {
    const newPile: ToyState[] = []
    let id = 0
    for (let i = 0; i < 12; i++) {
      if (i === 8) continue
      const type = TOYS[Math.floor(Math.random() * TOYS.length)]
      const size = TOY_SIZES[type]
      const cornerBuffer = 16
      const row = Math.floor(i / 4)
      const col = i % 4
      
      const x = cornerBuffer + col * ((GW - cornerBuffer * 3) / 4) + size.w / 2 + (Math.random() * 12 - 6)
      const y = GH - MACHINE_BOTTOM_H + cornerBuffer + row * ((MACHINE_BOTTOM_H - cornerBuffer * 2) / 3) - size.h / 2 + (Math.random() * 4 - 2)
      
      newPile.push({ id: id++, type, x, y, grabbed: false })
    }
    
    // Ensure target is present
    if (!newPile.some(t => t.type === target)) {
      newPile[0].type = target
    }
    
    setPile(newPile)
  }, [target])

  // Physics loop
  useEffect(() => {
    let lastTime = performance.now()
    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      if (phase === 'idle') {
        const speed = 150 * dt
        let dx = 0
        let dy = 0
        if (keys.current.left) dx -= speed
        if (keys.current.right) dx += speed
        if (keys.current.up) dy -= speed
        if (keys.current.down) dy += speed

        if (dx !== 0 || dy !== 0) {
          setClawX(x => Math.max(MACHINE_BUFFER.x, Math.min(GW - 30 - MACHINE_BUFFER.x, x + dx)))
          setClawY(y => Math.max(10, Math.min(MACHINE_TOP_H - MACHINE_BUFFER.y, y + dy)))
        }
      }

      requestRef.current = requestAnimationFrame(loop)
    }
    requestRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [phase])

  // Sequence engine
  useEffect(() => {
    if (phase === 'dropping') {
      let h = 0
      const dropTimer = setInterval(() => {
        h += 5
        if (h >= MAX_ARM_LENGTH) {
          clearInterval(dropTimer)
          setArmH(MAX_ARM_LENGTH)
          
          // Try grab
          setPile(curr => {
            const clawBox = {
              x: clawX + 7,
              y: clawY + MAX_ARM_LENGTH + MACHINE_BUFFER.y + 7,
              w: 40,
              h: 32
            }
            
            let grabbedId = -1
            let highestIndex = -1
            curr.forEach((t, i) => {
              if (clawBox.x > t.x - TOY_SIZES[t.type].w/2 && clawBox.x < t.x + TOY_SIZES[t.type].w/2 &&
                  clawBox.y > t.y - TOY_SIZES[t.type].h/2 && clawBox.y < t.y + TOY_SIZES[t.type].h/2) {
                if (i > highestIndex) {
                  highestIndex = i
                  grabbedId = t.id
                }
              }
            })
            
            if (grabbedId !== -1) {
              return curr.map(t => t.id === grabbedId ? { ...t, grabbed: true } : t)
            }
            return curr
          })
          
          setTimeout(() => setPhase('retracting'), 300)
        } else {
          setArmH(h)
        }
      }, 20)
      return () => clearInterval(dropTimer)
    }
    
    if (phase === 'retracting') {
      let h = MAX_ARM_LENGTH
      const retractTimer = setInterval(() => {
        h -= 5
        if (h <= 0) {
          clearInterval(retractTimer)
          setArmH(0)
          setPhase('returning')
        } else {
          setArmH(h)
        }
      }, 20)
      return () => clearInterval(retractTimer)
    }
    
    if (phase === 'returning') {
      const returnTimer = setInterval(() => {
        setClawX(cx => {
          const dx = MACHINE_BUFFER.x - cx
          if (Math.abs(dx) < 5) return MACHINE_BUFFER.x
          return cx + dx * 0.1
        })
        setClawY(cy => {
          const dy = MACHINE_TOP_H - MACHINE_BUFFER.y - cy
          if (Math.abs(dy) < 5) return MACHINE_TOP_H - MACHINE_BUFFER.y
          return cy + dy * 0.1
        })
        
        setClawX(cx => {
          if (Math.abs(MACHINE_BUFFER.x - cx) < 6) {
            setClawY(cy => {
               if (Math.abs((MACHINE_TOP_H - MACHINE_BUFFER.y) - cy) < 6) {
                  clearInterval(returnTimer)
                  setTimeout(() => setPhase('releasing'), 200)
               }
               return cy
            })
          }
          return cx
        })
      }, 20)
      return () => clearInterval(returnTimer)
    }
    
    if (phase === 'releasing') {
      const grabbedToy = pile.find(t => t.grabbed)
      if (grabbedToy) {
        if (grabbedToy.type === target) {
          setMsg('Verified! Nice catch.')
          setPhase('win')
          if (onSuccess) onSuccess()
        } else {
          setMsg('Wrong toy. Try again.')
          setPile(curr => curr.map(t => ({ ...t, grabbed: false })))
          setTimeout(() => {
             setMsg('')
             setPhase('idle')
          }, 1500)
        }
      } else {
        setPhase('idle')
      }
    }
  }, [phase, clawX, clawY, pile, target, onSuccess])

  const onBtnDown = (dir: keyof typeof keys.current) => (e: React.PointerEvent) => {
    e.preventDefault()
    keys.current[dir] = true
  }
  const onBtnUp = (dir: keyof typeof keys.current) => (e: React.PointerEvent) => {
    e.preventDefault()
    keys.current[dir] = false
  }

  return (
    <div className={`pixelclaw-container ${className || ''}`}>
      {/* Header - "Prove you are human" */}
      <div className="pixelclaw-header">
         <h3>{phase === 'win' ? 'Verified ✓' : 'Prove you are human'}</h3>
         <p>
            {msg ? msg : (
               <>Use claw to pick up <span className={`target-icon ${target}`} /> {label}</>
            )}
         </p>
      </div>

      {/* Wrapper holds the claw machine + collection box in flex column */}
      <div className="wrapper">
        {/* Collection Box (sits above machine via negative margin in CSS) */}
        <div className="collection-box pix"></div>

        {/* Claw Machine - border + overflow:hidden container */}
        <div className="claw-machine">
          {/* Box - the main glass area */}
          <div className="box pix" style={{ '--shadow-pos': `${MAX_ARM_LENGTH}px` } as React.CSSProperties}>
            
            {/* Machine Top - glass area with rails + claw */}
            <div className="machine-top pix">
              <div className="arm-joint pix" style={{ left: clawX, top: clawY }}>
                <div className={`arm pix ${phase === 'dropping' || phase === 'releasing' ? 'open' : ''}`} style={{ height: armH }}>
                  <div className="claws pix"></div>
                </div>
              </div>
              <div className="rail vert pix" style={{ left: clawX }}></div>
              <div className="rail hori pix" style={{ top: clawY }}></div>
            </div>
            
            {/* Machine Bottom - dark area where toys sit */}
            <div className="machine-bottom pix">
              <div className="collection-point pix"></div>
            </div>
            
            {/* Toys */}
            {pile.map(t => (
              <div 
                key={t.id} 
                className={`toy pix ${t.type} ${t.grabbed ? 'grabbed' : ''}`}
                style={{
                  left: t.grabbed ? clawX + 7 : t.x - TOY_SIZES[t.type].w / 2,
                  top: t.grabbed ? clawY + armH + MACHINE_BUFFER.y + 7 : t.y - TOY_SIZES[t.type].h / 2,
                  zIndex: t.grabbed ? 100 : 10
                }}
              />
            ))}
            
          </div>

          {/* Control Panel - the bottom section with covers */}
          <div className="control pix">
            <div className="cover left"></div>
            <button className="hori-btn pix"></button>
            <button className="vert-btn pix"></button>
            <div className="cover right">
              <div className="instruction pix"></div>
            </div>
            <div className="cover bottom"></div>
            <div className="cover top">
              <div className="collection-arrow pix"></div>
            </div>
            <div className="collection-point pix"></div>
          </div>
        </div>

        {/* D-Pad and Grab Button - outside the machine, below it */}
        <div className="pixelclaw-controls">
          <div className="d-pad">
            <button className="d-btn" onPointerDown={onBtnDown('up')} onPointerUp={onBtnUp('up')} onPointerLeave={onBtnUp('up')}>▲</button>
            <div className="d-pad-row">
              <button className="d-btn" onPointerDown={onBtnDown('left')} onPointerUp={onBtnUp('left')} onPointerLeave={onBtnUp('left')}>◀</button>
              <button className="d-btn" onPointerDown={onBtnDown('right')} onPointerUp={onBtnUp('right')} onPointerLeave={onBtnUp('right')}>▶</button>
            </div>
            <button className="d-btn" onPointerDown={onBtnDown('down')} onPointerUp={onBtnUp('down')} onPointerLeave={onBtnUp('down')}>▼</button>
          </div>
          <div className="grab-btn-container">
            <button 
              className={`grab-btn ${phase !== 'idle' ? 'disabled' : ''}`}
              onClick={() => {
                if (phase === 'idle') setPhase('dropping')
              }}
            >
              GRAB
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
