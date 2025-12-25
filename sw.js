const CACHE_NAME = 'scanner-412-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/@zxing/library@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// Установка: зберігаємо файли в кеш
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Робота офлайн: перехоплюємо запити
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Повертаємо файл з кешу, якщо він там є, інакше йдемо в мережу
      return response || fetch(event.request);
    })
  );
});
