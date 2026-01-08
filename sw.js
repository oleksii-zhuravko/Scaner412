const CACHE_NAME = 'scanner412-v3'; // Змінюйте версію (v3, v4...), щоб змусити телефон оновити файли

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './zxing.js',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// Установка: кешуємо всі ресурси
self.addEventListener('install', (event) => {
  // Змушуємо сервіс-воркер активуватися негайно, не чекаючи закриття вкладок
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кешування ресурсів...');
      return cache.addAll(ASSETS);
    })
  );
});

// Активація: видаляємо старі версії кешу
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  // Негайно беремо під контроль усі відкриті сторінки
  self.clients.claim();
});

// Робота офлайн: стратегія Cache First (спочатку кеш, потім мережа)
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
