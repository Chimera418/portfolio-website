import { c as createComponent } from './astro-component_B4qxK23r.mjs';
import 'piccolore';
import { u as renderComponent, x as renderTemplate, r as maybeRenderHead, k as addAttribute } from './entrypoint_Dc7B2knl.mjs';
import { $ as $$Layout, r as renderScript, a as $$Navbar } from './Navbar_RBZ07xdE.mjs';

const $$Guestbook = createComponent(async ($$result, $$props, $$slots) => {
  const AVATAR_INDICES = Array.from({ length: 45 }, (_, i) => i);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Guestbook | Chimera" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="mt-8 max-w-6xl mx-auto animate-fade-in" id="guestbook-container"> <!-- Page Header --> <section class="mb-10"> <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-4">
Guest<span class="text-primary font-pixel text-2xl md:text-3xl align-middle">book</span> </h1> <p class="text-lg text-text-muted max-w-xl leading-relaxed mb-4">
Drop some lore, share some feedback, or just say hi. Every message is
        appreciated!!
<span class="text-primary font-pixel text-sm">ദ്ദി（• ˕ •マ.ᐟ</span> </p> </section> <!-- Two-column bento layout --> <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"> <!-- Left: Message Wall (3/5 width) --> <div class="lg:col-span-3 flex flex-col gap-4"> <div class="flex items-center justify-between mb-1"> <h2 class="text-lg font-semibold text-text-primary flex items-center gap-2"> <svg class="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg>
Messages
</h2> <span id="gb-entry-count" data-count="0" class="font-pixel text-[9px] text-text-muted">0 entries</span> </div> <div id="gb-message-wall" class="space-y-3 max-h-[680px] overflow-y-auto pr-1 custom-scroll"> <!-- Populated via LocalStorage on Client Side --> </div> <!-- Future note --> <p class="font-pixel text-[9px] text-text-muted/60 text-center pt-1">
✦ more messages incoming as the guestbook fills up ✦
</p> </div> <!-- Right: Submit Form (2/5 width) --> <div class="lg:col-span-2 lg:sticky lg:top-28"> <div class="bg-surface border border-highlight-med rounded-xl p-6 relative overflow-hidden"> <!-- Decorative pixel corner accents --> <div class="absolute top-0 left-0 w-3 h-3 bg-primary rounded-br-md opacity-60"></div> <div class="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-bl-md opacity-60"></div> <div class="absolute bottom-0 left-0 w-3 h-3 bg-tertiary rounded-tr-md opacity-60"></div> <div class="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-tl-md opacity-60"></div> <div class="mb-5"> <h2 class="text-lg font-semibold text-text-primary mb-1 flex items-center gap-2"> <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path> </svg>
Leave a Note
</h2> <p class="text-xs text-text-muted">
Your message will appear on the wall instantly.
</p> </div> <form id="guestbook-form" class="flex flex-col gap-4" novalidate> <!-- Sprite Picker --> <div class="flex flex-col gap-2"> <label class="font-pixel text-[9px] text-text-muted uppercase tracking-widest flex items-center gap-2">
Pick your avatar
<div class="ml-2 w-10 h-10 rounded-lg bg-overlay flex shrink-0 items-center justify-center overflow-hidden border border-highlight-med"> <div id="gb-avatar-preview" class="sprite-avatar" style="--sprite-idx: 0;"></div> </div> </label> <div class="grid grid-cols-5 gap-2 p-3 bg-overlay border border-highlight-med rounded-lg h-48 overflow-y-auto custom-scroll"> ${AVATAR_INDICES.map((idx, i) => renderTemplate`<button type="button"${addAttribute(idx, "data-avatar-idx")}${addAttribute(`avatar-btn h-10 w-full flex items-center justify-center rounded-lg hover:bg-surface-bright transition-all duration-150 border border-transparent ${i === 0 ? "avatar-selected" : ""}`, "class")}${addAttribute(`Avatar ${idx}`, "title")}${addAttribute(`Select avatar ${idx}`, "aria-label")}> <div class="sprite-avatar"${addAttribute(`--sprite-idx: ${idx};`, "style")}></div> </button>`)} </div> <input type="hidden" id="gb-avatar" name="avatar"${addAttribute(AVATAR_INDICES[0], "value")}> </div> <!-- Name --> <div class="flex flex-col gap-1.5"> <label for="gb-name" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Name *
</label> <input id="gb-name" type="text" name="name" placeholder="Your name" maxlength="40" required class="gb-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200 w-full"> </div> <!-- Social handle (optional) --> <div class="flex flex-col gap-1.5"> <label for="gb-handle" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Social handle <span class="text-text-muted/50 normal-case font-sans">(optional)</span> </label> <input id="gb-handle" type="text" name="handle" placeholder="@you" maxlength="40" class="gb-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-secondary transition-colors duration-200 w-full"> </div> <!-- Website (optional) --> <div class="flex flex-col gap-1.5"> <label for="gb-website" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Website <span class="text-text-muted/50 normal-case font-sans">(optional — makes your name a link)</span> </label> <input id="gb-website" type="url" name="website" placeholder="https://yoursite.com" maxlength="120" class="gb-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-tertiary transition-colors duration-200 w-full"> </div> <!-- Message --> <div class="flex flex-col gap-1.5"> <label for="gb-message" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Message *
</label> <textarea id="gb-message" name="message" placeholder="Say something nice..." maxlength="280" rows="3" required class="gb-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200 w-full resize-none"></textarea> <div class="flex justify-end"> <span id="gb-char-count" class="font-pixel text-[9px] text-text-muted">0 / 280</span> </div> </div> <!-- Submit button --> <button id="gb-submit" type="submit" class="relative overflow-hidden w-full bg-primary/10 border border-primary/40 hover:bg-primary/20 hover:border-primary text-primary font-pixel text-[10px] uppercase tracking-widest py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"> <span id="gb-btn-text">Send Message</span> <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> <!-- Shimmer overlay --> <div id="gb-shimmer" class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden pointer-events-none"></div> </button> <!-- Status message --> <div id="gb-status" class="hidden font-pixel text-[9px] text-center py-2 px-3 rounded-lg border"></div> </form> </div> <!-- Pixel bar decoration --> <div class="mt-4 bg-overlay border border-highlight-med rounded-xl p-4 flex items-center gap-3"> <div class="flex gap-1 items-end"> ${["h-6", "h-4", "h-8", "h-5", "h-7", "h-3", "h-6"].map((h, i) => renderTemplate`<div${addAttribute(`w-2 ${h} rounded-sm opacity-70`, "class")}${addAttribute(`background: var(--${["primary", "secondary", "tertiary", "primary", "secondary", "tertiary", "primary"][i]})`, "style")}></div>`)} </div> <p class="font-pixel text-[9px] text-text-muted leading-relaxed">
Be the first to<br>fill the wall ✦
</p> </div> </div> </div> </div> ` })}  ${renderScript($$result, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/guestbook.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/guestbook.astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/guestbook.astro";
const $$url = "/guestbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Guestbook,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
