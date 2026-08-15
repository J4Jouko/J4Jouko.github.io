document.addEventListener('DOMContentLoaded', () => {
    const characterSwitchers = document.querySelectorAll('[data-character-switcher]');
    characterSwitchers.forEach((switcher) => {
        const section = switcher.closest('section');
        if (!section) return;

        const image = section.querySelector('[data-character-image]');
        if (!image) return;

        const buttons = switcher.querySelectorAll('.breakdown-switch-btn');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const newSrc = btn.getAttribute('data-src');
                const newAlt = btn.getAttribute('data-alt') || image.alt;
                if (!newSrc) return;

                image.src = newSrc;
                image.alt = newAlt;

                buttons.forEach((item) => item.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });
    });

    const forcedLoopGifs = document.querySelectorAll('img[data-force-gif-loop="true"]');
    forcedLoopGifs.forEach((img) => {
        const baseSrc = img.getAttribute('src');
        if (!baseSrc) return;

        const loopMs = Number(img.getAttribute('data-loop-ms')) || 5600;
        window.setInterval(() => {
            const separator = baseSrc.includes('?') ? '&' : '?';
            img.src = `${baseSrc}${separator}r=${Date.now()}`;
        }, loopMs);
    });

    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.media-carousel');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');

        if (!track || !prevBtn || !nextBtn) {
            return;
        }

        const getStep = () => {
            const first = track.querySelector('.media-slide');
            if (!first) return track.clientWidth * 0.9;
            const gap = parseFloat(getComputedStyle(track).gap || '0');
            return first.getBoundingClientRect().width + gap;
        };

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getStep(), behavior: 'smooth' });
        });
    });
});
