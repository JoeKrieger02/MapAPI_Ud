//"use strict";

console.log('WORKER: executing.');

//  version number
var version = 'v2::';
//var self = this;
// Resources to be stored into cache
var offlineFundamentals = [
  '/',
  'css/main.css',
  'js/app.js',
  'js/service-worker.js',
  'img/Hamburger.svg',
  '/index.html'


];

// The install eventListener
window.addEventListener("install", function (event) {
  console.log('WORKER: install event in progress.');
  // Blocks the install process.
  event.waitUntil(

    caches
      // open a cache by name
      .open(version + 'fundamentals')
      .then(function (cache) {
        // add resources in the cache
        return cache.addAll(offlineFundamentals);
      })
      .then(function () {
        console.log('WORKER: install completed');
      })
  );
});


window.addEventListener("fetch", function (event) {
  console.log('WORKER: fetch event in progress.');

  // cache GET requests
  if (event.request.method !== 'GET') {
    // block the event
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  // blocks the fetch event on a promise.
  event.respondWith(
    caches

      .match(event.request)
      .then(function (cached) {
        // return cached responses immediately and store network response in the cache.
        var networked = fetch(event.request)
          //  success or failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // catch errors.
          .catch(unableToResolve);

        // Return the cached response or wait for network.
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          // copy the response
          var cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // open cache to store the response to the request.
            .open(version + 'pages')
            .then(function add(cache) {
              // store the response to the request.
              cache.put(event.request, cacheCopy);
            })
            .then(function () {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        // function to launch when everything else has failed.
        function unableToResolve() {
          // log the fail

          console.log('WORKER: fetch request failed in both cache and network.');

          // Show error message
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

// Activate if service worker has been successfully installed.
window.addEventListener("activate", function (event) {
  // blocks activate on a promise.
  console.log('WORKER: activate event in progress.');

  event.waitUntil(
    caches
      // Returns a promise that will resolve to an array of cache keys.

      .keys()
      .then(function (keys) {
        // Return a promise  when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version.
              return !key.startsWith(version);
            })
            .map(function (key) {
              // Return a promise when all old cache is deleted.
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        console.log('WORKER: activate completed.');
      })
  );
});
