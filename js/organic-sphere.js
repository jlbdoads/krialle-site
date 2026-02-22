/**
 * Krialle — Organic Diffuse Sphere
 * Inspired by: cell under microscope / iPhone data transfer sphere
 * Effect: Dense particle cloud with NO hard edges or strokes.
 * Denser in the center, dissolving organically at the edges.
 * All in Ice/White palette on dark background.
 */
(function () {
    const canvas = document.getElementById('organicSphere');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    const SIZE = 800;
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    ctx.scale(DPR, DPR);

    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const R = 278; // Soft sphere radius (increased by 35% relative to 206)

    // ── Noise function (layered sines, no hard lines) ──────────────────────
    function noise(x, y, t, freq, amp) {
        return amp * (
            Math.sin(x * freq + t * 0.7) *
            Math.cos(y * freq - t * 0.5) +
            Math.sin((x + y) * freq * 0.7 - t * 0.9) * 0.5
        );
    }

    // ── Particle system ────────────────────────────────────────────────────
    const PARTICLES = 5200;
    const particles = [];

    for (let i = 0; i < PARTICLES; i++) {
        // Distribute particles in a sphere using random spherical coords
        const angle = Math.random() * Math.PI * 2;
        // Use sqrt so particles bias toward center (denser core)
        const dist = Math.pow(Math.random(), 0.6) * R;
        const jitterX = (Math.random() - 0.5) * 18;
        const jitterY = (Math.random() - 0.5) * 18;

        particles.push({
            baseX: Math.cos(angle) * dist,
            baseY: Math.sin(angle) * dist,
            jitterX, jitterY,
            speed: 0.15 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            size: 0.6 + Math.random() * 1.8,
            // Opacity increased ~25-30% on base formula
            baseOpacity: Math.max(0.06, 0.45 * (1 - dist / R) + 0.08 * Math.random()),
            freqX: 0.008 + Math.random() * 0.006,
            freqY: 0.008 + Math.random() * 0.006,
        });
    }

    let t = 0;

    function render() {
        ctx.clearRect(0, 0, SIZE, SIZE);

        // Draw each particle
        for (let i = 0; i < PARTICLES; i++) {
            const p = particles[i];
            const tt = t * p.speed + p.phase;

            // Organic position: base position + noise drift
            const dx = noise(p.baseX, p.baseY, tt, p.freqX, 22) + p.jitterX * Math.sin(tt * 0.4);
            const dy = noise(p.baseX, p.baseY, tt, p.freqY, 22) + p.jitterY * Math.cos(tt * 0.3);

            const px = CX + p.baseX + dx;
            const py = CY + p.baseY + dy;

            // Distance from center for soft falloff
            const distFromCenter = Math.sqrt(Math.pow(px - CX, 2) + Math.pow(py - CY, 2));
            // Gaussian falloff — particles far from edge fade to 0
            const falloff = Math.exp(-Math.pow(distFromCenter / (R * 0.78), 2.5));

            // Multiplier on opacity bumped ~25% (0.7 -> 0.9 base) and max alpha to 1.0 
            const alpha = Math.min(1.0, p.baseOpacity * falloff * (0.9 + 0.3 * Math.sin(tt * 1.3)));
            if (alpha < 0.01) continue;

            // Slight size pulse
            const sz = p.size * (1 + 0.15 * Math.sin(tt * 0.8));

            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'rgba(237, 242, 244, 1)';
            ctx.beginPath();
            ctx.arc(px, py, sz, 0, Math.PI * 2);
            ctx.fill();
        }

        // Reset alpha
        ctx.globalAlpha = 1;

        t += 0.016;
        requestAnimationFrame(render);
    }

    render();
})();
