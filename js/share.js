/* Botón "Compartir" para productos y servicios + enlaces directos */
(function () {
  var css =
    ".product-card,.service-card{position:relative}" +
    ".pg-share{position:absolute;top:10px;right:10px;z-index:3;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.95);color:#145DA0;box-shadow:0 2px 8px rgba(0,0,0,.2);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}" +
    ".pg-share:hover{background:#fff;color:#17ABE3}" +
    ".pg-share svg{width:20px;height:20px}" +
    ".pg-menu{position:fixed;z-index:10000;width:220px;background:#fff;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.28);padding:6px;font:15px/1.2 Inter,system-ui,sans-serif}" +
    ".pg-menu a,.pg-menu button{display:block;width:100%;padding:11px 12px;border:0;border-radius:8px;background:none;color:#0d3e73;text-decoration:none;font:inherit;cursor:pointer;text-align:left}" +
    ".pg-menu a:hover,.pg-menu button:hover{background:#e6f7fd}" +
    ".pg-hl{outline:3px solid #17ABE3;outline-offset:3px}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="18" cy="5" r="2.6" stroke="currentColor" stroke-width="1.7"/><circle cx="6" cy="12" r="2.6" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="19" r="2.6" stroke="currentColor" stroke-width="1.7"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" stroke="currentColor" stroke-width="1.7"/></svg>';

  function slug(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function base() { return location.origin + location.pathname; }

  function dataFor(card) {
    var isProd = card.classList.contains("product-card");
    var h = card.querySelector(isProd ? "h4" : "h3");
    if (!h) return null;
    var name = h.textContent.trim(), url, text;
    if (isProd) {
      var m = (location.hash || "").match(/^#\/catalogo\/([a-z0-9-]+)/i);
      url = base() + "#/catalogo/" + (m ? m[1] : "") + "/" + slug(name);
      var pr = card.querySelector(".product-price:not(.consult)");
      text = "Mira este producto de JMSYSTEMS: " + name + (pr ? " (" + pr.textContent.trim() + ")" : "");
    } else {
      url = base() + "#/servicio/" + slug(name);
      text = "Mira este servicio de JMSYSTEMS: " + name;
    }
    return { url: url, text: text, title: name };
  }

  function copy(t, ok) {
    function fb() {
      var ta = document.createElement("textarea");
      ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, fb);
    else fb();
  }

  var menu = null;
  function closeMenu() { if (menu) { menu.remove(); menu = null; } }

  function openMenu(btn, d) {
    closeMenu();
    menu = document.createElement("div");
    menu.className = "pg-menu";
    var enc = encodeURIComponent, full = d.text + " " + d.url;
    [
      ["WhatsApp", "https://wa.me/?text=" + enc(full)],
      ["Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + enc(d.url)],
      ["Correo", "mailto:?subject=" + enc(d.title + " - JMSYSTEMS") + "&body=" + enc(full)]
    ].forEach(function (it) {
      var a = document.createElement("a");
      a.href = it[1]; a.textContent = it[0];
      if (it[0] !== "Correo") { a.target = "_blank"; a.rel = "noopener"; }
      a.addEventListener("click", closeMenu);
      menu.appendChild(a);
    });
    var cp = document.createElement("button");
    cp.type = "button"; cp.textContent = "Copiar enlace";
    cp.addEventListener("click", function () {
      copy(d.url, function () { cp.textContent = "¡Enlace copiado!"; setTimeout(closeMenu, 900); });
    });
    menu.appendChild(cp);
    if (navigator.share) {
      var more = document.createElement("button");
      more.type = "button"; more.textContent = "Más opciones…";
      more.addEventListener("click", function () {
        navigator.share({ title: d.title, text: d.text, url: d.url }).catch(function () {});
        closeMenu();
      });
      menu.appendChild(more);
    }
    document.body.appendChild(menu);
    var r = btn.getBoundingClientRect(), w = 220, h = menu.offsetHeight;
    var left = Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8));
    var top = r.bottom + 6;
    if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
    menu.style.left = left + "px";
    menu.style.top = top + "px";
  }

  document.addEventListener("click", function (e) {
    if (menu && !menu.contains(e.target) && !e.target.closest(".pg-share")) closeMenu();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", closeMenu, { passive: true });

  function addButtons(root) {
    [].forEach.call(root.querySelectorAll(".product-card,.service-card"), function (card) {
      if (card.querySelector(".pg-share")) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "pg-share";
      b.setAttribute("aria-label", "Compartir"); b.innerHTML = ICON;
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var d = dataFor(card);
        if (d) openMenu(b, d);
      });
      card.appendChild(b);
    });
  }
  ["products-grid", "services-grid"].forEach(function (id) {
    var g = document.getElementById(id);
    if (!g) return;
    addButtons(g);
    new MutationObserver(function () { addButtons(g); }).observe(g, { childList: true });
  });

  /* Enlaces directos: abren y resaltan el producto o servicio */
  function highlight(el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("pg-hl");
    setTimeout(function () { el.classList.remove("pg-hl"); }, 3500);
  }
  function findCard(sel, tag, s) {
    var cs = document.querySelectorAll(sel);
    for (var i = 0; i < cs.length; i++) {
      var h = cs[i].querySelector(tag);
      if (h && slug(h.textContent) === s) return cs[i];
    }
    return null;
  }
  function route() {
    var hash = location.hash || "", m;
    if ((m = hash.match(/^#\/catalogo\/[a-z0-9-]+\/([a-z0-9-]+)/i))) {
      setTimeout(function () {
        var c = findCard("#products-grid .product-card", "h4", m[1].toLowerCase());
        if (c) highlight(c);
      }, 400);
    } else if ((m = hash.match(/^#\/servicio\/([a-z0-9-]+)/i))) {
      var all = document.querySelector('#service-tabs .cat-tab[data-cat="Todos"]');
      if (all && !all.classList.contains("active")) all.click();
      setTimeout(function () {
        var c = findCard("#services-grid .service-card", "h3", m[1].toLowerCase());
        if (c) highlight(c);
      }, 400);
    }
  }
  window.addEventListener("hashchange", route);
  route();
})();