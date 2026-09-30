// Netlify ejecuta este archivo en cada publicación.
// Lee content/* (creado desde /admin) y genera js/products.js
const fs = require("fs");
const path = require("path");

function readDir(name) {
  const dir = path.join(__dirname, "content", name);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => {
    try {
      const o = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      o.__id = f.replace(/\.json$/, "");
      return o;
    } catch (e) { console.warn("Archivo inválido, se omite:", name, f, e.message); return null; }
  }).filter((o) => o && o.published !== false);
}
const label = (o) => String(o.title || o.name || "");
const byOrder = (a, b) => ((a.order ?? 100) - (b.order ?? 100)) || label(a).localeCompare(label(b), "es");

// Ilustración / ícono de respaldo para servicios sin imagen
const FALLBACK = {
  "Soporte y mantenimiento": ["maintenance", "wrench"], "Redes y conectividad": ["network", "network"],
  "Seguridad electrónica": ["cctv", "camera"], "Venta y asesoría": ["shop-accesorios", "shop"]
};

const services = readDir("servicios").sort(byOrder).map((s) => {
  const fb = FALLBACK[s.category] || FALLBACK["Soporte y mantenimiento"];
  return { id: s.__id, category: s.category, tag: s.tag || s.category, scene: fb[0], icon: fb[1],
           title: s.title, desc: s.desc || "", image: s.image || "" };
});

const categories = readDir("categorias").sort(byOrder).map((c) => ({
  id: c.__id, title: c.title, subtitle: c.subtitle || "", image: c.image || "", products: []
}));
const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));

readDir("productos").sort(byOrder).forEach((p) => {
  if (!p.name || !catMap[p.category]) return;
  catMap[p.category].products.push({ name: p.name, price: p.price || "Consultar", note: p.note || "", image: p.image || "" });
});

let site = {};
try { site = JSON.parse(fs.readFileSync(path.join(__dirname, "content", "sitio.json"), "utf8")); } catch (e) {}

const data = { services, categories: categories.filter((c) => c.products.length), site };

const runtime = `
(function (C) {
  if (C.services.length) SITE_DATA.services = C.services;
  if (C.categories.length) SITE_DATA.productCategories = C.categories;
  var s = C.site || {}, h = s.hero || {};
  if (s.contact) Object.keys(s.contact).forEach(function (k) { if (s.contact[k] !== undefined && s.contact[k] !== null) SITE_DATA.contact[k] = s.contact[k]; });
  function $(sel) { return document.querySelector(sel); }
  function esc(t) { var d = document.createElement("div"); d.textContent = t || ""; return d.innerHTML; }
  try {
    if (s.logo) {
      document.querySelectorAll('img[src="assets/img/logo.png"]').forEach(function (i) { i.src = s.logo; });
      var ic = $('link[rel="icon"]'); if (ic) ic.href = s.logo;
    }
    if (h.eyebrow && $(".hero .eyebrow")) $(".hero .eyebrow").textContent = h.eyebrow;
    if ((h.title1 || h.title2) && $(".hero h1")) $(".hero h1").innerHTML = esc(h.title1) + '<br><span class="accent">' + esc(h.title2) + "</span>";
    if (h.lede && $(".hero .lede")) $(".hero .lede").textContent = h.lede;
    if (h.image && $(".hero-photo img")) $(".hero-photo img").src = h.image;
    if (h.badge && $(".hero-badge span:last-child")) $(".hero-badge span:last-child").textContent = h.badge;
    if (s.coverage_map && $(".coverage-map img")) $(".coverage-map img").src = s.coverage_map;
  } catch (e) { console.warn(e); }
})(${JSON.stringify(data)});
`;

fs.writeFileSync(path.join(__dirname, "js", "products.js"),
  "/* Generado automáticamente por build-products.js. No editar a mano. */" + runtime);
console.log("Servicios:", services.length, "| Categorías:", data.categories.length,
  "| Productos:", categories.reduce((n, c) => n + c.products.length, 0));
