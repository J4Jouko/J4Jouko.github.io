// Firefly VFX Animation
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('body');
    const fireflyCount = 20; // Increased for a more lively effect
    const fireflies = [];
    let mouse = { x: -100, y: -100 };

    // --- Create Fireflies ---
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = createFireflyElement();
        container.appendChild(firefly);
        fireflies.push(initializeFirefly(firefly));
    }

    function createFireflyElement() {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        const size = 3 + Math.random() * 5;
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        return firefly;
    }

    function initializeFirefly(element) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return {
            element: element,
            x: x,
            y: y,
            vx: Math.random() * 1 - 0.5, // x velocity
            vy: Math.random() * 1 - 0.5, // y velocity
            alpha: 0.5 + Math.random() * 0.5, // opacity
            targetAlpha: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2
        };
    }

    // --- Animation Loop ---
    function animate() {
        fireflies.forEach(fly => {
            // Mouse influence
            const dx = fly.x - mouse.x;
            const dy = fly.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                // Move away from cursor
                const angle = Math.atan2(dy, dx);
                fly.vx += Math.cos(angle) * 0.1;
                fly.vy += Math.sin(angle) * 0.1;
            }

            // Add some gentle, random floating movement
            fly.vx += (Math.random() - 0.5) * 0.05;
            fly.vy += (Math.random() - 0.5) * 0.05;

            // Limit velocity
            fly.vx = Math.max(-0.7, Math.min(0.7, fly.vx));
            fly.vy = Math.max(-0.7, Math.min(0.7, fly.vy));

            // Update position
            fly.x += fly.vx;
            fly.y += fly.vy;

            // Pulsing opacity
            fly.phase += 0.03;
            fly.alpha = fly.targetAlpha * (0.5 + Math.sin(fly.phase) * 0.5);

            // Boundary check - wrap around screen
            if (fly.x < -10) fly.x = window.innerWidth + 5;
            if (fly.x > window.innerWidth + 10) fly.x = -5;
            if (fly.y < -10) fly.y = window.innerHeight + 5;
            if (fly.y > window.innerHeight + 10) fly.y = -5;

            // Apply styles
            fly.element.style.transform = `translate(${fly.x}px, ${fly.y}px)`;
            fly.element.style.opacity = fly.alpha;
        });

        requestAnimationFrame(animate);
    }

    // --- Event Listeners ---
    container.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    container.addEventListener('mouseleave', () => {
        mouse.x = -100;
        mouse.y = -100;
    });

    window.addEventListener('resize', () => {
        fireflies.forEach(fly => {
            fly.x = Math.random() * window.innerWidth;
            fly.y = Math.random() * window.innerHeight;
        });
    });

    // Start the animation
    animate();
});

