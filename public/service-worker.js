/**
 * Service Worker for PWA
 * Enables offline functionality and app installation
 * Repository: https://github.com/farid-teymouri/todo-list
 *
 * NOTE: Uses RELATIVE PATHS (./) for root deployment compatibility
 * Works correctly on Vercel, GitHub Pages, and all root-level deployments
 */

const CACHE_NAME = 'todo-list-v1.0.0';
const CACHE_VERSION = '1.0.0';

// Cache resources using RELATIVE PATHS for universal deployment compatibility
const urlsToCache = [
  './',
  './index.html',
  './css/main.css',
  './js/main.js',
  './js/core/TodoApp.js',
  './js/core/StorageManager.js',
  './js/core/ThemeManager.js',
  './js/ui/TodoRenderer.js',
  './js/ui/Toast.js',
  './js/ui/Modal.js',
  './js/utils/helpers.js',
  './js/utils/constants.js',
  './assets/icons/sun.svg',
  './assets/icons/moon.svg',
  './assets/icons/search.svg',
  './assets/icons/edit.svg',
  './assets/icons/delete.svg',
  './assets/icons/add.svg',
  './icon-192.svg',
  './icon-512.svg',
];

// Install event - cache core application files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching application shell');
      return cache
        .addAll(urlsToCache)
        .then(() => console.log('[Service Worker] Installation complete'))
        .catch(error => console.error('[Service Worker] Caching failed:', error));
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network with smart fallback
self.addEventListener('fetch', event => {
  // Skip cross-origin requests (analytics, CDNs, etc.)
  if (event.request.url.startsWith('http') && !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('[Service Worker] Serving from cache:', event.request.url);
        return response;
      }

      return fetch(event.request)
        .then(response => {
          // Clone response before using it
          const responseClone = response.clone();

          // Cache successful responses (non-opaque)
          if (response.status === 200 && (!responseClone.type || responseClone.type === 'basic')) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
              console.log('[Service Worker] Cached new resource:', event.request.url);
            });
          }

          return response;
        })
        .catch(error => {
          console.error('[Service Worker] Network request failed:', error);

          // Fallback to cached core files
          if (event.request.url.includes('.html')) {
            return caches.match('./index.html');
          }
          if (event.request.url.includes('.css')) {
            return caches.match('./css/main.css');
          }

          // Return custom offline page
          return new Response(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Offline - Todo List</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  margin: 0;
                  color: white;
                }
                .offline-container {
                  text-align: center;
                  padding: 40px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 20px;
                  backdrop-filter: blur(10px);
                }
                h1 { font-size: 3rem; margin-bottom: 20px; }
                p { font-size: 1.2rem; margin-bottom: 30px; }
                .icon { font-size: 5rem; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="offline-container">
                <div class="icon">📴</div>
                <h1>Offline Mode</h1>
                <p>You're currently offline. Your tasks are saved locally.</p>
                <p>Reconnect to sync and access all features.</p>
              </div>
            </body>
            </html>
          `,
            {
              headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache',
              },
            }
          );
        });
    })
  );
});

// Push notification handler (future enhancement)
self.addEventListener('push', event => {
  const title = 'Todo List App';
  const options = {
    body: event.data?.text() || 'New notification',
    icon: './icon-192.svg',
    badge: './icon-192.svg',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now() },
    actions: [{ action: 'view', title: 'Open App', icon: './icon-192.svg' }],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Focus existing window if app is open
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }

      // Open new window
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

// Message handler for app communication
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();

  if (event.data?.type === 'GET_CACHE_INFO') {
    event.ports[0].postMessage({
      cacheName: CACHE_NAME,
      cacheVersion: CACHE_VERSION,
      timestamp: Date.now(),
    });
  }
});

console.log(
  `[Service Worker] Loaded - Version ${CACHE_VERSION} | Scope: ${self.registration.scope}`
);
