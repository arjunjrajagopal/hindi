/* Akshar service worker: caches the whole app on first visit so it runs with no internet.
   When you change any app file, bump CACHE (e.g. akshar-v2) so phones pick up the new copy. */
const CACHE = 'akshar-v3';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './fonts/poppins-regular.woff', './fonts/poppins-medium.woff', './fonts/poppins-bold.woff', './fonts/translit.woff',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from the cache first (works offline), and refresh the cached copy in the background when online.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // The weekday writing app lives in /days/ and is not part of Akshar: let the network handle it.
  if (/\/days(\/|$)/.test(url.pathname)) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const hit = await cache.match(req, { ignoreSearch: true });
      const refresh = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (hit) { e.waitUntil(refresh); return hit; }
      const res = await refresh;
      if (res) return res;
      if (req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    })
  );
});
