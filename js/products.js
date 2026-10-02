/* Generado automáticamente por build-products.js. No editar a mano. */
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
})({"services":[{"id":"soporte-presencial","category":"Soporte y mantenimiento","tag":"Soporte","scene":"maintenance","icon":"wrench","title":"Soporte técnico presencial","desc":"Vamos hasta tu casa u oficina a diagnosticar y resolver la falla.","image":"assets/img/servicios/tecnico.webp"},{"id":"soporte-remoto","category":"Soporte y mantenimiento","tag":"Soporte remoto","scene":"maintenance","icon":"wrench","title":"Soporte técnico remoto","desc":"Te ayudamos por videollamada o acceso remoto, sin moverte de tu sitio.","image":"https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?auto=format&fit=crop&w=700&q=75"},{"id":"mant-preventivo","category":"Soporte y mantenimiento","tag":"Mantenimiento","scene":"maintenance","icon":"wrench","title":"Mantenimiento preventivo","desc":"Limpieza interna, revisión de temperaturas y optimización general.","image":"assets/img/servicios/mantenimiento.webp"},{"id":"mant-correctivo","category":"Soporte y mantenimiento","tag":"Mantenimiento","scene":"maintenance","icon":"wrench","title":"Mantenimiento correctivo","desc":"Diagnóstico y reparación de fallas puntuales en tu equipo.","image":"assets/img/servicios/mant_correctivo.webp"},{"id":"reparacion-pc","category":"Soporte y mantenimiento","tag":"Reparación","scene":"maintenance","icon":"wrench","title":"Reparación de computadores","desc":"Portátiles y equipos de escritorio, de cualquier marca.","image":"assets/img/servicios/reparacion.webp"},{"id":"formateo","category":"Soporte y mantenimiento","tag":"Formateo","scene":"maintenance","icon":"wrench","title":"Formateo e instalación de Windows","desc":"Instalación limpia con tus programas esenciales configurados.","image":"assets/img/servicios/format_windows.webp"},{"id":"repotenciacion","category":"Soporte y mantenimiento","tag":"Repotenciación","scene":"maintenance","icon":"wrench","title":"Optimización y repotenciación","desc":"Le devolvemos velocidad a tu equipo actual, sin comprar uno nuevo.","image":"assets/img/servicios/repotencia.webp"},{"id":"instalacion-software","category":"Soporte y mantenimiento","tag":"Software","scene":"maintenance","icon":"wrench","title":"Instalación y actualización de software","desc":"Programas, controladores y actualizaciones al día.","image":"assets/img/servicios/software.webp"},{"id":"ssd-ram","category":"Soporte y mantenimiento","tag":"Repotenciación","scene":"maintenance","icon":"wrench","title":"Instalación de SSD y ampliación de RAM","desc":"El upgrade con mejor relación costo-beneficio para tu equipo.","image":"assets/img/servicios/ssd y ram.webp"},{"id":"impresoras","category":"Soporte y mantenimiento","tag":"Impresoras","scene":"maintenance","icon":"wrench","title":"Configuración de impresoras","desc":"Instalación, conexión en red y solución de errores de impresión.","image":"assets/img/servicios/impresora.webp"},{"id":"redes-instalacion","category":"Redes y conectividad","tag":"Redes","scene":"network","icon":"network","title":"Instalación de redes","desc":"Redes cableadas e inalámbricas para hogar o empresa.","image":"assets/img/servicios/redes.webp"},{"id":"cableado","category":"Redes y conectividad","tag":"Cableado","scene":"network","icon":"network","title":"Cableado estructurado","desc":"Cableado ordenado y certificado para datos y punto de red.","image":"assets/img/servicios/estructurado.webp"},{"id":"routers","category":"Redes y conectividad","tag":"Routers","scene":"network","icon":"network","title":"Configuración de routers y switches","desc":"Configuramos tus equipos de red para máximo rendimiento.","image":"assets/img/servicios/router.webp"},{"id":"wifi","category":"Redes y conectividad","tag":"Wi-Fi","scene":"network","icon":"network","title":"Instalación y configuración de Wi-Fi","desc":"Cobertura óptima en toda tu casa u oficina.","image":"assets/img/servicios/wifi.webp"},{"id":"racks","category":"Redes y conectividad","tag":"Racks","scene":"network","icon":"network","title":"Organización de racks y cableado","desc":"Orden e identificación de cableado para fácil mantenimiento.","image":"assets/img/servicios/rack.webp"},{"id":"cctv-instalacion","category":"Seguridad electrónica","tag":"Cámaras CCTV","scene":"cctv","icon":"camera","title":"Instalación de cámaras de seguridad","desc":"Sistemas CCTV para el interior y exterior de tu propiedad.","image":"assets/img/servicios/camara.webp"},{"id":"cctv-remoto","category":"Seguridad electrónica","tag":"Acceso remoto","scene":"cctv","icon":"camera","title":"Configuración de cámaras y acceso remoto","desc":"Monitorea tus cámaras desde el celular, estés donde estés.","image":"assets/img/servicios/monitoreo.webp"},{"id":"venta-equipos","category":"Venta y asesoría","tag":"Venta de equipos","scene":"shop-accesorios","icon":"shop","title":"Venta de computadores y componentes","desc":"Equipos nuevos y repotenciados, con garantía.","image":"assets/img/servicios/venta_pc.webp"},{"id":"venta-accesorios","category":"Venta y asesoría","tag":"Venta de accesorios","scene":"shop-accesorios","icon":"shop","title":"Venta de accesorios tecnológicos","desc":"Todo lo que necesitas para tu equipo, en un solo lugar.","image":"assets/img/servicios/venta_acce.webp"},{"id":"asesoria","category":"Venta y asesoría","tag":"Asesoría","scene":"shop-accesorios","icon":"shop","title":"Asesoría tecnológica para hogares y empresas","desc":"Te orientamos antes de comprar o migrar tu infraestructura.","image":"assets/img/servicios/asesoria.webp"},{"id":"planes-empresas","category":"Venta y asesoría","tag":"Planes empresariales","scene":"shop-accesorios","icon":"shop","title":"Planes de soporte técnico para empresas","desc":"Soporte continuo mensual, adaptado al tamaño de tu negocio.","image":"assets/img/servicios/planes.webp"}],"categories":[{"id":"computadores","title":"Computadores","subtitle":"Nuevos y repotenciados","image":"assets/img/productos/laptop.webp","products":[{"name":"Portátil repotenciado i5 / 8GB / SSD 240GB","price":"$1.100.000","note":"Ideal para trabajo y estudio","image":"","gallery":[]},{"name":"Portátil core i3 / 8GB / SSD 128GB","price":"$850.000","note":"Uso básico y oficina","image":"","gallery":[]},{"name":"Equipo de escritorio completo i5 / 8GB","price":"$1.250.000","note":"Incluye monitor","image":"","gallery":[]},{"name":"Armado gamer / repotenciado a pedido","price":"Consultar","note":"Según presupuesto y uso","image":"","gallery":[]}]},{"id":"mouse","title":"Mouse","subtitle":"Alámbricos e inalámbricos","image":"assets/img/productos/mouse.webp","products":[{"name":"Mouse inalámbrico básico","price":"$35.000","note":"","image":"","gallery":[]},{"name":"Mouse inalámbrico silencioso","price":"$48.000","note":"","image":"","gallery":[]},{"name":"Mouse USB con cable","price":"$25.000","note":"","image":"","gallery":[]},{"name":"Mouse ergonómico / oficina","price":"$55.000","note":"","image":"","gallery":[]}]},{"id":"teclados","title":"Teclados","subtitle":"Alámbricos e inalámbricos","image":"assets/img/productos/portada-teclados.webp","products":[{"name":"Teclado inalámbrico estándar","price":"$55.000","note":"","image":"","gallery":[]},{"name":"Teclado USB multimedia","price":"$40.000","note":"","image":"","gallery":[]},{"name":"Teclado membrana silencioso","price":"$45.000","note":"","image":"","gallery":[]},{"name":"Teclado numérico compacto","price":"$30.000","note":"","image":"","gallery":[]}]},{"id":"combos","title":"Combos teclado + mouse","subtitle":"El dúo esencial","image":"assets/img/productos/combo.webp","products":[{"name":"Combo inalámbrico teclado + mouse","price":"$75.000","note":"","image":"","gallery":[]},{"name":"Combo USB teclado + mouse básico","price":"$58.000","note":"","image":"","gallery":[]}]},{"id":"cargadores-portatil","title":"Cargadores para portátil","subtitle":"Compatibles con la mayoría de marcas","image":"assets/img/productos/cargador_port.webp","products":[{"name":"Cargador universal para portátil","price":"$65.000","note":"","image":"","gallery":[]},{"name":"Cargador original / según referencia","price":"Consultar","note":"","image":"","gallery":[]},{"name":"Batería para portátil","price":"Consultar","note":"Indícanos la referencia de tu equipo","image":"","gallery":[]}]},{"id":"cargadores-celular","title":"Cargadores y power banks","subtitle":"Para celular y carga rápida","image":"assets/img/productos/powerbank.webp","products":[{"name":"Cargador de carga rápida USB-C","price":"$30.000","note":"","image":"","gallery":[]},{"name":"Cargador para iPhone","price":"$35.000","note":"","image":"","gallery":[]},{"name":"Cargador inalámbrico","price":"$48.000","note":"","image":"","gallery":[]},{"name":"Cargador para carro","price":"$25.000","note":"","image":"","gallery":[]},{"name":"Power bank 10.000 mAh","price":"$58.000","note":"","image":"","gallery":[]}]},{"id":"audio","title":"Audífonos y manos libres","subtitle":"Para PC y celular","image":"assets/img/productos/audifonos.webp","products":[{"name":"Audífonos Bluetooth","price":"$45.000","note":"","image":"","gallery":[]},{"name":"Audífonos in-ear con cable","price":"$18.000","note":"","image":"","gallery":[]},{"name":"Audífonos para PC con micrófono","price":"$40.000","note":"","image":"","gallery":[]},{"name":"Manos libres","price":"$15.000","note":"","image":"","gallery":[]}]},{"id":"video-audio-pc","title":"Parlantes y cámaras web","subtitle":"Para escritorio y videollamadas","image":"assets/img/productos/camara.webp","products":[{"name":"Cámara web HD","price":"$60.000","note":"","image":"","gallery":[]},{"name":"Parlantes para PC","price":"$45.000","note":"","image":"","gallery":[]}]},{"id":"almacenamiento","title":"Almacenamiento","subtitle":"RAM, SSD, discos y USB","image":"assets/img/productos/ssd.webp","products":[{"name":"Memoria RAM 8GB DDR4","price":"$110.000","note":"","image":"","gallery":[]},{"name":"SSD SATA 240GB","price":"$95.000","note":"","image":"","gallery":[]},{"name":"SSD NVMe 500GB","price":"$160.000","note":"","image":"","gallery":[]},{"name":"Disco duro externo 1TB","price":"$180.000","note":"","image":"","gallery":[]},{"name":"Memoria USB 32GB","price":"$25.000","note":"","image":"","gallery":[]}]},{"id":"cables-adaptadores","title":"Cables y adaptadores","subtitle":"Carga, video y datos","image":"assets/img/productos/adaptador.webp","products":[{"name":"Cable USB-C","price":"$15.000","note":"","image":"","gallery":[]},{"name":"Cable HDMI","price":"$25.000","note":"","image":"","gallery":[]},{"name":"Adaptador USB-C a HDMI","price":"$40.000","note":"","image":"","gallery":[]},{"name":"Hub USB / USB-C","price":"$45.000","note":"","image":"","gallery":[]},{"name":"Cable de red (por metro)","price":"Consultar","note":"","image":"","gallery":[]}]},{"id":"redes-inalambricas","title":"Redes inalámbricas","subtitle":"Adaptadores Wi-Fi y Bluetooth","image":"assets/img/productos/router.webp","products":[{"name":"Adaptador Wi-Fi USB","price":"$35.000","note":"","image":"","gallery":[]},{"name":"Adaptador Bluetooth USB","price":"$28.000","note":"","image":"","gallery":[]}]},{"id":"soportes-proteccion","title":"Soportes y protección","subtitle":"Para portátil y PC","image":"assets/img/productos/base.webp","products":[{"name":"Base refrigerante para portátil","price":"$65.000","note":"","image":"","gallery":[]},{"name":"Soporte para portátil","price":"$40.000","note":"","image":"","gallery":[]},{"name":"Ventilador para PC (case)","price":"$30.000","note":"","image":"","gallery":[]},{"name":"Fuente de poder para PC","price":"$120.000","note":"","image":"","gallery":[]}]},{"id":"accesorios-celular","title":"Accesorios para celular","subtitle":"Protección y estilo","image":"assets/img/productos/cargador_cel.webp","products":[{"name":"Vidrio templado","price":"$12.000","note":"","image":"","gallery":[]},{"name":"Funda / carcasa antigolpes","price":"$25.000","note":"","image":"","gallery":[]},{"name":"Soporte para carro / moto","price":"$28.000","note":"","image":"","gallery":[]},{"name":"Smartwatch básico","price":"$120.000","note":"","image":"","gallery":[]},{"name":"Trípode para celular","price":"$30.000","note":"","image":"","gallery":[]},{"name":"Aro de luz","price":"$45.000","note":"","image":"","gallery":[]}]}],"site":{"logo":"assets/img/logo.png","hero":{"eyebrow":"Servicio técnico · Valle de Aburrá y Oriente antioqueño","title1":"Soporte confiable,","title2":"tecnología real.","lede":"Reparamos, mantenemos y conectamos los equipos de tu casa o empresa — y te vendemos los accesorios que necesitas, sin vueltas. Todo a una respuesta de WhatsApp.","image":"assets/img/servicios/tecnico-onsite.jpg","badge":"Soporte confiable, tecnología real"},"coverage_map":"assets/img/coverage-map.png","contact":{"whatsapp":"573105996075","whatsappDisplay":"+57 310 599 6075","city":"Medellín, Antioquia","coverage":"Medellín, Valle de Aburrá y Oriente antioqueño","facebook":"https://www.facebook.com/share/18ufyz7g6R/","facebookHandle":"JMSYSTEMS","instagram":"https://instagram.com/jmsystems1998","instagramHandle":"@jmsystems1998","email":""}}});

