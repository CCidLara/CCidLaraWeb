/**
 * CCidLara — Personal Webpage & Vision Archive
 * Core JavaScript Engine
 * Features: Kinetic Title Compression, Bilingual i18n (ES/EN), Optical Waves Canvas,
 * Photo Masonry Gallery, Full Lightbox Modal, Scroll Reveal & Direct Contacts.
 */

// =============================================================================
// 1. Bilingual Translation Dictionary (ES / EN)
// =============================================================================
const translations = {
  es: {
    // Navigation
    navVision: "Visión",
    navDisciplines: "Disciplinas",
    navResearch: "Investigación & IA",
    navVFX: "Arte Técnico",
    navPhoto: "Fotografía",
    navProjects: "Proyectos",
    navContact: "Contacto",
    getCV: "Descargar CV",

    // Hero
    heroBadge: "Investigador en Visión por Computador · Ingeniero · Artista",
    titleFull: "CHRISTOFER CID LARA",
    titleCompressed: "CCidLara",
    heroStatement: "Investigando la <em>visión</em> a través de la luz, el aprendizaje profundo, los efectos matemáticos y la fotografía.",
    heroTagAI: "Investigación en IA",
    heroTagPhoto: "Fotografía & Óptica",
    heroTagTechArt: "Arte Técnico & Shaders",
    heroTagDev: "Sistemas & R&D",
    heroCTAWorks: "Explorar Obras",
    heroCTAContact: "Contacto Directo",
    heroScroll: "Desplazar",

    // Section 1: Vision / About
    aboutMeta: "01 / Fundamento & Trayectoria",
    aboutTitle: "El prisma de la <em>visión integral</em>",
    aboutQuote: "«La imagen como fenómeno físico, estructura matemática y lenguaje poético.»",
    aboutBio1: "Ingeniero Civil Eléctrico y Magíster (Universidad de Chile). Mi práctica investiga la confluencia entre Deep Learning, simulación en tiempo real y captura óptica territorial.",
    aboutBio2: "Research Engineer en el <em>Instituto Milenio iHEALTH</em> (reconstrucción 3D MRI autosupervisada), Co-fundador y Artista Técnico en <em>Austral Games</em> (Curilemu) y Director de I+D en <em>Cid-Lara Studio</em>.",
    stat1Val: "10+",
    stat1Lbl: "Años de Trayectoria",
    stat2Val: "Nature / ACS",
    stat2Lbl: "Publicaciones Científicas",
    stat3Val: "4000+",
    stat3Lbl: "Fotogramas de Archivo",

    // Section 2: Disciplines
    discMeta: "02 / Cuatro Vertientes",
    discTitle: "Disciplinas de la <em>visión</em>",
    discLead: "La imagen articulada desde cuatro frentes complementarios: el aprendizaje de máquinas, el arte técnico en tiempo real, la captura óptica y el desarrollo de sistemas.",

    disc1Num: "01 // INTELIGENCIA ARTIFICIAL",
    disc1Title: "AI Vision Researcher",
    disc1Desc: "Investigación en arquitecturas neuronales bio-inspiradas (NAS), Deep Image Prior, reconstrucción de imágenes 3D y procesamiento computacional de patrones visuales complejos.",
    
    disc2Num: "02 // ARTE TÉCNICO & MATEMÁTICA",
    disc2Title: "Technical Artist & VFX",
    disc2Desc: "Diseño de sombreadores procedurales HLSL, sistemas de partículas Niagara en Unreal Engine 5, simulación física y dirección técnica para videojuegos narrativos como Curilemu.",

    disc3Num: "03 // FOTOGRAFÍA & TERRITORIO",
    disc3Title: "Fotografía & Artes Mediales",
    disc3Desc: "Documentación visual de alta resolución en zonas extremas de la Patagonia, Araucanía y los Andes. Exploración del espectro infrarrojo (IR), astrofotografía y película analógica de 35mm.",

    disc4Num: "04 // INGENIERÍA & SISTEMAS",
    disc4Title: "Developer & Director I+D",
    disc4Desc: "Dirección de ingeniería en Cid-Lara Studio y NAR Labs. Automatización a escala nanométrica en sistemas láser de femtosegundos (MIRO) y docencia universitaria en sistemas digitales.",

    // Section 3: Research
    resMeta: "03 / Producción Científica",
    resTitle: "Investigación en <em>Visión & Fotónica</em>",
    resLead: "Aportes en reconstrucción de imágenes médicas, búsqueda bio-inspirada de redes neuronales y física de redes fotónicas.",
    resSpotlightInst: "Instituto Milenio iHEALTH · U. de Chile",
    resSpotlightTitle: "Reconstrucción Autosupervisada de Resonancia Magnética 3D Multicontraste",
    resSpotlightP1: "Desarrollo de métodos eficientes basados en <strong>Deep Image Prior (DIP)</strong> para reconstruir volúmenes 3D de alta fidelidad sin requerir grandes conjuntos de entrenamiento supervisado.",
    resSpotlightP2: "Reducción significativa del tiempo de adquisición y artefactos de movimiento mediante optimización estocástica y regularizaciones adaptativas.",
    resPubsHeading: "Publicaciones en Revistas de Alto Impacto",
    pub1Badge: "Nature · Sci Rep",
    pub1Title: "Strain-induced localization to delocalization transition on a Lieb photonic ribbon lattice",
    pub1Desc: "D. Román-Cortés, G. Fadic, C. Cid-Lara et al. · Scientific Reports (2021)",
    pub2Badge: "ACS · Nano Letters",
    pub2Title: "Photonic Molecule Approach to Multiorbital Topology",
    pub2Desc: "M. Mazanov, D. Román-Cortés, G. Cáceres-Aravena, C. Cid, M. A. Gorlach, R. A. Vicencio · Nano Letters (2024)",
    pubLinkText: "Ver Paper →",

    // Section 4: Technical Art & Projects
    projMeta: "04 / Producción Técnica & Obras",
    projTitle: "Efectos Matemáticos & <em>Sistemas</em>",
    projLead: "Implementación de tecnologías visuales, shaders y dirección técnica en producciones interactivas.",
    proj1Role: "Videojuego · Unreal Engine 5 · Co-Fundador & Artista Técnico",
    proj1Title: "Curilemu — Mitología & Horror Austral",
    proj1Desc: "Aventura de acción y horror en tercera persona arraigada en el folklore de Chiloé y la Recta Provincia. Responsable de la arquitectura de Niagara VFX, sombreadores de niebla volumétrica, modelado procedural de bosques y dirección de producción técnica.",
    proj1Link: "Sitio Oficial de Curilemu →",

    proj2Role: "Infraestructura & R&D · Cid-Lara Studio",
    proj2Title: "NAR Labs & Algoritmo Cid-Lara",
    proj2Desc: "Dirección del área de Investigación y Desarrollo tecnológico. Diseño de protocolos de automatización, análisis computacional en tiempo real, soporte algorítmico para obras de Música Aumentada y la Bienal M++ Santiago.",
    proj2Link: "Ver Cid-Lara Studio →",

    proj3Role: "Instituto Milenio de Investigación en Óptica (MIRO)",
    proj3Title: "Micromecanizado Láser de Femtosegundos & Fotónica",
    proj3Desc: "Automatización de sistemas de desplazamiento XYZ a escala nanométrica, estabilización de potencia óptica en tiempo real para grabado láser en cristales y procesamiento en lotes de imágenes microscópicas.",

    // Section 5: Photography
    photoMeta: "05 / Archivo Fotográfico",
    photoTitle: "Colección <em>Fotográfica</em>",
    photoLead: "Un registro visual del territorio austral, la geología andina, el espectro infrarrojo y la textura de la película analógica.",
    filterAll: "Todas",
    filterPhotobook: "Fotolibro IR",
    filterNavarino: "Navarino",
    filterPaine: "Torres del Paine",
    filterCondor: "Sendero Cóndor",
    filterTilcara: "Tilcara / Jujuy",
    filterAraucania: "Araucanía",
    filterPortraits: "Retratos",
    filterEvents: "Eventos",
    photobookSynopsis: "Monografía visual dedicada a la luz invisible y la memoria geológica en el confín austral. Registro multiespectral de estepas, bosques muertos y glaciares sub-antárticos.",
    viewFullArchive: "Abrir Archivo Completo en Alta Resolución →",

    // Section 6: Contact
    contactMeta: "06 / Conexión & Diálogo",
    contactTitle: "Iniciemos una <em>colaboración</em>",
    contactLead: "Abierto a proyectos de investigación en IA/visión, dirección técnica en tiempo real, producciones visuales y conferencias.",
    channelEmail: "Correo Electrónico",
    channelLoc: "Ubicación",
    channelLocVal: "Santiago, Chile (GMT-4)",
    channelStatus: "Disponibilidad",
    channelStatusVal: "I+D · Proyectos Seleccionados · Consultoría",
    copyBtn: "Copiar",
    copiedBtn: "¡Copiado!",
    socialTitle: "Redes & Perfiles Académicos",
    toastCopy: "Correo copiado al portapapeles: ",

    // Footer
    footerDesc: "Christofer Cid Lara — AI Researcher, Technical Artist, Developer & Photographer.",
    footerCopy: "© 2026 Christofer Cid Lara. Todos los derechos reservados.",
    footerLoc: "Santiago de Chile · Confín Austral"
  },

  en: {
    // Navigation
    navVision: "Vision",
    navDisciplines: "Disciplines",
    navResearch: "Research & AI",
    navVFX: "Tech Art",
    navPhoto: "Photography",
    navProjects: "Projects",
    navContact: "Contact",
    getCV: "Download CV",

    // Hero
    heroBadge: "Computer Vision Researcher · Engineer · Visual Artist",
    titleFull: "CHRISTOFER CID LARA",
    titleCompressed: "CCidLara",
    heroStatement: "Investigating <em>vision</em> through light, deep learning, mathematical effects, and photography.",
    heroTagAI: "AI Research",
    heroTagPhoto: "Photography & Optics",
    heroTagTechArt: "Tech Art & Shaders",
    heroTagDev: "Systems & R&D",
    heroCTAWorks: "Explore Works",
    heroCTAContact: "Direct Contact",
    heroScroll: "Scroll",

    // Section 1: Vision / About
    aboutMeta: "01 / Foundation & Background",
    aboutTitle: "The prism of <em>integrated vision</em>",
    aboutQuote: "“The image as physical phenomenon, mathematical structure, and poetic language.”",
    aboutBio1: "Electrical Engineer and M.Sc. (Universidad de Chile). My practice investigates the intersection of Deep Learning, real-time simulation, and territorial optical capture.",
    aboutBio2: "Research Engineer at <em>iHEALTH Millennium Institute</em> (self-supervised 3D MRI reconstruction), Co-founder & Tech Artist at <em>Austral Games</em> (Curilemu), and Director of R&D at <em>Cid-Lara Studio</em>.",
    stat1Val: "10+",
    stat1Lbl: "Years of Experience",
    stat2Val: "Nature / ACS",
    stat2Lbl: "Scientific Publications",
    stat3Val: "4000+",
    stat3Lbl: "Archive Frames",

    // Section 2: Disciplines
    discMeta: "02 / Four Facets",
    discTitle: "Disciplines of <em>Vision</em>",
    discLead: "The visual medium articulated across four complementary fronts: machine learning, real-time technical art, optical capture, and computational systems.",

    disc1Num: "01 // ARTIFICIAL INTELLIGENCE",
    disc1Title: "AI Vision Researcher",
    disc1Desc: "Research into bio-inspired Neural Architecture Search (NAS), Deep Image Prior, 3D multi-contrast image reconstruction, and computational analysis of complex visual patterns.",
    
    disc2Num: "02 // TECHNICAL ART & MATHEMATICS",
    disc2Title: "Technical Artist & VFX",
    disc2Desc: "Design of procedural HLSL shaders, Niagara particle dynamics in Unreal Engine 5, volumetric physics, and technical direction for narrative titles such as Curilemu.",

    disc3Num: "03 // PHOTOGRAPHY & TERRITORY",
    disc3Title: "Fine Art Photography",
    disc3Desc: "High-resolution visual documentation in remote Patagonia, Araucanía, and the Andes. Specialized in infrared spectrum (IR), astrophotography, and 35mm analogue film.",

    disc4Num: "04 // SYSTEMS & ENGINEERING",
    disc4Title: "Developer & Director of R&D",
    disc4Desc: "Engineering direction at Cid-Lara Studio and NAR Labs. Nanometric scale automation for femtosecond laser photonics (MIRO) and university lectures in digital systems.",

    // Section 3: Research
    resMeta: "03 / Scientific Production",
    resTitle: "Research in <em>Vision & Photonics</em>",
    resLead: "Contributions in medical image reconstruction, bio-inspired neural networks, and photonic lattice physics.",
    resSpotlightInst: "iHEALTH Millennium Institute · U. de Chile",
    resSpotlightTitle: "Self-Supervised 3D Multi-Contrast MRI Reconstruction",
    resSpotlightP1: "Development of data-efficient methods based on <strong>Deep Image Prior (DIP)</strong> to reconstruct high-fidelity 3D medical volumes without requiring large supervised training databases.",
    resSpotlightP2: "Significant reduction of acquisition time and motion artifacts via stochastic optimization and adaptive regularizers.",
    resPubsHeading: "Publications in High-Impact Journals",
    pub1Badge: "Nature · Sci Rep",
    pub1Title: "Strain-induced localization to delocalization transition on a Lieb photonic ribbon lattice",
    pub1Desc: "D. Román-Cortés, G. Fadic, C. Cid-Lara et al. · Scientific Reports (2021)",
    pub2Badge: "ACS · Nano Letters",
    pub2Title: "Photonic Molecule Approach to Multiorbital Topology",
    pub2Desc: "M. Mazanov, D. Román-Cortés, G. Cáceres-Aravena, C. Cid, M. A. Gorlach, R. A. Vicencio · Nano Letters (2024)",
    pubLinkText: "View Paper →",

    // Section 4: Technical Art & Projects
    projMeta: "04 / Technical Production & Works",
    projTitle: "Mathematical Effects & <em>Systems</em>",
    projLead: "Implementation of real-time visual technologies, shaders, and technical direction in interactive productions.",
    proj1Role: "Videogame · Unreal Engine 5 · Co-Founder & Tech Artist",
    proj1Title: "Curilemu — Southern Mythology & Action RPG",
    proj1Desc: "Third-person dark fantasy action RPG rooted in the folklore and myths of Chiloé. Responsible for Niagara VFX architecture, volumetric fog shaders, procedural forest generation, and executive production pipelines.",
    proj1Link: "Official Curilemu Website →",

    proj2Role: "Infrastructure & R&D · Cid-Lara Studio",
    proj2Title: "NAR Labs & Cid-Lara Algorithm",
    proj2Desc: "Directing research and technological development. Engineering automation protocols, real-time computational analysis, and algorithmic infrastructure supporting Augmented Music productions and the M++ Santiago Biennial.",
    proj2Link: "Visit Cid-Lara Studio →",

    proj3Role: "Millennium Institute for Research in Optics (MIRO)",
    proj3Title: "Femtosecond Laser Micromachining & Photonics",
    proj3Desc: "Nanometric XYZ motorized stage automation, real-time optical power stabilization for waveguide inscription, and batch microscopic image analysis systems.",

    // Section 5: Photography
    photoMeta: "05 / Photographic Archive",
    photoTitle: "Curated <em>Portfolio</em>",
    photoLead: "A visual archive of sub-antarctic territories, Andean geology, infrared wavelengths, and film emulsion grain.",
    filterAll: "All",
    filterPhotobook: "Photobook IR",
    filterNavarino: "Navarino",
    filterPaine: "Torres del Paine",
    filterCondor: "Sendero Cóndor",
    filterTilcara: "Tilcara / Jujuy",
    filterAraucania: "Araucanía",
    filterPortraits: "Portraits",
    filterEvents: "Events",
    photobookSynopsis: "Visual monograph exploring invisible wavelengths and geological memory in southern Patagonia. Multispectral capture of steppes, dead forests, and sub-antarctic glaciers.",
    viewFullArchive: "Open Complete High-Res Archive →",

    // Section 6: Contact
    contactMeta: "06 / Connect & Inquiries",
    contactTitle: "Initiate a <em>dialogue</em>",
    contactLead: "Available for research collaborations in AI/vision, real-time technical direction, visual commissions, and lectures.",
    channelEmail: "Email Address",
    channelLoc: "Location",
    channelLocVal: "Santiago, Chile (GMT-4)",
    channelStatus: "Status",
    channelStatusVal: "R&D · Selected Projects · Consulting",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    socialTitle: "Academic & Professional Profiles",
    toastCopy: "Email copied to clipboard: ",

    // Footer
    footerDesc: "Christofer Cid Lara — AI Researcher, Technical Artist, Developer & Photographer.",
    footerCopy: "© 2026 Christofer Cid Lara. All rights reserved.",
    footerLoc: "Santiago, Chile · Southern Reach"
  }
};

