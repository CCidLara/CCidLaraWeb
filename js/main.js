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
    navLab: "Lab Generativo",
    navVFX: "Arte Técnico",
    navPhoto: "Fotografía ↗",
    navProjects: "Proyectos",
    navContact: "Contacto",
    navStudioBadge: "Cid-Lara Studio",
    getCV: "Descargar CV",

    // Hero
    heroStudioBadge: "Director of R&D at Cid-Lara Studio",
    heroBadge: "IA & Visión Computacional · Arte Técnico UE5 · R&D",
    titleFull: "CHRISTOFER CID LARA",
    titleCompressed: "[ CCidLara ]",
    heroStatement: "Inteligencia artificial, arte técnico en tiempo real, dirección de I+D y documentación territorial.",
    heroTagAI: "Investigación en IA",
    heroTagPhoto: "Fotografía & Territorio",
    heroTagTechArt: "Arte Técnico & Shaders",
    heroTagDev: "Cid-Lara Studio & R&D",
    heroCTAWorks: "Explorar Obras",
    heroCTAContact: "Contacto Directo",
    heroScroll: "Desplazar",
    kineticBtn: "KINETIC FOCUS",

    // Section 1: Vision / About
    aboutMeta: "01 / Fundamento & Trayectoria",
    aboutTitle: "Inteligencia Artificial, Sistemas & <em>Territorio</em>",
    aboutQuote: "«La imagen como síntesis generativa, estructura matemática en tiempo real y documento territorial.»",
    aboutBio1: "Ingeniero Civil Eléctrico y Magíster en Ciencias de la Ingeniería (Universidad de Chile). Mi práctica investiga la confluencia entre modelos generativos para reconstrucción de imágenes biomédicas, arte técnico en motores de tiempo real (Unreal Engine 5) y documentación fotográfica multiespectral.",
    aboutBio2: "Me desempeño como Director de I+D en <em>Cid-Lara Studio</em> (organización matriz de producción cultural de alta complejidad e infraestructura computacional dirigida por Jaime Cid-Lara) y lidero <em>NAR Labs</em>. Asimismo, investigo modelos de Deep Image Prior en el <em>Instituto Milenio iHEALTH</em> y dirijo la arquitectura técnica en <em>Austral Games</em> (Curilemu).",
    stat1Val: "10+",
    stat1Lbl: "Años de Trayectoria",
    stat2Val: "iHEALTH / UChile",
    stat2Lbl: "Investigación en IA",
    stat3Val: "4000+",
    stat3Lbl: "Fotogramas de Archivo",

    // Section 2: Disciplines
    discMeta: "02 / Cuatro Vertientes",
    discTitle: "Líneas de Trabajo",
    discLead: "Práctica articulada en cuatro áreas concretas: aprendizaje profundo en imagenología médica, arte técnico para videojuegos, documentación fotográfica territorial y dirección de I+D independiente.",

    disc1Num: "01 // INTELIGENCIA ARTIFICIAL",
    disc1Title: "AI Vision Researcher",
    disc1Desc: "Reconstrucción 3D MRI sin supervisión, arquitecturas neuronales bio-inspiradas (NAS) y Deep Image Prior para tensores volumétricos médicos y patrones visuales complejos.",
    
    disc2Num: "02 // ARTE TÉCNICO & TIEMPO REAL",
    disc2Title: "Technical Artist & VFX",
    disc2Desc: "Sombreadores procedurales HLSL, sistemas de partículas Niagara en Unreal Engine 5, simulación física y dirección técnica para producciones interactivas como Curilemu.",

    disc3Num: "03 // FOTOGRAFÍA & TERRITORIO",
    disc3Title: "Fotografía & Territorio",
    disc3Desc: "Documentación territorial en Dientes de Navarino (55°S), Torres del Paine, Serranías del Hornocal (4350m) y Araucanía Andina. Fotolibro monográfico en espectro infrarrojo (720nm) y película 35mm.",

    disc4Num: "04 // I+D INDEPENDIENTE & SISTEMAS",
    disc4Title: "Director I+D · Cid-Lara Studio",
    disc4Desc: "Dirección de I+D tecnológico en Cid-Lara Studio y NAR Labs. Diseño de protocolos de automatización, análisis computacional en tiempo real y soporte algorítmico para obras de alta complejidad.",

    // Section 3: Research
    resMeta: "03 / Producción Científica & Algoritmos",
    resTitle: "Investigación en <em>IA & Visión Computacional</em>",
    resLead: "Aportes en reconstrucción de imágenes biomédicas 3D, búsqueda bio-inspirada de arquitecturas neuronales y modelos de Deep Image Prior (DIP).",
    resSpotlightInst: "Instituto Milenio iHEALTH · U. de Chile",
    resSpotlightTitle: "Reconstrucción Autosupervisada de Resonancia Magnética 3D Multicontraste",
    resSpotlightP1: "Desarrollo de métodos eficientes basados en <strong>Deep Image Prior (DIP)</strong> para reconstruir volúmenes 3D de alta fidelidad sin requerir grandes conjuntos de entrenamiento supervisado.",
    resSpotlightP2: "Reducción del tiempo de adquisición y supresión de artefactos de movimiento mediante optimización estocástica y regularizaciones de fase.",
    resPubsHeading: "Líneas de Investigación en IA & Publicaciones",
    pub1Badge: "iHEALTH · Deep Learning",
    pub1Title: "Reconstrucción 3D MRI Autosupervisada mediante Deep Image Prior",
    pub1Desc: "Modelos generativos para reconstrucción volumétrica multicontraste sin grandes bases de datos supervisadas. · iHEALTH (2024–2026)",
    pub2Badge: "FCFM · Visión Computacional",
    pub2Title: "Búsqueda Bio-inspirada de Arquitecturas Neuronales (NAS)",
    pub2Desc: "Optimización evolutiva de campos receptivos retinotópicos y conectividad sináptica para imagenología compleja. (2023–2025)",
    pubLinkText: "Consultar CV →",

    // Section 3-B: p5.js Generative Lab
    p5LabTitle: "Laboratorio Generativo de <em>IA & Latent Space</em>",
    p5LabLead: "Exploración táctil interactiva de campos tensoriales, redes sinápticas bio-inspiradas (NAS) y dinámicas de partículas en tiempo real. Haz clic en el lienzo para emitir pulsos latentes o arrastra para deformar el flujo vectorial.",
    p5CanvasHint: "⚡ CLICK: ONDA DE CHOQUE // ARRASTRE: FLUJO TENSORIAL",
    p5CockpitBadge: "MODOS GENERATIVOS // CONTROL TÁCTIL",
    p5Mode1Title: "01 // LATENT FLOW FIELD",
    p5Mode1Desc: "Generative Deep Prior · Curl Noise Tensor Flow",
    p5Mode2Title: "02 // SYNAPTIC NAS MESH",
    p5Mode2Desc: "Bio-inspired Neural Architecture Search · Dynamic Axons",
    p5Mode3Title: "03 // NIAGARA PROCEDURAL VFX",
    p5Mode3Desc: "Unreal Engine 5 · Real-Time Particle Turbulence",
    p5ReseedBtn: "RE-SEED LATENTE",

    // Section 4: Technical Art & Projects
    projMeta: "04 / Producción Técnica & Obras",
    projTitle: "Efectos Matemáticos & Sistemas",
    projLead: "Implementación de tecnologías visuales en tiempo real, sombreadores procedurales y dirección técnica.",
    proj1Role: "Videojuego · Unreal Engine 5 · Co-Fundador & Artista Técnico",
    proj1Title: "Curilemu — Mitología & Horror Austral",
    proj1Desc: "Aventura de acción y horror en tercera persona arraigada en el folklore de Chiloé y la Recta Provincia. Responsable de la arquitectura de Niagara VFX, sombreadores de niebla volumétrica, modelado procedural de bosques y dirección de producción técnica.",
    proj1Link: "Sitio Oficial de Curilemu →",

    proj2Role: "Infraestructura Matriz & R&D · Cid-Lara Studio",
    proj2Title: "NAR Labs & Algoritmo Cid-Lara",
    proj2Desc: "Dirección del área de Investigación y Desarrollo tecnológico. Cid-Lara Studio es la entidad matriz de alta complejidad que articula composición, ingeniería, inteligencia artificial y producción institucional; dentro de ella dirijo NAR Labs, creando la infraestructura algorítmica y sistemas en tiempo real para obras de Música Aumentada.",
    proj2Link: "Conocer Cid-Lara Studio (jaimecidlara.com) →",

    studioEcosystemTitle: "Cid-Lara Studio — Entidad Matriz de Creación & I+D",
    studioEcosystemDesc: "Cid-Lara Studio constituye la cúspide organizacional y artística dirigida por Jaime Cid-Lara. Articula investigación territorial, producción de alta escala y tecnología bajo una estructura unificada:",

    // Section 5: Photography
    photoMeta: "05 / Fotografía & Territorio",
    photoTitle: "Monografía & <em>Archivo Fotográfico</em>",
    photoLead: "Registro visual del territorio austral, geología andina y espectro infrarrojo (720nm). El archivo integral se encuentra alojado en su página dedicada.",
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
    portalBannerTitle: "Archivo Fotográfico Completo (Colección 40+ Obras)",
    portalBannerDesc: "Explora el archivo completo en alta resolución organizado por expediciones territoriales (Navarino, Paine, Sendero Cóndor, Jujuy, Araucanía, Retratos y Eventos) con visor lightbox interactivo.",
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
    footerDesc: "Christofer Cid Lara — Director of R&D at Cid-Lara Studio · AI Researcher, Technical Artist & Photographer.",
    footerCopy: "© 2026 Christofer Cid Lara · Cid-Lara Studio. Todos los derechos reservados.",
    footerLoc: "Santiago de Chile · Confín Austral"
  },

  en: {
    // Navigation
    navVision: "Vision",
    navDisciplines: "Disciplines",
    navResearch: "Research & AI",
    navLab: "Generative Lab",
    navVFX: "Tech Art",
    navPhoto: "Photography ↗",
    navProjects: "Projects",
    navContact: "Contact",
    navStudioBadge: "Cid-Lara Studio",
    getCV: "Download CV",

    // Hero
    heroStudioBadge: "Director of R&D at Cid-Lara Studio",
    heroBadge: "AI & Computer Vision · UE5 Tech Art · R&D",
    titleFull: "CHRISTOFER CID LARA",
    titleCompressed: "[ CCidLara ]",
    heroStatement: "Artificial intelligence, real-time technical art, R&D direction, and territorial documentation.",
    heroTagAI: "AI Research",
    heroTagPhoto: "Photography & Territory",
    heroTagTechArt: "Tech Art & Shaders",
    heroTagDev: "Cid-Lara Studio & R&D",
    heroCTAWorks: "Explore Works",
    heroCTAContact: "Direct Contact",
    heroScroll: "Scroll",
    kineticBtn: "KINETIC FOCUS",

    // Section 1: Vision / About
    aboutMeta: "01 / Foundation & Practice",
    aboutTitle: "Artificial Intelligence, Systems & <em>Territory</em>",
    aboutQuote: "“The image as generative synthesis, real-time mathematical structure, and territorial document.”",
    aboutBio1: "Civil Electrical Engineer and M.Sc. in Engineering Sciences from Universidad de Chile. My practice investigates the intersection of generative image reconstruction, real-time technical art in Unreal Engine 5, and multispectral territorial photography.",
    aboutBio2: "I serve as Director of R&D at <em>Cid-Lara Studio</em> (head umbrella organization for high-complexity cultural production and computational systems directed by Jaime Cid-Lara) and lead <em>NAR Labs</em>. Additionally, I research Deep Image Prior models at the <em>iHEALTH Millennium Institute</em> and lead technical architecture at <em>Austral Games</em> (Curilemu).",
    stat1Val: "10+",
    stat1Lbl: "Years of Practice",
    stat2Val: "iHEALTH / UChile",
    stat2Lbl: "AI Research",
    stat3Val: "4000+",
    stat3Lbl: "Archive Frames",

    // Section 2: Disciplines
    discMeta: "02 / Areas of Practice",
    discTitle: "Lines of Work",
    discLead: "Practice articulated across four concrete domains: deep learning in medical imaging, technical art for games, territorial photographic documentation, and independent R&D direction.",

    disc1Num: "01 // ARTIFICIAL INTELLIGENCE",
    disc1Title: "AI Vision Researcher",
    disc1Desc: "Unsupervised 3D MRI reconstruction, bio-inspired Neural Architecture Search (NAS), and Deep Image Prior for biomedical volumetric tensors and complex visual patterns.",
    
    disc2Num: "02 // TECHNICAL ART & REAL-TIME",
    disc2Title: "Technical Artist & VFX",
    disc2Desc: "Procedural HLSL shaders, Niagara particle dynamics in Unreal Engine 5, physical simulation, and technical direction for interactive productions such as Curilemu.",

    disc3Num: "03 // PHOTOGRAPHY & TERRITORY",
    disc3Title: "Photography & Territory",
    disc3Desc: "Territorial documentation across Dientes de Navarino (55°S), Torres del Paine, Serranías del Hornocal (4350m), and Andean Araucanía. Monograph in 720nm infrared and 35mm film.",

    disc4Num: "04 // INDEPENDENT R&D & SYSTEMS",
    disc4Title: "Director of R&D · Cid-Lara Studio",
    disc4Desc: "Directing technology and R&D at Cid-Lara Studio and NAR Labs. Designing automation protocols, real-time computational analysis, and algorithmic infrastructure for high-complexity works.",

    // Section 3: Research
    resMeta: "03 / Scientific Research & Algorithms",
    resTitle: "Research in <em>AI & Computer Vision</em>",
    resLead: "Contributions in 3D biomedical image reconstruction, bio-inspired neural architecture search (NAS), and Deep Image Prior (DIP).",
    resSpotlightInst: "iHEALTH Millennium Institute · U. de Chile",
    resSpotlightTitle: "Unsupervised 3D Multi-Contrast MRI Reconstruction",
    resSpotlightP1: "Data-efficient methods based on <strong>Deep Image Prior (DIP)</strong> to reconstruct high-fidelity 3D medical volumes without requiring large supervised training databases.",
    resSpotlightP2: "Acquisition time acceleration and motion artifact mitigation via stochastic optimization and phase-regularized loss functions.",
    resPubsHeading: "AI Research Tracks & Publications",
    pub1Badge: "iHEALTH · Deep Learning",
    pub1Title: "Self-Supervised 3D MRI Reconstruction via Deep Image Prior",
    pub1Desc: "Generative models for multi-contrast volumetric reconstruction without massive supervised datasets. · iHEALTH (2024–2026)",
    pub2Badge: "FCFM · Computer Vision",
    pub2Title: "Bio-Inspired Neural Architecture Search (NAS)",
    pub2Desc: "Evolutionary optimization of retinotopic receptive fields and synaptic connectivity for complex imaging systems. (2023–2025)",
    pubLinkText: "Inquire CV / Paper →",

    // Section 3-B: p5.js Generative Lab
    p5LabTitle: "Generative AI & <em>Latent Space Lab</em>",
    p5LabLead: "Interactive tactile exploration of tensor fields, bio-inspired synaptic networks (NAS), and real-time particle dynamics. Click on the canvas to emit latent pulse waves or drag to bend tensor flow vectors.",
    p5CanvasHint: "⚡ CLICK: SHOCKWAVE // DRAG: TENSOR FLOW",
    p5CockpitBadge: "GENERATIVE MODES // TACTILE CONTROL",
    p5Mode1Title: "01 // LATENT FLOW FIELD",
    p5Mode1Desc: "Generative Deep Prior · Curl Noise Tensor Flow",
    p5Mode2Title: "02 // SYNAPTIC NAS MESH",
    p5Mode2Desc: "Bio-inspired Neural Architecture Search · Dynamic Axons",
    p5Mode3Title: "03 // NIAGARA PROCEDURAL VFX",
    p5Mode3Desc: "Unreal Engine 5 · Real-Time Particle Turbulence",
    p5ReseedBtn: "RE-SEED LATENT",

    // Section 4: Technical Art & Projects
    projMeta: "04 / Technical Production & Works",
    projTitle: "Mathematical Effects & Systems",
    projLead: "Real-time visual technologies, procedural shaders, and technical direction in interactive productions.",
    proj1Role: "Videogame · Unreal Engine 5 · Co-Founder & Tech Artist",
    proj1Title: "Curilemu — Southern Mythology & Action RPG",
    proj1Desc: "Third-person dark fantasy action RPG rooted in the folklore and myths of Chiloé. Responsible for Niagara VFX architecture, volumetric fog shaders, procedural forest generation, and executive production pipelines.",
    proj1Link: "Official Curilemu Website →",

    proj2Role: "Head Infrastructure & R&D · Cid-Lara Studio",
    proj2Title: "NAR Labs & Cid-Lara Algorithm",
    proj2Desc: "Directing technology and R&D. Cid-Lara Studio is the high-complexity head organization articulating composition, engineering, artificial intelligence, and institutional production; within it I direct NAR Labs, providing the algorithmic infrastructure and real-time systems for Augmented Music.",
    proj2Link: "Explore Cid-Lara Studio (jaimecidlara.com) →",

    studioEcosystemTitle: "Cid-Lara Studio — Head Organization for Creation & R&D",
    studioEcosystemDesc: "Cid-Lara Studio constitutes the organizational and artistic head directed by Jaime Cid-Lara. It articulates territorial research, large-scale production, and technology under a unified structure:",

    // Section 5: Photography
    photoMeta: "05 / Territorial Photography",
    photoTitle: "Monograph & <em>Photographic Archive</em>",
    photoLead: "A visual archive of sub-antarctic territories, Andean geology, and 720nm infrared reflectance. The complete archive is hosted on its dedicated page.",
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
    portalBannerTitle: "Complete Photographic Archive (40+ Works Collection)",
    portalBannerDesc: "Explore the complete high-resolution archive organized by territorial expeditions (Navarino, Paine, Sendero Cóndor, Jujuy, Araucanía, Portraits, and Events) with an interactive lightbox viewer.",
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
    footerDesc: "Christofer Cid Lara — Director of R&D at Cid-Lara Studio · AI Researcher, Technical Artist & Photographer.",
    footerCopy: "© 2026 Christofer Cid Lara · Cid-Lara Studio. All rights reserved.",
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
  const fullEl = document.querySelector('.title-full-name');
  const compEl = document.querySelector('.title-compressed');
  if (!wrapper || !fullEl || !compEl) return;

  let isCompressed = false;
  let compressTimeout = null;

  function setCompressedState(compress) {
    if (compress === isCompressed) return;
    isCompressed = compress;

    if (compress) {
      wrapper.classList.add('compressed');
      if (typeof anime !== 'undefined') {
        anime.remove([fullEl, compEl]);
        anime({
          targets: fullEl,
          letterSpacing: ['0.28em', '0.02em'],
          opacity: [1, 0],
          scale: [1, 0.92],
          duration: 950,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)'
        });
        anime({
          targets: compEl,
          opacity: [0, 1],
          scale: [1.08, 1],
          letterSpacing: ['0.14em', '0.08em'],
          duration: 1050,
          delay: 150,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)'
        });
      }
    } else {
      wrapper.classList.remove('compressed');
      if (typeof anime !== 'undefined') {
        anime.remove([fullEl, compEl]);
        anime({
          targets: compEl,
          opacity: [1, 0],
          scale: [1, 1.05],
          duration: 600,
          easing: 'easeOutQuad'
        });
        anime({
          targets: fullEl,
          letterSpacing: ['0.02em', '0.28em'],
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 1100,
          delay: 100,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)'
        });
      }
    }
  }

  // Cinematic initial compression after load
  compressTimeout = setTimeout(() => {
    setCompressedState(true);
  }, 1800);

  // Allow clicking on title to toggle expanded / compressed
  wrapper.addEventListener('click', () => {
    if (compressTimeout) clearTimeout(compressTimeout);
    setCompressedState(!isCompressed);
  });

  const replayBtn = document.querySelector('.kinetic-replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (compressTimeout) clearTimeout(compressTimeout);
      setCompressedState(false);
      compressTimeout = setTimeout(() => {
        setCompressedState(true);
      }, 2400);
    });
  }
}

