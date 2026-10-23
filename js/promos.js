/* Carrusel de promociones: se alimenta del panel (Banners y promociones) */
(function () {
  var list = (typeof SITE_DATA !== "undefined" && SITE_DATA.banners) || [];
  var sec = document.getElementById("promos");
  var box = document.getElementById("promo-carousel");
  if (!sec || !box || !list.length) return;

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var d = new Date();
  var today = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  var active = list.filter(function (b) {
    var s = String(b.start || "").slice(0, 10), e = String(b.end || "").slice(0, 10);
    return (!s || s <= today) && (!e || e >= today);
  });
  if (!active.length) return;

  function slug(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function base() { return location.origin + location.pathname; }
  function detailLink(b) {
    var P = SITE_DATA.productCategories || [], S = SITE_DATA.services || [], i, j, h;
    if (b.product) {
      for (i = 0; i < P.length; i++)
        for (j = 0; j < P[i].products.length; j++)
          if (P[i].products[j].name === b.product) {
            h = "#/catalogo/" + P[i].id + "/" + slug(b.product);
            return { href: h, abs: base() + h };
          }
    }
    if (b.service) {
      for (i = 0; i < S.length; i++)
        if (S[i].title === b.service) {
          h = "#/servicio/" + slug(b.service);
          return { href: h, abs: base() + h };
        }
    }
    if (b.link) return { href: b.link, abs: b.link.charAt(0) === "#" ? base() + b.link : b.link };
    return null;
  }

  var st = document.createElement("style");
  st.textContent =
    ".promos{padding:28px 0 8px}.promos[hidden]{display:none}" +
    ".promo-carousel{position:relative}" +
    ".promo-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;border-radius:18px}" +
    ".promo-track::-webkit-scrollbar{display:none}" +
    ".promo-slide{position:relative;flex:0 0 100%;scroll-snap-align:start;aspect-ratio:5/2;background:#0d3e73;overflow:hidden}" +
    ".promo-slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}" +
    ".promo-slide::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,25,55,.78) 0%,rgba(5,25,55,.45) 45%,rgba(5,25,55,0) 75%)}" +
    ".promo-copy{position:absolute;z-index:2;left:clamp(20px,5vw,64px);top:50%;transform:translateY(-50%);max-width:min(520px,60%);color:#fff}" +
    ".promo-copy h3{margin:0 0 8px;font:700 clamp(22px,3.4vw,40px)/1.1 'Space Grotesk',system-ui,sans-serif}" +
    ".promo-copy p{margin:0 0 16px;font-size:clamp(14px,1.5vw,18px);line-height:1.4;opacity:.95}" +
    ".promo-btn{display:inline-block;padding:12px 20px;border-radius:999px;background:#17ABE3;color:#fff;font-weight:600;text-decoration:none}" +
    ".promo-btn:hover{background:#1396c9}" +
    ".promo-btn-ghost{background:transparent;border:2px solid #fff;padding:10px 18px;margin-left:10px}.promo-btn-ghost:hover{background:rgba(255,255,255,.18)}" +
    ".promo-arrow{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.9);color:#145DA0;font-size:24px;cursor:pointer;z-index:3}" +
    ".promo-arrow.prev{left:10px}.promo-arrow.next{right:10px}" +
    ".promo-dots{position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:8px;z-index:3}" +
    ".promo-dots button{width:9px;height:9px;padding:0;border:0;border-radius:6px;background:rgba(255,255,255,.55);cursor:pointer}" +
    ".promo-dots button.on{background:#fff;width:22px}" +
    "@media (max-width:640px){.promo-slide{aspect-ratio:4/3}" +
    ".promo-slide::after{background:linear-gradient(0deg,rgba(5,25,55,.85) 0%,rgba(5,25,55,.2) 60%,rgba(5,25,55,0) 100%)}" +
    ".promo-copy{left:16px;right:16px;top:auto;bottom:34px;transform:none;max-width:none}.promo-arrow{display:none}}";
  document.head.appendChild(st);

  var wa = (typeof SITE_DATA !== "undefined" && SITE_DATA.contact && SITE_DATA.contact.whatsapp) || "";
  var track = document.createElement("div");
  track.className = "promo-track";

  active.forEach(function (b) {
    var s = document.createElement("article");
    s.className = "promo-slide";
    if (b.image) {
      var pic = document.createElement("picture");
      if (b.imageMobile) {
        var so = document.createElement("source");
        so.media = "(max-width:640px)";
        so.srcset = b.imageMobile;
        pic.appendChild(so);
      }
      var im = document.createElement("img");
      im.src = b.image; im.alt = b.title || ""; im.loading = "lazy"; im.decoding = "async";
      pic.appendChild(im);
      s.appendChild(pic);
    }
    var copy = document.createElement("div");
    copy.className = "promo-copy";
    var h = document.createElement("h3");
    h.textContent = b.title || "";
    copy.appendChild(h);
    if (b.text) {
      var p = document.createElement("p");
      p.textContent = b.text;
      copy.appendChild(p);
    }
    var detail = detailLink(b);
    var msg = "Hola JMSYSTEMS, vi la promoción «" + (b.title || "") + "» en su página web y quiero más información." +
      (b.product || b.service ? "\nMe interesa: " + (b.product || b.service) : "") +
      (detail ? "\nLo vi aquí: " + detail.abs : "") +
      "\n(Ref: PROMO-" + slug(b.title) + ")";
    var a = document.createElement("a");
    a.className = "promo-btn";
    a.textContent = b.cta || "Cotizar por WhatsApp";
    a.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);
    a.target = "_blank"; a.rel = "noopener";
    copy.appendChild(a);
    if (detail) {
      var more = document.createElement("a");
      more.className = "promo-btn promo-btn-ghost";
      more.textContent = "Ver detalles";
      more.href = detail.href;
      if (/^https?:/i.test(detail.href)) { more.target = "_blank"; more.rel = "noopener"; }
      copy.appendChild(more);
    }
    s.appendChild(copy);
    track.appendChild(s);
  });
  box.appendChild(track);

  var n = active.length, idx = 0, timer = null;
  function go(i) {
    idx = (i + n) % n;
    track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
  }

  if (n > 1) {
    var prev = document.createElement("button");
    prev.className = "promo-arrow prev"; prev.type = "button"; prev.setAttribute("aria-label", "Anterior"); prev.textContent = "‹";
    var next = document.createElement("button");
    next.className = "promo-arrow next"; next.type = "button"; next.setAttribute("aria-label", "Siguiente"); next.textContent = "›";
    prev.addEventListener("click", function () { go(idx - 1); });
    next.addEventListener("click", function () { go(idx + 1); });
    box.appendChild(prev); box.appendChild(next);

    var dots = document.createElement("div");
    dots.className = "promo-dots";
    active.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Ir a la promoción " + (i + 1));
      b.addEventListener("click", function () { go(i); });
      dots.appendChild(b);
    });
    box.appendChild(dots);

    function mark() {
      [].forEach.call(dots.children, function (x, j) { x.classList.toggle("on", j === idx); });
    }
    mark();
    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== idx) { idx = i; mark(); }
    }, { passive: true });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var stop = function () { clearInterval(timer); };
      var start = function () { stop(); timer = setInterval(function () { go(idx + 1); }, 6000); };
      box.addEventListener("mouseenter", stop);
      box.addEventListener("mouseleave", start);
      box.addEventListener("touchstart", stop, { passive: true });
      box.addEventListener("touchend", start, { passive: true });
      start();
    }
  }
  sec.hidden = false;
})();