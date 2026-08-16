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

    document.querySelectorAll('.media-carousel').forEach((track) => {
        track.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
            e.preventDefault();
            track.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }, { passive: false });
    });

    const lightboxTargets = document.querySelectorAll('.image-showcase img, .media-slide img');
    if (lightboxTargets.length) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-overlay-image" alt="">';
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('.lightbox-overlay-image');
        const closeBtn = overlay.querySelector('.lightbox-close');

        const openLightbox = (src, alt) => {
            overlayImg.src = src;
            overlayImg.alt = alt || '';
            overlay.classList.add('is-open');
            document.body.classList.add('lightbox-locked');
        };

        const closeLightbox = () => {
            overlay.classList.remove('is-open');
            document.body.classList.remove('lightbox-locked');
        };

        lightboxTargets.forEach((img) => {
            img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }
});
