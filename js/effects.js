/**
 * CCidLara — Advanced Visual Effects Engine
 *
 * 1. Scroll-driven title morph:
 *    "CCidLara" (hero, centered) flies toward the navbar brand position
 *    while shrinking. At ~40% scroll-progress a particle burst fires —
 *    some particles home to the navbar, others scatter.
 *
 * 2. Pixel Portrait assembler:
 *    The portrait <img> is swapped for a <canvas>. Initially it renders
 *    tiles in random displaced positions (fractured / pixel-swap look).
 *    When the About section enters the viewport, tiles glide from their
 *    scattered positions back to the correct grid positions.
 */

'use strict';

/* ─────────────────────────── utilities ─────────────────────────────────── */
const _lerp   = (a, b, t) => a + (b - a) * t;
const _clamp  = (x, lo, hi) => Math.min(Math.max(x, lo), hi);
const _eioq   = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
const _eout3  = (t) => 1 - Math.pow(1 - t, 3);  // easeOutCubic


/* ═══════════════════════════════════════════════════════════════════════════
   1. SCROLL MORPH TITLE  →  NAVBAR BRAND
   ═══════════════════════════════════════════════════════════════════════════ */
class ScrollMorphTitle {
  constructor() {
    this.hero      = document.querySelector('.hero-section');
    this.compEl    = document.querySelector('.title-compressed');
    this.fullEl    = document.querySelector('.title-full-name');
    this.navBrand  = document.querySelector('.brand-logo');

    if (!this.hero || !this.compEl || !this.navBrand) return;

    /* Source position (captured once near scroll=0) */
    this.sx = 0; this.sy = 0; this.sfs = 0;

    /* Destination position (updated on each scroll event) */
    this.dx = 0; this.dy = 0; this.dfs = 0;

    this.flyEl      = null;
    this.pCvs       = null;
    this.pCtx       = null;
    this.particles  = [];
    this.burstDone  = false;

    this._build();
  }

