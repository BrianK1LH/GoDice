if(!self.define){let e,i={};const r=(r,s)=>(r=new URL(r+".js",s).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let f={};const c=e=>r(e,o),d={module:{uri:o},exports:f,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(n(...e),f)))}}define(["./workbox-127fe5c4"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"godice.js",revision:"cf3899a06b5ff97613a6e358be4f33f6"},{url:"images/godice.png",revision:"f5fc54a2bf9057f2d0e28f96991ad40b"},{url:"images/logo.png",revision:"83f07b83a97aed37430134bf9dd6a616"},{url:"images/one.png",revision:"68b329da9893e34099c7d8ad5cb9c940"},{url:"index.html",revision:"79e20cd5437b127047ea1bf66e074096"},{url:"LICENSE.md",revision:"d300cb84fb2758125f09e4de136eee6f"},{url:"main.js",revision:"6319c764108a905f7a798f8a3ba09c1c"},{url:"README.md",revision:"a6f5394422365582112f1f8e60948c35"},{url:"style.css",revision:"1d405c410bebf3037d5a167d3931476c"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map