/**
 * Service Worker for PWA
 * Enables offline functionality and app installation
 * Repository: https://github.com/farid-teymouri/todo-list
 */

const CACHE_NAME = "todo-list-v1.0.0";
const CACHE_VERSION = "1.0.0";
const APP_PREFIX = "/todo-list";

const urlsToCache = [
  `${APP_PREFIX}/`,
  `${APP_PREFIX}/index.html`,
  `${APP_PREFIX}/css/main.css`,
  `${APP_PREFIX}/js/main.js`,
  `${APP_PREFIX}/js/core/TodoApp.js`,
  `${APP_PREFIX}/js/core/StorageManager.js`,
  `${APP_PREFIX}/js/core/ThemeManager.js`,
  `${APP_PREFIX}/js/ui/TodoRenderer.js`,
  `${APP_PREFIX}/js/ui/Toast.js`,
  `${APP_PREFIX}/js/ui/Modal.js`,
  `${APP_PREFIX}/js/utils/helpers.js`,
  `${APP_PREFIX}/js/utils/constants.js`,
  `${APP_PREFIX}/assets/icons/sun.svg`,
  `${APP_PREFIX}/assets/icons/moon.svg`,
  `${APP_PREFIX}/assets/icons/search.svg`,
  `${APP_PREFIX}/assets/icons/edit.svg`,
  `${APP_PREFIX}/assets/icons/delete.svg`,
  `${APP_PREFIX}/assets/icons/add.svg`,
  `${APP_PREFIX}/icon-192.svg`,
  `${APP_PREFIX}/icon-512.svg`,
];

// Install event - cache files
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  // Force activation
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell");
      return cache
        .addAll(urlsToCache)
        .then(() => {
          console.log("[Service Worker] Installation complete");
        })
        .catch((error) => {
          console.error("[Service Worker] Caching failed:", error);
        });
    }),
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log("[Service Worker] Activation complete");
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (
    event.request.url.startsWith("http") &&
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        console.log("[Service Worker] Serving from cache:", event.request.url);
        return response;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Clone response because it's a stream
          const responseClone = response.clone();

          // Open cache and store response for non-opaque responses
          if (!responseClone.type || responseClone.type === "basic") {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
              console.log(
                "[Service Worker] Caching new resource:",
                event.request.url,
              );
            });
          }

          return response;
        })
        .catch((error) => {
          console.error("[Service Worker] Network request failed:", error);

          // Fallback for failed requests
          if (event.request.url.includes(".html")) {
            return caches.match(`${APP_PREFIX}/index.html`);
          }
          if (event.request.url.includes(".css")) {
            return caches.match(`${APP_PREFIX}/css/main.css`);
          }

          // Return custom offline page or error message
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
                  h1 {
                    font-size: 3rem;
                    margin-bottom: 20px;
                  }
                  p {
                    font-size: 1.2rem;
                    margin-bottom: 30px;
                  }
                  .icon {
                    font-size: 5rem;
                    margin-bottom: 20px;
                  }
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
                "Content-Type": "text/html",
                "Cache-Control": "no-cache",
              },
            },
          );
        });
    }),
  );
});

// Push notification event
self.addEventListener("push", (event) => {
  const title = "Todo List App";
  const options = {
    body: event.data ? event.data.text() : "You have a new notification",
    icon: `${APP_PREFIX}/icon-192.svg`,
    badge: `${APP_PREFIX}/icon-192.svg`,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Open App",
        icon: `${APP_PREFIX}/icon-192.svg`,
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes(APP_PREFIX) && "focus" in client) {
          return client.focus();
        }
      }

      // Open app in new window
      if (clients.openWindow) {
        return clients.openWindow(`${APP_PREFIX}/`);
      }
    }),
  );
});

// Sync event (for future background sync implementation)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-todos") {
    event.waitUntil(
      // Future implementation: sync todos with backend server
      console.log("[Service Worker] Background sync triggered for todos"),
    );
  }
});

// Message event - communicate with app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_CACHE_INFO") {
    event.ports[0].postMessage({
      cacheName: CACHE_NAME,
      cacheVersion: CACHE_VERSION,
      timestamp: Date.now(),
    });
  }
});

console.log(`[Service Worker] Loaded - Version ${CACHE_VERSION}`);