  /* ── DOM setup ── */
  _build() {
    /* Flying title element */
    const el = document.createElement('div');
    el.id = 'morph-fly-title';
    Object.assign(el.style, {
      position        : 'fixed',
      top             : '0',
      left            : '0',
      zIndex          : '9100',
      pointerEvents   : 'none',
      fontFamily      : "'Cormorant Garamond', Georgia, serif",
      fontWeight      : '700',
      letterSpacing   : '0.04em',
      opacity         : '0',
      whiteSpace      : 'nowrap',
      transformOrigin : 'left top',
      willChange      : 'transform, opacity, font-size',
      background      : 'linear-gradient(135deg,#fff 25%,#f5f2eb 60%,#e53835 100%)',
      webkitBackgroundClip : 'text',
      webkitTextFillColor  : 'transparent',
      backgroundClip  : 'text',
    });
    el.textContent = 'CCidLara';
    document.body.appendChild(el);
    this.flyEl = el;

    /* Particle canvas */
    const pc = document.createElement('canvas');
    pc.id = 'morph-particles-canvas';
    Object.assign(pc.style, {
      position      : 'fixed',
      top           : '0',
      left          : '0',
      pointerEvents : 'none',
      zIndex        : '9099',
    });
    document.body.appendChild(pc);
    this.pCvs = pc;
    this.pCtx = pc.getContext('2d');

    this._resize();
    window.addEventListener('resize', () => this._resize(), { passive: true });
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });

    requestAnimationFrame(() => this._tick());

    /* Defer first measurement so fonts have loaded */
    setTimeout(() => this._measure(), 500);
  }

  _resize() {
    this.pCvs.width  = window.innerWidth;
    this.pCvs.height = window.innerHeight;
    this._measure();
  }

  /* Measure source (hero) and destination (navbar) rects */
  _measure() {
    if (window.scrollY < 100) {
      const sr   = this.compEl.getBoundingClientRect();
      this.sx    = sr.left + sr.width  / 2;
      this.sy    = sr.top  + sr.height / 2;
      this.sfs   = sr.height * 1.25;
    }
    const dr   = this.navBrand.getBoundingClientRect();
    this.dx    = dr.left + dr.width  / 2;
    this.dy    = dr.top  + dr.height / 2;
    this.dfs   = dr.height * 1.4;
  }

  /* Scroll progress [0-1] over the first 65% of the hero section */
  _progress() {
    return _clamp(window.scrollY / (this.hero.offsetHeight * 0.65), 0, 1);
  }

  _onScroll() {
    const p = this._progress();

    /* Refresh source rect while near the top */
    if (p < 0.08) {
      this._measure();
      this.burstDone = false;
    }
    /* Refresh destination while scrolled (nav becomes opaque → may shift) */
    if (p > 0.04) {
      const dr = this.navBrand.getBoundingClientRect();
      this.dx  = dr.left + dr.width  / 2;
      this.dy  = dr.top  + dr.height / 2;
      this.dfs = dr.height * 1.4;
    }
  }

  /* ── particles ── */
  _spawnBurst(x, y, n) {
    const palette = [
      'rgba(255,255,255,',
      'rgba(245,242,235,',
      'rgba(229,56,53,',
      'rgba(197,34,31,',
    ];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1.5 + Math.random() * 5;
      const homing = Math.random() < 0.45;
      this.particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 1.5,
        life : 1.0,
        decay: 0.011 + Math.random() * 0.024,
        r    : 1.0 + Math.random() * 3.5,
        col  : palette[Math.floor(Math.random() * palette.length)],
        homing,
        hx: this.dx + (Math.random() - 0.5) * 24,
        hy: this.dy + (Math.random() - 0.5) * 12,
      });
    }
  }

  _updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      if (p.homing) {
        const dx = p.hx - p.x, dy = p.hy - p.y;
        const d  = Math.hypot(dx, dy);
        if (d > 4) { p.vx += (dx / d) * 0.5; p.vy += (dy / d) * 0.5; }
        p.vx *= 0.87; p.vy *= 0.87;
      } else {
        p.vy += 0.1; // gravity for scatter particles
      }
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  _drawParticles() {
    const ctx = this.pCtx;
    ctx.clearRect(0, 0, this.pCvs.width, this.pCvs.height);
    for (const p of this.particles) {
      /* Soft glow: draw outer ring first */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.col + (p.life * 0.18) + ')';
      ctx.fill();
      /* Core */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.col + (p.life * 0.90) + ')';
      ctx.fill();
    }
  }

  /* ── flying element update ── */
  _updateFly() {
    const raw = this._progress();
    const ep  = _eioq(raw);

    const x  = _lerp(this.sx, this.dx, ep);
    const y  = _lerp(this.sy, this.dy, ep);
    const fs = _lerp(this.sfs, this.dfs, ep);

    /* Flying element opacity:  appears 0.05-0.15, full 0.15-0.80, fades 0.80-1.0 */
    let flyOp = 0;
    if      (raw < 0.05) flyOp = 0;
    else if (raw < 0.15) flyOp = (raw - 0.05) / 0.10;
    else if (raw < 0.80) flyOp = 1;
    else                 flyOp = Math.max(0, (1.0 - raw) / 0.20);

    this.flyEl.style.fontSize = fs + 'px';
    this.flyEl.style.opacity  = flyOp.toFixed(3);

    /* Center flying element on (x,y) */
    const w = this.flyEl.offsetWidth  || (fs * 4.2);
    const h = this.flyEl.offsetHeight || fs;
    this.flyEl.style.transform =
      `translate(${(x - w * 0.5).toFixed(1)}px, ${(y - h * 0.5).toFixed(1)}px)`;

    /* Hero title fades out quickly as scroll starts (0 → 0.25) */
    const heroOp = _clamp(1 - raw / 0.25, 0, 1);
    this.compEl.style.opacity = heroOp.toFixed(3);
    if (this.fullEl) this.fullEl.style.opacity = heroOp.toFixed(3);

    /* Navbar brand:
       visible at 0, disappears as flying el takes over, returns at end */
    let navOp;
    if      (raw < 0.05) navOp = 1;
    else if (raw < 0.18) navOp = 1 - (raw - 0.05) / 0.13;
    else if (raw < 0.80) navOp = 0;
    else                 navOp = (raw - 0.80) / 0.20;
    this.navBrand.style.opacity = _clamp(navOp, 0, 1).toFixed(3);

    /* Particle burst fires once at ~40% scroll progress */
    if (raw >= 0.38 && raw <= 0.62 && !this.burstDone) {
      this.burstDone = true;
      this._spawnBurst(x, y, 70);
    }
  }

  _tick() {
    this._updateParticles();
    this._drawParticles();
    this._updateFly();
    requestAnimationFrame(() => this._tick());
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   2. PIXEL PORTRAIT ASSEMBLER
   ═══════════════════════════════════════════════════════════════════════════ */
class PixelPortrait {
  constructor() {
    this.imgEl = document.querySelector('.about-portrait-img');
    if (!this.imgEl) return;

    this.cols       = 15;
    this.rows       = 20;
    this.tiles      = [];
    this.assembled  = false;
    this.assembling = false;

    this.canvas = document.createElement('canvas');
    this.ctx    = this.canvas.getContext('2d');

    /* Copy CSS classes/styles from the original img */
    this.canvas.className = this.imgEl.className;
    Object.assign(this.canvas.style, {
      width       : '100%',
      aspectRatio : '4/5',
      display     : 'block',
      filter      : 'contrast(1.05) brightness(0.95)',
    });

    /* Swap <img> → <canvas> in DOM */
    this.imgEl.parentNode.replaceChild(this.canvas, this.imgEl);

    /* Load image */
    this.img = new Image();
    this.img.crossOrigin = 'anonymous';
    this.img.onload  = () => this._onImageLoaded();
    this.img.onerror = () => {
      /* Restore original image if load fails */
      this.canvas.parentNode.replaceChild(this.imgEl, this.canvas);
    };
    this.img.src = this.imgEl.src;

    /* Trigger animation when portrait enters viewport */
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.assembled && !this.assembling) {
        /* Small delay so user can see the fractured state for a moment */
        setTimeout(() => this._animateAssemble(), 300);
      }
    }, { threshold: 0.20 }).observe(this.canvas);
  }

  /* Deterministic pseudo-random (no Math.random so scatter is consistent) */
  _rng(seed) {
    const x = Math.sin(seed + 1.9) * 43758.5453;
    return x - Math.floor(x);
  }

  _onImageLoaded() {
    this.canvas.width  = this.img.naturalWidth;
    this.canvas.height = this.img.naturalHeight;
    this._buildTiles();
    this._drawScattered();      // fractured initial state
  }

  _buildTiles() {
    const W  = this.canvas.width;
    const H  = this.canvas.height;
    const tW = W / this.cols;
    const tH = H / this.rows;

    /* Scatter radius: about 2 tile-widths so pieces stay roughly within frame */
    const scatterR = Math.min(tW, tH) * 3.5;

    this.tiles = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const i  = row * this.cols + col;
        const tx = col * tW;
        const ty = row * tH;

        /* Random scatter offset */
        const ang = this._rng(i * 2.71 + 1.41) * Math.PI * 2;
        const d   = (0.4 + this._rng(i * 3.14 + 2.72) * 0.6) * scatterR;

        /* Normalised distance from image centre (0=centre, 1=corner) */
        const cx = tx + tW / 2 - W / 2;
        const cy = ty + tH / 2 - H / 2;
        const nd = Math.hypot(cx, cy) / Math.hypot(W / 2, H / 2);

        this.tiles.push({
          tx, ty, tW, tH,
          sx: tx + Math.cos(ang) * d,
          sy: ty + Math.sin(ang) * d,
          nd,            // used for staggered delay
        });
      }
    }
  }

  /* Render all tiles at their SCATTERED positions (fractured look) */
  _drawScattered() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const t of this.tiles) {
      ctx.save();
      ctx.globalAlpha = 0.40;
      ctx.drawImage(this.img, t.tx, t.ty, t.tW, t.tH,  t.sx, t.sy, t.tW, t.tH);
      ctx.restore();
    }
  }

  /* Animate tiles from scatter positions → correct grid positions */
  _animateAssemble() {
    if (this.assembling) return;
    this.assembling = true;

    const DURATION = 1900;
    const t0 = performance.now();

    const frame = (now) => {
      const g   = _clamp((now - t0) / DURATION, 0, 1);
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let allDone = true;
      for (const tile of this.tiles) {
        /* Each tile has a staggered delay: edge tiles assemble last */
        const delay = tile.nd * 0.38;
        const raw   = _clamp((g - delay) / (1 - delay * 0.5), 0, 1);
        if (raw < 1) allDone = false;

        const ep = _eout3(raw);
        const ox = _lerp(tile.sx, tile.tx, ep);
        const oy = _lerp(tile.sy, tile.ty, ep);

        ctx.save();
        ctx.globalAlpha = _lerp(0.40, 1.0, ep);
        ctx.drawImage(this.img, tile.tx, tile.ty, tile.tW, tile.tH, ox, oy, tile.tW, tile.tH);
        ctx.restore();
      }

      if (!allDone) {
        requestAnimationFrame(frame);
      } else {
        /* Final clean full-image draw */
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.img, 0, 0);
        this.assembled  = true;
        this.assembling = false;
      }
    };

    requestAnimationFrame(frame);
  }
}


/* ─────────────────────────── bootstrap ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /*
   * Give the main JS (language switch, kinetic title, canvas)
   * and Google Fonts time to settle before we measure any DOM rects.
   */
  setTimeout(() => {
    new ScrollMorphTitle();
    new PixelPortrait();
  }, 950);
});
