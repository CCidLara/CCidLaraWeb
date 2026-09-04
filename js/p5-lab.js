/**
 * CCidLara — Responsive Motion Graphics Background Engine (p5.js)
 * 
 * Visceral, dark surrealist atmospheric background:
 * - Glowing ember particles (arterial crimson, antique gold, bone ash)
 * - Dynamic constellation vector lattice connecting neighboring particles
 * - Viscous mouse wake with swirling deflection and velocity distortion
 * - Responsive Pixel-Sort Glitch Waves: cursor acceleration and scrolling
 *   trigger horizontal pixel-sorting glitch streaks across the dark void.
 * - Scroll-linked phase progression (Ethereal Top -> Neural Lattice -> Gale Shear)
 */

'use strict';

(function () {
  const container = document.getElementById('p5-ambient-backdrop');
  if (!container || typeof p5 === 'undefined') return;

  const sketch = (p) => {
    let canvasW = window.innerWidth;
    let canvasH = window.innerHeight;

    // Particle & Glitch Systems
    const NUM_PARTICLES = 130;
    let particles = [];
    let glitchRows = [];

    let noiseTime = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    // Smooth mouse tracking with inertia
    let mouseXSmooth = canvasW * 0.5;
    let mouseYSmooth = canvasH * 0.5;
    let mouseXTarget = canvasW * 0.5;
    let mouseYTarget = canvasH * 0.5;
    let mouseVelocity = 0;
    let lastRawX = canvasW * 0.5;
    let lastRawY = canvasH * 0.5;

    p.setup = () => {
      const canvas = p.createCanvas(canvasW, canvasH);
      canvas.parent(container);
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 1.5));
      p.strokeCap(p.ROUND);

      initParticles();

      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      onScroll();
    };

    function onResize() {
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      p.resizeCanvas(canvasW, canvasH);
      initParticles();
    }

    function onScroll() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

      // Trigger ambient pixel sort wave on rapid scroll
      if (Math.random() < 0.45 && glitchRows.length < 12) {
        triggerGlitchWave(p.random(canvasH), p.random(20, 80));
      }
    }

    function onMouseMove(e) {
      mouseXTarget = e.clientX;
      mouseYTarget = e.clientY;

      const dx = e.clientX - lastRawX;
      const dy = e.clientY - lastRawY;
      const speed = Math.hypot(dx, dy);
      mouseVelocity = Math.min(speed * 0.12, 18);

      // When moving quickly, spawn an interactive pixel-sort streak near the cursor
      if (speed > 18 && Math.random() < 0.35 && glitchRows.length < 15) {
        triggerGlitchWave(e.clientY + p.random(-30, 30), p.random(15, 60));
      }

      lastRawX = e.clientX;
      lastRawY = e.clientY;
    }

    function triggerGlitchWave(y, height) {
      glitchRows.push({
        y: y,
        h: height,
        life: 1.0,
        decay: p.random(0.025, 0.055),
        offset: p.random(-45, 45),
        colorType: p.random() > 0.5 ? 'crimson' : 'gold'
      });
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(createParticle());
      }
    }

    function createParticle() {
      const rnd = p.random();
      let type = 'bone';
      let r = 237, g = 230, b = 218; // Bone
      let size = p.random(1.2, 3.2);

      if (rnd > 0.72) {
        type = 'crimson';
        r = 224; g = 74; b = 58; // Arterial crimson
        size = p.random(2.0, 4.5);
      } else if (rnd > 0.45) {
        type = 'gold';
        r = 197; g = 160; b = 89; // Antique gold
        size = p.random(1.8, 3.8);
      }

      return {
        x: p.random(canvasW),
        y: p.random(canvasH),
        vx: p.random(-0.5, 0.5),
        vy: p.random(-0.6, 0.2),
        size,
        baseAlpha: p.random(120, 220),
        r, g, b,
        type,
        seed: p.random(1000),
        pulseSpeed: p.random(0.02, 0.05),
        pulseOffset: p.random(p.TWO_PI)
      };
    }

    p.draw = () => {
      // Smooth interpolation for mouse
      mouseXSmooth += (mouseXTarget - mouseXSmooth) * 0.06;
      mouseYSmooth += (mouseYTarget - mouseYSmooth) * 0.06;
      mouseVelocity *= 0.93;

      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;
      noiseTime += 0.003;

      // Deep obsidian void with subtle persistence trail
      p.background(6, 6, 8, 48);

      // 1. Draw Particle Constellations & Embers
      drawParticles();

      // 2. Draw Pixel-Sorting Glitch Waves
      drawGlitchWaves();
    };

    function drawParticles() {
      const mx = mouseXSmooth;
      const my = mouseYSmooth;
      const mouseActive = mouseVelocity > 0.2 || (Math.hypot(mx - canvasW * 0.5, my - canvasH * 0.5) > 15);

      // Connection threshold distance
      const MAX_LINK_DIST = 95;

      // Update & Draw Links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Multi-octave curl noise drift
        const angle = p.noise(p1.x * 0.002, p1.y * 0.002, noiseTime + p1.seed) * p.TWO_PI * 2.2;
        p1.vx += Math.cos(angle) * 0.04;
        p1.vy += Math.sin(angle) * 0.04 - (0.05 * (1 - scrollProgress));

        // Mouse repulsion / vortex swirl
        if (mouseActive) {
          const dx = p1.x - mx;
          const dy = p1.y - my;
          const dist = Math.hypot(dx, dy);
          const repelRadius = 160 + mouseVelocity * 7;

          if (dist < repelRadius && dist > 1) {
            const force = (1 - dist / repelRadius) * (1.6 + mouseVelocity * 0.3);
            p1.vx += (dx / dist) * force;
            p1.vy += (dy / dist) * force;

            // Subtle angular swirl
            p1.vx += (-dy / dist) * force * 0.35;
            p1.vy += (dx / dist) * force * 0.35;
          }
        }

        // Apply friction
        p1.vx *= 0.96;
        p1.vy *= 0.96;

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Screen wrap
        if (p1.x < -20) p1.x = canvasW + 20;
        if (p1.x > canvasW + 20) p1.x = -20;
        if (p1.y < -20) p1.y = canvasH + 20;
        if (p1.y > canvasH + 20) p1.y = -20;

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < MAX_LINK_DIST) {
            const linkAlpha = (1 - d / MAX_LINK_DIST) * 45;
            p.stroke(p1.r, p1.g, p1.b, linkAlpha);
            p.strokeWeight(0.65);
            p.line(p1.x, p1.y, p2.x, p2.y);
          }
        }

        // Pulse size
        const pulse = 1 + Math.sin(p.frameCount * p1.pulseSpeed + p1.pulseOffset) * 0.2;
        const currentSize = p1.size * pulse;

        // Outer glow aura
        p.noStroke();
        p.fill(p1.r, p1.g, p1.b, p1.baseAlpha * 0.25);
        p.circle(p1.x, p1.y, currentSize * 2.6);

        // Core bright nucleus
        p.fill(p1.r, p1.g, p1.b, p1.baseAlpha);
        p.circle(p1.x, p1.y, currentSize);
      }
    }

    function drawGlitchWaves() {
      for (let i = glitchRows.length - 1; i >= 0; i--) {
        const g = glitchRows[i];

        p.noStroke();
        if (g.colorType === 'crimson') {
          p.fill(224, 74, 58, g.life * 65);
        } else {
          p.fill(197, 160, 89, g.life * 55);
        }

        // Draw horizontal pixel-sorted glitch lines
        const segWidth = p.random(60, 220);
        const startX = p.random(0, canvasW - segWidth);
        p.rect(startX + g.offset, g.y, segWidth, g.h * 0.4);

        g.life -= g.decay;
        if (g.life <= 0) {
          glitchRows.splice(i, 1);
        }
      }
    }
  };

  new p5(sketch);
})();
