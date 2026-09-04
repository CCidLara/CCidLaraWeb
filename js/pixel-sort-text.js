/**
 * CCidLara — Text Pixel Re-sorting Engine
 * Inspired by Kim Asendorf's Pixel Sort algorithm & studio-ity.com/pixelsort
 * 
 * Renders the authorial name on canvas and brings it to life via real-time
 * algorithmic pixel sorting:
 * 1. Initial entrance: Name emerges from horizontal melted pixel-sorted streaks that
 *    mathematically re-sort and collapse into crystal-sharp Roman letterforms.
 * 2. Monogram Morph: Pixel-sort burst dissolves the text into glitch streaks and
 *    re-sorts into the iconic monogram [ CCidLara ].
 * 3. Interactive Cursor Deflection: Hovering over the name melts pixels locally into
 *    sorted glitch streaks that spring back into place.
 * 4. Replay Control: Clicking KINETIC FOCUS re-triggers the full re-sorting sequence.
 */

'use strict';

class PixelSortTextEngine {
  constructor() {
    this.wrapper = document.querySelector('.kinetic-title-wrapper');
    if (!this.wrapper) return;

    this.isCompressed = false;
    this.sortIntensity = 1.0;     // 1.0 = fully melted/sorted, 0.0 = razor sharp
    this.targetSortIntensity = 0.0;
    this.currentMode = 'full';     // 'full' | 'compressed'
    this.transitionProgress = 0.0; // 0 = full, 1 = compressed

    this.mouse = { x: -9999, y: -9999, active: false };

    this._initCanvases();
    this._initEvents();
    this._startEntrance();
    this._animate();
  }

  _initCanvases() {
    // Hide original static DOM text to avoid duplicate overlapping, but retain for screen readers
    const domFullName = this.wrapper.querySelector('.title-full-name');
    const domComp = this.wrapper.querySelector('.title-compressed');
    if (domFullName) domFullName.style.display = 'none';
    if (domComp) domComp.style.display = 'none';

    // Create Main Display Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'pixel-sort-title-canvas';
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', 'Christofer Cid Lara — CCidLara');
    this.canvas.style.display = 'block';
    this.canvas.style.margin = '0 auto';
    this.canvas.style.cursor = 'pointer';
    this.canvas.style.willChange = 'transform';
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    // Offscreen Buffer Canvases for Source Text
    this.offA = document.createElement('canvas'); // Full name: CHRISTOFER CID LARA
    this.offCtxA = this.offA.getContext('2d');

    this.offB = document.createElement('canvas'); // Monogram: [ CCidLara ]
    this.offCtxB = this.offB.getContext('2d');

    this._resize();
    window.addEventListener('resize', () => this._resize(), { passive: true });
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.wrapper.getBoundingClientRect();
    const w = Math.min(Math.max(rect.width || window.innerWidth * 0.9, 320), 1200);
    const h = Math.max(rect.height || 140, 130);

    this.width = Math.floor(w);
    this.height = Math.floor(h);

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    // Offscreen buffers
    this.offA.width = this.width;
    this.offA.height = this.height;
    this.offB.width = this.width;
    this.offB.height = this.height;

    this._renderOffscreenTexts();
  }

