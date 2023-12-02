const CACHE_NAME = 'v1.0.2';

self.addEventListener('install', event => {
    const urlsToPrefetch = [
        "/photo/",
        "/css/photo.css",
        "/js/photo.js",
        "/photo-manifest.json",
        "https://img4.ink-lotus.ink/blog/online-tool/72x72.png",
        "https://img4.ink-lotus.ink/blog/online-tool/144x144.png",
        "https://img4.ink-lotus.ink/blog/online-tool/192x192.png",
        "https://img4.ink-lotus.ink/blog/online-tool/512x512.png",
        "/js/lib/jquery/jquery.min.js",
        "/js/lib/three/three.min.js",
        "/js/lib/browser.min.js",
        "/js/lib/photo-sphere-viewer/index.min.css",
        "/js/lib/photo-sphere-viewer/index.min.js"
    ]

    // await cache.addAll();
    // await self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            cache.addAll(urlsToPrefetch.map(function (urlToPrefetch) {
                return new Request(urlToPrefetch, { mode: 'no-cors' });
            })).then(function () {
                console.log('All resources have been fetched and cached.');
            });
        }).catch(function (error) {
            console.error('Pre-fetching failed:', error);
        })
    );
});

self.addEventListener('activate', async event => {
    // 在 promise 成功完成之前，活跃的 worker 不会被视作已激活。
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('fetch------------------');
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(function (response) {
                return caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
