# Sitio web de JMSystems

Sitio 100% estático (HTML + CSS + JavaScript), listo para publicar gratis.
No necesita servidor, base de datos ni pagos.

## 📁 Qué hay en esta carpeta

```
jmsystems-web/
├── index.html              ← la página (casi nunca hace falta tocarla)
├── css/style.css            ← estilos visuales (colores, tamaños)
├── js/data.js                 ← ⭐ AQUÍ EDITAS TODO EL CONTENIDO
├── js/main.js                  ← lógica del sitio (no lo edites)
└── assets/
    ├── img/logo.png
    ├── img/servicios/         ← fotos de servicios (opcional, tú las subes)
    └── img/productos/         ← fotos de productos (opcional, tú las subes)
```

**Regla de oro: el 95% de tus cambios los vas a hacer en `js/data.js`.**
Ábrelo con el Bloc de notas, Notepad++, o edítalo directo desde GitHub/Netlify
en el navegador. No necesitas saber programar — es solo texto entre comillas.

---

## 1. Cambiar datos de contacto (WhatsApp, redes, ciudad)

Al inicio de `js/data.js` está el bloque `contact`:

```js
contact: {
  whatsapp: "573105996075",           // número con indicativo de país, sin + ni espacios
  whatsappDisplay: "+57 310 599 6075",// cómo se ve el número en pantalla
  city: "Medellín, Antioquia",
  coverage: "Medellín, Valle de Aburrá y Oriente antioqueño",
  facebook: "https://www.facebook.com/share/18ufyz7g6R/",
  facebookHandle: "JMSYSTEMS",
  instagram: "https://instagram.com/jmsystems1998",
  instagramHandle: "@jmsystems1998",
  email: ""
}
```

Cambia lo que necesites entre las comillas `" "` y guarda el archivo. El sitio
se actualiza solo en todos los lugares donde aparece ese dato (WhatsApp
flotante, pie de página, sección de contacto, etc.).

---

## 2. Agregar o editar un SERVICIO

Busca el bloque `services: [ ... ]` en `js/data.js`. Cada servicio es un bloque así:

```js
{ id: "mant-preventivo", category: "Soporte y mantenimiento", tag: "Mantenimiento", scene: "maintenance", icon: "wrench", title: "Mantenimiento preventivo", desc: "Limpieza interna, revisión de temperaturas y optimización general." },
```

- `id`: identificador único, sin espacios ni tildes (ej: `"instalacion-nas"`).
- `category`: debe ser una de las 4 que están arriba en `serviceCategories`
  (o agrega una categoría nueva ahí también si la necesitas).
- `tag`: la etiqueta corta que se ve sobre la imagen (ej: "Mantenimiento", "Redes").
- `title`: el nombre del servicio.
- `desc`: una frase corta explicando el servicio.
- `scene`: qué ilustración usar (ver la lista abajo). Si no pones `scene`,
  el sitio usa un ícono simple en su lugar.
- `image`: **opcional** — si quieres usar una FOTO real en vez de la
  ilustración, agrega esta línea con la ruta de tu foto (ver sección 4).

Para agregar un servicio nuevo, copia un bloque completo, pégalo antes o
después de otro (dentro de los `[ ]`), y cambia sus datos. No olvides la
coma `,` al final de cada bloque, excepto en el último.

**Ilustraciones (`scene`) disponibles**, elige la que mejor represente tu servicio:

| scene            | Escena                              |
|-------------------|--------------------------------------|
| `maintenance`     | Persona haciendo mantenimiento a un PC |
| `remote`          | Persona con diadema en llamada/soporte remoto |
| `repair`          | Torre de PC abierta, reparación      |
| `format`          | Pantalla con barra de progreso (formateo) |
| `upgrade`         | Instalación de RAM / SSD             |
| `software`        | Instalación de programas             |
| `printer`         | Impresora conectada                  |
| `network`         | Red de dispositivos conectados       |
| `cabling`         | Cableado estructurado                |
| `router`          | Router / switch                      |
| `wifi`            | Señal Wi-Fi                          |
| `rack`            | Rack de servidores                   |
| `cctv`            | Cámara de seguridad                  |
| `cctv-remote`     | Monitoreo remoto de cámaras          |
| `shop-equipos`    | Venta de computadores                |
| `shop-accesorios` | Venta de accesorios                  |
| `advice`          | Asesoría / consultoría               |
| `business`        | Planes para empresas                 |

---

## 3. Agregar o editar PRODUCTOS del catálogo

El catálogo tiene 2 niveles. Busca `productCategories: [ ... ]` en `js/data.js`.

**Para agregar una categoría nueva** (ej: "Monitores"):

```js
{
  id: "monitores",
  icon: "cpu",
  title: "Monitores",
  subtitle: "Para oficina y gaming",
  products: [
    { name: "Monitor 21.5 pulgadas Full HD", price: "$420.000" },
    { name: "Monitor curvo 27 pulgadas", price: "$780.000" }
  ]
}
```

Cópialo dentro de los `[ ]` de `productCategories`, junto a las demás categorías.