  _renderOffscreenTexts() {
    const w = this.width;
    const h = this.height;

    // Buffer A: C H R I S T O F E R   C I D   L A R A
    const ctxA = this.offCtxA;
    ctxA.clearRect(0, 0, w, h);
    ctxA.textAlign = 'center';
    ctxA.textBaseline = 'middle';

    const fontSizeA = Math.min(Math.max(w * 0.038, 16), 34);
    ctxA.font = `700 ${fontSizeA}px 'Cinzel', 'Times New Roman', serif`;
    ctxA.fillStyle = '#ede6da';
    ctxA.letterSpacing = '0.35em';
    ctxA.shadowColor = 'rgba(237, 230, 218, 0.4)';
    ctxA.shadowBlur = 8;
    ctxA.fillText('C H R I S T O F E R   C I D   L A R A', w * 0.5, h * 0.52);

    // Buffer B: [ CCidLara ]
    const ctxB = this.offCtxB;
    ctxB.clearRect(0, 0, w, h);
    ctxB.textAlign = 'center';
    ctxB.textBaseline = 'middle';

    const fontSizeB = Math.min(Math.max(w * 0.075, 30), 68);
    ctxB.font = `700 ${fontSizeB}px 'Courier Prime', 'Space Mono', monospace`;
    ctxB.shadowBlur = 12;

    // Render brackets in arterial crimson/gold and name in bone
    const text = 'CCidLara';
    const bracketL = '[';
    const bracketR = ']';

    const textWidth = ctxB.measureText(text).width;
    const bWidth = ctxB.measureText(bracketL).width;
    const totalW = textWidth + bWidth * 2 + 12;
    const startX = (w - totalW) * 0.5;

    // Left Bracket
    ctxB.fillStyle = '#c5a059';
    ctxB.shadowColor = 'rgba(197, 160, 89, 0.6)';
    ctxB.fillText(bracketL, startX + bWidth * 0.5, h * 0.52);

    // Monogram Name
    ctxB.fillStyle = '#f5f2eb';
    ctxB.shadowColor = 'rgba(245, 242, 235, 0.45)';
    ctxB.fillText(text, startX + bWidth + 6 + textWidth * 0.5, h * 0.52);

    // Right Bracket
    ctxB.fillStyle = '#c5a059';
    ctxB.shadowColor = 'rgba(197, 160, 89, 0.6)';
    ctxB.fillText(bracketR, startX + bWidth + 12 + textWidth + bWidth * 0.5, h * 0.52);
  }