let currentLang = 'es';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('ccidlara_lang', lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update Language switch buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// =============================================================================
// 2. Kinetic Title Compression Engine (CHRISTOFER CID LARA -> CCidLara)
// =============================================================================
function initKineticTitle() {
  const wrapper = document.querySelector('.kinetic-title-wrapper');
  if (!wrapper) return;

  // Trigger compression smoothly after initial cinematic load
  setTimeout(() => {
    wrapper.classList.add('compressed');
  }, 1600);

  // Allow clicking on title to toggle expanded / compressed
  wrapper.addEventListener('click', () => {
    wrapper.classList.toggle('compressed');
  });

  const replayBtn = document.querySelector('.kinetic-replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.remove('compressed');
      setTimeout(() => {
        wrapper.classList.add('compressed');
      }, 1800);
    });
  }
}

// =============================================================================
// 3. Interactive Optical Waves Canvas Background
// =============================================================================
function initVisionCanvas() {
  const canvas = document.getElementById('vision-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let mouse = { x: null, y: null, targetX: null, targetY: null };
  let time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    if (!mouse.x) {
      mouse.x = mouse.targetX = width / 2;
      mouse.y = mouse.targetY = height / 2;
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Optical Wave Lines & Diffraction Nodes
  const numLines = 14;

  function draw() {
    time += 0.012;
    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Subtle dark ambient gradient
    const grad = ctx.createRadialGradient(
      mouse.x, mouse.y, 10,
      mouse.x, mouse.y, Math.max(width, height) * 0.6
    );
    grad.addColorStop(0, 'rgba(197, 34, 31, 0.035)');
    grad.addColorStop(0.5, 'rgba(12, 12, 18, 0.02)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Render optical wave curves
    for (let i = 0; i < numLines; i++) {
      ctx.beginPath();
      const progress = i / numLines;
      const yBase = height * 0.15 + (height * 0.75 * progress);
      const waveFreq = 0.0018 + (i * 0.0002);
      const waveAmp = 25 + (Math.sin(time + i) * 15);

      ctx.moveTo(0, yBase);

      for (let x = 0; x < width; x += 16) {
        const distToMouse = Math.hypot(x - mouse.x, yBase - mouse.y);
        const mouseRepel = Math.max(0, (1 - distToMouse / 350)) * 30;

        const y = yBase +
          Math.sin(x * waveFreq + time + (i * 0.6)) * waveAmp +
          Math.cos((x * 0.003) - time) * (waveAmp * 0.5) -
          (mouse.y < yBase ? -mouseRepel : mouseRepel);

        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = i % 4 === 0
        ? `rgba(197, 34, 31, ${0.12 + (i * 0.01)})`
        : `rgba(245, 242, 235, ${0.03 + (i * 0.005)})`;
      ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.8;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// =============================================================================
// 4. Photography Gallery & Lightbox Controller
// =============================================================================
const curatedGalleryItems = [
  {
    "id": "photo-1",
    "cat": "photobook",
    "title": "Estepa Infrarroja",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_01_thumb.webp",
    "full": "images/portfolio/photobook_01.webp"
  },
  {
    "id": "photo-2",
    "cat": "photobook",
    "title": "Reflectancia Clorofilica",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_02_thumb.webp",
    "full": "images/portfolio/photobook_02.webp"
  },
  {
    "id": "photo-3",
    "cat": "photobook",
    "title": "Laguna Espectral",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_03_thumb.webp",
    "full": "images/portfolio/photobook_03.webp"
  },
  {
    "id": "photo-4",
    "cat": "photobook",
    "title": "Cromatica Multiespectral",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_04_thumb.webp",
    "full": "images/portfolio/photobook_04.webp"
  },
  {
    "id": "photo-5",
    "cat": "photobook",
    "title": "Bosque Fantasma",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_05_thumb.webp",
    "full": "images/portfolio/photobook_05.webp"
  },
  {
    "id": "photo-6",
    "cat": "photobook",
    "title": "Horizonte de Hielo IR",
    "series": "Fotolibro IR · 720nm",
    "thumb": "images/portfolio/photobook_06_thumb.webp",
    "full": "images/portfolio/photobook_06.webp"
  },
  {
    "id": "photo-7",
    "cat": "navarino",
    "title": "Canal Beagle y Confin Austral",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_01_thumb.webp",
    "full": "images/portfolio/navarino_01.webp"
  },
  {
    "id": "photo-8",
    "cat": "navarino",
    "title": "Laguna del Salto",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_02_thumb.webp",
    "full": "images/portfolio/navarino_02.webp"
  },
  {
    "id": "photo-9",
    "cat": "navarino",
    "title": "Macizo de los Dientes",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_03_thumb.webp",
    "full": "images/portfolio/navarino_03.webp"
  },
  {
    "id": "photo-10",
    "cat": "navarino",
    "title": "Valle de Turba y Ventisquero",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_04_thumb.webp",
    "full": "images/portfolio/navarino_04.webp"
  },
  {
    "id": "photo-11",
    "cat": "navarino",
    "title": "Laguna de los Dientes",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_05_thumb.webp",
    "full": "images/portfolio/navarino_05.webp"
  },
  {
    "id": "photo-12",
    "cat": "navarino",
    "title": "Paso de los Dientes",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_06_thumb.webp",
    "full": "images/portfolio/navarino_06.webp"
  },
  {
    "id": "photo-13",
    "cat": "navarino",
    "title": "Paso Ventarron",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_07_thumb.webp",
    "full": "images/portfolio/navarino_07.webp"
  },
  {
    "id": "photo-14",
    "cat": "navarino",
    "title": "Descenso a Puerto Williams",
    "series": "Dientes de Navarino 55°S",
    "thumb": "images/portfolio/navarino_08_thumb.webp",
    "full": "images/portfolio/navarino_08.webp"
  },
  {
    "id": "photo-15",
    "cat": "torres-del-paine",
    "title": "Cuernos del Paine al Alba",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_01_thumb.webp",
    "full": "images/portfolio/torres_del_paine_01.webp"
  },
  {
    "id": "photo-16",
    "cat": "torres-del-paine",
    "title": "Lago Nordenskjold",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_02_thumb.webp",
    "full": "images/portfolio/torres_del_paine_02.webp"
  },
  {
    "id": "photo-17",
    "cat": "torres-del-paine",
    "title": "Valle del Frances",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_03_thumb.webp",
    "full": "images/portfolio/torres_del_paine_03.webp"
  },
  {
    "id": "photo-18",
    "cat": "torres-del-paine",
    "title": "Glaciar Grey y Tempanos",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_04_thumb.webp",
    "full": "images/portfolio/torres_del_paine_04.webp"
  },
  {
    "id": "photo-19",
    "cat": "torres-del-paine",
    "title": "Torres del Paine",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_05_thumb.webp",
    "full": "images/portfolio/torres_del_paine_05.webp"
  },
  {
    "id": "photo-20",
    "cat": "torres-del-paine",
    "title": "Lago Pehoe y Viento",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_06_thumb.webp",
    "full": "images/portfolio/torres_del_paine_06.webp"
  },
  {
    "id": "photo-21",
    "cat": "torres-del-paine",
    "title": "Laguna Amarga",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_07_thumb.webp",
    "full": "images/portfolio/torres_del_paine_07.webp"
  },
  {
    "id": "photo-22",
    "cat": "torres-del-paine",
    "title": "Rio Paine",
    "series": "Parque Nacional Torres del Paine",
    "thumb": "images/portfolio/torres_del_paine_08_thumb.webp",
    "full": "images/portfolio/torres_del_paine_08.webp"
  },
  {
    "id": "photo-23",
    "cat": "sendero-condor",
    "title": "Mirador Condor — Panoramica Pehoe",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_01_thumb.webp",
    "full": "images/portfolio/sendero_condor_01.webp"
  },
  {
    "id": "photo-24",
    "cat": "sendero-condor",
    "title": "Relieve del Macizo",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_02_thumb.webp",
    "full": "images/portfolio/sendero_condor_02.webp"
  },
  {
    "id": "photo-25",
    "cat": "sendero-condor",
    "title": "Vientos del Condor",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_03_thumb.webp",
    "full": "images/portfolio/sendero_condor_03.webp"
  },
  {
    "id": "photo-26",
    "cat": "sendero-condor",
    "title": "Cuernos desde las Alturas",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_04_thumb.webp",
    "full": "images/portfolio/sendero_condor_04.webp"
  },
  {
    "id": "photo-27",
    "cat": "sendero-condor",
    "title": "Horizonte Turquesa",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_05_thumb.webp",
    "full": "images/portfolio/sendero_condor_05.webp"
  },
  {
    "id": "photo-28",
    "cat": "sendero-condor",
    "title": "Estepa y Contrafuerte",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_06_thumb.webp",
    "full": "images/portfolio/sendero_condor_06.webp"
  },
  {
    "id": "photo-29",
    "cat": "sendero-condor",
    "title": "Luz del Ocaso sobre Cuernos",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_07_thumb.webp",
    "full": "images/portfolio/sendero_condor_07.webp"
  },
  {
    "id": "photo-30",
    "cat": "sendero-condor",
    "title": "Atmosfera Patagonica",
    "series": "Mirador Condor · Pehoe",
    "thumb": "images/portfolio/sendero_condor_08_thumb.webp",
    "full": "images/portfolio/sendero_condor_08.webp"
  },
  {
    "id": "photo-31",
    "cat": "tilcara-jujuy",
    "title": "Quebrada de Humahuaca",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_01_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_01.webp"
  },
  {
    "id": "photo-32",
    "cat": "tilcara-jujuy",
    "title": "Pucara de Tilcara",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_02_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_02.webp"
  },
  {
    "id": "photo-33",
    "cat": "tilcara-jujuy",
    "title": "Serranias del Hornocal — 14 Colores",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_03_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_03.webp"
  },
  {
    "id": "photo-34",
    "cat": "tilcara-jujuy",
    "title": "Estructura Geologica Hornocal",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_04_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_04.webp"
  },
  {
    "id": "photo-35",
    "cat": "tilcara-jujuy",
    "title": "Garganta del Diablo — Tilcara",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_05_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_05.webp"
  },
  {
    "id": "photo-36",
    "cat": "tilcara-jujuy",
    "title": "Salinas Grandes y Luz",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_06_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_06.webp"
  },
  {
    "id": "photo-37",
    "cat": "tilcara-jujuy",
    "title": "Purmamarca y Siete Colores",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_07_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_07.webp"
  },
  {
    "id": "photo-38",
    "cat": "tilcara-jujuy",
    "title": "Atardecer en la Quebrada",
    "series": "Noroeste Argentino y Puna",
    "thumb": "images/portfolio/tilcara_jujuy_08_thumb.webp",
    "full": "images/portfolio/tilcara_jujuy_08.webp"
  },
  {
    "id": "photo-39",
    "cat": "araucania",
    "title": "Bosque de Araucarias y Nieve",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_01_thumb.webp",
    "full": "images/portfolio/araucania_01.webp"
  },
  {
    "id": "photo-40",
    "cat": "araucania",
    "title": "Laguna Arcoiris",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_02_thumb.webp",
    "full": "images/portfolio/araucania_02.webp"
  },
  {
    "id": "photo-41",
    "cat": "araucania",
    "title": "Araucaria Milenaria",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_03_thumb.webp",
    "full": "images/portfolio/araucania_03.webp"
  },
  {
    "id": "photo-42",
    "cat": "araucania",
    "title": "Volcan Lonquimay y Escoria",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_04_thumb.webp",
    "full": "images/portfolio/araucania_04.webp"
  },
  {
    "id": "photo-43",
    "cat": "araucania",
    "title": "Bosque Siempreverde Andino",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_05_thumb.webp",
    "full": "images/portfolio/araucania_05.webp"
  },
  {
    "id": "photo-44",
    "cat": "araucania",
    "title": "Lava y Nieve",
    "series": "Bosques Templados y Volcanes",
    "thumb": "images/portfolio/araucania_06_thumb.webp",
    "full": "images/portfolio/araucania_06.webp"
  },
  {
    "id": "photo-45",
    "cat": "portraits",
    "title": "Retrato Austral I",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_01_thumb.webp",
    "full": "images/portfolio/portraits_01.webp"
  },
  {
    "id": "photo-46",
    "cat": "portraits",
    "title": "Mirada y Territorio",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_02_thumb.webp",
    "full": "images/portfolio/portraits_02.webp"
  },
  {
    "id": "photo-47",
    "cat": "portraits",
    "title": "Retrato Austral II",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_03_thumb.webp",
    "full": "images/portfolio/portraits_03.webp"
  },
  {
    "id": "photo-48",
    "cat": "portraits",
    "title": "Gesto y Presencia",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_04_thumb.webp",
    "full": "images/portfolio/portraits_04.webp"
  },
  {
    "id": "photo-49",
    "cat": "portraits",
    "title": "Luz de Estudio y Optica 50mm",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_05_thumb.webp",
    "full": "images/portfolio/portraits_05.webp"
  },
  {
    "id": "photo-50",
    "cat": "portraits",
    "title": "Retrato en Sombras Suaves",
    "series": "Retratos Autorales y Luz Territorial",
    "thumb": "images/portfolio/portraits_06_thumb.webp",
    "full": "images/portfolio/portraits_06.webp"
  },
  {
    "id": "photo-51",
    "cat": "events",
    "title": "Preparativos y Detalle",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_01_thumb.webp",
    "full": "images/portfolio/events_01.webp"
  },
  {
    "id": "photo-52",
    "cat": "events",
    "title": "Emocion y Rito",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_02_thumb.webp",
    "full": "images/portfolio/events_02.webp"
  },
  {
    "id": "photo-53",
    "cat": "events",
    "title": "Llegada de la Novia",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_03_thumb.webp",
    "full": "images/portfolio/events_03.webp"
  },
  {
    "id": "photo-54",
    "cat": "events",
    "title": "Votos y Miradas",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_04_thumb.webp",
    "full": "images/portfolio/events_04.webp"
  },
  {
    "id": "photo-55",
    "cat": "events",
    "title": "Celebracion y Brindis",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_05_thumb.webp",
    "full": "images/portfolio/events_05.webp"
  },
  {
    "id": "photo-56",
    "cat": "events",
    "title": "Fiesta y Luz de Escenario",
    "series": "Fotografia Documental de Bodas y Eventos",
    "thumb": "images/portfolio/events_06_thumb.webp",
    "full": "images/portfolio/events_06.webp"
  }
];

let activeFilteredItems = [...curatedGalleryItems];
let currentLightboxIndex = 0;

function renderGallery(filter = 'all') {
  const container = document.getElementById('photoMasonryGrid');
  if (!container) return;

  activeFilteredItems = filter === 'all'
    ? curatedGalleryItems
    : curatedGalleryItems.filter(item => item.cat === filter);

  container.innerHTML = activeFilteredItems.map((item, index) => `
    <div class="photo-card reveal active" data-index="${index}" onclick="openLightbox(${index})">
      <img src="${item.thumb}" alt="${item.title}" class="photo-img" loading="lazy" />
      <div class="photo-hover-overlay">
        <h4 class="photo-title">${item.title}</h4>
        <p class="photo-sub">${item.series}</p>
      </div>
    </div>
  `).join('');
}

function openLightbox(index) {
  if (index < 0 || index >= activeFilteredItems.length) return;
  currentLightboxIndex = index;
  const modal = document.getElementById('lightboxModal');
  const mainImg = document.getElementById('lightboxMainImg');
  const captionTitle = document.getElementById('lightboxTitle');
  const captionSeries = document.getElementById('lightboxSeries');

  const item = activeFilteredItems[index];
  mainImg.src = item.full;
  captionTitle.textContent = item.title;
  captionSeries.textContent = item.series;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % activeFilteredItems.length;
  openLightbox(currentLightboxIndex);
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + activeFilteredItems.length) % activeFilteredItems.length;
  openLightbox(currentLightboxIndex);
}

function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderGallery(cat);
    });
  });

  // Lightbox keyboard controls
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

// =============================================================================
// 5. Scroll Reveal & Navbar Sticky Effects
// =============================================================================
function initScrollEffects() {
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Reveal Elements
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// =============================================================================
// 6. Direct Contact & Email Copy
// =============================================================================
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toastMsg');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = (translations[currentLang].toastCopy || 'Copied: ') + email;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      const originalText = btn.textContent;
      btn.textContent = translations[currentLang].copiedBtn || 'Copied!';
      btn.style.background = 'var(--color-red)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    });
  }).catch(err => {
    window.location.href = `mailto:${email}`;
  });
}

// =============================================================================
// 7. Mobile Navigation Toggle
// =============================================================================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

// =============================================================================
// Initialization on DOM Ready
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Setup
  const savedLang = localStorage.getItem('ccidlara_lang') ||
    (navigator.language && navigator.language.startsWith('en') ? 'en' : 'es');
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  // 2. Visual Effects & Features
  initKineticTitle();
  initVisionCanvas();
  renderGallery('all');
  initGalleryFilters();
  initScrollEffects();
  initMobileMenu();
});
window.triggerCategoryFilter = function(cat) {
  const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
  if (btn) {
    btn.click();
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
