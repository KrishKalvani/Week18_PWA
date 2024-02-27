//we do this to know how to cache it
var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'products.css',
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

//give the files is its there in the cache, otherwise don't
// self.addEventListener('fetch', function (e){
//     e.respondWith(
//         caches.match(e.request).then(function (r){
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             return r
//         })
//     )
// })


//helps to work the app offline, here we are returning our file, if its therem otherwise if not, it will fetch the file from third party sources.
self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})