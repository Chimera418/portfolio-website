import { c as createComponent } from './astro-component_C6RNkUFs.mjs';
import 'piccolore';
import { r as maybeRenderHead, x as renderTemplate, u as renderComponent, k as addAttribute } from './entrypoint_D1WMlBhe.mjs';
import { $ as $$Layout, a as $$Navbar } from './Navbar_CDW4UHEX.mjs';
import 'clsx';

const $$TimelineItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TimelineItem;
  const { date, title, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative pl-8 sm:pl-32 py-6 group"> <!-- Date (desktop left, mobile top) --> <div class="font-pixel text-xs text-primary mb-1 sm:mb-0 sm:absolute sm:left-0 sm:top-7 sm:w-24 sm:text-right"> ${date} </div> <!-- Line and Node --> <div class="flex flex-col items-center absolute left-0 sm:left-28 top-0 h-full"> <div class="w-px h-full bg-highlight-med group-last:bg-gradient-to-b group-last:from-highlight-med group-last:to-transparent"></div> <div class="absolute top-7 w-3 h-3 rounded-full bg-surface-bright border-2 border-primary -translate-x-1/2 left-1/2 z-10 group-hover:bg-primary transition-colors"></div> </div> <!-- Content --> <div class="bg-surface-bright/50 border border-highlight-med rounded-lg p-4 sm:p-5 group-hover:border-primary/50 transition-colors"> <h3 class="text-text-primary font-bold text-lg">${title}</h3> <p class="text-text-muted mt-2 text-sm leading-relaxed">${description}</p> </div> </div>`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/components/TimelineItem.astro", void 0);

