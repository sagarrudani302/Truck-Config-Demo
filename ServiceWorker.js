const cacheName = "DefaultCompany-Truck Configurator-0.1";
const contentToCache = [
    "Build/Truck Configurator.loader.js",
    "Build/9ee24aa896f4478b7f816516f686fea6.js",
    "Build/e28ba8f3ec4a51670f10417db041014e.data",
    "Build/dea6856f9d4b0ac243fca4b892d6a85c.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
