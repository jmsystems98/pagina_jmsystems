/* ============================================================
   JMSYSTEMS — main.js (v2)
   No suele ser necesario editar este archivo.
   Para cambiar contenido, edita js/data.js
   ============================================================ */

(function () {
  "use strict";

  const SCENES = {
    "maintenance": `<rect x="24" y="120" width="192" height="6" rx="3" fill="#dde6f2"/> <rect x="68" y="58" width="84" height="54" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="58" y="112" width="104" height="8" rx="3" fill="#145DA0"/> <circle cx="108" cy="86" r="15" fill="none" stroke="#17ABE3" stroke-width="4"/> <path d="M108 71v6M108 96v6M93 86h6M117 86h6M97 75l4 4M115 93l4 4M115 75l-4 4M97 93l-4 4" stroke="#17ABE3" stroke-width="3" stroke-linecap="round"/> <path d="M170 38l16 16-54 54-20 4 4-20z" fill="#b8ecfb" stroke="#145DA0" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`,
    "remote": `<circle cx="92" cy="58" r="17" fill="#145DA0"/> <path d="M64 128c0-24 12-40 28-40s28 16 28 40" fill="#17ABE3"/> <path d="M72 50a20 20 0 0 1 40 0" fill="none" stroke="#0d3e73" stroke-width="4" stroke-linecap="round"/> <rect x="66" y="48" width="8" height="16" rx="4" fill="#0d3e73"/> <rect x="110" y="48" width="8" height="16" rx="4" fill="#0d3e73"/> <rect x="150" y="66" width="66" height="48" rx="8" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <path d="M162 88h14M180 80h20M162 98h26" stroke="#17ABE3" stroke-width="4" stroke-linecap="round"/> <path d="M140 70a26 26 0 0 1 0 40" fill="none" stroke="#b8ecfb" stroke-width="4" stroke-linecap="round"/>`,
    "repair": `<rect x="70" y="42" width="70" height="92" rx="8" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <circle cx="105" cy="60" r="6" fill="#17ABE3"/> <rect x="82" y="78" width="46" height="8" rx="3" fill="#dde6f2"/> <rect x="82" y="94" width="30" height="8" rx="3" fill="#dde6f2"/> <path d="M150 46l18 18-50 50-22 4 4-22z" fill="#b8ecfb" stroke="#145DA0" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/> <circle cx="182" cy="112" r="16" fill="none" stroke="#17ABE3" stroke-width="4"/> <path d="M182 96v6M182 122v6M166 112h6M192 112h6" stroke="#17ABE3" stroke-width="3" stroke-linecap="round"/>`,
    "format": `<rect x="70" y="46" width="100" height="66" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="55" y="112" width="130" height="8" rx="3" fill="#145DA0"/> <rect x="86" y="70" width="68" height="10" rx="5" fill="#e6f7fd"/> <rect x="86" y="70" width="40" height="10" rx="5" fill="#17ABE3"/> <circle cx="120" cy="92" r="10" fill="none" stroke="#17ABE3" stroke-width="3"/> <path d="M120 84v4M120 96v4M114 90h-2M128 90h-2" stroke="#17ABE3" stroke-width="2.5" stroke-linecap="round"/>`,
    "upgrade": `<rect x="60" y="70" width="120" height="42" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="72" y="82" width="14" height="18" rx="2" fill="#dde6f2"/> <rect x="92" y="82" width="14" height="18" rx="2" fill="#dde6f2"/> <rect x="112" y="82" width="50" height="18" rx="3" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <path d="M182 50v34" stroke="#145DA0" stroke-width="4" stroke-linecap="round"/> <path d="M170 62l12-12 12 12" fill="none" stroke="#17ABE3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    "software": `<rect x="66" y="40" width="90" height="60" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <path d="M111 54v28" stroke="#17ABE3" stroke-width="4" stroke-linecap="round"/> <path d="M98 72l13 13 13-13" fill="none" stroke="#17ABE3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> <rect x="90" y="106" width="42" height="8" rx="3" fill="#145DA0"/> <rect x="168" y="90" width="34" height="26" rx="4" fill="#b8ecfb" stroke="#145DA0" stroke-width="3"/> <path d="M168 96h34" stroke="#145DA0" stroke-width="2"/>`,
    "printer": `<rect x="70" y="70" width="90" height="46" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="86" y="46" width="58" height="28" rx="3" fill="#e6f7fd" stroke="#17ABE3" stroke-width="3"/> <rect x="86" y="112" width="58" height="30" rx="2" fill="#ffffff" stroke="#145DA0" stroke-width="3"/> <circle cx="148" cy="84" r="4" fill="#17ABE3"/> <path d="M176 70a24 24 0 0 1 0 40" fill="none" stroke="#b8ecfb" stroke-width="4" stroke-linecap="round"/> <path d="M188 62a38 38 0 0 1 0 56" fill="none" stroke="#b8ecfb" stroke-width="4" stroke-linecap="round"/>`,
    "network": `<circle cx="120" cy="46" r="10" fill="#145DA0"/> <circle cx="72" cy="110" r="10" fill="#17ABE3"/> <circle cx="168" cy="110" r="10" fill="#17ABE3"/> <path d="M120 56v18M120 74 78 104M120 74l42 30" stroke="#dde6f2" stroke-width="4" fill="none" stroke-linecap="round"/> <circle cx="120" cy="74" r="7" fill="#0d3e73"/>`,
    "cabling": `<rect x="60" y="56" width="120" height="20" rx="4" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <circle cx="76" cy="66" r="4" fill="#17ABE3"/><circle cx="96" cy="66" r="4" fill="#17ABE3"/> <circle cx="116" cy="66" r="4" fill="#17ABE3"/><circle cx="136" cy="66" r="4" fill="#17ABE3"/> <circle cx="156" cy="66" r="4" fill="#17ABE3"/> <path d="M76 76v20M96 76v34M116 76v20M136 76v34M156 76v20" stroke="#dde6f2" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    "router": `<rect x="66" y="80" width="108" height="30" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <circle cx="82" cy="95" r="4" fill="#17ABE3"/><circle cx="96" cy="95" r="4" fill="#b8ecfb"/> <path d="M120 80V64M140 80V64M160 80V64" stroke="#145DA0" stroke-width="4" stroke-linecap="round"/> <path d="M110 60a12 12 0 0 1 20 0M130 60a12 12 0 0 1 20 0M150 60a12 12 0 0 1 20 0" fill="none" stroke="#b8ecfb" stroke-width="3" stroke-linecap="round"/>`,
    "wifi": `<path d="M60 92a72 50 0 0 1 120 0" fill="none" stroke="#dde6f2" stroke-width="6" stroke-linecap="round"/> <path d="M78 104a48 34 0 0 1 84 0" fill="none" stroke="#17ABE3" stroke-width="6" stroke-linecap="round"/> <path d="M96 116a24 17 0 0 1 48 0" fill="none" stroke="#145DA0" stroke-width="6" stroke-linecap="round"/> <circle cx="120" cy="128" r="8" fill="#0d3e73"/>`,
    "rack": `<rect x="82" y="34" width="76" height="100" rx="4" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="92" y="46" width="56" height="12" rx="2" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <rect x="92" y="64" width="56" height="12" rx="2" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <rect x="92" y="82" width="56" height="12" rx="2" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <rect x="92" y="100" width="56" height="12" rx="2" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <circle cx="140" cy="52" r="2.4" fill="#17ABE3"/><circle cx="140" cy="70" r="2.4" fill="#17ABE3"/> <circle cx="140" cy="88" r="2.4" fill="#17ABE3"/><circle cx="140" cy="106" r="2.4" fill="#17ABE3"/>`,
    "cctv": `<rect x="40" y="40" width="10" height="70" rx="3" fill="#dde6f2"/> <path d="M50 56h60l30 18-30 18H50z" fill="#ffffff" stroke="#145DA0" stroke-width="4" stroke-linejoin="round"/> <circle cx="118" cy="74" r="9" fill="#17ABE3"/> <circle cx="118" cy="74" r="4" fill="#0d3e73"/> <path d="M160 60a30 20 0 0 1 0 28" fill="none" stroke="#b8ecfb" stroke-width="4" stroke-linecap="round"/> <path d="M172 50a48 32 0 0 1 0 48" fill="none" stroke="#b8ecfb" stroke-width="4" stroke-linecap="round"/>`,
    "cctv-remote": `<rect x="146" y="34" width="52" height="92" rx="10" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="154" y="48" width="36" height="56" rx="3" fill="#e6f7fd"/> <circle cx="172" cy="114" r="3" fill="#145DA0"/> <path d="M154 66l14 14 22-22" fill="none" stroke="#17ABE3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> <circle cx="70" cy="70" r="14" fill="none" stroke="#145DA0" stroke-width="4"/> <circle cx="70" cy="70" r="5" fill="#17ABE3"/> <path d="M92 70c14 6 24 18 26 30" fill="none" stroke="#dde6f2" stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/>`,
    "shop-equipos": `<rect x="52" y="52" width="70" height="48" rx="5" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="40" y="100" width="94" height="8" rx="3" fill="#145DA0"/> <rect x="150" y="60" width="46" height="60" rx="6" fill="#ffffff" stroke="#17ABE3" stroke-width="4"/> <rect x="158" y="70" width="30" height="34" rx="2" fill="#e6f7fd"/> <circle cx="173" cy="112" r="3" fill="#17ABE3"/> <circle cx="200" cy="46" r="14" fill="#b8ecfb"/> <path d="M194 46h12M200 40v12" stroke="#0d3e73" stroke-width="3" stroke-linecap="round"/>`,
    "shop-accesorios": `<path d="M70 66h80l-8 60a8 8 0 0 1-8 7H86a8 8 0 0 1-8-7z" fill="#ffffff" stroke="#145DA0" stroke-width="4" stroke-linejoin="round"/> <path d="M84 66v-8a26 26 0 0 1 52 0v8" fill="none" stroke="#17ABE3" stroke-width="4"/> <rect x="90" y="86" width="26" height="16" rx="3" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/> <circle cx="140" cy="94" r="10" fill="#e6f7fd" stroke="#17ABE3" stroke-width="2"/>`,
    "advice": `<circle cx="118" cy="70" r="30" fill="none" stroke="#145DA0" stroke-width="4"/> <path d="M118 46v-10M118 46a18 18 0 0 0-10 32c2 2 3 4 3 7h14c0-3 1-5 3-7a18 18 0 0 0-10-32z" fill="#e6f7fd" stroke="#17ABE3" stroke-width="3"/> <rect x="108" y="94" width="20" height="8" rx="2" fill="#145DA0"/> <path d="M60 130c0-20 10-32 22-32s22 12 22 32" fill="#b8ecfb"/> <path d="M136 130c0-20 10-32 22-32s22 12 22 32" fill="#b8ecfb"/>`,
    "business": `<rect x="66" y="66" width="108" height="56" rx="6" fill="#ffffff" stroke="#145DA0" stroke-width="4"/> <rect x="100" y="52" width="40" height="18" rx="4" fill="none" stroke="#145DA0" stroke-width="4"/> <rect x="66" y="88" width="108" height="4" fill="#dde6f2"/> <path d="M118 78l10 18h-20z" fill="#17ABE3"/> <circle cx="150" cy="102" r="8" fill="none" stroke="#17ABE3" stroke-width="3"/> <path d="M150 96v6l4 4" stroke="#17ABE3" stroke-width="2.5" stroke-linecap="round"/>`,
  };

  const ICONS = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l1.7 1.7 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.2 2.2 1.5 1.5 2.2-2.2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/>',
    network: '<circle cx="12" cy="5" r="2.2" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="5" cy="19" r="2.2" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="19" cy="19" r="2.2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 7.2V12M12 12 6.3 17M12 12l5.7 5" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    camera: '<rect x="3" y="7" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M17 10l4-2.4v9.8L17 15" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><circle cx="10" cy="12.5" r="2.6" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    shop: '<path d="M4 9l1.2-4.5h13.6L20 9M4 9h16M4 9v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M9 13a3 3 0 0 0 6 0" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><rect x="9.5" y="9.5" width="5" height="5" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M6 3v3M18 3v3M6 18v3M18 18v3" stroke="currentColor" stroke-width="1.4"/>',
    chip: '<rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M9.5 9.5v5M12 9.5l-2.5 2.5M14.5 9.5v3l-2 2" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" stroke="currentColor" stroke-width="1.4"/>',
    mouse: '<rect x="7" y="3" width="10" height="18" rx="5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 3v6" stroke="currentColor" stroke-width="1.6"/>',
    keyboard: '<rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M6.5 9.5h.01M9.5 9.5h.01M12.5 9.5h.01M15.5 9.5h.01M6.5 12.5h.01M9.5 12.5h.01M12.5 12.5h.01M15.5 12.5h.01M8 15.5h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    headphone: '<path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    cable: '<path d="M6 3v5a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="6" cy="3" r="1.6" fill="currentColor"/><circle cx="18" cy="21" r="1.6" fill="currentColor"/>',
    battery: '<rect x="2.5" y="8" width="16" height="8" rx="1.6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M21 10.5v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 5l-2 4h3l-2 4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/>',
    wifi: '<path d="M4 9.5a12 12 0 0 1 16 0M7 13a8 8 0 0 1 10 0M10.2 16.4a4 4 0 0 1 3.6 0" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="12" cy="19" r="1.3" fill="currentColor"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>',
    watch: '<rect x="7.5" y="7" width="9" height="10" rx="2.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M9.5 7V4.5h5V7M9.5 17v2.5h5V17" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 10.5V12l1.4 1" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
    check: '<path d="M4 12l5.5 5.5L20 6.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    info: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 11v5.5M12 7.6v.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    whatsapp: '<path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.2A8.5 8.5 0 1 0 12 3.5z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8.3 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.5 1.5.3.1.5.1.6-.1.2-.2.6-.7.8-1 .2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.3.1.2.1.9-.2 1.5-.3.7-1.6 1.3-2.2 1.4-.6.1-1.2.2-3.9-1s-4.2-3.9-4.4-4.2c-.2-.3-1.1-1.6-1.1-3 0-1.4.7-2.1 1-2.4z" fill="currentColor"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/>',
    facebook: '<path d="M14 21v-7h2.4l.4-3H14V9c0-.9.2-1.5 1.6-1.5H17V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.8v7h3.2z" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${ICONS[name] || ICONS.chip}</svg>`;
  }

  const waNumber = SITE_DATA.contact.whatsapp;
  function waLink(message) {
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  }
  function waBtn(message, extraClass, label) {
    return `<a class="${extraClass}" href="${waLink(message)}" target="_blank" rel="noopener">${icon("whatsapp")} ${label}</a>`;
  }

  function sceneArt(key) {
    return `<svg class="scene" viewBox="0 0 240 160" fill="none" aria-hidden="true">${SCENES[key] || SCENES.maintenance}</svg>`;
  }

  /* ---------- Media (imagen o ilustración de referencia) ---------- */
  function refMedia(item, tag) {
    let media, tint = "";
    if (item.image) {
      media = `<img src="${item.image}" alt="${item.name || item.title}" loading="lazy">`;
      tint = `<span class="ref-tint"></span>`;
    } else if (item.scene) {
      media = sceneArt(item.scene);
    } else {
      media = icon(item.icon);
    }
    return `<div class="ref-media">${tag ? `<span class="ref-tag">${tag}</span>` : ""}${media}${tint}</div>`;
  }

  /* ---------- SERVICIOS ---------- */
  function renderServiceTabs() {
    const wrap = document.getElementById("service-tabs");
    const titles = ["Todos", ...SITE_DATA.serviceCategories];
    wrap.innerHTML = titles
      .map((t, i) => `<button class="cat-tab${i === 0 ? " active" : ""}" data-cat="${t}">${t}</button>`)
      .join("");
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-tab");
      if (!btn) return;
      wrap.querySelectorAll(".cat-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderServices(btn.dataset.cat);
    });
  }

  function renderServices(filter) {
    const wrap = document.getElementById("services-grid");
    const list = SITE_DATA.services.filter((s) => filter === "Todos" || s.category === filter);
    wrap.innerHTML = list
      .map((s) => {
        const msg = `Hola JMSystems, quiero cotizar: ${s.title}`;
        return `
        <article class="service-card reveal">
          ${refMedia(s, s.tag)}
          <div class="service-body">
            <h3>${s.title}</h3>
            <p class="desc">${s.desc || ""}</p>
            ${waBtn(msg, "service-wa-btn", "Cotizar por WhatsApp")}
          </div>
        </article>`;
      })
      .join("");
    observeReveals();
  }

  /* ---------- CATALOGO: nivel 1 (categorías) ---------- */
  function renderCategoryGrid() {
    const wrap = document.getElementById("categories-grid");
    wrap.innerHTML = SITE_DATA.productCategories
      .map(
        (cat) => `
      <button class="category-card reveal" data-open-cat="${cat.id}">
        ${refMedia(cat, `${cat.products.length} referencias`)}
        <div class="category-body">
          <h3>${cat.title}</h3>
          <p class="subtitle">${cat.subtitle || ""}</p>
          <span class="category-cta">Ver productos ${icon("arrow")}</span>
        </div>
      </button>`
      )
      .join("");
    observeReveals();
  }

  /* ---------- CATALOGO: nivel 2 (productos de una categoría) ---------- */
  function renderProductList(catId) {
    const cat = SITE_DATA.productCategories.find((c) => c.id === catId);
    const gridWrap = document.getElementById("catalog-categories");
    const detailWrap = document.getElementById("catalog-detail");
    if (!cat) {
      gridWrap.hidden = false;
      detailWrap.hidden = true;
      return;
    }
    gridWrap.hidden = true;
    detailWrap.hidden = false;

    document.getElementById("catalog-breadcrumb").innerHTML = `
      <button data-back-to-categories>${icon("back")} Catálogo</button>
      <span class="sep">/</span>
      <span>${cat.title}</span>
    `;

    document.getElementById("catalog-detail-head").innerHTML = `
      <span class="eyebrow">${cat.subtitle || "Catálogo"}</span>
      <h2>${cat.title}</h2>
      <p>Elige la referencia que te interesa y escríbenos por WhatsApp para confirmar disponibilidad.</p>
    `;

    document.getElementById("products-grid").innerHTML = cat.products
      .map((p) => {
        const msg = `Hola JMSystems, quiero cotizar: ${p.name}${p.price && p.price !== "Consultar" ? " (" + p.price + ")" : ""}`;
        const priceHtml =
          p.price === "Consultar"
            ? `<span class="product-price consult">Precio a consultar</span>`
            : `<span class="product-price">${p.price}</span>`;
        return `
        <article class="product-card reveal">
          ${refMedia({ icon: cat.icon, image: p.image, name: p.name }, null)}
          <div class="product-body">
            <h4>${p.name}</h4>
            ${p.note ? `<span class="product-note">${p.note}</span>` : ""}
            <div class="product-price-row">
              ${priceHtml}
              ${waBtn(msg, "product-wa-btn", "Cotizar")}
            </div>
          </div>
        </article>`;
      })
      .join("");

    observeReveals();
  }

  function initCatalogNav() {
    document.getElementById("categories-grid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-cat]");
      if (!btn) return;
      location.hash = `#/catalogo/${btn.dataset.openCat}`;
    });
    document.getElementById("catalog-detail").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-back-to-categories]");
      if (!btn) return;
      location.hash = "#/catalogo";
    });
  }

  function handleRoute() {
    const hash = location.hash || "";
    const match = hash.match(/^#\/catalogo\/([a-z0-9-]+)/i);
    if (match) {
      renderProductList(match[1]);
      const el = document.getElementById("catalogo");
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      document.getElementById("catalog-categories").hidden = false;
      document.getElementById("catalog-detail").hidden = true;
    }
  }

  /* ---------- CONTACTO ---------- */
  function renderContact() {
    const c = SITE_DATA.contact;
    document.getElementById("contact-methods").innerHTML = `
      <a class="contact-method" href="${waLink('Hola JMSystems, quiero más información.')}" target="_blank" rel="noopener">
        <span class="ic">${icon("whatsapp")}</span>
        <span><span class="label">WHATSAPP</span><br><span class="value">${c.whatsappDisplay}</span></span>
      </a>
      <a class="contact-method" href="${c.instagram}" target="_blank" rel="noopener">
        <span class="ic">${icon("instagram")}</span>
        <span><span class="label">INSTAGRAM</span><br><span class="value">${c.instagramHandle}</span></span>
      </a>
      <a class="contact-method" href="${c.facebook}" target="_blank" rel="noopener">
        <span class="ic">${icon("facebook")}</span>
        <span><span class="label">FACEBOOK</span><br><span class="value">${c.facebookHandle}</span></span>
      </a>
      ${c.email ? `
      <a class="contact-method" href="mailto:${c.email}">
        <span class="ic">${icon("mail")}</span>
        <span><span class="label">CORREO</span><br><span class="value">${c.email}</span></span>
      </a>` : ""}
    `;
    document.querySelectorAll("[data-coverage]").forEach((el) => (el.textContent = c.coverage));
    document.querySelectorAll("[data-city]").forEach((el) => (el.textContent = c.city));
    document.querySelectorAll("[data-wa-link]").forEach((el) => {
      el.href = waLink(el.dataset.waLink || "Hola JMSystems, quiero más información.");
    });
    document.querySelectorAll("[data-wa-display]").forEach((el) => (el.textContent = c.whatsappDisplay));
    document.querySelectorAll("[data-instagram-link]").forEach((el) => (el.href = c.instagram));
    document.querySelectorAll("[data-facebook-link]").forEach((el) => (el.href = c.facebook));
  }

  /* ---------- Nav móvil ---------- */
  function initNav() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));
  }

  /* ---------- Reveal on scroll ---------- */
  let observer;
  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
    }
    items.forEach((i) => observer.observe(i));
  }

  /* ---------- Circuit spine ---------- */
  function initSpine() {
    const fill = document.getElementById("spine-fill");
    const vias = document.querySelectorAll(".circuit-spine .via");
    const sections = Array.from(document.querySelectorAll("[data-spine-section]"));
    if (!fill) return;
    function update() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      fill.style.strokeDashoffset = String(1 - Math.min(Math.max(scrolled, 0), 1));
      let activeIdx = 0;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5) activeIdx = i;
      });
      vias.forEach((v, i) => v.classList.toggle("active", i <= activeIdx));
    }
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderServiceTabs();
    renderServices("Todos");
    renderCategoryGrid();
    initCatalogNav();
    renderContact();
    initNav();
    initSpine();
    initYear();
    window.addEventListener("hashchange", handleRoute);
    handleRoute();
    observeReveals();
  });
})();
