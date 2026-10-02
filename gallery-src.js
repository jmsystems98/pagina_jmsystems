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
