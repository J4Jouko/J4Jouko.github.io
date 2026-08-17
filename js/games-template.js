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
        overlay.innerHTML = `
            <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
            <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>
            <img class="lightbox-overlay-image" alt="">
            <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>
        `;
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('.lightbox-overlay-image');
        const closeBtn = overlay.querySelector('.lightbox-close');
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');

        let gallery = [];
        let currentIndex = -1;

        const showAt = (index) => {
            if (!gallery.length) return;
            currentIndex = (index + gallery.length) % gallery.length;
            const img = gallery[currentIndex];
            overlayImg.src = img.currentSrc || img.src;
            overlayImg.alt = img.alt || '';
        };

        const openLightbox = (img) => {
            const carousel = img.closest('.media-carousel');
            gallery = carousel
                ? Array.from(carousel.querySelectorAll('.media-slide img'))
                : [img];
            showAt(gallery.indexOf(img));
            overlay.classList.toggle('has-nav', gallery.length > 1);
            overlay.classList.add('is-open');
            document.body.classList.add('lightbox-locked');
        };

        const closeLightbox = () => {
            overlay.classList.remove('is-open');
            document.body.classList.remove('lightbox-locked');
        };

        lightboxTargets.forEach((img) => {
            img.addEventListener('click', () => openLightbox(img));
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showAt(currentIndex - 1);
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showAt(currentIndex + 1);
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showAt(currentIndex - 1);
            if (e.key === 'ArrowRight') showAt(currentIndex + 1);
        });
    }
});
