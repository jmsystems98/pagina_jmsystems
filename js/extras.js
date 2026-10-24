/* Ofertas, destacados, buscador del catálogo y cotizador rápido */
(function () {
  if (typeof SITE_DATA === "undefined") return;
  var cats = SITE_DATA.productCategories || [];
  var wa = (SITE_DATA.contact && SITE_DATA.contact.whatsapp) || "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  function track(name, params) { if (typeof gtag === "function") gtag("event", name, params || {}); }

  var st = document.createElement("style");
  st.textContent =
    ".pg-badge{position:absolute;top:12px;left:12px;z-index:2;padding:5px 11px;border-radius:100px;font:600 11.5px/1 'JetBrains Mono',monospace;letter-spacing:.04em;text-transform:uppercase;color:#fff;background:#145DA0;box-shadow:0 2px 6px rgba(0,0,0,.18)}" +
    ".pg-b-oferta{background:#e5484d}.pg-b-nuevo{background:#17ABE3}.pg-b-ultimas-unidades{background:#e08a00}" +
    ".pg-old{margin-right:7px;font-size:12px;font-weight:400;color:#8492ab;text-decoration:line-through}" +
    ".pg-cardlink{display:block}.product-body h4 a:hover{color:#145DA0}" +
    ".pg-search{margin:-18px 0 34px}" +
    ".pg-search input{width:100%;max-width:520px;padding:14px 18px;border:1px solid var(--panel-border);border-radius:100px;background:#fff;font:15px var(--font-body);color:var(--text)}" +
    ".pg-search input:focus{outline:2px solid var(--cyan);outline-offset:2px}" +
    ".pg-count{margin:16px 0;color:var(--text-dim);font-size:14.5px}.pg-count a{color:var(--blue);font-weight:600;text-decoration:underline}" +
    ".quote-form{max-width:760px;display:grid;gap:16px;background:#fff;border:1px solid var(--panel-border);border-radius:var(--radius-lg);padding:32px;box-shadow:var(--shadow-card)}" +
    ".qf-row{display:grid;gap:16px}@media(min-width:640px){.qf-row{grid-template-columns:1fr 1fr}}" +
    ".quote-form label{display:grid;gap:6px;font-size:13.5px;font-weight:600;color:var(--text)}" +
    ".quote-form select,.quote-form input,.quote-form textarea{padding:12px 14px;border:1px solid var(--panel-border);border-radius:10px;background:#fff;font:15px var(--font-body);color:var(--text);width:100%}" +
    ".quote-form select:focus,.quote-form input:focus,.quote-form textarea:focus{outline:2px solid var(--cyan);outline-offset:1px}" +
    ".qf-note{background:var(--cyan-tint);border:1px dashed var(--panel-border);border-radius:10px;padding:12px 14px;font-size:13.5px;color:var(--text-dim)}" +
    ".quote-form button{justify-self:start;border:0;cursor:pointer}" +
    ".faq-list{max-width:820px}.faq-item{background:#fff;border:1px solid var(--panel-border);border-radius:12px;padding:0 20px;margin-bottom:12px}" +
    ".faq-item summary{cursor:pointer;list-style:none;position:relative;padding:17px 30px 17px 0;font:600 16px var(--font-display)}" +
    ".faq-item summary::-webkit-details-marker{display:none}" +
    ".faq-item summary::after{content:'+';position:absolute;right:0;top:50%;transform:translateY(-50%);font-size:22px;color:var(--blue)}" +
    ".faq-item[open] summary::after{content:'\\2013'}" +
    ".faq-item p{padding:0 0 18px;color:var(--text-dim);font-size:15px}";
  document.head.appendChild(st);

  /* ---------- Tarjeta de producto reutilizable ---------- */
  function cardEl(p, c) {
    var img = p.image || (p.gallery && p.gallery[0]) || c.image || "";
    var href = "#/catalogo/" + c.id + "/" + slug(p.name);
    var consult = !p.price || p.price === "Consultar";
    var msg = "Hola JMSYSTEMS, quiero cotizar: " + p.name + (consult ? "" : " (" + p.price + ")");
    var badge = p.badge ? '<span class="pg-badge pg-b-' + slug(p.badge) + '">' + esc(p.badge) + "</span>" : "";
    var old = !consult && p.oldPrice ? '<s class="pg-old">' + esc(p.oldPrice) + "</s>" : "";
    var price = consult
      ? '<span class="product-price consult">Precio a consultar</span>'
      : '<span class="product-price">' + old + esc(p.price) + "</span>";
    var el = document.createElement("article");
    el.className = "product-card";
    el.setAttribute("data-of", "1");
    el.innerHTML =
      (img ? '<a class="pg-cardlink" href="' + esc(href) + '"><div class="ref-media">' + badge +
        '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy"></div></a>' : "") +
      '<div class="product-body"><h4><a href="' + esc(href) + '">' + esc(p.name) + "</a></h4>" +
      (p.note ? '<span class="product-note">' + esc(p.note) + "</span>" : "") +
      '<div class="product-price-row">' + price +
      '<a class="product-wa-btn" href="https://wa.me/' + wa + "?text=" + encodeURIComponent(msg) +
      '" target="_blank" rel="noopener">Cotizar</a></div></div>';
    return el;
  }

  /* ---------- Etiqueta y precio anterior en el catálogo ---------- */
  function findProduct(name) {
    var m = (location.hash || "").match(/^#\/catalogo\/([a-z0-9-]+)/i);
    for (var a = 0; a < cats.length; a++) {
      if (m && cats[a].id !== m[1]) continue;
      for (var b = 0; b < cats[a].products.length; b++)
        if (cats[a].products[b].name === name) return cats[a].products[b];
    }
    return null;
  }
  function enhance(card) {
    if (card.getAttribute("data-of")) return;
    card.setAttribute("data-of", "1");
    var h = card.querySelector("h4");
    if (!h) return;
    var p = findProduct(h.textContent.trim());
    if (!p) return;
    var media = card.querySelector(".ref-media");
    if (p.badge && media) {
      var b = document.createElement("span");
      b.className = "pg-badge pg-b-" + slug(p.badge);
      b.textContent = p.badge;
      media.appendChild(b);
    }
    var pr = card.querySelector(".product-price:not(.consult)");
    if (pr && p.oldPrice) {
      var o = document.createElement("s");
      o.className = "pg-old";
      o.textContent = p.oldPrice;
      pr.insertBefore(o, pr.firstChild);
    }
  }
  var grid = document.getElementById("products-grid");
  if (grid) {
    var run = function () { [].forEach.call(grid.querySelectorAll(".product-card"), enhance); };
    new MutationObserver(run).observe(grid, { childList: true });
    run();
  }

  /* ---------- Productos destacados ---------- */
  var featured = [];
  cats.forEach(function (c) {
    c.products.forEach(function (p) { if (p.featured) featured.push({ p: p, c: c }); });
  });
  var sec = document.getElementById("destacados"), fg = document.getElementById("featured-grid");
  if (sec && fg && featured.length) {
    featured.slice(0, 8).forEach(function (f) { fg.appendChild(cardEl(f.p, f.c)); });
    sec.hidden = false;
  }

  /* ---------- Buscador ---------- */
  var cg = document.getElementById("categories-grid");
  if (cg) {
    var box = document.createElement("div");
    box.className = "pg-search";
    box.innerHTML =
      '<input id="pg-q" type="search" placeholder="Buscar un producto: teclado, SSD, cargador…" aria-label="Buscar productos" autocomplete="off">' +
      '<p class="pg-count" id="pg-count" hidden></p><div class="products-grid" id="pg-results" hidden></div>';
    cg.parentNode.insertBefore(box, cg);
    var q = box.querySelector("#pg-q"), cnt = box.querySelector("#pg-count"), res = box.querySelector("#pg-results");
    var timer = null;
    q.addEventListener("input", function () {
      var raw = q.value.trim(), terms = norm(raw).split(/\s+/).filter(Boolean);
      if (raw.length < 2) {
        res.hidden = true; cnt.hidden = true; cg.hidden = false; res.innerHTML = "";
        return;
      }
      var found = [];
      cats.forEach(function (c) {
        c.products.forEach(function (p) {
          var hay = norm(p.name + " " + (p.note || "") + " " + c.title);
          if (terms.every(function (t) { return hay.indexOf(t) !== -1; })) found.push({ p: p, c: c });
        });
      });
      res.innerHTML = "";
      found.slice(0, 24).forEach(function (f) { res.appendChild(cardEl(f.p, f.c)); });
      cg.hidden = true; res.hidden = !found.length; cnt.hidden = false;
      if (found.length) {
        cnt.textContent = found.length + (found.length === 1 ? " resultado" : " resultados") + " para «" + raw + "»";
      } else {
        cnt.innerHTML = "No encontramos «" + esc(raw) + "». " +
          '<a href="https://wa.me/' + wa + "?text=" + encodeURIComponent("Hola JMSYSTEMS, estoy buscando: " + raw) +
          '" target="_blank" rel="noopener">Escríbenos por WhatsApp y te lo conseguimos</a>.';
      }
      clearTimeout(timer);
      timer = setTimeout(function () { track("buscar_producto", { termino: raw, resultados: found.length }); }, 900);
    });
  }

  /* ---------- Cotizador rápido ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    var type = form.querySelector("#qf-type"), item = form.querySelector("#qf-item"),
        zone = form.querySelector("#qf-zone"), nm = form.querySelector("#qf-name"),
        det = form.querySelector("#qf-msg"), note = form.querySelector("#qf-note");

    function fillItems() {
      var html = '<option value="">No estoy seguro / otro</option>';
      if (type.value === "servicio") {
        (SITE_DATA.serviceCategories || []).forEach(function (cat) {
          var list = (SITE_DATA.services || []).filter(function (s) { return s.category === cat; });
          if (list.length) html += '<optgroup label="' + esc(cat) + '">' +
            list.map(function (s) { return "<option>" + esc(s.title) + "</option>"; }).join("") + "</optgroup>";
        });
      } else {
        cats.forEach(function (c) {
          html += '<optgroup label="' + esc(c.title) + '">' +
            c.products.map(function (p) { return "<option>" + esc(p.name) + "</option>"; }).join("") + "</optgroup>";
        });
      }
      item.innerHTML = html;
    }
    function fillNote() {
      var v = zone.value, t = "";
      if (v === "Oriente antioqueño") t = "En el Oriente antioqueño el servicio se agenda con anticipación. Si es un trabajo confirmado no cobramos el desplazamiento; si la visita es solo para cotizar tiene una tarifa de $50.000.";
      else if (v === "Otra zona de Colombia") t = "Para otras zonas de Colombia enviamos productos y accesorios. Te confirmamos disponibilidad y tiempo de entrega.";
      note.textContent = t; note.hidden = !t;
    }
    type.addEventListener("change", fillItems);
    zone.addEventListener("change", fillNote);
    fillItems(); fillNote();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = ["Hola JMSYSTEMS, quiero cotizar.",
        "Necesito: " + (type.value === "servicio" ? "un servicio" : "un producto"),
        "Interés: " + (item.value || "Aún no estoy seguro"),
        "Zona: " + zone.value];
      if (nm.value.trim()) lines.push("Nombre: " + nm.value.trim());
      if (det.value.trim()) lines.push("Detalle: " + det.value.trim());
      lines.push("(Ref: COTIZADOR)");
      var url = "https://wa.me/" + wa + "?text=" + encodeURIComponent(lines.join("\n"));
      track("cotizador_enviar", { tipo: type.value, zona: zone.value });
      var w = window.open(url, "_blank", "noopener");
      if (!w) location.href = url;
    });
  }
})();