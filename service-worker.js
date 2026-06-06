// =============================================
// OINAR - Service Worker
// Enables offline use + PWA installability
// =============================================

const CACHE_NAME = 'oinar-v5';

// All files to cache for offline use
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'css/style.css',
  'js/firebase.js',
  'js/data.js',
  'js/app.js',
  'manifest.json',
  'assets/logo.png',
  // Google Fonts (cached on first load)
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap',
  // Font Awesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ---- Install: cache all assets ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[OINAR SW] Caching app shell...');
      // Cache local assets strictly, external ones best-effort
      const localAssets = ASSETS_TO_CACHE.filter(url => !url.startsWith('http'));
      const externalAssets = ASSETS_TO_CACHE.filter(url => url.startsWith('http'));

      return cache.addAll(localAssets).then(() => {
        return Promise.allSettled(
          externalAssets.map(url => cache.add(url).catch(() => {}))
        );
      });
    }).then(() => self.skipWaiting())
  );
});

// ---- Activate: clean up old caches ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ---- Fetch: serve from cache, fallback to network ----
self.addEventListener('fetch', event => {
  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  // Never cache Firebase API / auth traffic — must always reach network
  if (event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('firebase') ||
      event.request.url.includes('identitytoolkit')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Don't cache bad responses
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        // Cache a clone for future offline use
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});