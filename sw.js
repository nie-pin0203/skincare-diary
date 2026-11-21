const SCOPE = self.registration.scope;
const CACHE_PREFIX = 'skincare:' + SCOPE + ':';
const CACHE = CACHE_PREFIX + '995d3dfcca06';
const ASSETS=["./","./assets/index-C9IGQn_V.js","./assets/index-DhfCV3Wb.css","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||!event.request.url.startsWith(SCOPE)) return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached = await cache.match(event.request);
    if(cached) return cached;
    try { return await fetch(event.request); }
    catch {
      if(event.request.mode==='navigate') return (await cache.match(new URL('index.html', SCOPE).href)) ?? Response.error();
      return Response.error();
    }
  }));
});
