import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DQEGIv3M.mjs';
import { manifest } from './manifest_D8IDBkT4.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/inquiry.astro.mjs');
const _page4 = () => import('./pages/authors/_slug_.astro.mjs');
const _page5 = () => import('./pages/authors.astro.mjs');
const _page6 = () => import('./pages/blogs/_slug_.astro.mjs');
const _page7 = () => import('./pages/blogs.astro.mjs');
const _page8 = () => import('./pages/category/rfid-cards.astro.mjs');
const _page9 = () => import('./pages/category/rfid-keyfob.astro.mjs');
const _page10 = () => import('./pages/category/rfid-labels.astro.mjs');
const _page11 = () => import('./pages/category/rfid-readers.astro.mjs');
const _page12 = () => import('./pages/category/rfid-tags.astro.mjs');
const _page13 = () => import('./pages/category/rfid-wristbands.astro.mjs');
const _page14 = () => import('./pages/certifications.astro.mjs');
const _page15 = () => import('./pages/compare/_slug_.astro.mjs');
const _page16 = () => import('./pages/compare.astro.mjs');
const _page17 = () => import('./pages/contact.astro.mjs');
const _page18 = () => import('./pages/feed.xml.astro.mjs');
const _page19 = () => import('./pages/markets/_slug_.astro.mjs');
const _page20 = () => import('./pages/markets.astro.mjs');
const _page21 = () => import('./pages/product/_slug_.astro.mjs');
const _page22 = () => import('./pages/products.astro.mjs');
const _page23 = () => import('./pages/quality-control.astro.mjs');
const _page24 = () => import('./pages/rfid.astro.mjs');
const _page25 = () => import('./pages/rfid-glossary.astro.mjs');
const _page26 = () => import('./pages/rfid-technology.astro.mjs');
const _page27 = () => import('./pages/sample-policy.astro.mjs');
const _page28 = () => import('./pages/shipping-and-incoterms.astro.mjs');
const _page29 = () => import('./pages/solutions/_slug_.astro.mjs');
const _page30 = () => import('./pages/solutions.astro.mjs');
const _page31 = () => import('./pages/thank-you.astro.mjs');
const _page32 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/inquiry.ts", _page3],
    ["src/pages/authors/[slug].astro", _page4],
    ["src/pages/authors/index.astro", _page5],
    ["src/pages/blogs/[slug].astro", _page6],
    ["src/pages/blogs.astro", _page7],
    ["src/pages/category/rfid-cards.astro", _page8],
    ["src/pages/category/rfid-keyfob.astro", _page9],
    ["src/pages/category/rfid-labels.astro", _page10],
    ["src/pages/category/rfid-readers.astro", _page11],
    ["src/pages/category/rfid-tags.astro", _page12],
    ["src/pages/category/rfid-wristbands.astro", _page13],
    ["src/pages/certifications.astro", _page14],
    ["src/pages/compare/[slug].astro", _page15],
    ["src/pages/compare/index.astro", _page16],
    ["src/pages/contact.astro", _page17],
    ["src/pages/feed.xml.ts", _page18],
    ["src/pages/markets/[slug].astro", _page19],
    ["src/pages/markets/index.astro", _page20],
    ["src/pages/product/[slug].astro", _page21],
    ["src/pages/products.astro", _page22],
    ["src/pages/quality-control.astro", _page23],
    ["src/pages/rfid.astro", _page24],
    ["src/pages/rfid-glossary.astro", _page25],
    ["src/pages/rfid-technology.astro", _page26],
    ["src/pages/sample-policy.astro", _page27],
    ["src/pages/shipping-and-incoterms.astro", _page28],
    ["src/pages/solutions/[slug].astro", _page29],
    ["src/pages/solutions/index.astro", _page30],
    ["src/pages/thank-you.astro", _page31],
    ["src/pages/index.astro", _page32]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ab2960a3-ff30-4d73-b05a-254825fba05d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
