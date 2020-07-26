var CACHE_NAME = 'my-profile-v2';
var urlsToCache = [
  '/',
  '/index.html',
  '/image.png',
  '/style.css',
  'https://img.icons8.com/ios-filled/100/000000/gmail.png',
  'https://img.icons8.com/android/96/000000/linkedin.png',
  'https://img.icons8.com/ios-filled/100/000000/github.png'
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
  if(!(event.request.url.indexOf('http') === 0)){
    return
  }
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
      console.log("using cache")
      return caches.match(event.request);
    })
  );
});