const $$TechStack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TechStack;
  const { category, skills } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="mb-8 last:mb-0"> <h3 class="font-pixel text-xs text-secondary uppercase tracking-widest mb-4 flex items-center gap-3"> <span class="w-8 h-px bg-highlight-med"></span> ${category} <span class="flex-grow h-px bg-highlight-med"></span> </h3> <div class="flex flex-wrap gap-2"> ${skills.map((skill) => renderTemplate`<span class="px-3 py-1.5 bg-surface-bright border border-highlight-med text-text-primary text-sm rounded-md hover:border-secondary hover:text-secondary transition-colors cursor-default"> ${skill} </span>`)} </div> </div>`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/components/TechStack.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$About;
  const timeline = [
    {
      date: "2024 — Present",
      title: "Tech Team Member — ACM Student Chapter ASEB",
      description: "Joined the tech team. Mostly broke things first, then figured out how to fix them. Sometimes in that order."
    },
    {
      date: "2024 - Present",
      title: "Senior Executive — FORGE",
      description: "Forum of Game Engineering. Yes, the name is cool. Yes, that mattered when I joined."
    },
    {
      date: "2025 — Present",
      title: "CTF Player — BI0S",
      description: "Started breaking into things legally. Cybersecurity competitions where sleep is optional and caffeine is currency."
    },
    {
      date: "2025 — 2026",
      title: "President — CSI Student Chapter ASEB",
      description: "Somehow became the person in charge. Still figuring out how that happened."
    }
  ];
  const languages = [
    "Python",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Bash"
  ];
  const frontend = ["React.js", "Next.js", "Astro", "Tailwind CSS", "Vite"];
  const backend = ["Node.js", "Express.js", "FastAPI", "Flask"];
  const security = ["Burp Suite", "Wireshark", "Nmap", "SQLi", "XSS", "CSRF"];
  const tools = ["Git", "Linux", "Docker", "MATLAB", "Figma", "Canva"];
  const spokenLanguages = [
    "English",
    "Kannada",
    "Telugu",
    "Hindi (basic)",
    "Tamil (basic)"
  ];
  const facts = [
    {
      chip: "PARTY TRICK",
      chipColor: "text-primary",
      borderColor: "hover:border-primary/50",
      title: "Sub-30 Rubik's Cube",
      subtitle: "Not world record, but enough to make someone's jaw drop at a party."
    },
    {
      chip: "COLLECTOR",
      chipColor: "text-tertiary",
      borderColor: "hover:border-tertiary/50",
      title: "Random Stuff",
      subtitle: "I get obsessed with collecting the most random things like guitar picks, stickers, etc."
    },
    {
      chip: "FUEL",
      chipColor: "text-rosewater",
      borderColor: "hover:border-rosewater/50",
      title: "Chocolate, obviously",
      subtitle: "Not coffee, not energy drinks, not tea. Just chocolate. Every time."
    },
    {
      chip: "MEDIA",
      chipColor: "text-primary",
      borderColor: "hover:border-primary/50",
      title: "JJK & The Silent Patient",
      subtitle: "Anime, manga, novels — I consume it all."
    },
    {
      chip: "SCHEDULE",
      chipColor: "text-secondary",
      borderColor: "hover:border-secondary/50",
      title: "Night owl. Or early bird.",
      subtitle: "Depends on deadlines, vibes, and what YouTube recommended at 2am."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About | Chimera", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-kh7btl4r": true })} ${maybeRenderHead()}<div class="mt-8 max-w-4xl mx-auto space-y-20 animate-fade-in pb-20" data-astro-cid-kh7btl4r> <!-- Header --> <section data-astro-cid-kh7btl4r> <p class="font-pixel text-xs text-primary mb-4 tracking-widest" data-astro-cid-kh7btl4r>
WHO AM I
</p> <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight" data-astro-cid-kh7btl4r>
I am<br data-astro-cid-kh7btl4r> <span class="text-primary" data-astro-cid-kh7btl4r>Aneesh Sagar Reddy.</span> </h1> <div class="text-lg text-text-muted leading-relaxed space-y-4 max-w-2xl" data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>
A <span class="text-primary" data-astro-cid-kh7btl4r>Computer Science (AI)</span> student at <span class="text-primary" data-astro-cid-kh7btl4r>Amrita Vishwa Vidyapeetam, Bengaluru</span>, who sits somewhere between an introvert and an extrovert, with a
          strong interest in full-stack development, cybersecurity, and building
          things that solve real problems—or sometimes just satisfy my
          curiosity.
</p> <p data-astro-cid-kh7btl4r>
I enjoy developing web applications, exploring how systems work under
          the hood, and automating tasks that take 5 seconds or 5 hours, just
          because I can. Most of my projects start with a question, a random
          idea, a minor inconvenience that refuses to leave my head, or a bit of
          inspiration borrowed from something I came across online.
</p> <p data-astro-cid-kh7btl4r>
I spend most of my time building, breaking (legally), and improving
          things. Most of my projects start as experiments; some become useful,
          and a few even get finished. On quieter weekends, you'll usually find
          me tackling a CTF challenge or two, or leaving a dozen half-finished
          side projects open in another tab while trying to stay awake in class.
</p> </div> </section> <!-- Quick Stats / Vibes --> <section class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-astro-cid-kh7btl4r> <div class="bg-overlay border border-highlight-med rounded-xl p-5 hover:border-primary/50 transition-colors group" data-astro-cid-kh7btl4r> <p class="font-pixel text-xs text-primary mb-2 tracking-wider" data-astro-cid-kh7btl4r>STYLE</p> <p class="text-text-primary font-bold text-lg group-hover:text-primary transition-colors" data-astro-cid-kh7btl4r>
Fuck it, we ball
</p> <p class="text-text-muted text-sm mt-1" data-astro-cid-kh7btl4r>
Chaotic, but with a plan. Somewhere.
</p> </div> <div class="bg-overlay border border-highlight-med rounded-xl p-5 hover:border-tertiary/50 transition-colors group" data-astro-cid-kh7btl4r> <p class="font-pixel text-xs text-tertiary mb-2 tracking-wider" data-astro-cid-kh7btl4r>
ACTUALLY
</p> <p class="text-text-primary font-bold text-lg group-hover:text-tertiary transition-colors" data-astro-cid-kh7btl4r>
Would've been a video editor
</p> <p class="text-text-muted text-sm mt-1" data-astro-cid-kh7btl4r>If code didn't happen first.</p> </div> </section> <!-- Timeline --> <section data-astro-cid-kh7btl4r> <h2 class="text-2xl font-bold text-text-primary mb-2 flex items-center gap-4" data-astro-cid-kh7btl4r> <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-kh7btl4r></path></svg>
Where I've Been
</h2> <p class="text-text-muted text-sm mb-8" data-astro-cid-kh7btl4r>
Clubs, communities, and things I'm part of.
</p> <div class="relative" data-astro-cid-kh7btl4r> ${timeline.map((item) => renderTemplate`${renderComponent($$result2, "TimelineItem", $$TimelineItem, { "date": item.date, "title": item.title, "description": item.description, "data-astro-cid-kh7btl4r": true })}`)} </div> </section> <!-- Tech Stack --> <section id="skills" data-astro-cid-kh7btl4r> <h2 class="text-2xl font-bold text-text-primary mb-2 flex items-center gap-4" data-astro-cid-kh7btl4r> <svg class="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-astro-cid-kh7btl4r></path></svg>
Current Loadout
</h2> <p class="text-text-muted text-sm mb-8" data-astro-cid-kh7btl4r>
Things I actually use. GitHub has more receipts.
</p> <div class="bg-overlay border border-highlight-med rounded-xl p-6 md:p-8" data-astro-cid-kh7btl4r> ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Spoken Languages", "skills": spokenLanguages, "data-astro-cid-kh7btl4r": true })} ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Programming Languages", "skills": languages, "data-astro-cid-kh7btl4r": true })} ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Frontend", "skills": frontend, "data-astro-cid-kh7btl4r": true })} ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Backend", "skills": backend, "data-astro-cid-kh7btl4r": true })} ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Security", "skills": security, "data-astro-cid-kh7btl4r": true })} ${renderComponent($$result2, "TechStack", $$TechStack, { "category": "Tools", "skills": tools, "data-astro-cid-kh7btl4r": true })} </div> </section> <!-- Fun Facts --> <section data-astro-cid-kh7btl4r> <h2 class="text-2xl font-bold text-text-primary mb-2 flex items-center gap-4" data-astro-cid-kh7btl4r> <svg class="w-6 h-6 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-kh7btl4r><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" data-astro-cid-kh7btl4r></path></svg>
Other Than That
</h2> <p class="text-text-muted text-sm mb-8" data-astro-cid-kh7btl4r>
The stuff that doesn't go on a resume.
</p> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-kh7btl4r> ${facts.map((fact) => renderTemplate`<div${addAttribute(`bg-overlay border border-highlight-med rounded-xl p-5 transition-colors group ${fact.borderColor}`, "class")} data-astro-cid-kh7btl4r> <div class="flex items-center gap-3 mb-3" data-astro-cid-kh7btl4r> <span class="text-2xl" data-astro-cid-kh7btl4r>${fact.icon}</span> <p${addAttribute(`font-pixel text-xs tracking-wider ${fact.chipColor}`, "class")} data-astro-cid-kh7btl4r> ${fact.chip} </p> </div> <p${addAttribute(`font-bold text-base text-text-primary mb-1 transition-colors group-hover:${fact.chipColor.replace("text-", "text-")}`, "class")} data-astro-cid-kh7btl4r> ${fact.title} </p> <p class="text-text-muted text-sm leading-relaxed" data-astro-cid-kh7btl4r> ${fact.subtitle} </p> </div>`)} </div> </section> <!-- Sign-off --> <section class="border-t border-highlight-med pt-10 text-center" data-astro-cid-kh7btl4r> <p class="text-text-muted text-sm leading-relaxed max-w-lg mx-auto" data-astro-cid-kh7btl4r>
If you made it this far, you probably know more about me than I do.
        Anyway, if you want to build something cool, break something, or just
        talk tech, my inbox is always open.
</p> <p class="font-pixel text-xs text-primary mt-4 tracking-widest" data-astro-cid-kh7btl4r>
— peace
</p> </section> </div> ` })}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/about.astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
