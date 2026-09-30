/* ============================================================
   JMSYSTEMS — ARCHIVO DE DATOS (v2)
   ============================================================
   Este es el ÚNICO archivo que necesitas editar para:
   - Cambiar el número de WhatsApp / redes sociales
   - Editar SERVICIOS (cada uno con su propia tarjeta e imagen)
   - Editar el CATÁLOGO: categorías y, dentro de cada una, los
     productos individuales con su precio y foto.

   No necesitas tocar el HTML ni el CSS.

   CÓMO AGREGAR UNA FOTO REAL A UN PRODUCTO O SERVICIO:
   1. Guarda la foto dentro de la carpeta assets/img/productos/
      (o assets/img/servicios/ para servicios), ej: teclado-logi-k220.jpg
   2. En el producto o servicio correspondiente aquí abajo, agrega:
      image: "assets/img/productos/teclado-logi-k220.jpg",
   Si no agregas "image", el sitio muestra automáticamente un ícono
   de referencia — no se rompe nada.
   ============================================================ */

const SITE_DATA = {
  // ---------- CONTACTO ----------
  contact: {
    whatsapp: "573105996075",
    whatsappDisplay: "+57 310 599 6075",
    city: "Medellín, Antioquia",
    coverage: "Medellín, Valle de Aburrá y Oriente antioqueño",
    facebook: "https://www.facebook.com/share/18ufyz7g6R/",
    facebookHandle: "JMSYSTEMS",
    instagram: "https://instagram.com/jmsystems1998",
    instagramHandle: "@jmsystems1998",
    email: ""
  },

  // ---------- SERVICIOS ----------
  // Cada servicio es una tarjeta individual con su propio botón de WhatsApp.
  // "category" se usa solo para los filtros de arriba.
  serviceCategories: [
    "Soporte y mantenimiento",
    "Redes y conectividad",
    "Seguridad electrónica",
    "Venta y asesoría"
  ],
  services: [
    { image: "assets/img/servicios/tecnico.webp", id: "soporte-presencial", category: "Soporte y mantenimiento", tag: "Soporte", scene: "maintenance", icon: "wrench", title: "Soporte técnico presencial", desc: "Vamos hasta tu casa u oficina a diagnosticar y resolver la falla." },
    { image: "https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?auto=format&fit=crop&w=700&q=75", id: "soporte-remoto", category: "Soporte y mantenimiento", tag: "Soporte remoto", scene: "remote", icon: "wrench", title: "Soporte técnico remoto", desc: "Te ayudamos por videollamada o acceso remoto, sin moverte de tu sitio." },
    { image: "assets/img/servicios/mantenimiento.webp", id: "mant-preventivo", category: "Soporte y mantenimiento", tag: "Mantenimiento", scene: "maintenance", icon: "wrench", title: "Mantenimiento preventivo", desc: "Limpieza interna, revisión de temperaturas y optimización general." },
    { image: "assets/img/servicios/mant_correctivo.webp", id: "mant-correctivo", category: "Soporte y mantenimiento", tag: "Mantenimiento", scene: "maintenance", icon: "wrench", title: "Mantenimiento correctivo", desc: "Diagnóstico y reparación de fallas puntuales en tu equipo." },
    { image: "assets/img/servicios/reparacion.webp", id: "reparacion-pc", category: "Soporte y mantenimiento", tag: "Reparación", scene: "repair", icon: "cpu", title: "Reparación de computadores", desc: "Portátiles y equipos de escritorio, de cualquier marca." },
    { image: "assets/img/servicios/format_windows.webp", id: "formateo", category: "Soporte y mantenimiento", tag: "Formateo", scene: "format", icon: "wrench", title: "Formateo e instalación de Windows", desc: "Instalación limpia con tus programas esenciales configurados." },
    { image: "assets/img/servicios/repotencia.webp", id: "repotenciacion", category: "Soporte y mantenimiento", tag: "Repotenciación", scene: "upgrade", icon: "chip", title: "Optimización y repotenciación", desc: "Le devolvemos velocidad a tu equipo actual, sin comprar uno nuevo." },
    { image: "assets/img/servicios/software.webp", id: "instalacion-software", category: "Soporte y mantenimiento", tag: "Software", scene: "software", icon: "wrench", title: "Instalación y actualización de software", desc: "Programas, controladores y actualizaciones al día." },
    { image: "assets/img/servicios/ssd y ram.webp", id: "ssd-ram", category: "Soporte y mantenimiento", tag: "Repotenciación", scene: "upgrade", icon: "chip", title: "Instalación de SSD y ampliación de RAM", desc: "El upgrade con mejor relación costo-beneficio para tu equipo." },
    { image: "assets/img/servicios/impresora.webp", id: "impresoras", category: "Soporte y mantenimiento", tag: "Impresoras", scene: "printer", icon: "wrench", title: "Configuración de impresoras", desc: "Instalación, conexión en red y solución de errores de impresión." },

    { image: "assets/img/servicios/redes.webp", id: "redes-instalacion", category: "Redes y conectividad", tag: "Redes", scene: "network", icon: "network", title: "Instalación de redes", desc: "Redes cableadas e inalámbricas para hogar o empresa." },
    { image: "assets/img/servicios/estructurado.webp", id: "cableado", category: "Redes y conectividad", tag: "Cableado", scene: "cabling", icon: "cable", title: "Cableado estructurado", desc: "Cableado ordenado y certificado para datos y punto de red." },
    { image: "assets/img/servicios/router.webp", id: "routers", category: "Redes y conectividad", tag: "Routers", scene: "router", icon: "wifi", title: "Configuración de routers y switches", desc: "Configuramos tus equipos de red para máximo rendimiento." },
    { image: "assets/img/servicios/wifi.webp", id: "wifi", category: "Redes y conectividad", tag: "Wi-Fi", scene: "wifi", icon: "wifi", title: "Instalación y configuración de Wi-Fi", desc: "Cobertura óptima en toda tu casa u oficina." },
    { image: "assets/img/servicios/rack.webp", id: "racks", category: "Redes y conectividad", tag: "Racks", scene: "rack", icon: "network", title: "Organización de racks y cableado", desc: "Orden e identificación de cableado para fácil mantenimiento." },

    { image: "assets/img/servicios/camara.webp", id: "cctv-instalacion", category: "Seguridad electrónica", tag: "Cámaras CCTV", scene: "cctv", icon: "camera", title: "Instalación de cámaras de seguridad", desc: "Sistemas CCTV para el interior y exterior de tu propiedad." },
    { image: "assets/img/servicios/monitoreo.webp", id: "cctv-remoto", category: "Seguridad electrónica", tag: "Acceso remoto", scene: "cctv-remote", icon: "camera", title: "Configuración de cámaras y acceso remoto", desc: "Monitorea tus cámaras desde el celular, estés donde estés." },

    { image: "assets/img/servicios/venta_pc.webp", id: "venta-equipos", category: "Venta y asesoría", tag: "Venta de equipos", scene: "shop-equipos", icon: "shop", title: "Venta de computadores y componentes", desc: "Equipos nuevos y repotenciados, con garantía." },
    { image: "assets/img/servicios/venta_acce.webp", id: "venta-accesorios", category: "Venta y asesoría", tag: "Venta de accesorios", scene: "shop-accesorios", icon: "shop", title: "Venta de accesorios tecnológicos", desc: "Todo lo que necesitas para tu equipo, en un solo lugar." },
    { image: "assets/img/servicios/asesoria.webp", id: "asesoria", category: "Venta y asesoría", tag: "Asesoría", scene: "advice", icon: "info", title: "Asesoría tecnológica para hogares y empresas", desc: "Te orientamos antes de comprar o migrar tu infraestructura." },
    { image: "assets/img/servicios/planes.webp", id: "planes-empresas", category: "Venta y asesoría", tag: "Planes empresariales", scene: "business", icon: "shield", title: "Planes de soporte técnico para empresas", desc: "Soporte continuo mensual, adaptado al tamaño de tu negocio." }
  ],

  // ---------- CATÁLOGO (2 niveles) ----------
  // Nivel 1: categoría (lo que se ve en la grilla del catálogo)
  // Nivel 2: "products" — productos individuales de esa categoría,
  //          cada uno con su nombre, precio y botón propio de WhatsApp.
  //
  // price: usa "Consultar" si no quieres mostrar precio todavía.
  productCategories: [
    {
      id: "computadores",
      image: "assets/img/productos/laptop.webp",
      title: "Computadores",
      subtitle: "Nuevos y repotenciados",
      products: [
        { name: "Portátil repotenciado i5 / 8GB / SSD 240GB", price: "$1.100.000", note: "Ideal para trabajo y estudio" },
        { name: "Portátil core i3 / 8GB / SSD 128GB", price: "$850.000", note: "Uso básico y oficina" },
        { name: "Equipo de escritorio completo i5 / 8GB", price: "$1.250.000", note: "Incluye monitor" },
        { name: "Armado gamer / repotenciado a pedido", price: "Consultar", note: "Según presupuesto y uso" }
      ]
    },
    {
      id: "mouse",
      image: "assets/img/productos/mouse.webp",
      title: "Mouse",
      subtitle: "Alámbricos e inalámbricos",
      products: [
        { name: "Mouse inalámbrico básico", price: "$35.000" },
        { name: "Mouse inalámbrico silencioso", price: "$48.000" },
        { name: "Mouse USB con cable", price: "$25.000" },
        { name: "Mouse ergonómico / oficina", price: "$55.000" }
      ]
    },
    {
      id: "teclados",
      image: "assets/img/productos/portada-teclados.webp",
      title: "Teclados",
      subtitle: "Alámbricos e inalámbricos",
      products: [
        { name: "Teclado inalámbrico estándar", price: "$55.000" },
        { name: "Teclado USB multimedia", price: "$40.000" },
        { name: "Teclado membrana silencioso", price: "$45.000" },
        { name: "Teclado numérico compacto", price: "$30.000" }
      ]
    },
    {
      id: "combos",
      image: "assets/img/productos/combo.webp",
      title: "Combos teclado + mouse",
      subtitle: "El dúo esencial",
      products: [
        { name: "Combo inalámbrico teclado + mouse", price: "$75.000" },
        { name: "Combo USB teclado + mouse básico", price: "$58.000" }
      ]
    },
    {
      id: "cargadores-portatil",
      image: "assets/img/productos/cargador_port.webp",
      title: "Cargadores para portátil",
      subtitle: "Compatibles con la mayoría de marcas",
      products: [
        { name: "Cargador universal para portátil", price: "$65.000" },
        { name: "Cargador original / según referencia", price: "Consultar" },
        { name: "Batería para portátil", price: "Consultar", note: "Indícanos la referencia de tu equipo" }
      ]
    },
    {
      id: "cargadores-celular",
      image: "assets/img/productos/powerbank.webp",
      title: "Cargadores y power banks",
      subtitle: "Para celular y carga rápida",
      products: [
        { name: "Cargador de carga rápida USB-C", price: "$30.000" },
        { name: "Cargador para iPhone", price: "$35.000" },
        { name: "Cargador inalámbrico", price: "$48.000" },
        { name: "Cargador para carro", price: "$25.000" },
        { name: "Power bank 10.000 mAh", price: "$58.000" }
      ]
    },
    {
      id: "audio",
      image: "assets/img/productos/audifonos.webp",
      title: "Audífonos y manos libres",
      subtitle: "Para PC y celular",
      products: [
        { name: "Audífonos Bluetooth", price: "$45.000" },
        { name: "Audífonos in-ear con cable", price: "$18.000" },
        { name: "Audífonos para PC con micrófono", price: "$40.000" },
        { name: "Manos libres", price: "$15.000" }
      ]
    },
    {
      id: "video-audio-pc",
      image: "assets/img/productos/camara.webp",
      title: "Parlantes y cámaras web",
      subtitle: "Para escritorio y videollamadas",
      products: [
        { name: "Cámara web HD", price: "$60.000" },
        { name: "Parlantes para PC", price: "$45.000" }
      ]
    },
    {
      id: "almacenamiento",
      image: "assets/img/productos/ssd.webp",
      title: "Almacenamiento",
      subtitle: "RAM, SSD, discos y USB",
      products: [
        { name: "Memoria RAM 8GB DDR4", price: "$110.000" },
        { name: "SSD SATA 240GB", price: "$95.000" },
        { name: "SSD NVMe 500GB", price: "$160.000" },
        { name: "Disco duro externo 1TB", price: "$180.000" },
        { name: "Memoria USB 32GB", price: "$25.000" }
      ]
    },
    {
      id: "cables-adaptadores",
      image: "assets/img/productos/adaptador.webp",
      title: "Cables y adaptadores",
      subtitle: "Carga, video y datos",
      products: [
        { name: "Cable USB-C", price: "$15.000" },
        { name: "Cable HDMI", price: "$25.000" },
        { name: "Adaptador USB-C a HDMI", price: "$40.000" },
        { name: "Hub USB / USB-C", price: "$45.000" },
        { name: "Cable de red (por metro)", price: "Consultar" }
      ]
    },
    {
      id: "redes-inalambricas",
      image: "assets/img/productos/router.webp",
      title: "Redes inalámbricas",
      subtitle: "Adaptadores Wi-Fi y Bluetooth",
      products: [
        { name: "Adaptador Wi-Fi USB", price: "$35.000" },
        { name: "Adaptador Bluetooth USB", price: "$28.000" }
      ]
    },
    {
      id: "soportes-proteccion",
      image: "assets/img/productos/base.webp",
      title: "Soportes y protección",
      subtitle: "Para portátil y PC",
      products: [
        { name: "Base refrigerante para portátil", price: "$65.000" },
        { name: "Soporte para portátil", price: "$40.000" },
        { name: "Ventilador para PC (case)", price: "$30.000" },
        { name: "Fuente de poder para PC", price: "$120.000" }
      ]
    },
    {
      id: "accesorios-celular",
      image: "assets/img/productos/cargador_cel.webp",
      title: "Accesorios para celular",
      subtitle: "Protección y estilo",
      products: [
        { name: "Vidrio templado", price: "$12.000" },
        { name: "Funda / carcasa antigolpes", price: "$25.000" },
        { name: "Soporte para carro / moto", price: "$28.000" },
        { name: "Smartwatch básico", price: "$120.000" },
        { name: "Trípode para celular", price: "$30.000" },
        { name: "Aro de luz", price: "$45.000" }
      ]
    }
  ]
};
