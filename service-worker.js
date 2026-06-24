// Service worker mínimo: necesario para que el navegador ofrezca
// "Añadir a pantalla de inicio". No hace caché agresivo porque
// los datos (sitios_geocodificados.json) se actualizan con frecuencia.

const CACHE_NAME = 'sitios-cerca-v1';
const ARCHIVOS_BASICOS = ['./index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_BASICOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Para el JSON de datos: intenta red primero, cae a caché si no hay conexión
  if (event.request.url.includes('sitios_geocodificados.json')) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          const copia = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para el resto (HTML, manifest): caché primero, red de respaldo
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
