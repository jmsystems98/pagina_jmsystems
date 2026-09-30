// Netlify ejecuta este archivo en cada publicación.
// Lee content/productos/*.json (creados desde /admin) y genera js/products.js
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "content", "productos");
const items = [];

if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    try {
      const p = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      if (p.published === false || !p.name || !p.category) continue;
      items.push(p);
    } catch (e) {
      console.warn("Archivo inválido, se omite:", f, e.message);
    }
  }
}

items.sort((a, b) => ((a.order ?? 100) - (b.order ?? 100)) || String(a.name).localeCompare(String(b.name), "es"));

const byCat = {};
for (const p of items) {
  (byCat[p.category] = byCat[p.category] || []).push({
    name: p.name,
    price: p.price || "Consultar",
    note: p.note || "",
    image: p.image || ""
  });
}

const out =
  "/* Generado automáticamente por build-products.js. No editar a mano. */\n" +
  "(function () {\n  var byCat = " + JSON.stringify(byCat, null, 1) + ";\n" +
  "  SITE_DATA.productCategories.forEach(function (c) {\n" +
  "    if (byCat[c.id]) c.products = byCat[c.id];\n  });\n})();\n";

fs.writeFileSync(path.join(__dirname, "js", "products.js"), out);
console.log("Productos generados:", items.length);
