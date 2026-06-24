# Sitios Cerca - PWA instalable

App de móvil que muestra los sitios guardados (de tus chats de WhatsApp)
filtrados por distancia desde tu ubicación actual. Pensada para usar
durante el viaje en el camión overland.

## Qué incluye esta carpeta

```
index.html            La app (mapa + filtro de radios + lista)
manifest.json         Hace que el navegador la pueda instalar como app
service-worker.js     Necesario para la instalación
icon-192.png          Icono de la app (pequeño)
icon-512.png          Icono de la app (grande)
```

Falta un archivo que tienes que copiar tú: **`sitios_geocodificados.json`**,
el que ya genera tu script `5_generar_mapa.py` en la carpeta `datos/`.
Cópialo a esta misma carpeta (junto a `index.html`).

---

## Paso 1 — Subir a GitHub Pages (gratis, con HTTPS)

1. Entra en **github.com** y crea un repositorio nuevo (puede ser privado o
   público, da igual para esto). Por ejemplo, llámalo `sitios-cerca`.

2. Sube TODOS los archivos de esta carpeta al repositorio, incluyendo el
   `sitios_geocodificados.json` que copiaste. La forma más fácil sin usar
   git por terminal:
   - En la página del repositorio, botón **"Add file" → "Upload files"**
   - Arrastra los 5-6 archivos
   - Botón verde **"Commit changes"**

3. Ve a **Settings** (del repositorio) → **Pages** (menú izquierdo)

4. En "Source", selecciona **"Deploy from a branch"**, rama **main**,
   carpeta **/ (root)** → **Save**

5. Espera 1-2 minutos. GitHub te dará una URL parecida a:
   ```
   https://tu-usuario.github.io/sitios-cerca/
   ```

6. Antes de usarla, edita `index.html` directamente en GitHub (botón del
   lápiz ✏️) y sustituye `GOOGLE_MAPS_JS_KEY` por tu clave real de Google
   Maps JavaScript API. Guarda los cambios ("Commit changes").

   **Importante**: en Google Cloud Console, edita las restricciones de
   esa clave para permitir el dominio `tu-usuario.github.io/*` (si la
   clave tiene restricciones de referrer HTTP).

---

## Paso 2 — Instalar en el móvil

1. Abre la URL de GitHub Pages en **Chrome** (Android) o **Safari** (iPhone)
   desde el móvil.

2. **Android (Chrome):** te debería aparecer un aviso "Añadir a pantalla
   de inicio" automáticamente, o puedes hacerlo manualmente desde el menú
   (⋮) → "Añadir a pantalla de inicio" → "Instalar".

3. **iPhone (Safari):** botón de compartir (□↑) → "Añadir a pantalla
   de inicio".

4. Ya tienes el icono azul con el pin blanco en tu pantalla de inicio,
   como cualquier otra app.

5. La primera vez que pulses "Buscar sitios cerca de mí", el navegador
   pedirá permiso de ubicación — acepta.

---

## Cómo actualizar los datos en el futuro

Cada vez que proceses un chat nuevo de WhatsApp y regeneres
`sitios_geocodificados.json` con el script 5, solo tienes que:

1. Subir el archivo actualizado a GitHub (sustituyendo el anterior)
2. La app del móvil se actualiza sola la próxima vez que tengas conexión
   (no hace falta reinstalar nada)

---

## Notas

- El radio "100 m" y "500 m" son útiles sobre todo en ciudad, a pie.
- Los radios grandes (100-300 km) son los pensados para el camión:
  cuando llegas a una zona nueva, ves todo lo que tienes guardado
  cerca de la ruta.
- Si no tienes cobertura en el momento de abrir la app, el mapa puede
  no cargar (depende de Google Maps), pero la lista de sitios ya
  descargados antes debería seguir funcionando gracias al service worker.
