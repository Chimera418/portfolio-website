import { _ as __vite_glob_0_0, a as __vite_glob_0_1, b as __vite_glob_0_2, c as __vite_glob_0_3, d as __vite_glob_0_4, e as __vite_glob_0_5, f as __vite_glob_0_6, g as __vite_glob_0_7, h as __vite_glob_0_8, i as __vite_glob_0_9 } from './version-control-system_DJBnrrdh.mjs';
import { c as createComponent } from './astro-component_DiYaXUiq.mjs';
import 'piccolore';
import { r as maybeRenderHead, k as addAttribute, x as renderTemplate, u as renderComponent } from './entrypoint_CDKNy878.mjs';
import { $ as $$Layout, a as $$Navbar } from './Navbar_B7fZhmYl.mjs';
import 'clsx';
import fs from 'fs';
import path from 'path';

const $$ProjectGridCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectGridCard;
  const { title, description, tags, link, github, slug, date } = Astro2.props;
  const colors = ["text-red-400 bg-red-400/10", "text-blue-400 bg-blue-400/10", "text-green-400 bg-green-400/10", "text-yellow-400 bg-yellow-400/10", "text-purple-400 bg-purple-400/10", "text-pink-400 bg-pink-400/10", "text-cyan-400 bg-cyan-400/10"];
  const getTagColor = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };
  const imagePath = `/images/projects/${slug}.jpg`;
  const absoluteImagePath = path.join(process.cwd(), "public", "images", "projects", `${slug}.jpg`);
  const hasImage = fs.existsSync(absoluteImagePath);
  return renderTemplate`${maybeRenderHead()}<div class="bg-surface-dim border border-highlight-med rounded-xl overflow-hidden hover:border-primary transition-colors flex flex-col group h-full relative"> <!-- Main Link covering the card --> <a${addAttribute(`/projects/${slug}`, "href")} class="absolute inset-0 z-10"${addAttribute(`View details for ${title}`, "aria-label")}></a> <!-- Image/Banner --> <div class="aspect-video w-full bg-overlay relative overflow-hidden flex items-center justify-center border-b border-highlight-med/50"> ${hasImage ? renderTemplate`<img${addAttribute(imagePath, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">` : renderTemplate`<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"> <span class="font-pixel text-text-muted text-[10px] uppercase opacity-50 group-hover:opacity-100 transition-opacity"> ${title}.exe
</span> </div>`} </div> <div class="p-5 flex flex-col flex-grow relative z-0"> <div class="flex justify-between items-start gap-2"> <h3 class="text-text-primary font-bold text-lg group-hover:text-primary transition-colors leading-tight">${title}</h3> ${date && renderTemplate`<span class="text-text-muted text-xs font-mono whitespace-nowrap pt-1">${date}</span>`} </div> <p class="text-text-muted text-sm mt-3 flex-grow">${description}</p> <!-- Tags --> <div class="flex flex-wrap gap-2 mt-4"> ${tags.map((tag) => renderTemplate`<span${addAttribute(`px-2 py-1 text-[10px] uppercase tracking-wider font-pixel rounded border border-current/20 ${getTagColor(tag)}`, "class")}>${tag}</span>`)} </div> <!-- Links --> <div class="flex items-center gap-5 mt-6 pt-4 border-t border-highlight-med relative z-20"> ${link && renderTemplate`<a${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer" class="group/btn flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary transition-colors">
Live Demo
<svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 7l-10 10M17 7H7M17 7v10"></path></svg> </a>`} ${github && renderTemplate`<a${addAttribute(github, "href")} target="_blank" rel="noopener noreferrer" class="group/btn flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-secondary transition-colors"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
GitHub
<svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 7l-10 10M17 7H7M17 7v10"></path></svg> </a>`} </div> </div> </div>`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/components/ProjectGridCard.astro", void 0);

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Projects;
  const projectFiles = Object.values([__vite_glob_0_0,__vite_glob_0_1,__vite_glob_0_2,__vite_glob_0_3,__vite_glob_0_4,__vite_glob_0_5,__vite_glob_0_6,__vite_glob_0_7,__vite_glob_0_8,__vite_glob_0_9]);
  const projects = projectFiles.map((file) => ({
    id: file.file.split("/").pop().replace(".md", ""),
    data: file.frontmatter
  })).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects | Chimera", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-aid3sr62": true })} ${maybeRenderHead()}<div class="mt-8 max-w-6xl mx-auto space-y-12 animate-fade-in" data-astro-cid-aid3sr62> <!-- Header --> <section class="text-center max-w-2xl mx-auto" data-astro-cid-aid3sr62> <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-4" data-astro-cid-aid3sr62>
Project <span class="text-secondary font-pixel text-2xl md:text-3xl align-middle" data-astro-cid-aid3sr62>Database</span> </h1> <p class="text-lg text-text-muted" data-astro-cid-aid3sr62>
A collection of my recent work, experiments, and open-source contributions.
</p> </section> <!-- Grid --> <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-astro-cid-aid3sr62> ${projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectGridCard", $$ProjectGridCard, { "title": project.data.title, "description": project.data.description, "tags": project.data.tags, "link": project.data.link, "github": project.data.github, "slug": project.id, "date": project.data.date, "data-astro-cid-aid3sr62": true })}`)} </section> </div> ` })}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/projects.astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
