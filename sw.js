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
		fetch(event.request)
		  .then(function(res) {
			return caches.open(CACHE_NAME)
			  .then(function(cache) {
				cache.put(event.request.url, res.clone());
				return res;
			})
		})
		.catch(function(err) {
			return caches.match(event.request);
		})
	);
});
