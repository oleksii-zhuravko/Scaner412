const CACHE_NAME = 'scanner412-v4';

// Список файлів для офлайн роботи
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './quagga.min.js',
  './icon412.png',
  // Кешуємо зовнішній звук, щоб він працював офлайн
  'https://raw.githubusercontent.com/renzofiorella/barcode-scanner-pwa/master/src/assets/beep.mp3'
];

// Установка: зберігаємо все у кеш
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активація: чистимо старий кеш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Стратегія: Спочатку кеш, якщо немає — запит до мережі
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
