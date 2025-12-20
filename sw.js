self.addEventListener('install', (e) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (e) => {
  // Цей код дозволяє програмі працювати навіть без інтернету
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});