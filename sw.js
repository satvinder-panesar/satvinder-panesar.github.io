var CACHE_NAME = 'my-profile';
var urlsToCache = [
  '/',
  '/index.html',
  '/image.png',
  '/style.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return fetch(event.request);
        })
        .catch(function(error) {
            caches.match(event.request)
            .then(function(response) {
                return response;
            })
        })
    );
});
