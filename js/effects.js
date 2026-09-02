/**
 * CCidLara — Vision, Mathematics & Optical Effects Engine
 * Built with GSAP 3 + ScrollTrigger & HTML5 High-DPI Canvas
 * 
 * 1. ScrollMorphTitle:
 *    GSAP scrubbed timeline smoothly morphing the Hero title
 *    ("CHRISTOFER CID LARA" -> "CCidLara") from hero center into
 *    the fixed navbar brand position with sub-pixel precision.
 * 
 * 2. QuantumPhotonStream:
 *    Luminous optical photon stream emitted from the morphing title,
 *    cascading through a simulated gravitational field towards the portrait.
 * 
 * 3. PixelPortraitEngine:
 *    Mathematical fractured / pixel-swapped portrait reconstructor that
 *    seamlessly resolves from glitch/slice-displacement into crystal clarity
 *    tied directly to ScrollTrigger scrub, with interactive mouse optical diffraction.
 */

'use strict';

class VisualEffectsEngine {
  constructor() {
    this._ensureGSAP(() => {
      this._init();
    });
  }

  /* Ensure GSAP & ScrollTrigger are available */
  _ensureGSAP(callback) {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      callback();
      return;
    }

    // Fallback CDN loader if scripts were blocked
    const loadScript = (src, cb) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = cb;
      document.head.appendChild(s);
    };

    loadScript('js/vendor/gsap.min.js', () => {
      loadScript('js/vendor/ScrollTrigger.min.js', () => {
        if (window.gsap && window.ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          callback();
        }
      });
    });
  }

  _init() {
    this.hero       = document.querySelector('.hero-section');
    this.compEl     = document.querySelector('.title-compressed');
    this.fullEl     = document.querySelector('.title-full-name');
    this.navBrand   = document.querySelector('.brand-logo');
    this.aboutCard  = document.querySelector('.about-portrait-card');

    if (!this.hero || !this.navBrand) return;

    this._initParticleCanvas();
    this._initMorphTitle();
    this._initPixelPortrait();
  }

  /* ─────────────────────────────────────────────────────────────────────────
     1. PARTICLE CANVAS & QUANTUM PHOTON STREAM
     ───────────────────────────────────────────────────────────────────────── */
  _initParticleCanvas() {
    const existing = document.getElementById('morph-particles-canvas');
    if (existing) existing.remove();

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

    this.particles = [];
    this.emitterPos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 };
    this.lastScrollY = window.scrollY;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.pCanvas.width = window.innerWidth * dpr;
      this.pCanvas.height = window.innerHeight * dpr;
      this.pCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.pCtx.scale(dpr, dpr);
      this.vw = window.innerWidth;
      this.vh = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Scroll listener for photon emission
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - this.lastScrollY);
      this.lastScrollY = currentScroll;

      if (currentScroll < window.innerHeight * 1.5 && delta > 2) {
        const count = Math.min(Math.floor(delta * 0.4), 6);
        this._emitPhotons(count);
      }
    }, { passive: true });

    // RAF Loop
    const tick = () => {
      this._updatePhotons();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  _emitPhotons(count) {
    let targetX = this.vw * 0.35;
    let targetY = this.vh * 0.75;

    if (this.aboutCard) {
      const r = this.aboutCard.getBoundingClientRect();
      if (r.top < this.vh && r.bottom > 0) {
        targetX = r.left + r.width * 0.5;
        targetY = r.top + r.height * 0.5;
      }
    }

    const colors = [
      'rgba(255, 255, 255,',
      'rgba(245, 242, 235,',
      'rgba(229, 56, 53,',
      'rgba(197, 34, 31,'
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 0.75) + (Math.PI * 0.12);
      const speed = 2.0 + Math.random() * 5.0;
      this.particles.push({
        x: this.emitterPos.x + (Math.random() - 0.5) * 40,
        y: this.emitterPos.y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed + 1.2,
        targetX,
        targetY,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.02,
        radius: 1.2 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        homing: Math.random() < 0.65,
      });
    }
  }

  _updatePhotons() {
    const ctx = this.pCtx;
    ctx.clearRect(0, 0, this.vw, this.vh);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.homing) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 15) {
          p.vx += (dx / dist) * 0.28;
          p.vy += (dy / dist) * 0.28;
        }
        p.vx *= 0.94;
        p.vy *= 0.94;
      } else {
        p.vy += 0.09;
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
      ctx.fillStyle = `${p.color}${(p.life * 0.25).toFixed(3)})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${(p.life * 0.95).toFixed(3)})`;
      ctx.fill();
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     2. GSAP SCROLL-TRIGGER TITLE MORPH
     ───────────────────────────────────────────────────────────────────────── */
  _initMorphTitle() {
    const existingFly = document.getElementById('morph-fly-title');
    if (existingFly) existingFly.remove();

    this.flyEl = document.createElement('div');
    this.flyEl.id = 'morph-fly-title';
    Object.assign(this.flyEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '9100',
      pointerEvents: 'none',
      userSelect: 'none',
      fontFamily: "'Syne', sans-serif",
      fontWeight: '800',
      letterSpacing: '-0.035em',
      opacity: '0',
      whiteSpace: 'nowrap',
      transformOrigin: 'left top',
      willChange: 'transform, opacity',
      background: 'linear-gradient(135deg, #ffffff 20%, #f5f2eb 55%, #e53835 100%)',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 4px 25px rgba(197, 34, 31, 0.4))',
    });
    this.flyEl.textContent = 'CCidLara';
    document.body.appendChild(this.flyEl);

    const calcPositions = () => {
      const heroR = this.compEl ? this.compEl.getBoundingClientRect() : { left: window.innerWidth * 0.5, top: window.innerHeight * 0.45, width: 250, height: 80 };
      const navR = this.navBrand.getBoundingClientRect();

      const src = {
        x: heroR.left + heroR.width * 0.5,
        y: heroR.top + heroR.height * 0.5,
        size: Math.min(window.innerWidth * 0.08, 90)
      };

      const dst = {
        x: navR.left + navR.width * 0.42,
        y: navR.top + navR.height * 0.5,
        size: Math.max(navR.height * 0.85, 24)
      };

      return { src, dst };
    };

    // GSAP Scrubbed ScrollTrigger
    ScrollTrigger.create({
      trigger: this.hero,
      start: 'top top',
      end: 'bottom 45%',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        const { src, dst } = calcPositions();

        // Cubic ease
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        const curX = src.x + (dst.x - src.x) * ease;
        const curY = src.y + (dst.y - src.y) * ease;
        const curSize = src.size + (dst.size - src.size) * ease;

        this.emitterPos = { x: curX, y: curY };

        // Opacity
        let flyOpacity = 0;
        if (p < 0.04) {
          flyOpacity = 0;
        } else if (p < 0.16) {
          flyOpacity = (p - 0.04) / 0.12;
        } else if (p < 0.84) {
          flyOpacity = 1;
        } else {
          flyOpacity = Math.max(0, (1.0 - p) / 0.16);
        }

        this.flyEl.style.fontSize = `${curSize.toFixed(1)}px`;
        this.flyEl.style.opacity = flyOpacity.toFixed(3);

        const fw = this.flyEl.offsetWidth || (curSize * 3.6);
        const fh = this.flyEl.offsetHeight || curSize;
        this.flyEl.style.transform = `translate(${(curX - fw * 0.5).toFixed(1)}px, ${(curY - fh * 0.5).toFixed(1)}px)`;

        // Hero title opacity
        const heroOpacity = Math.max(0, 1 - p / 0.20);
        if (this.compEl) this.compEl.style.opacity = heroOpacity.toFixed(3);
        if (this.fullEl) this.fullEl.style.opacity = heroOpacity.toFixed(3);

        // Navbar brand opacity
        let navOpacity = 0;
        if (p < 0.05) {
          navOpacity = 1;
        } else if (p < 0.18) {
          navOpacity = 1 - (p - 0.05) / 0.13;
        } else if (p < 0.82) {
          navOpacity = 0;
        } else {
          navOpacity = (p - 0.82) / 0.18;
        }
        this.navBrand.style.opacity = Math.min(Math.max(navOpacity, 0), 1).toFixed(3);
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     3. PIXEL / FRACTURED PORTRAIT ENGINE
     ───────────────────────────────────────────────────────────────────────── */
  _initPixelPortrait() {
    const imgEl = document.querySelector('.about-portrait-img');
    if (!imgEl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = imgEl.className;
    Object.assign(canvas.style, {
      width: '100%',
      aspectRatio: '4/5',
      display: 'block',
      borderRadius: 'var(--radius-md, 8px)',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
    });

    imgEl.parentNode.replaceChild(canvas, imgEl);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    let fractureFactor = 1.0;
    let scanlineY = -1;
    let mouse = { x: -999, y: -999, active: false };

    img.onload = () => {
      const w = img.naturalWidth || 800;
      const h = img.naturalHeight || 1000;
      canvas.width = w;
      canvas.height = h;

      canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) / r.width * w;
        mouse.y = (e.clientY - r.top) / r.height * h;
        mouse.active = true;
      });

      canvas.addEventListener('mouseleave', () => {
        mouse.active = false;
      });

      // GSAP ScrollTrigger to scrub fracture factor
      ScrollTrigger.create({
        trigger: canvas.parentElement || canvas,
        start: 'top 88%',
        end: 'center 52%',
        scrub: 1.0,
        onUpdate: (self) => {
          fractureFactor = Math.max(0, 1 - self.progress);
        }
      });

      // Render Loop
      const render = (timeMs) => {
        const time = timeMs * 0.001;
        ctx.clearRect(0, 0, w, h);

        if (fractureFactor > 0.015) {
          const numSlices = 30;
          const sliceH = h / numSlices;
          const f = fractureFactor;

          // 1. Red Channel Offset
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          for (let i = 0; i < numSlices; i++) {
            const sy = i * sliceH;
            const wave = Math.sin(i * 0.48 + time * 3.5) * 36 * f;
            const jitter = (Math.sin(i * 8.7 + time * 14) * 14) * (f * f);
            const dx = wave + jitter + (f * 16);
            ctx.drawImage(img, 0, sy, w, sliceH, dx, sy, w, sliceH);
          }
          ctx.fillStyle = `rgba(229, 56, 53, ${(0.32 * f).toFixed(3)})`;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();

          // 2. Cyan / White Channel Offset
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          for (let i = 0; i < numSlices; i++) {
            const sy = i * sliceH;
            const wave = Math.cos(i * 0.42 - time * 3.0) * 28 * f;
            const dx = -wave - (f * 12);
            ctx.drawImage(img, 0, sy, w, sliceH, dx, sy, w, sliceH);
          }
          ctx.fillStyle = `rgba(180, 225, 255, ${(0.20 * f).toFixed(3)})`;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();

          // 3. Voxel Block Displacements
          const blocks = Math.floor(12 * f);
          for (let b = 0; b < blocks; b++) {
            const bw = 50 + (b * 19) % 90;
            const bh = 25 + (b * 27) % 50;
            const bx = (Math.sin(b * 3.7 + time * 2) * 0.5 + 0.5) * (w - bw);
            const by = (Math.cos(b * 5.1 + time * 1.5) * 0.5 + 0.5) * (h - bh);
            const off = (Math.sin(b * 7.9 + time * 8) * 40) * f;

            ctx.save();
            ctx.globalAlpha = 0.6 * f;
            ctx.drawImage(img, bx, by, bw, bh, bx + off, by, bw, bh);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(0.45 * f).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(bx + off, by, bw, bh);
            ctx.restore();
          }

          // 4. Optical Scanline Matrix
          ctx.save();
          ctx.fillStyle = `rgba(8, 8, 10, ${(0.38 * f).toFixed(3)})`;
          for (let y = 0; y < h; y += 4) {
            ctx.fillRect(0, y, w, 1.5);
          }
          ctx.restore();

          scanlineY = 0;
        } else {
          // Resolved Crisp Image
          ctx.drawImage(img, 0, 0, w, h);

          // Interactive Cursor Optical Prism
          if (mouse.active) {
            const radius = 150;
            ctx.save();
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, 0, 0, w, h);

            const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, radius);
            grad.addColorStop(0, 'rgba(229, 56, 53, 0.18)');
            grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(mouse.x - radius, mouse.y - radius, radius * 2, radius * 2);
            ctx.restore();
          }

          // Laser Scanline Convergence Sweep
          if (scanlineY >= 0 && scanlineY < h) {
            scanlineY += 28;
            ctx.save();
            const scanGrad = ctx.createLinearGradient(0, scanlineY - 24, 0, scanlineY + 24);
            scanGrad.addColorStop(0, 'transparent');
            scanGrad.addColorStop(0.5, 'rgba(229, 56, 53, 0.9)');
            scanGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.98)');
            scanGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanlineY - 24, w, 48);
            ctx.restore();
          }
        }

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    img.src = imgEl.src;
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new VisualEffectsEngine();
  }, 100);
});
