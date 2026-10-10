const CACHE_NAME = 'vic-heavy-diesel-v2';

const STATIC_ASSETS = [
  '/',
  '/api/locations.json',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/vic/truganina/',
  '/vic/laverton-north/',
  '/vic/campbellfield/',
  '/vic/dandenong-south/',
  '/vic/bayswater/',
  '/vic/seymour/',
  '/vic/wodonga/',
  '/vic/ballarat/',
  '/nsw/albury/',
  '/sa/bordertown/',
  '/corridors/hume-freeway-m31/',
  '/corridors/western-highway-m8/',
  '/corridors/princes-freeway-m1/',
  '/corridors/eastlink-monash/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});