/* Galería de imágenes por producto (miniaturas + vista ampliada) */
(function () {
  var st = document.createElement("style");
  st.textContent =
    ".pg-thumbs{display:flex;gap:6px;padding:8px 12px 0;flex-wrap:wrap}" +
    ".pg-thumbs button{width:44px;height:44px;padding:0;border:2px solid transparent;border-radius:6px;overflow:hidden;background:#fff;cursor:pointer;opacity:.7}" +
    ".pg-thumbs button.on,.pg-thumbs button:hover{border-color:#17ABE3;opacity:1}" +
    ".pg-thumbs img{width:100%;height:100%;object-fit:cover;display:block}" +
    ".pg-zoom{cursor:zoom-in}" +
    ".pg-lb{position:fixed;inset:0;z-index:9999;background:rgba(5,15,30,.92);display:flex;align-items:center;justify-content:center}" +
    ".pg-lb img{max-width:92vw;max-height:84vh;object-fit:contain;border-radius:8px}" +
    ".pg-lb button{position:absolute;background:rgba(255,255,255,.18);color:#fff;border:0;border-radius:50%;width:44px;height:44px;font-size:24px;cursor:pointer}" +
    ".pg-lb .x{top:16px;right:16px}.pg-lb .p{left:12px;top:50%}.pg-lb .n{right:12px;top:50%}" +
    ".pg-lb .c{position:absolute;bottom:18px;color:#fff;font:14px sans-serif}";
  document.head.appendChild(st);

  function openLB(list, i) {
    var box = document.createElement("div");
    box.className = "pg-lb";
    box.innerHTML = '<img alt=""><button class="x" aria-label="Cerrar">×</button>' +
      (list.length > 1 ? '<button class="p" aria-label="Anterior">‹</button><button class="n" aria-label="Siguiente">›</button><span class="c"></span>' : "");
    var im = box.querySelector("img"), c = box.querySelector(".c"), x0 = null;
    function show() { im.src = list[i]; if (c) c.textContent = (i + 1) + " / " + list.length; }
    function go(d) { i = (i + d + list.length) % list.length; show(); }
    function close() { document.removeEventListener("keydown", key); box.remove(); }
    function key(e) { if (e.key === "Escape") close(); else if (e.key === "ArrowLeft" && list.length > 1) go(-1); else if (e.key === "ArrowRight" && list.length > 1) go(1); }
    box.addEventListener("click", function (e) {
      if (e.target.classList.contains("x") || e.target === box) close();
      else if (e.target.classList.contains("p")) go(-1);
      else if (e.target.classList.contains("n")) go(1);
    });
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null || list.length < 2) return;
      var d = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
    });
    document.addEventListener("keydown", key);
    document.body.appendChild(box); show();
  }

  function findProduct(name) {
    var m = (location.hash || "").match(/^#\/catalogo\/([a-z0-9-]+)/i);
    var cats = SITE_DATA.productCategories.filter(function (c) { return !m || c.id === m[1]; });
    for (var a = 0; a < cats.length; a++)
      for (var b = 0; b < cats[a].products.length; b++)
        if (cats[a].products[b].name === name) return cats[a].products[b];
    return null;
  }

  function enhance(card) {
    if (card.getAttribute("data-pg")) return;
    card.setAttribute("data-pg", "1");
    var h = card.querySelector("h4"), media = card.querySelector(".ref-media");
    if (!h || !media) return;
    var p = findProduct(h.textContent.trim());
    if (!p) return;
    var list = [p.image].concat(p.gallery || []).filter(Boolean);
    if (!list.length) return;
    var img = media.querySelector("img");
    if (!img) {
      img = document.createElement("img"); img.alt = p.name;
      var svg = media.querySelector("svg");
      if (svg) svg.replaceWith(img); else media.appendChild(img);
    }
    img.src = list[0];
    img.classList.add("pg-zoom");
    var cur = 0;
    img.addEventListener("click", function () { openLB(list, cur); });
    if (list.length > 1) {
      var bar = document.createElement("div");
      bar.className = "pg-thumbs";
      list.forEach(function (src, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = i ? "" : "on";
        b.setAttribute("aria-label", "Ver imagen " + (i + 1));
        var t = document.createElement("img");
        t.src = src; t.alt = ""; t.loading = "lazy";
        b.appendChild(t);
        b.addEventListener("click", function () {
          cur = i; img.src = src;
          [].forEach.call(bar.children, function (x, j) { x.classList.toggle("on", j === i); });
        });
        bar.appendChild(b);
      });
      media.parentNode.insertBefore(bar, media.nextSibling);
    }
  }

  var grid = document.getElementById("products-grid");
  if (!grid) return;
  function run() { [].forEach.call(grid.querySelectorAll(".product-card"), enhance); }
  new MutationObserver(run).observe(grid, { childList: true });
  run();
})();
