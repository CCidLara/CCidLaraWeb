/**
 * CCidLara — Vision, Mathematics & Optical Effects Engine
 * 
 * 1. ScrollMorphTitle:
 *    Seamless, bidirectional scroll-driven morphing between the Hero title
 *    ("C H R I S T O F E R   C I D   L A R A" / "CCidLara") and the fixed Topbar brand.
 * 
 * 2. QuantumParticleStream:
 *    High-performance optical photon stream emitted from the morphing title
 *    that cascades downwards towards the Vision & About section portrait.
 * 
 * 3. PixelPortrait:
 *    Mathematical fractured / pixel-swapped portrait reconstructor that
 *    seamlessly resolves from glitch/slice-displacement into crystal clarity
 *    as the user scrolls down, with interactive mouse optical diffraction.
 */

'use strict';

/* ─────────────────────────── Interpolation & Math ─────────────────────────── */
const _lerp   = (a, b, t) => a + (b - a) * t;
const _clamp  = (x, lo, hi) => Math.min(Math.max(x, lo), hi);
const _easeIO = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // cubic easeInOut
const _easeOut = (t) => 1 - Math.pow(1 - t, 3); // cubic easeOut

/* ═══════════════════════════════════════════════════════════════════════════
   1. SCROLL MORPH TITLE & PHOTON STREAM
   ═══════════════════════════════════════════════════════════════════════════ */
class VisualEffectsEngine {
  constructor() {
    this.hero       = document.querySelector('.hero-section');
    this.compEl     = document.querySelector('.title-compressed');
    this.fullEl     = document.querySelector('.title-full-name');
    this.navBrand   = document.querySelector('.brand-logo');
    this.aboutCard  = document.querySelector('.about-portrait-card');

    if (!this.hero || !this.navBrand) return;

    // Canvas for Photons & Particles
    this.pCanvas = document.createElement('canvas');
    this.pCanvas.id = 'morph-particles-canvas';
    Object.assign(this.pCanvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9099',
    });
    document.body.appendChild(this.pCanvas);
    this.pCtx = this.pCanvas.getContext('2d');