**Para agregar un producto dentro de una categoría existente** (ej: un teclado
nuevo), busca la categoría por su `title` (ej: `"Teclados"`) y agrega una
línea dentro de su `products: [ ]`:

```js
{ name: "Teclado mecánico RGB", price: "$180.000", note: "Retroiluminado" },
```

- `name`: nombre del producto.
- `price`: el precio (ej: `"$55.000"`) o escribe `"Consultar"` si no quieres
  mostrar precio todavía.
- `note`: **opcional**, una frase corta debajo del nombre.
- `image`: **opcional** — la foto del producto (ver sección 4).

---

## 4. Cómo agregar FOTOS reales (productos y servicios)

Mientras no subas fotos, el sitio usa ilustraciones/íconos de referencia
automáticamente — no se ve roto ni incompleto.

**Pasos para agregar una foto:**

1. Guarda la foto (idealmente cuadrada o 4:3, menos de 500 KB) dentro de:
   - `assets/img/productos/` para productos, o
   - `assets/img/servicios/` para servicios.
   Usa nombres sin espacios ni tildes, ej: `teclado-logitech-k220.jpg`.
2. En el producto o servicio correspondiente dentro de `js/data.js`, agrega
   la línea `image` con la ruta:

   ```js
   { name: "Teclado inalámbrico estándar", price: "$55.000", image: "assets/img/productos/teclado-logitech-k220.jpg" },
   ```

   ```js
   { id: "mant-preventivo", ..., image: "assets/img/servicios/mantenimiento.jpg", ... },
   ```
3. Guarda y listo — la foto reemplaza automáticamente la ilustración, sin
   tocar nada más.

**Importante:** usa siempre fotos propias (tuyas, tomadas por ti o compradas
con licencia). No copies fotos de Google/Internet directamente — la mayoría
tienen derechos de autor y no se pueden usar en un sitio comercial sin permiso.

---

## 5. Cambiar el logo

Reemplaza el archivo `assets/img/logo.png` por tu nuevo logo, **manteniendo
el mismo nombre** (`logo.png`). El sitio lo tomará automáticamente en el
menú y en el pie de página. Si tu logo es muy ancho o muy alto, avísame y
ajustamos el tamaño en `css/style.css` (busca `.brand img`).

---

## 6. Cambiar colores

En `css/style.css`, al inicio, están las variables de color:

```css
--cyan: #17ABE3;   /* azul claro / celeste */
--blue: #145DA0;   /* azul principal */
```

Cambiando esos dos valores (en formato hexadecimal) cambias el color de
botones, enlaces y acentos en todo el sitio.

---

## 🌍 Cómo publicarlo gratis (recomendado: Netlify)

**Opción A — Netlify (la más fácil, sin necesidad de saber programación ni Git)**

1. Entra a [netlify.com](https://www.netlify.com) y crea una cuenta gratis.
2. Busca **"Add new site" → "Deploy manually"**.
3. Arrastra la carpeta **`jmsystems-web`** completa a esa caja.
4. En segundos tu sitio queda publicado en `https://jmsystems.netlify.app`
   (puedes cambiar ese nombre en "Site settings → Change site name").
5. Cada vez que edites algo, vuelve a arrastrar la carpeta actualizada.

**Opción B — GitHub Pages**

1. Crea una cuenta en [github.com](https://github.com) y un repositorio,
   ej: `jmsystems-web`.
2. Sube todos los archivos de esta carpeta ("Add file → Upload files").
3. Ve a **Settings → Pages**, selecciona la rama `main` y la carpeta `/root`.
4. Tu sitio queda en `https://tu-usuario.github.io/jmsystems-web`.
5. Para editar después, usa el lápiz ✏️ junto a cada archivo en GitHub.

Ambas son 100% gratis, con HTTPS automático, sin tarjeta de crédito.

---

## 🔎 Para que te encuentren en Google

1. **Google Business Profile** (gratis): [business.google.com](https://business.google.com).
   Agrega "JMSystems", categoría "Servicio de reparación de computadoras",
   zona Medellín / Valle de Aburrá / Oriente antioqueño, y el link del sitio.
2. **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console),
   agrega la URL de tu sitio para que Google lo indexe más rápido.
3. Comparte el link en tus redes y en tu estado de WhatsApp.

---

## 🌐 Sobre el dominio propio

Cuando tengas presupuesto para un dominio como `jmsystems.com` o
`jmsystems.com.co`, tanto Netlify como GitHub Pages lo conectan fácilmente
sin cambiar nada del sitio. Mientras tanto, la dirección gratuita funciona
perfectamente y es indexable por Google sin ningún problema.

---

## ✅ Checklist antes de publicar

- [ ] Revisa el número de WhatsApp y redes en `js/data.js`.
- [ ] Revisa textos de servicios y precios de ejemplo del catálogo.
- [ ] Sube tus primeras fotos reales si ya las tienes (sección 4).
- [ ] Publica en Netlify o GitHub Pages.
- [ ] Regístrate en Google Business Profile.
