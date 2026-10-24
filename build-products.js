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
  catMap[p.category].products.push({ name: p.name, price: p.price || "Consultar", note: p.note || "", badge: p.badge || "", oldPrice: p.oldPrice || "", featured: p.featured === true, image: p.image || "",
    gallery: (Array.isArray(p.gallery) ? p.gallery : []).filter((g) => typeof g === "string" && g) });
});

const banners = readDir("banners").sort(byOrder).map((b) => ({
  id: b.__id, title: b.title, text: b.text || "", image: b.image || "", imageMobile: b.image_mobile || "",
  cta: b.cta || "Cotizar por WhatsApp", product: b.product || "", service: b.service || "",
  link: b.link || "", start: b.start || "", end: b.end || ""
}));

let site = {};
try { site = JSON.parse(fs.readFileSync(path.join(__dirname, "content", "sitio.json"), "utf8")); } catch (e) {}

const data = { services, categories: categories.filter((c) => c.products.length), site, banners };

const runtime = `
(function (C) {
  SITE_DATA.banners = C.banners || [];
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

const gallery = fs.readFileSync(path.join(__dirname, "gallery-src.js"), "utf8");
fs.writeFileSync(path.join(__dirname, "js", "products.js"),
  "/* Generado automáticamente por build-products.js. No editar a mano. */" + runtime + "\n" + gallery);
console.log("Servicios:", services.length, "| Categorías:", data.categories.length,
  "| Productos:", categories.reduce((n, c) => n + c.products.length, 0));

// ================== PÁGINAS REALES POR CATEGORÍA + SITEMAP (SEO) ==================
(function () {
  const SITE_URL = "https://jmsystemscolombia.netlify.app";
  const GA_ID = "G-P2WEY2T43B";
  const c = Object.assign(
    { whatsapp: "573105996075", whatsappDisplay: "+57 310 599 6075", city: "Medellín, Antioquia" },
    site.contact || {}
  );
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const url = (u) => (/^https?:/i.test(u) ? u : "/" + String(u || "").replace(/^\/+/, ""));
  const full = (u) => (u ? (/^https?:/i.test(u) ? u : SITE_URL + url(u)) : "");
  const wa = (m) => "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(m);
  const priceNum = (p) => { const n = parseInt(String(p || "").replace(/[^\d]/g, ""), 10); return n > 0 ? n : null; };
  const ld = (o) => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, "\\u003c") + "</script>";
  const city = String(c.city).split(",")[0];
  const logo = url(site.logo || "assets/img/logo.png");

  function page(cat) {
    const pageUrl = SITE_URL + "/catalogo/" + cat.id + "/";
    const title = cat.title + " en " + city + " | JMSYSTEMS";
    const desc = cat.title + (cat.subtitle ? " – " + cat.subtitle.toLowerCase() : "") +
      ". Precios de referencia y cotización directa por WhatsApp en " + c.city + ". Envíos a toda Colombia.";
    const img = full(cat.image || (cat.products[0] && cat.products[0].image) || site.logo || "assets/img/logo.png");

    const cards = cat.products.map((p) => {
      const msg = "Hola JMSYSTEMS, quiero cotizar: " + p.name + (priceNum(p.price) ? " (" + p.price + ")" : "");
      const price = priceNum(p.price)
        ? '<span class="product-price">' + esc(p.price) + "</span>"
        : '<span class="product-price consult">Precio a consultar</span>';
      const media = p.image
        ? '<div class="ref-media"><img src="' + esc(url(p.image)) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' : "";
      const note = p.note ? '<span class="product-note">' + esc(p.note) + "</span>" : "";
      return '<article class="product-card">' + media + '<div class="product-body"><h4>' + esc(p.name) + "</h4>" + note +
        '<div class="product-price-row">' + price +
        '<a class="product-wa-btn" href="' + esc(wa(msg)) + '" target="_blank" rel="noopener">Cotizar</a></div></div></article>';
    }).join("\n");

    const others = data.categories.filter((o) => o.id !== cat.id)
      .map((o) => '<a href="/catalogo/' + o.id + '/">' + esc(o.title) + "</a>").join("");

    const breadcrumb = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: cat.title, item: pageUrl }
      ]
    };
    const list = {
      "@context": "https://schema.org", "@type": "ItemList", name: cat.title,
      itemListElement: cat.products.map((p, i) => ({
        "@type": "ListItem", position: i + 1,
        item: Object.assign(
          { "@type": "Product", name: p.name, image: full(p.image) || undefined, description: p.note || undefined },
          priceNum(p.price)
            ? { offers: { "@type": "Offer", priceCurrency: "COP", price: String(priceNum(p.price)),
                availability: "https://schema.org/InStock", url: pageUrl } }
            : {}
        )
      }))
    };

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:locale" content="es_CO">
<link rel="icon" href="${esc(logo)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
${ld(breadcrumb)}
${ld(list)}
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
</head>
<body>
<header class="nav"><div class="container">
<a href="/" class="brand"><img src="${esc(logo)}" alt="Logo JMSYSTEMS"></a>
<div class="nav-links"><a href="/#servicios">Servicios</a><a href="/#catalogo">Catálogo</a><a href="/#nosotros">Nosotros</a><a href="/#contacto">Contacto</a></div>
<a class="nav-cta" href="${esc(wa("Hola JMSYSTEMS, quiero más información."))}" target="_blank" rel="noopener">Escríbenos</a>
</div></header>
<main id="top">
<section class="section"><div class="container">
<div class="catalog-breadcrumb"><a href="/#catalogo">← Catálogo</a> <span class="sep">/</span> <span>${esc(cat.title)}</span></div>
<div class="section-head">
<span class="eyebrow">${esc(cat.subtitle || "Catálogo")}</span>
<h1>${esc(cat.title)} en ${esc(city)}</h1>
<p>Elige la referencia que te interesa y escríbenos por WhatsApp para confirmar disponibilidad. Envíos a toda Colombia.</p>
</div>
<div class="products-grid">
${cards}
</div>
<div class="section-head" style="margin-top:48px"><h2>Otras categorías</h2></div>
<p style="display:flex;flex-wrap:wrap;gap:10px 22px">${others}</p>
<div class="catalog-note"><span>Los precios mostrados son de referencia y pueden variar según disponibilidad. Escríbenos por WhatsApp para confirmar el precio final y el tiempo de entrega.</span></div>
</div></section>
</main>
<footer><div class="container"><div class="footer-bottom">
<span>© ${new Date().getFullYear()} JMSYSTEMS. Todos los derechos reservados.</span>
<span>${esc(c.whatsappDisplay)} · ${esc(c.city)}</span>
</div></div></footer>
<script src="/js/tracking.js"></script>
</body>
</html>
`;
  }

  data.categories.forEach((cat) => {
    const dir = path.join(__dirname, "catalogo", cat.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), page(cat));
  });

  const today = new Date().toISOString().slice(0, 10);
  const urls = [SITE_URL + "/"].concat(data.categories.map((k) => SITE_URL + "/catalogo/" + k.id + "/"));
  fs.writeFileSync(
    path.join(__dirname, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map((u, i) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod><priority>" + (i ? "0.8" : "1.0") + "</priority></url>").join("\n") +
      "\n</urlset>\n"
  );
  console.log("Páginas de categoría:", data.categories.length);
})();

