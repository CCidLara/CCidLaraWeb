/**
 * CCidLara — Vision, Mathematics & Optical Effects Engine
 * Built with GSAP 3 + ScrollTrigger & HTML5 High-DPI Canvas
 * 
 * 1. Kinetic Hero Compression:
 *    Expansive spaced Roman letterforms "CHRISTOFER CID LARA" (Cinzel)
 *    compress into the authorial monogram "CCidLara" (Syne 800).
 * 
 * 2. ScrollMorphTitle:
 *    GSAP scrubbed timeline seamlessly interpolating "CCidLara"
 *    from hero center into the fixed topbar brand emblem with sub-pixel
 *    mathematical precision and zero jumping.
 * 
 * 3. QuantumPhotonStream:
 *    Luminous optical photons and connection lattice streaming from
 *    the morphing title downwards towards the Vision portrait.
 * 
 * 4. PixelPortraitEngine:
 *    Fractured / chromatic slice portrait deconstruction that smoothly
 *    resolves to crystal clarity as the user scrolls into the section,
 *    finished with a laser sweep and interactive mouse optical prism.
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

    const loadScript = (src, cb) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = cb;
      s.onerror = () => {
        // Fallback to CDN if local script fails
        const fallback = src.includes('ScrollTrigger')
          ? 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
          : 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        const s2 = document.createElement('script');
        s2.src = fallback;
        s2.onload = cb;
        document.head.appendChild(s2);
      };
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
    this.hero        = document.querySelector('.hero-section');
    this.wrapper     = document.querySelector('.kinetic-title-wrapper');
    this.compEl      = document.querySelector('.title-compressed');
    this.fullEl      = document.querySelector('.title-full-name');
    this.navBrand    = document.querySelector('.brand-logo');
    this.aboutCard   = document.querySelector('.about-portrait-card');
    this.portraitImg = document.querySelector('.about-portrait-img');

    if (!this.hero || !this.navBrand) return;

    // Fast-compress if user scrolls before timeout
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20 && this.wrapper) {
        this.wrapper.classList.add('compressed');
      }
    }, { passive: true, once: true });

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

    // Scroll burst emission
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - this.lastScrollY);
      this.lastScrollY = currentScroll;

      if (currentScroll < window.innerHeight * 1.8 && delta > 2) {
        const count = Math.min(Math.floor(delta * 0.6), 8);
        this._emitPhotons(count, true);
      }
    }, { passive: true });

    // Ambient photon emission
    setInterval(() => {
      if (window.scrollY < window.innerHeight * 1.2 && this.particles.length < 35) {
        this._emitPhotons(1, false);
      }
    }, 120);

    // RAF Loop
    const tick = () => {
      this._updatePhotons();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  _emitPhotons(count, isScrollBurst) {
    let targetX = this.vw * 0.32;
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
      const angle = isScrollBurst
        ? (Math.PI * 0.15) + Math.random() * (Math.PI * 0.70)
        : Math.random() * Math.PI * 2;
      const speed = isScrollBurst ? 2.5 + Math.random() * 5.5 : 0.8 + Math.random() * 2.0;

      this.particles.push({
        x: this.emitterPos.x + (Math.random() - 0.5) * 50,
        y: this.emitterPos.y + (Math.random() - 0.5) * 25,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isScrollBurst ? 1.5 : 0),
        targetX,
        targetY,
        life: 1.0,
        decay: 0.010 + Math.random() * 0.016,
        radius: 1.5 + Math.random() * 3.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        homing: isScrollBurst || Math.random() < 0.6,
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
        if (dist > 20) {
          p.vx += (dx / dist) * 0.32;
          p.vy += (dy / dist) * 0.32;
        }
        p.vx *= 0.94;
        p.vy *= 0.94;
      } else {
        p.vy += 0.08;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Outer luminous halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 3.2, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${(p.life * 0.28).toFixed(3)})`;
      ctx.fill();

      // Sharp core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life * 1.0, 0, Math.PI * 2);
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
      filter: 'drop-shadow(0 4px 25px rgba(197, 34, 31, 0.45))',
    });
    this.flyEl.textContent = 'CCidLara';
    document.body.appendChild(this.flyEl);

    // Initial position cache
    let cachedHeroPos = null;

    const updateAnchorCache = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (this.compEl) {
        const r = this.compEl.getBoundingClientRect();
        cachedHeroPos = {
          x: r.left + r.width * 0.5,
          y: r.top + scrollY + r.height * 0.5,
          size: Math.min(window.innerWidth * 0.08, 90)
        };
      } else {
        cachedHeroPos = {
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.45,
          size: 70
        };
      }
    };
    updateAnchorCache();
    window.addEventListener('resize', updateAnchorCache);

    // GSAP ScrollTrigger Scrub
    ScrollTrigger.create({
      trigger: this.hero,
      start: 'top top',
      end: 'bottom 45%',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const scrollY = window.scrollY || window.pageYOffset;

        if (!cachedHeroPos) updateAnchorCache();

        const navR = this.navBrand.getBoundingClientRect();
        const dstX = navR.left + navR.width * 0.40;
        const dstY = navR.top + navR.height * 0.5;
        const dstSize = Math.max(navR.height * 0.82, 24);

        // Source position in current viewport coordinates
        const srcViewportY = cachedHeroPos.y - scrollY;
        const srcViewportX = cachedHeroPos.x;

        // Smooth cubic ease
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        const curX = srcViewportX + (dstX - srcViewportX) * ease;
        const curY = srcViewportY + (dstY - srcViewportY) * ease;
        const curSize = cachedHeroPos.size + (dstSize - cachedHeroPos.size) * ease;

        this.emitterPos = { x: curX, y: curY };

        // Morph title opacity transition
        let flyOpacity = 0;
        if (p < 0.03) {
          flyOpacity = 0;
        } else if (p < 0.15) {
          flyOpacity = (p - 0.03) / 0.12;
        } else if (p < 0.85) {
          flyOpacity = 1;
        } else {
          flyOpacity = Math.max(0, (1.0 - p) / 0.15);
        }

        this.flyEl.style.fontSize = `${curSize.toFixed(1)}px`;
        this.flyEl.style.opacity = flyOpacity.toFixed(3);

        const fw = this.flyEl.offsetWidth || (curSize * 3.4);
        const fh = this.flyEl.offsetHeight || curSize;
        this.flyEl.style.transform = `translate(${(curX - fw * 0.5).toFixed(1)}px, ${(curY - fh * 0.5).toFixed(1)}px)`;

        // Fade hero title elements
        const heroOpacity = Math.max(0, 1 - p / 0.18);
        if (this.wrapper) {
          this.wrapper.style.opacity = heroOpacity.toFixed(3);
        }

        // Fade navbar brand logo in/out
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
     3. STRICTLY MONOCHROMATIC GAUSSIAN & SALT-AND-PEPPER NOISE ENGINE
     ───────────────────────────────────────────────────────────────────────── */
  _initPixelPortrait() {
    const imgEl = document.querySelector('.about-portrait-img');
    if (!imgEl) return;

    const img = new Image();
    // Do NOT set img.crossOrigin for local assets to avoid file:// CORS blocks

    const setupCanvas = () => {
      const natW = img.naturalWidth || 800;
      const natH = img.naturalHeight || 800;
      const aspect = natW / natH; // 1.0 for 1400x1400 square portrait

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.className = imgEl.className;
      Object.assign(canvas.style, {
        width: '100%',
        height: 'auto',
        aspectRatio: `${natW} / ${natH}`,
        display: 'block',
        borderRadius: 'var(--radius-md, 8px)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
        cursor: 'crosshair',
      });

      if (imgEl.parentNode) {
        imgEl.parentNode.replaceChild(canvas, imgEl);
      }

      // Preserve natural image aspect ratio precisely (no stretching)
      const targetW = Math.min(natW, 600);
      const targetH = Math.round(targetW / aspect);
      canvas.width = targetW;
      canvas.height = targetH;
      const w = targetW;
      const h = targetH;
      const totalPixels = w * h;

      // Offscreen clean buffer
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      offCtx.drawImage(img, 0, 0, w, h);
      const cleanImgData = offCtx.getImageData(0, 0, w, h);
      const cleanData32 = new Uint32Array(cleanImgData.data.buffer);

      // Output buffer
      const outputImgData = ctx.createImageData(w, h);
      const outputData32 = new Uint32Array(outputImgData.data.buffer);

      let noiseFactor = 1.0;
      let scanlineY = -1;
      let hasScanned = false;
      let mouse = { x: -999, y: -999, active: false };

      canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width) * w;
        mouse.y = ((e.clientY - r.top) / r.height) * h;
        mouse.active = true;
      });

      canvas.addEventListener('mouseleave', () => {
        mouse.active = false;
      });

      // Scrub noiseFactor with ScrollTrigger:
      // Starts at almost pure monochromatic noise (1.0) and reveals the picture as you scroll
      ScrollTrigger.create({
        trigger: canvas.parentElement || canvas,
        start: 'top 96%',
        end: 'center 52%',
        scrub: 0.6,
        onUpdate: (self) => {
          noiseFactor = Math.max(0, 1 - self.progress);
          if (noiseFactor <= 0.04 && !hasScanned) {
            scanlineY = 0;
            hasScanned = true;
          } else if (noiseFactor > 0.08) {
            hasScanned = false;
          }
        }
      });

      // Render Loop with Strictly Monochromatic Noise
      let seed = 123456789;
      const render = (timeMs) => {
        seed = (seed + ((timeMs * 0.4) | 0) + 19) | 0;

        if (noiseFactor > 0.008) {
          const N = noiseFactor;
          const spProb = N * 0.45; // Salt & Pepper probability
          const sigWeight = Math.max(0, 1.0 - N * 0.90); // Signal attenuation
          const gaussScale = N * 255; // Monochromatic Gaussian standard deviation
          const baseOffset = (128 * N); // Baseline gray offset when signal is suppressed

          let rng = seed;

          for (let i = 0; i < totalPixels; i++) {
            // Fast LCG Random Generator
            rng = (rng * 1664525 + 1013904223) | 0;
            const u1 = (rng >>> 0) / 4294967296;

            // 1. Strictly Monochromatic Salt & Pepper
            if (u1 < spProb) {
              // Salt: Pure white (255, 255, 255); Pepper: Pure black (0, 0, 0)
              const bw = (rng & 1) ? 255 : 0;
              outputData32[i] = (255 << 24) | (bw << 16) | (bw << 8) | bw;
              continue;
            }

            // 2. Strictly Monochromatic Gaussian Noise
            const orig = cleanData32[i];
            const r = orig & 0xFF;
            const g = (orig >> 8) & 0xFF;
            const b = (orig >> 16) & 0xFF;

            rng = (rng * 1664525 + 1013904223) | 0;
            const u2 = (rng >>> 0) / 4294967296;
            rng = (rng * 1664525 + 1013904223) | 0;
            const u3 = (rng >>> 0) / 4294967296;

            // Single scalar Gaussian perturbation (zero hue / saturation deviation)
            const gauss = (u1 + u2 + u3 - 1.5) * gaussScale + (baseOffset * (1 - sigWeight));

            let nr = r * sigWeight + gauss;
            let ng = g * sigWeight + gauss;
            let nb = b * sigWeight + gauss;

            // Clamp [0, 255]
            if (nr < 0) nr = 0; else if (nr > 255) nr = 255;
            if (ng < 0) ng = 0; else if (ng > 255) ng = 255;
            if (nb < 0) nb = 0; else if (nb > 255) nb = 255;

            outputData32[i] = (255 << 24) | ((nb | 0) << 16) | ((ng | 0) << 8) | (nr | 0);
          }

          ctx.putImageData(outputImgData, 0, 0);

          // Subtle monochromatic scanline matrix when noisy
          ctx.save();
          ctx.fillStyle = `rgba(0, 0, 0, ${(0.18 * N).toFixed(3)})`;
          for (let y = 0; y < h; y += 4) {
            ctx.fillRect(0, y, w, 1);
          }
          ctx.restore();

        } else {
          // 3. Pristine Portrait in Natural Dimensions
          ctx.drawImage(img, 0, 0, w, h);

          // Interactive Cursor Optical Prism
          if (mouse.active) {
            const radius = 160;
            ctx.save();
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, 0, 0, w, h);

            const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, radius);
            grad.addColorStop(0, 'rgba(229, 56, 53, 0.22)');
            grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(mouse.x - radius, mouse.y - radius, radius * 2, radius * 2);
            ctx.restore();
          }

          // Laser Convergence Scanline Sweep
          if (scanlineY >= 0 && scanlineY < h) {
            scanlineY += 32;
            ctx.save();
            const scanGrad = ctx.createLinearGradient(0, scanlineY - 25, 0, scanlineY + 25);
            scanGrad.addColorStop(0, 'transparent');
            scanGrad.addColorStop(0.5, 'rgba(229, 56, 53, 0.95)');
            scanGrad.addColorStop(0.6, 'rgba(255, 255, 255, 1.0)');
            scanGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanlineY - 25, w, 50);
            ctx.restore();
          }
        }

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      img.src = imgEl.src;
      setupCanvas();
    } else {
      img.onload = setupCanvas;
      img.src = imgEl.src;
    }
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new VisualEffectsEngine();
  }, 100);
});
