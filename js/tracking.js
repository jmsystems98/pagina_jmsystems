/* Medición de clics importantes en Google Analytics */
(function () {
  function track(name, params) {
    if (typeof gtag === "function") gtag("event", name, params || {});
  }
  function text(el, sel) {
    var n = el && el.querySelector(sel);
    return n ? n.textContent.trim() : "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;

    var opt = t.closest(".pg-menu a, .pg-menu button");
    if (opt) { track("compartir", { metodo: opt.textContent.trim() }); return; }
    if (t.closest(".pg-share")) { track("compartir_abrir"); return; }

    var el = t.closest("a,button");
    if (!el) return;

    if (el.classList.contains("promo-btn-ghost")) {
      track("promo_ver_detalles", { promo: text(el.closest(".promo-copy"), "h3") });
      return;
    }

    var href = el.getAttribute("href") || "";
    if (href.indexOf("wa.me") === -1) {
      var cat = el.closest("[data-open-cat]");
      if (cat) track("abrir_categoria", { categoria: text(cat, "h3") });
      return;
    }

    var origen = "otro", nombre = "", c;
    if ((c = el.closest(".promo-copy"))) { origen = "promocion"; nombre = text(c, "h3"); }
    else if ((c = el.closest(".product-card"))) { origen = "producto"; nombre = text(c, "h4"); }
    else if ((c = el.closest(".service-card"))) { origen = "servicio"; nombre = text(c, "h3"); }
    else if (el.classList.contains("float-wa")) origen = "boton_flotante";
    else if (el.closest(".nav,.mobile-menu")) origen = "menu";
    else if (el.closest(".hero")) origen = "portada";
    else if (el.closest(".cta-band")) origen = "banda_final";
    else if (el.closest("footer")) origen = "pie_de_pagina";
    else if (el.closest(".contact-wrap")) origen = "contacto";
    track("clic_whatsapp", { origen: origen, nombre: nombre });
  });
})();