// =============================================================================
// 3. Motion Engine (Scroll Progress Filament, Parallax & Spring Physics)
// =============================================================================
function initMotionEngine() {
  if (typeof Motion === 'undefined') return;

  // 3.1 Hardware-accelerated Scroll Progress Filament
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar && Motion.scroll && Motion.animate) {
    Motion.scroll(
      Motion.animate(progressBar, { transform: ['scaleX(0)', 'scaleX(1)'] })
    );
  }

  // 3.2 Scroll-Linked Diamond Divider Rotation & Breathing
  const centerDiamonds = document.querySelectorAll('.divider-diamond.center');
  centerDiamonds.forEach(diamond => {
    if (Motion.scroll && Motion.animate) {
      Motion.scroll(
        Motion.animate(diamond, { transform: ['rotate(45deg) scale(0.85)', 'rotate(225deg) scale(1.2)'] }),
        { target: diamond, offset: ['start end', 'end start'] }
      );
    }
  });

  // 3.3 Tactile Spring Card Elevations
  const interactiveCards = document.querySelectorAll('.discipline-card, .project-media-card, .studio-ecosystem-card, .monograph-plate, .curated-plate-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (Motion.animate) {
        Motion.animate(card, { y: -6, scale: 1.012 }, { type: 'spring', stiffness: 350, damping: 22 });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (Motion.animate) {
        Motion.animate(card, { y: 0, scale: 1 }, { type: 'spring', stiffness: 400, damping: 25 });
      }
    });
  });
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

  if (typeof anime !== 'undefined') {
    anime({
      targets: mainImg,
      opacity: [0, 1],
      scale: [0.93, 1],
      duration: 380,
      easing: 'easeOutCubic'
    });
    anime({
      targets: '.lightbox-caption',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 420,
      delay: 80,
      easing: 'easeOutCubic'
    });
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateLightboxImage(index) {
  const mainImg = document.getElementById('lightboxMainImg');
  const captionTitle = document.getElementById('lightboxTitle');
  const captionSeries = document.getElementById('lightboxSeries');
  const item = activeFilteredItems[index];

  if (typeof anime !== 'undefined') {
    anime({
      targets: mainImg,
      opacity: [0.35, 1],
      scale: [0.98, 1],
      duration: 280,
      easing: 'easeOutQuad'
    });
  }

  mainImg.src = item.full;
  captionTitle.textContent = item.title;
  captionSeries.textContent = item.series;
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % activeFilteredItems.length;
  updateLightboxImage(currentLightboxIndex);
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + activeFilteredItems.length) % activeFilteredItems.length;
  updateLightboxImage(currentLightboxIndex);
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
  }, { passive: true });

  // Intersection Observer for Reveal Elements with Anime.js
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (typeof anime !== 'undefined') {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [24, 0],
            easing: 'easeOutCubic',
            duration: 850
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// =============================================================================
// 6. Anime.js Cinematic Stagger, Archival Bracket Pulse & Tactile Micro-Physics
// =============================================================================
function initAnimeHero() {
  if (typeof anime === 'undefined') return;

  // Stagger hero elements on load with haunting, slow cinematic grace
  anime.timeline({
    easing: 'easeOutCubic'
  })
  .add({
    targets: '.hero-meta-badge',
    opacity: [0, 1],
    translateY: [-14, 0],
    duration: 1000,
    delay: 200
  })
  .add({
    targets: '.title-full-name',
    opacity: [0, 1],
    scale: [0.97, 1],
    duration: 1200
  }, '-=700')
  .add({
    targets: '.hero-statement, .hero-disciplines, .hero-cta-group',
    opacity: [0, 1],
    translateY: [18, 0],
    delay: anime.stagger(140),
    duration: 900
  }, '-=600');

  // Subtle 3D tactile perspective response on monolithic cards
  const cards = document.querySelectorAll('.discipline-card, .project-media-card, .photobook-featured-card, .monograph-plate');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      anime({
        targets: card,
        rotateY: x * 5,
        rotateX: -y * 5,
        scale: 1.012,
        duration: 350,
        easing: 'easeOutQuad'
      });
    });

    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 650,
        easing: 'easeOutElastic(1, .8)'
      });
    });
  });

  // Archival bracket & tag-dot subtle hover pulse
  const bracketItems = document.querySelectorAll('.discipline-tag, .brand-logo');
  bracketItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      anime({
        targets: item.querySelectorAll('.brand-bracket, .tag-dot'),
        scale: [1, 1.25],
        duration: 260,
        easing: 'easeOutCubic'
      });
    });
    item.addEventListener('mouseleave', () => {
      anime({
        targets: item.querySelectorAll('.brand-bracket, .tag-dot'),
        scale: 1,
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    });
  });
}

// =============================================================================
// 7. Direct Contact & Email Copy
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
// 8. Mobile Navigation Toggle
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
  initMotionEngine();
  renderGallery('all');
  initGalleryFilters();
  initScrollEffects();
  initAnimeHero();
  initMobileMenu();
});
window.triggerCategoryFilter = function(cat) {
  const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
  if (btn) {
    btn.click();
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
