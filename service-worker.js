//we do this to know how to cache it
var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/catFood.jpg',
    'images/dogCollar.jpg',
    'images/kittyLitter.jpg',
    'images/horseFood.jpg',
    'images/dogFood.jpg',
    'images/icon-store-512.png'

]

//actually adding to the cache here
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) =>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});