    // Flying Morph Element
    this.flyEl = document.createElement('div');
    this.flyEl.id = 'morph-fly-title';
    Object.assign(this.flyEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '9100',
      pointerEvents: 'none',
      userSelect: 'none',
      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: '700',
      letterSpacing: '-0.025em',
      opacity: '0',
      whiteSpace: 'nowrap',
      transformOrigin: 'left top',
      willChange: 'transform, opacity, font-size',
      background: 'linear-gradient(135deg, #ffffff 30%, #f5f2eb 65%, #e53835 100%)',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 2px 14px rgba(197, 34, 31, 0.45))',
    });
    this.flyEl.textContent = 'CCidLara';
    document.body.appendChild(this.flyEl);

    // Particle Store
    this.particles = [];
    this.lastScrollY = window.scrollY;
    this.scrollVelocity = 0;
    this.flyPos = { x: 0, y: 0, size: 24 };

    this._resize();
    window.addEventListener('resize', () => this._resize(), { passive: true });
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });

    // Start RAF Loop
    requestAnimationFrame((t) => this._renderLoop(t));
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.pCanvas.width = window.innerWidth * dpr;
    this.pCanvas.height = window.innerHeight * dpr;
    this.pCtx.scale(dpr, dpr);
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
  }

  _onScroll() {
    const currentScroll = window.scrollY;
    this.scrollVelocity = Math.abs(currentScroll - this.lastScrollY);
    this.lastScrollY = currentScroll;

    // Spawn stream particles proportionally to scroll speed when in hero area
    const heroH = this.hero.offsetHeight || window.innerHeight;
    if (currentScroll < heroH * 1.5 && this.scrollVelocity > 2) {
      const count = Math.min(Math.floor(this.scrollVelocity * 0.4), 6);
      this._emitPhotons(this.flyPos.x, this.flyPos.y, count);
    }
  }

  _emitPhotons(originX, originY, count) {
    if (!originX || !originY) return;

    // Target position: Vision/About portrait area (or lower screen)
    let targetX = this.viewportWidth * 0.35;
    let targetY = this.viewportHeight * 0.75;

    if (this.aboutCard) {
      const rect = this.aboutCard.getBoundingClientRect();
      if (rect.top < this.viewportHeight && rect.bottom > 0) {
        targetX = rect.left + rect.width * 0.5;
        targetY = rect.top + rect.height * 0.5;
      }
    }

    const colors = [
      'rgba(255, 255, 255,',     // Optical White
      'rgba(245, 242, 235,',     // Warm Bone
      'rgba(229, 56, 53,',       // Crimson Bright
      'rgba(197, 34, 31,',       // Crimson Core
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 0.8) + (Math.PI * 0.1); // Directed downwards
      const speed = 1.8 + Math.random() * 5.0;
      const col = colors[Math.floor(Math.random() * colors.length)];
      
      this.particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed + 1.2,
        targetX,
        targetY,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.02,
        radius: 1.2 + Math.random() * 2.8,
        color: col,
        homing: Math.random() < 0.6, // Gravitates towards portrait
      });
    }
  }

  _updateMorph(scrollY) {
    const heroH = this.hero.offsetHeight || window.innerHeight;
    const scrollProgress = _clamp(scrollY / (heroH * 0.5), 0, 1);
    const eased = _easeIO(scrollProgress);

    // Dynamic measurements
    let srcX = this.viewportWidth * 0.5;
    let srcY = heroH * 0.46;
    let srcSize = Math.min(this.viewportWidth * 0.085, 96);

    if (this.compEl && scrollY < 120) {
      const sr = this.compEl.getBoundingClientRect();
      if (sr.width > 0) {
        srcX = sr.left + sr.width * 0.5;
        srcY = sr.top + sr.height * 0.5;
        srcSize = sr.height * 0.95;
      }
    }

    let dstX = 80;
    let dstY = 36;
    let dstSize = 24;

    if (this.navBrand) {
      const dr = this.navBrand.getBoundingClientRect();
      if (dr.width > 0) {
        dstX = dr.left + dr.width * 0.42;
        dstY = dr.top + dr.height * 0.5;
        dstSize = dr.height * 0.85;
      }
    }

    const curX = _lerp(srcX, dstX, eased);
    const curY = _lerp(srcY, dstY, eased);
    const curSize = _lerp(srcSize, dstSize, eased);

    this.flyPos = { x: curX, y: curY, size: curSize };

    // Opacity Choreography
    let flyOpacity = 0;
    if (scrollProgress < 0.04) {
      flyOpacity = 0;
    } else if (scrollProgress < 0.14) {
      flyOpacity = (scrollProgress - 0.04) / 0.10;
    } else if (scrollProgress < 0.85) {
      flyOpacity = 1;
    } else {
      flyOpacity = Math.max(0, (1.0 - scrollProgress) / 0.15);
    }

    this.flyEl.style.fontSize = `${curSize.toFixed(1)}px`;
    this.flyEl.style.opacity = flyOpacity.toFixed(3);

    const fw = this.flyEl.offsetWidth || (curSize * 3.8);
    const fh = this.flyEl.offsetHeight || curSize;
    this.flyEl.style.transform = `translate(${(curX - fw * 0.5).toFixed(1)}px, ${(curY - fh * 0.5).toFixed(1)}px)`;

    // Hero title opacity
    const heroOpacity = _clamp(1 - scrollProgress / 0.22, 0, 1);
    if (this.compEl) this.compEl.style.opacity = heroOpacity.toFixed(3);
    if (this.fullEl) this.fullEl.style.opacity = heroOpacity.toFixed(3);

    // Navbar brand logo opacity
    let navOpacity = 0;
    if (scrollProgress < 0.05) {
      navOpacity = 1;
    } else if (scrollProgress < 0.18) {
      navOpacity = 1 - (scrollProgress - 0.05) / 0.13;
    } else if (scrollProgress < 0.82) {
      navOpacity = 0;
    } else {
      navOpacity = (scrollProgress - 0.82) / 0.18;
    }
    this.navBrand.style.opacity = _clamp(navOpacity, 0, 1).toFixed(3);
  }

  _updateAndDrawParticles() {
    const ctx = this.pCtx;
    ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.homing) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 10) {
          p.vx += (dx / dist) * 0.25;
          p.vy += (dy / dist) * 0.25;
        }
        p.vx *= 0.94;
        p.vy *= 0.94;
      } else {
        p.vy += 0.08; // subtle gravity
      }

      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${(p.life * 0.22).toFixed(3)})`;
      ctx.fill();

      // Sharp Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${(p.life * 0.95).toFixed(3)})`;
      ctx.fill();
    }
  }

  _renderLoop() {
    const scrollY = window.scrollY;
    this._updateMorph(scrollY);
    this._updateAndDrawParticles();
    requestAnimationFrame((t) => this._renderLoop(t));
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. PIXEL / FRACTURED PORTRAIT RECONSTRUCTION ENGINE
   ═══════════════════════════════════════════════════════════════════════════ */
class PixelPortraitEngine {
  constructor() {
    this.imgEl = document.querySelector('.about-portrait-img');
    if (!this.imgEl) return;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.className = this.imgEl.className;
    Object.assign(this.canvas.style, {
      width: '100%',
      aspectRatio: '4/5',
      display: 'block',
      borderRadius: 'var(--radius-md, 8px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
    });

    // Replace original <img> with high-performance Canvas
    this.imgEl.parentNode.replaceChild(this.canvas, this.imgEl);

    this.img = new Image();
    this.img.crossOrigin = 'anonymous';
    this.isLoaded = false;
    this.fractureLevel = 1.0; // 1.0 = fully fractured, 0.0 = resolved
    this.targetFracture = 1.0;
    this.scanlineY = -1;
    this.mouse = { x: -999, y: -999, active: false };

    this.img.onload = () => {
      this.isLoaded = true;
      this._initDimensions();
      this._bindEvents();
      requestAnimationFrame((t) => this._renderLoop(t));
    };

    this.img.onerror = () => {
      // Fallback
      if (this.canvas.parentNode) {
        this.canvas.parentNode.replaceChild(this.imgEl, this.canvas);
      }
    };

    this.img.src = this.imgEl.src;
  }

  _initDimensions() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = this.img.naturalWidth || 800;
    this.h = this.img.naturalHeight || 1000;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  _bindEvents() {
    window.addEventListener('scroll', () => this._updateScrollState(), { passive: true });
    
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - rect.left) / rect.width * this.w;
      this.mouse.y = (e.clientY - rect.top) / rect.height * this.h;
      this.mouse.active = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });

    this._updateScrollState();
  }

  _updateScrollState() {
    if (!this.isLoaded) return;
    const rect = this.canvas.getBoundingClientRect();
    const vh = window.innerHeight;

    // Center of canvas relative to viewport center
    const centerY = rect.top + rect.height * 0.5;
    const distToCenter = centerY - (vh * 0.52);

    // If near viewport center or scrolled past it -> fully resolved (0.0)
    // If above in hero section -> fractured (1.0)
    if (distToCenter <= 0) {
      this.targetFracture = 0.0;
    } else if (distToCenter > vh * 0.7) {
      this.targetFracture = 1.0;
    } else {
      this.targetFracture = _clamp(distToCenter / (vh * 0.65), 0, 1);
    }
  }

  _renderLoop(timeMs) {
    if (!this.isLoaded) return;

    const time = timeMs * 0.001;
    // Smooth lerp to target fracture level
    this.fractureLevel += (this.targetFracture - this.fractureLevel) * 0.08;

    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    ctx.clearRect(0, 0, w, h);

    if (this.fractureLevel > 0.015) {
      // ── FRACTURED / PIXEL-SWAPPED STATE ──
      const numSlices = 28;
      const sliceH = h / numSlices;
      const f = this.fractureLevel;

      // 1. Draw Red Channel (Chromatically Displaced)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < numSlices; i++) {
        const sy = i * sliceH;
        const wave = Math.sin(i * 0.45 + time * 3.5) * 32 * f;
        const jitter = (Math.sin(i * 9.2 + time * 12) * 12) * (f * f);
        const dx = wave + jitter + (f * 14);

        ctx.drawImage(this.img, 0, sy, w, sliceH, dx, sy, w, sliceH);
      }
      // Red tint overlay
      ctx.fillStyle = `rgba(229, 56, 53, ${(0.28 * f).toFixed(3)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 2. Draw Cyan/Base Channel (Chromatically Displaced Opposite)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < numSlices; i++) {
        const sy = i * sliceH;
        const wave = Math.cos(i * 0.40 - time * 3.0) * 26 * f;
        const dx = -wave - (f * 10);

        ctx.drawImage(this.img, 0, sy, w, sliceH, dx, sy, w, sliceH);
      }
      ctx.fillStyle = `rgba(180, 220, 255, ${(0.18 * f).toFixed(3)})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 3. Pixel Block Swapping Artifacts
      const blockCount = Math.floor(10 * f);
      for (let b = 0; b < blockCount; b++) {
        const bw = 40 + (b * 17) % 80;
        const bh = 20 + (b * 23) % 45;
        const bx = (Math.sin(b * 3.7 + time * 2) * 0.5 + 0.5) * (w - bw);
        const by = (Math.cos(b * 5.1 + time * 1.5) * 0.5 + 0.5) * (h - bh);
        const offset = (Math.sin(b * 7.9 + time * 8) * 35) * f;

        ctx.save();
        ctx.globalAlpha = 0.55 * f;
        ctx.drawImage(this.img, bx, by, bw, bh, bx + offset, by, bw, bh);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.4 * f).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + offset, by, bw, bh);
        ctx.restore();
      }

      // 4. Digital Scanline Matrix Overlay
      ctx.save();
      ctx.fillStyle = `rgba(8, 8, 10, ${(0.35 * f).toFixed(3)})`;
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }
      ctx.restore();

      this.scanlineY = 0; // Reset laser scan for when it resolves

    } else {
      // ── CRYSTAL CLEAR RESOLVED STATE ──
      ctx.drawImage(this.img, 0, 0, w, h);

      // Interactive Mouse Optical Ripple
      if (this.mouse.active) {
        const mx = this.mouse.x;
        const my = this.mouse.y;
        const radius = 140;

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, radius, 0, Math.PI * 2);
        ctx.clip();

        // Subtle chromatic prism at cursor
        ctx.drawImage(this.img, 0, 0, w, h);
        const grad = ctx.createRadialGradient(mx, my, 10, mx, my, radius);
        grad.addColorStop(0, 'rgba(229, 56, 53, 0.15)');
        grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(mx - radius, my - radius, radius * 2, radius * 2);
        ctx.restore();
      }

      // Optical Laser Scanline Sweep on Initial Resolution Lock
      if (this.scanlineY >= 0 && this.scanlineY < h) {
        this.scanlineY += 28;
        ctx.save();
        const scanGrad = ctx.createLinearGradient(0, this.scanlineY - 20, 0, this.scanlineY + 20);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, 'rgba(229, 56, 53, 0.85)');
        scanGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.95)');
        scanGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, this.scanlineY - 20, w, 40);
        ctx.restore();
      }
    }

    requestAnimationFrame((t) => this._renderLoop(t));
  }
}

/* ─────────────────────────── Bootstrap ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize effects once DOM is ready
  setTimeout(() => {
    new VisualEffectsEngine();
    new PixelPortraitEngine();
  }, 200);
});
