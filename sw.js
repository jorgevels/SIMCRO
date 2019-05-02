self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      return cache.addAll([
       
        '/SIMCRO/',
        '/SIMCRO/index.html',
        '/SIMCRO/js/..index.js',
        '/SIMCRO/index.css',
        '/SIMCRO/css/..style2.css',
        '/SIMCRO/images/fox1.jpg',
        '/SIMCRO/images/fox2.jpg',
        '/SIMCRO/images/fox3.jpg',
        '/SIMCRO/images/fox4.jpg'
      ]);
    })
  );
 });
 
 self.addEventListener('fetch', function(e) {
   console.log(e.request.url);
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });
 