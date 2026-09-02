/**
 * CCidLara — Interactive p5.js Generative Optical Laboratory
 * Lieb Photonic Lattice & Wave Synthesizer
 * 
 * Directly connected to peer-reviewed research:
 * "Strain-induced localization to delocalization transition on a Lieb photonic ribbon lattice"
 * (D. Román-Cortés, G. Fadic, C. Cid-Lara et al. · Nature Scientific Reports)
 */

'use strict';

(function () {
  const container = document.getElementById('p5-canvas-container');
  if (!container || typeof p5 === 'undefined') return;

  const sketch = (p) => {
    let canvasW = 600;
    let canvasH = 440;

    // Simulation parameters
    let wavelength = 720; // nm (Infrared default from photobook)
    let strain = 0.0;     // Strain parameter delta
    let wavePackets = [];
    let latticeNodes = [];
    let time = 0;

    // UI elements
    let sliderWavelength;
    let sliderStrain;
    let valWavelength;
    let valStrain;
    let telemetryState;
    let telemetryBand;

    p.setup = () => {
      const parentW = container.clientWidth || 600;
      canvasW = Math.min(parentW, 700);
      canvasH = Math.round(canvasW * 0.72);

      const canvas = p.createCanvas(canvasW, canvasH);
      canvas.parent(container);
      p.pixelDensity(1);

      // Connect HTML controls
      sliderWavelength = document.getElementById('slider-wavelength');
      sliderStrain = document.getElementById('slider-strain');
      valWavelength = document.getElementById('val-wavelength');
      valStrain = document.getElementById('val-strain');
      telemetryState = document.getElementById('telemetry-state');
      telemetryBand = document.getElementById('telemetry-band');

      if (sliderWavelength) {
        sliderWavelength.addEventListener('input', (e) => {
          wavelength = parseFloat(e.target.value);
          if (valWavelength) valWavelength.textContent = `${wavelength} nm`;
        });
      }

      if (sliderStrain) {
        sliderStrain.addEventListener('input', (e) => {
          strain = parseFloat(e.target.value);
          if (valStrain) valStrain.textContent = strain.toFixed(2);
          updateTelemetry();
        });
      }

      initLattice();
      // Initial wave pulse
      addWavePulse(canvasW * 0.5, canvasH * 0.5);
    };

    function initLattice() {
      latticeNodes = [];
      const cols = 9;
      const rows = 7;
      const spacingX = canvasW / (cols + 1);
      const spacingY = canvasH / (rows + 1);

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          const x = c * spacingX;
          const y = r * spacingY;
          // Lieb lattice sublattices: A, B, C
          const isA = (r % 2 === 1 && c % 2 === 1);
          const isB = (r % 2 === 1 && c % 2 === 0);
          const isC = (r % 2 === 0 && c % 2 === 1);

          if (isA || isB || isC) {
            latticeNodes.push({
              x, y,
              type: isA ? 'A' : (isB ? 'B' : 'C'),
              amp: 0
            });
          }
        }
      }
    }

    function addWavePulse(x, y) {
      wavePackets.push({
        originX: x,
        originY: y,
        birthTime: time,
        lifespan: 180, // frames
        decay: 1.0
      });
      if (wavePackets.length > 8) wavePackets.shift();
    }

    function updateTelemetry() {
      if (!telemetryState || !telemetryBand) return;
      if (strain < 0.22) {
        telemetryState.textContent = "Estado Localizado (Banda Plana Lieb)";
        telemetryState.style.color = "#c5a059";
        telemetryBand.textContent = "Flat-band compacta (Transporte nulo)";
      } else if (strain < 0.65) {
        telemetryState.textContent = "Transición Crítica (Apertura de Cono)";
        telemetryState.style.color = "#e5c158";
        telemetryBand.textContent = "Hibridación multiorbital / túnel parcial";
      } else {
        telemetryState.textContent = "Régimen Delocalizado (Dispersión Óptica)";
        telemetryState.style.color = "#e53835";
        telemetryBand.textContent = "Bandas dispersivas abiertas (Transporte balístico)";
      }
    }

    p.mousePressed = () => {
      if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
        addWavePulse(p.mouseX, p.mouseY);
      }
    };

    p.touchStarted = () => {
      if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
        addWavePulse(p.mouseX, p.mouseY);
      }
    };

    p.draw = () => {
      time++;
      p.background(7, 7, 10);

      // Map wavelength to optical color hue
      // 450nm (blue) -> 530nm (green) -> 650nm (red) -> 720nm (infrared ruby)
      let waveColor;
      if (wavelength < 500) {
        waveColor = p.color(100, 180, 255);
      } else if (wavelength < 580) {
        waveColor = p.color(120, 240, 160);
      } else if (wavelength < 680) {
        waveColor = p.color(240, 140, 60);
      } else {
        waveColor = p.color(229, 56, 53); // 720nm Infrared ruby
      }

      const kFreq = p.map(wavelength, 450, 750, 0.16, 0.06);
      const phaseSpeed = p.map(wavelength, 450, 750, 2.5, 4.2);
      const delocFactor = p.map(strain, 0, 1, 0.25, 1.6);

      // Draw Waveguide Interconnections
      p.stroke(40, 40, 52);
      p.strokeWeight(1);
      for (let i = 0; i < latticeNodes.length; i++) {
        const n1 = latticeNodes[i];
        for (let j = i + 1; j < latticeNodes.length; j++) {
          const n2 = latticeNodes[j];
          const dist = p.dist(n1.x, n1.y, n2.x, n2.y);
          if (dist < canvasW * 0.15) {
            // Modulate coupling thickness with strain
            const isHoriz = Math.abs(n1.y - n2.y) < 5;
            p.strokeWeight(isHoriz ? 1 + strain * 1.5 : 1);
            p.stroke(isHoriz ? p.lerpColor(p.color(50, 50, 65), p.color(197, 160, 89), strain) : p.color(45, 45, 58));
            p.line(n1.x, n1.y, n2.x, n2.y);
          }
        }
      }

      // Compute Wave Field at Lattice Nodes
      for (let node of latticeNodes) {
        let totalAmp = 0;

        for (let wave of wavePackets) {
          const age = time - wave.birthTime;
          if (age > wave.lifespan) continue;

          const d = p.dist(node.x, node.y, wave.originX, wave.originY);
          const travelR = age * phaseSpeed * delocFactor;

          // Wave equation envelope
          const envelope = p.exp(-p.sq((d - travelR) / 45));
          const spatialPhase = p.sin(d * kFreq - age * 0.2);
          const decay = p.map(age, 0, wave.lifespan, 1, 0);

          totalAmp += envelope * spatialPhase * decay;
        }

        node.amp = totalAmp;

        // Render Node Glow & Amplitude
        const glowRadius = p.map(Math.abs(node.amp), 0, 1.5, 4, 18, true);
        p.noStroke();

        if (node.type === 'A') {
          // Corner Lieb site (Gold)
          p.fill(197, 160, 89, 180 + node.amp * 70);
          p.circle(node.x, node.y, 6);
        } else {
          // Edge sites B & C (Bone White)
          p.fill(245, 242, 235, 140 + node.amp * 90);
          p.circle(node.x, node.y, 4);
        }

        if (Math.abs(node.amp) > 0.08) {
          p.fill(p.red(waveColor), p.green(waveColor), p.blue(waveColor), p.min(220, Math.abs(node.amp) * 140));
          p.circle(node.x, node.y, glowRadius);
        }
      }

      // Draw wavefront pulses
      p.noFill();
      for (let wave of wavePackets) {
        const age = time - wave.birthTime;
        if (age <= wave.lifespan) {
          const r = age * phaseSpeed * delocFactor;
          const alpha = p.map(age, 0, wave.lifespan, 160, 0);
          p.stroke(p.red(waveColor), p.green(waveColor), p.blue(waveColor), alpha);
          p.strokeWeight(1.2);
          p.circle(wave.originX, wave.originY, r * 2);
        }
      }

      // Archival Reticle / Compass Corner Marks
      p.stroke(197, 160, 89, 90);
      p.strokeWeight(1);
      // Top-left
      p.line(12, 12, 28, 12);
      p.line(12, 12, 12, 28);
      // Top-right
      p.line(canvasW - 12, 12, canvasW - 28, 12);
      p.line(canvasW - 12, 12, canvasW - 12, 28);
      // Bottom-left
      p.line(12, canvasH - 12, 28, canvasH - 12);
      p.line(12, canvasH - 12, 12, canvasH - 28);
      // Bottom-right
      p.line(canvasW - 12, canvasH - 12, canvasW - 28, canvasH - 12);
      p.line(canvasW - 12, canvasH - 12, canvasW - 12, canvasH - 28);

      // On-canvas telemetry overlay
      p.noStroke();
      p.fill(245, 242, 235, 120);
      p.textFont('Courier Prime');
      p.textSize(10);
      p.text(`LIEB-LATTICE // λ=${wavelength}nm // δ=${strain.toFixed(2)}`, 16, canvasH - 16);
      p.text(`CLICK/TAP TO PULSE WAVE`, canvasW - 170, 22);
    };

    p.windowResized = () => {
      const parentW = container.clientWidth || 600;
      canvasW = Math.min(parentW, 700);
      canvasH = Math.round(canvasW * 0.72);
      p.resizeCanvas(canvasW, canvasH);
      initLattice();
    };
  };

  new p5(sketch);
})();