  _initEvents() {
    // Toggle on canvas click
    this.canvas.addEventListener('click', () => {
      this.toggleMode();
    });

    // Cursor tracking for interactive pixel-sorting deflection
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.active = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });

    // Replay Button Hook
    const replayBtn = document.querySelector('.kinetic-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.replay();
      });
    }

    // Scroll trigger: compress when user scrolls past 30px
    let scrolledOnce = false;
    window.addEventListener('scroll', () => {
      if (!scrolledOnce && window.scrollY > 35 && this.currentMode === 'full') {
        scrolledOnce = true;
        this.toggleMode('compressed');
      }
    }, { passive: true });
  }

  _startEntrance() {
    // Initial entrance: start heavily sorted, re-sort down to 0 (crisp) in 1.9s
    this.sortIntensity = 1.0;
    this.targetSortIntensity = 0.0;
    this.currentMode = 'full';
    this.transitionProgress = 0.0;

    // Automatic morph to compressed [ CCidLara ] after initial cinematic contemplation
    setTimeout(() => {
      if (this.currentMode === 'full' && window.scrollY < 30) {
        this.toggleMode('compressed');
      }
    }, 2800);
  }

  replay() {
    this.currentMode = 'full';
    this.transitionProgress = 0.0;
    this.sortIntensity = 0.95;
    this.targetSortIntensity = 0.0;

    setTimeout(() => {
      if (this.currentMode === 'full') {
        this.toggleMode('compressed');
      }
    }, 2600);
  }

  toggleMode(forceMode = null) {
    const nextMode = forceMode || (this.currentMode === 'full' ? 'compressed' : 'full');
    if (nextMode === this.currentMode && forceMode) return;

    this.currentMode = nextMode;
    // Trigger burst of pixel sorting during morph
    this.sortIntensity = 0.88;
    this.targetSortIntensity = 0.0;
  }

  _animate() {
    requestAnimationFrame(() => this._animate());

    // Smoothly decay sort intensity towards target (re-sorting resolution)
    this.sortIntensity += (this.targetSortIntensity - this.sortIntensity) * 0.055;

    // Smooth mode transition progress (0 = full name, 1 = [ CCidLara ])
    const targetProgress = this.currentMode === 'compressed' ? 1.0 : 0.0;
    this.transitionProgress += (targetProgress - this.transitionProgress) * 0.08;

    this._render();
  }

  _render() {
    const w = this.width;
    const h = this.height;
    if (w <= 0 || h <= 0) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, w, h);

    // If completely sharp and no mouse interaction, fast-path render
    if (this.sortIntensity < 0.015 && !this.mouse.active) {
      if (this.transitionProgress < 0.02) {
        ctx.drawImage(this.offA, 0, 0);
      } else if (this.transitionProgress > 0.98) {
        ctx.drawImage(this.offB, 0, 0);
      } else {
        ctx.globalAlpha = 1 - this.transitionProgress;
        ctx.drawImage(this.offA, 0, 0);
        ctx.globalAlpha = this.transitionProgress;
        ctx.drawImage(this.offB, 0, 0);
        ctx.globalAlpha = 1.0;
      }
      return;
    }

    // Blend offscreen buffers into intermediate frame
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.clearRect(0, 0, w, h);
    tempCtx.globalAlpha = 1 - this.transitionProgress;
    tempCtx.drawImage(this.offA, 0, 0);
    tempCtx.globalAlpha = this.transitionProgress;
    tempCtx.drawImage(this.offB, 0, 0);
    tempCtx.globalAlpha = 1.0;

    const imgData = tempCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Apply Kim Asendorf Pixel Sorting algorithm
    this._applyPixelSort(data, w, h);

    // Put sorted image data back and render with subtle chromatic bloom
    tempCtx.putImageData(imgData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
  }

  _applyPixelSort(data, w, h) {
    const sort = this.sortIntensity;
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const mouseActive = this.mouse.active;

    // Threshold determines which pixels participate in sorting (studio-ity.com/pixelsort concept)
    const thresholdLow = Math.max(15, (1.0 - sort) * 160);
    const thresholdHigh = 255;
    const maxStreak = Math.floor(sort * w * 0.45);

    // Row-by-row horizontal pixel sorting
    for (let y = 0; y < h; y += 2) {
      // Row-level mouse proximity factor
      let rowSortFactor = sort;
      if (mouseActive) {
        const dy = Math.abs(y - my);
        if (dy < 45) {
          rowSortFactor = Math.min(1.0, rowSortFactor + (1 - dy / 45) * 0.7);
        }
      }

      if (rowSortFactor < 0.02) continue;

      let x = 0;
      while (x < w) {
        // Find start of sortable span
        while (x < w) {
          const idx = (y * w + x) * 4;
          const a = data[idx + 3];
          if (a > 10) {
            const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            if (luma >= thresholdLow && luma <= thresholdHigh) break;
          }
          x++;
        }

        const startX = x;

        // Find end of sortable span
        while (x < w) {
          const idx = (y * w + x) * 4;
          const a = data[idx + 3];
          if (a <= 10) break;
          const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          if (luma < thresholdLow || luma > thresholdHigh) break;
          x++;
        }

        const endX = x;
        const spanLen = endX - startX;

        // Sort span if long enough
        if (spanLen > 2) {
          this._sortSpan(data, w, y, startX, endX, rowSortFactor, maxStreak);
        }
      }
    }
  }

  _sortSpan(data, w, y, startX, endX, intensity, maxStreak) {
    const span = [];
    for (let x = startX; x < endX; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      span.push({ r, g, b, a, luma, x });
    }

    // Sort by brightness/luminance
    span.sort((p1, p2) => p1.luma - p2.luma);

    // Apply sorted pixels with streak smearing
    const streak = Math.min(Math.floor(intensity * 35), maxStreak);
    for (let i = 0; i < span.length; i++) {
      const p = span[i];
      const destX = Math.min(startX + i + Math.floor(Math.sin(y * 0.1) * streak), w - 1);
      const idx = (y * w + destX) * 4;

      // Arterial crimson & antique gold chromatic glitch shift on high sort
      if (intensity > 0.4) {
        data[idx] = Math.min(255, p.r + 35);        // Red channel boost
        data[idx + 1] = p.g;
        data[idx + 2] = Math.max(0, p.b - 20);      // Shift towards warm amber
      } else {
        data[idx] = p.r;
        data[idx + 1] = p.g;
        data[idx + 2] = p.b;
      }
      data[idx + 3] = p.a;
    }
  }
}

// Instantiate engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pixelSortEngine = new PixelSortTextEngine();
});
