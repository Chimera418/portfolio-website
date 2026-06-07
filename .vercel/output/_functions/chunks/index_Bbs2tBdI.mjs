import { c as createComponent } from './astro-component_C6RNkUFs.mjs';
import 'piccolore';
import { n as generateCspDigest, y as spreadAttributes, C as unescapeHTML, x as renderTemplate, s as removeBase, p as isRemotePath, A as AstroError, U as UnknownContentCollectionError, u as renderComponent, r as maybeRenderHead, k as addAttribute } from './entrypoint_D1WMlBhe.mjs';
import 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import 'clsx';
import { V as VALID_INPUT_FORMATS } from './consts_Cm-hF_R3.mjs';
import * as devalue from 'devalue';
import { $ as $$Layout, a as $$Navbar } from './Navbar_CDW4UHEX.mjs';

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_DGMvSZWD.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  const copy = structuredClone(data);
  new Traverse(copy).forEach(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
  return copy;
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("devlog", ({ data }) => {
    return data.draft !== true;
  });
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Devlog | Chimera", "data-astro-cid-52x7k4lb": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-52x7k4lb": true })} ${maybeRenderHead()}<div class="mt-8 max-w-4xl mx-auto space-y-12 animate-fade-in" data-astro-cid-52x7k4lb> <!-- Header --> <section class="text-center" data-astro-cid-52x7k4lb> <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-4" data-astro-cid-52x7k4lb>
Developer <span class="text-tertiary font-pixel text-2xl md:text-3xl align-middle" data-astro-cid-52x7k4lb>Log</span> </h1> <p class="text-lg text-text-muted" data-astro-cid-52x7k4lb>
Writeups, technical notes, and build logs.
</p> </section> <!-- Post List --> <section class="space-y-6" data-astro-cid-52x7k4lb> ${allPosts.map((post) => renderTemplate`<a${addAttribute(`/devlog/${post.id}`, "href")} class="block bg-surface-dim border border-highlight-med rounded-xl p-6 hover:border-tertiary transition-colors group" data-astro-cid-52x7k4lb> <div class="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-2" data-astro-cid-52x7k4lb> <h2 class="text-2xl font-bold text-text-primary group-hover:text-tertiary transition-colors" data-astro-cid-52x7k4lb>${post.data.title}</h2> <span class="font-pixel text-[10px] text-text-muted whitespace-nowrap" data-astro-cid-52x7k4lb> ${post.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </span> </div> <p class="text-text-muted mb-4" data-astro-cid-52x7k4lb>${post.data.description}</p> <div class="flex flex-wrap gap-2" data-astro-cid-52x7k4lb> ${post.data.tags.map((tag) => renderTemplate`<span class="px-2 py-1 bg-surface-bright border border-highlight-med text-text-muted text-[10px] uppercase tracking-wider font-pixel rounded" data-astro-cid-52x7k4lb> ${tag} </span>`)} </div> </a>`)} </section> </div> ` })}`;
}, "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/devlog/index.astro", void 0);

const $$file = "C:/Users/anees/Desktop/Projects/Portfolio/src/pages/devlog/index.astro";
const $$url = "/devlog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
