import { i as __vite_glob_0_9, h as __vite_glob_0_8, g as __vite_glob_0_7, f as __vite_glob_0_6, e as __vite_glob_0_5, d as __vite_glob_0_4, c as __vite_glob_0_3, b as __vite_glob_0_2, a as __vite_glob_0_1, _ as __vite_glob_0_0 } from './version-control-system_BtdZfl6i.mjs';
import { c as createComponent } from './astro-component_B4qxK23r.mjs';
import 'piccolore';
import { u as renderComponent, x as renderTemplate, r as maybeRenderHead, k as addAttribute } from './entrypoint_Dc7B2knl.mjs';
import fs from 'fs';
import path from 'path';
import { $ as $$Layout, a as $$Navbar } from './Navbar_RBZ07xdE.mjs';

const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) return Astro2.redirect("/404");
  const projectFiles = /* #__PURE__ */ Object.assign({"../../content/projects/certificate-generator.md": __vite_glob_0_0,"../../content/projects/cmra.md": __vite_glob_0_1,"../../content/projects/drug-conflict-detection.md": __vite_glob_0_2,"../../content/projects/feedback-automater.md": __vite_glob_0_3,"../../content/projects/goty-games.md": __vite_glob_0_4,"../../content/projects/monks-vs-cannibals.md": __vite_glob_0_5,"../../content/projects/protein-ssp.md": __vite_glob_0_6,"../../content/projects/spamizard.md": __vite_glob_0_7,"../../content/projects/tabrix.md": __vite_glob_0_8,"../../content/projects/version-control-system.md": __vite_glob_0_9});
  const file = Object.values(projectFiles).find((f) => f.file && f.file.endsWith(`${slug}.md`));
  if (!file) return Astro2.redirect("/404");
  const entry = { data: file.frontmatter };
  const Content = file.default;
  const colors = ["text-red-400 bg-red-400/10", "text-blue-400 bg-blue-400/10", "text-green-400 bg-green-400/10", "text-yellow-400 bg-yellow-400/10", "text-purple-400 bg-purple-400/10", "text-pink-400 bg-pink-400/10", "text-cyan-400 bg-cyan-400/10"];
  const getTagColor = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };
  const imagePath = `/images/projects/${slug}.jpg`;
  const absoluteImagePath = path.join(process.cwd(), "public", "images", "projects", `${slug}.jpg`);
  const hasImage = fs.existsSync(absoluteImagePath);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${entry.data.title} | Projects` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-6 py-12 animate-fade-in"> <!-- Back Button --> <a href="/projects" class="inline-flex items-center gap-2 text-text-muted hover:text-secondary transition-colors mb-8 group font-pixel text-sm uppercase tracking-widest"> <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
Back to Projects
</a> <article> <!-- Banner Image --> <div class="mb-10 rounded-xl overflow-hidden shadow-2xl flex justify-center items-center py-8"> ${hasImage ? renderTemplate`<img${addAttribute(imagePath, "src")}${addAttribute(entry.data.title, "alt")} class="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-highlight-med/50">` : renderTemplate`<div class="aspect-video w-full max-w-3xl bg-overlay relative overflow-hidden rounded-xl border border-highlight-med"> <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center gap-4"> <div class="p-4 bg-background/80 backdrop-blur rounded-2xl border border-highlight/50 shadow-lg"> <svg class="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"></path> </svg> </div> <span class="font-pixel text-text-primary text-xl md:text-2xl tracking-wider"> ${entry.data.title}.exe
</span> </div> </div>`} </div> <!-- Header Section --> <header class="mb-12"> <h1 class="text-4xl md:text-5xl font-sans font-bold text-primary mb-6 leading-tight">${entry.data.title}</h1> <div class="flex flex-wrap items-center gap-4 mb-6 text-sm"> <span class="flex items-center gap-2 text-text-muted font-pixel"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
2025
</span> ${entry.data.github && renderTemplate`<a${addAttribute(entry.data.github, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"> <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg> </a>`} ${entry.data.link && renderTemplate`<a${addAttribute(entry.data.link, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> </a>`} </div> <div class="flex flex-wrap items-center gap-2 mt-4"> <svg class="w-5 h-5 text-text-muted mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg> ${entry.data.tags.map((tag) => renderTemplate`<span${addAttribute(`px-2.5 py-1 text-xs font-semibold rounded-md border border-current/20 ${getTagColor(tag)}`, "class")}> ${tag} </span>`)} </div> </header> <hr class="border-highlight-med mb-10"> <!-- Markdown Content --> <div class="project-content"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> </main> ` })}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/projects/[slug].astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/projects/[slug].astro";
const $$url = "/projects/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
