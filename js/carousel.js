document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".carousel-wrapper");
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-arrow.prev");
    const nextBtn = document.querySelector(".carousel-arrow.next");

    let index = 0;
    let isScrolling = false;

    function getStep() {
        if (track.children.length < 2) return 0;
        return track.children[1].offsetLeft - track.children[0].offsetLeft;
    }

    function getMaxIndex() {
        const visibleCards = 4;
        const logicalMax = track.children.length - visibleCards;

        const maxTranslate = track.scrollWidth - wrapper.clientWidth;
        const step = getStep();
        const physicalMax = step > 0 ? Math.round(maxTranslate / step) : 0;

        return Math.min(logicalMax, physicalMax);
    }

    function updateCarousel() {
        const step = getStep();
        const maxIndex = getMaxIndex();

        index = Math.max(0, Math.min(index, maxIndex));

        track.style.transform = `translateX(-${index * step}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === maxIndex;
    }

    prevBtn.addEventListener("click", () => {
        index--;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        index++;
        updateCarousel();
    });

    wrapper.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            if (isScrolling) return;

            isScrolling = true;

            if (e.deltaY > 0) index++;
            else index--;

            updateCarousel();

            setTimeout(() => {
                isScrolling = false;
            }, 300);
        },
        { passive: false }
    );

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
});