// ===== Enlaces a las categorías en el pie de página (rastreables por Google) =====
(function () {
  const file = path.join(__dirname, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const re = /<!-- CATEGORIAS-INICIO -->[\s\S]*?<!-- CATEGORIAS-FIN -->/;
  if (!re.test(html)) { console.warn("No se encontraron las marcas CATEGORIAS en index.html"); return; }
  const links = data.categories
    .map((k) => '            <li><a href="/catalogo/' + k.id + '/">' + k.title.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</a></li>")
    .join("\n");
  html = html.replace(re, () => "<!-- CATEGORIAS-INICIO -->\n" + links + "\n            <!-- CATEGORIAS-FIN -->");
  fs.writeFileSync(file, html);
  console.log("Enlaces de categorías en el pie:", data.categories.length);
})();

// ============ PÁGINAS DE SERVICIOS + PÁGINA CENTRAL /servicios/ + SITEMAP COMPLETO ============
(function () {
  const SITE_URL = "https://jmsystemscolombia.netlify.app";
  const GA_ID = "G-P2WEY2T43B";
  const HORARIO = "Lunes a viernes, de 8:00 a. m. a 5:00 p. m.";
  const c = Object.assign({ whatsapp: "573105996075", whatsappDisplay: "+57 310 599 6075", city: "Medellín, Antioquia" }, site.contact || {});
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const abs = (u) => (/^https?:/i.test(u) ? u : "/" + String(u || "").replace(/^\/+/, ""));
  const full = (u) => (u ? (/^https?:/i.test(u) ? u : SITE_URL + encodeURI(abs(u))) : "");
  const slug = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const wa = (m) => "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(m);
  const ld = (o) => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, "\\u003c") + "</script>";
  const city = String(c.city).split(",")[0];
  const logo = abs(site.logo || "assets/img/logo.png");
  const list = services.map((s) => Object.assign({}, s, { slug: slug(s.title) }));
  const hours = [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }];
  const provider = { "@type": "LocalBusiness", name: "JMSYSTEMS", telephone: "+" + c.whatsapp, url: SITE_URL + "/", openingHoursSpecification: hours };

  const shell = (o) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${o.canon}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${o.canon}">
<meta property="og:image" content="${esc(o.image || full(logo))}">
<meta property="og:locale" content="es_CO">
<link rel="icon" href="${esc(logo)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
${o.jsonld.map(ld).join("\n")}
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
</head>
<body>
<header class="nav"><div class="container">
<a href="/" class="brand"><img src="${esc(logo)}" alt="Logo JMSYSTEMS"></a>
<div class="nav-links"><a href="/servicios/">Servicios</a><a href="/#catalogo">Catálogo</a><a href="/#nosotros">Nosotros</a><a href="/#contacto">Contacto</a></div>
<a class="nav-cta" href="${esc(wa("Hola JMSYSTEMS, quiero más información."))}" target="_blank" rel="noopener">Escríbenos</a>
</div></header>
<main id="top">
<section class="section"><div class="container">
${o.body}
</div></section>
</main>
<footer><div class="container"><div class="footer-bottom">
<span>© ${new Date().getFullYear()} JMSYSTEMS. Todos los derechos reservados.</span>
<span>${esc(c.whatsappDisplay)} · ${esc(c.city)}</span>
</div></div></footer>
<script src="/js/tracking.js"></script>
</body>
</html>
`;

  const crumbs = (items) => ({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it[0], item: it[1] }))
  });

  function servicePage(s) {
    const canon = SITE_URL + "/servicios/" + s.slug + "/";
    const title = s.title + " en " + city + " | JMSYSTEMS";
    const desc = s.title + " en " + c.city + ", el Valle de Aburrá y el Oriente antioqueño. " + (s.desc || "") + " Cotiza por WhatsApp.";
    const img = full(s.image);
    const others = list.filter((o) => o.slug !== s.slug)
      .map((o) => '<a href="/servicios/' + o.slug + '/">' + esc(o.title) + "</a>").join("");
    const body = `<div class="catalog-breadcrumb"><a href="/servicios/">← Servicios</a> <span class="sep">/</span> <span>${esc(s.title)}</span></div>
<div class="section-head">
<span class="eyebrow">${esc(s.category)}</span>
<h1>${esc(s.title)} en ${esc(city)}</h1>
<p>${esc(s.desc)}</p>
</div>
${s.image ? '<p><img src="' + esc(abs(s.image)) + '" alt="' + esc(s.title) + '" style="max-width:100%;width:560px;border-radius:16px" loading="lazy"></p>' : ""}
<h2>Cómo te atendemos</h2>
<ul>
<li>A domicilio en ${esc(city)} y el Valle de Aburrá.</li>
<li>En el Oriente antioqueño, el servicio se agenda con anticipación.</li>
<li>Horario: ${HORARIO}</li>
</ul>
<p style="display:flex;flex-wrap:wrap;gap:12px;margin:24px 0">
<a class="btn btn-primary" href="${esc(wa("Hola JMSYSTEMS, quiero cotizar: " + s.title))}" target="_blank" rel="noopener">Cotizar por WhatsApp</a>
<a class="btn btn-outline" href="/#catalogo">Ver catálogo</a>
</p>
<h2>Otros servicios</h2>
<p style="display:flex;flex-wrap:wrap;gap:10px 22px">${others}</p>`;
    return shell({
      title, desc, canon, image: img, body,
      jsonld: [
        crumbs([["Inicio", SITE_URL + "/"], ["Servicios", SITE_URL + "/servicios/"], [s.title, canon]]),
        { "@context": "https://schema.org", "@type": "Service", name: s.title, serviceType: s.title,
          description: s.desc || undefined, image: img || undefined,
          areaServed: ["Medellín", "Valle de Aburrá", "Oriente antioqueño"], provider }
      ]
    });
  }

  function hubPage() {
    const canon = SITE_URL + "/servicios/";
    const cats = [...new Set(list.map((s) => s.category))];
    const body = `<div class="section-head">
<span class="eyebrow">Qué hacemos</span>
<h1>Servicios técnicos en ${esc(city)} y el Valle de Aburrá</h1>
<p>Soporte, mantenimiento, redes y seguridad electrónica a domicilio. En el Oriente antioqueño, servicio agendado. ${HORARIO}</p>
</div>
${cats.map((cat) => "<h2>" + esc(cat) + "</h2><ul>" +
  list.filter((s) => s.category === cat)
    .map((s) => '<li><a href="/servicios/' + s.slug + '/">' + esc(s.title) + "</a> — " + esc(s.desc) + "</li>").join("") + "</ul>").join("\n")}
<p style="margin-top:28px"><a class="btn btn-primary" href="${esc(wa("Hola JMSYSTEMS, necesito soporte técnico."))}" target="_blank" rel="noopener">Escribir por WhatsApp</a></p>`;
    return shell({
      title: "Servicios técnicos en " + city + " | JMSYSTEMS",
      desc: "Soporte técnico, mantenimiento de computadores, redes y cámaras de seguridad a domicilio en " + c.city + " y el Valle de Aburrá. Oriente antioqueño con servicio agendado.",
      canon, body,
      jsonld: [crumbs([["Inicio", SITE_URL + "/"], ["Servicios", canon]])]
    });
  }

  fs.mkdirSync(path.join(__dirname, "servicios"), { recursive: true });
  fs.writeFileSync(path.join(__dirname, "servicios", "index.html"), hubPage());
  list.forEach((s) => {
    const dir = path.join(__dirname, "servicios", s.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), servicePage(s));
  });

  // Sitemap completo (reemplaza al que generó el bloque anterior)
  const today = new Date().toISOString().slice(0, 10);
  const urls = [SITE_URL + "/", SITE_URL + "/servicios/"]
    .concat(list.map((s) => SITE_URL + "/servicios/" + s.slug + "/"))
    .concat(data.categories.map((k) => SITE_URL + "/catalogo/" + k.id + "/"));
  fs.writeFileSync(
    path.join(__dirname, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map((u, i) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod><priority>" + (i === 0 ? "1.0" : "0.8") + "</priority></url>").join("\n") +
      "\n</urlset>\n"
  );
  console.log("Páginas de servicio:", list.length);
})();

// ===== Preguntas frecuentes (HTML + datos para Google) =====
(function () {
  const file = path.join(__dirname, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const re = /<!-- FAQ-INICIO -->[\s\S]*?<!-- FAQ-FIN -->/;
  if (!re.test(html)) { console.warn("No se encontraron las marcas FAQ en index.html"); return; }
  let items = [];
  try { items = JSON.parse(fs.readFileSync(path.join(__dirname, "content", "faq.json"), "utf8")).items || []; } catch (e) {}
  items = items.filter((i) => i && i.question && i.answer);
  if (!items.length) { console.warn("No hay preguntas en content/faq.json"); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const list = items.map((i) =>
    '        <details class="faq-item"><summary>' + esc(i.question) + "</summary><p>" + esc(i.answer) + "</p></details>"
  ).join("\n");
  const ld = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } }))
  };
  const block = "<!-- FAQ-INICIO -->\n" + '        <div class="faq-list">\n' + list + "\n        </div>\n" +
    '        <script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, "\\u003c") + "</script>\n        <!-- FAQ-FIN -->";
  html = html.replace(re, () => block);
  fs.writeFileSync(file, html);
  console.log("Preguntas frecuentes:", items.length);
})();