import { c as createComponent } from './astro-component_DiYaXUiq.mjs';
import 'piccolore';
import { u as renderComponent, x as renderTemplate, r as maybeRenderHead, k as addAttribute, C as unescapeHTML } from './entrypoint_CDKNy878.mjs';
import { $ as $$Layout, r as renderScript, a as $$Navbar } from './Navbar_B7fZhmYl.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const links = [
    {
      name: "GitHub",
      href: "https://github.com/Chimera418",
      hint: "@Chimera418",
      color: "#58a6ff",
      hoverBg: "rgba(88,166,255,0.08)",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 flex-shrink-0"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/aneesh-sagar-reddy-222837149",
      hint: "Aneesh Sagar Reddy",
      color: "#0A66C2",
      hoverBg: "rgba(10,102,194,0.12)",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    },
    {
      name: "Discord",
      href: "https://discord.com/users/736465046317563915",
      hint: "gamingchimera · click to copy",
      color: "#5865F2",
      hoverBg: "rgba(88,101,242,0.12)",
      discord: true,
      icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 flex-shrink-0"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`
    },
    {
      name: "Email",
      href: "mailto:aneeshreddy754@gmail.com",
      hint: "aneeshreddy754@gmail.com",
      color: "#eb6f92",
      hoverBg: "rgba(235,111,146,0.1)",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5 flex-shrink-0"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact | Chimera" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="mt-8 max-w-6xl mx-auto animate-fade-in" id="contact-container"> <!-- Page Header --> <section class="mb-10"> <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-4">
Contact <span class="text-secondary font-pixel text-2xl md:text-3xl align-middle">Me</span> </h1> <p class="text-lg text-text-muted max-w-xl leading-relaxed mb-4">
Got a project in mind, a question, or just want to chat? Fill out the form or reach out through my socials!
</p> </section> <!-- Two-column bento layout --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"> <!-- Left: Connect Links --> <div class="flex flex-col h-full gap-4"> <div class="bg-surface border border-highlight-med rounded-xl p-6 h-full flex flex-col justify-center gap-3 relative overflow-hidden"> <div class="mb-2"> <h2 class="text-lg font-semibold text-text-primary flex items-center gap-2"> <svg class="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path> </svg>
My Networks
</h2> <p class="text-xs text-text-muted">Feel free to connect with me directly!</p> </div> <div class="flex flex-col gap-2 mt-2"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(link.discord ? "true" : void 0, "data-discord")} class="connect-link group flex items-center gap-4 px-4 py-3 rounded-xl border border-transparent transition-all duration-200 hover:border-white/10"${addAttribute(`--link-color: ${link.color}; --link-bg: ${link.hoverBg};`, "style")}> <!-- Icon --> <div class="link-icon w-10 h-10 flex items-center justify-center rounded-lg bg-overlay border border-highlight-med text-text-muted group-hover:text-[var(--link-color)] group-hover:border-[var(--link-color)]/30 transition-all duration-200">${unescapeHTML(link.icon)}</div> <!-- Text --> <div class="flex-1 min-w-0"> <p class="text-base font-semibold text-text-primary group-hover:text-[var(--link-color)] transition-colors duration-200 leading-tight">${link.name}</p> <p class="text-xs font-pixel text-text-muted leading-tight mt-1 truncate">${link.hint}</p> </div> <!-- Arrow --> <svg class="w-5 h-5 text-text-muted group-hover:text-[var(--link-color)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg> </a>`)} </div> </div> </div> <!-- Right: Submit Form --> <div class="bg-surface border border-highlight-med rounded-xl p-6 relative overflow-hidden"> <!-- Decorative pixel corner accents --> <div class="absolute top-0 left-0 w-3 h-3 bg-primary rounded-br-md opacity-60"></div> <div class="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-bl-md opacity-60"></div> <div class="absolute bottom-0 left-0 w-3 h-3 bg-tertiary rounded-tr-md opacity-60"></div> <div class="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-tl-md opacity-60"></div> <div class="mb-5"> <h2 class="text-lg font-semibold text-text-primary mb-1 flex items-center gap-2"> <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>
Send a Message
</h2> <p class="text-xs text-text-muted">I'll get back to you as soon as possible.</p> </div> <form id="contact-form" class="flex flex-col gap-4" novalidate> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <!-- Name --> <div class="flex flex-col gap-1.5"> <label for="c-name" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Name *
</label> <input id="c-name" type="text" name="name" placeholder="John Doe" required class="contact-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200 w-full"> </div> <!-- Email --> <div class="flex flex-col gap-1.5"> <label for="c-email" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Email *
</label> <input id="c-email" type="email" name="email" placeholder="john@example.com" required class="contact-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-secondary transition-colors duration-200 w-full"> </div> </div> <!-- Subject --> <div class="flex flex-col gap-1.5"> <label for="c-subject" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Subject
</label> <input id="c-subject" type="text" name="subject" placeholder="Project Inquiry" class="contact-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-tertiary transition-colors duration-200 w-full"> </div> <!-- Message --> <div class="flex flex-col gap-1.5"> <label for="c-message" class="font-pixel text-[9px] text-text-muted uppercase tracking-widest">
Message *
</label> <textarea id="c-message" name="message" placeholder="Hello, I'd like to work with you on..." rows="4" required class="contact-input bg-overlay border border-highlight-med rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200 w-full resize-none"></textarea> </div> <!-- Submit button --> <button id="c-submit" type="submit" class="relative mt-2 overflow-hidden w-full bg-primary/10 border border-primary/40 hover:bg-primary/20 hover:border-primary text-primary font-pixel text-[10px] uppercase tracking-widest py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"> <span id="c-btn-text">Send Message</span> <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path> </svg> <!-- Shimmer overlay --> <div id="c-shimmer" class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden pointer-events-none"></div> </button> <!-- Status message --> <div id="c-status" class="hidden font-pixel text-[9px] text-center py-2 px-3 rounded-lg border"></div> </form> </div> </div> </div> ` })}  ${renderScript($$result, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/contact.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/contact.astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
