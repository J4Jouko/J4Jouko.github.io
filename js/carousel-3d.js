document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-3d-stage');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.carousel-3d-card-container'));
    const numCards = cards.length;
    if (numCards === 0) return;

    let activeIndex = cards.findIndex(card => card.classList.contains('active'));
    if (activeIndex === -1) {
        activeIndex = Math.floor(numCards / 2);
    }

    function updateCarouselClasses() {
        cards.forEach((card, i) => {
            card.className = 'carousel-3d-card-container'; // Reset classes
            
            const pos = (i - activeIndex + numCards) % numCards;

            switch(pos) {
                case 0:
                    card.classList.add('active');
                    break;
                case 1:
                    card.classList.add('right');
                    break;
                case numCards - 1:
                    card.classList.add('left');
                    break;
                default:
                    // This logic is for more than 3 cards, hides them in the back
                    if (pos < numCards / 2) {
                        card.classList.add('back-right');
                    } else {
                        card.classList.add('back-left');
                    }
                    break;
            }
        });
    }

    carousel.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.carousel-3d-card-container');
        if (!clickedCard || clickedCard.classList.contains('active')) {
            return;
        }

        e.preventDefault();

        const clickedIndex = cards.indexOf(clickedCard);
        
        // Determine if the clicked card was to the left or right of active
        const pos = (clickedIndex - activeIndex + numCards) % numCards;

        if (pos === 1) { // A card to the right was clicked
            activeIndex = (activeIndex + 1) % numCards;
        } else if (pos === numCards - 1) { // A card to the left was clicked
            activeIndex = (activeIndex - 1 + numCards) % numCards;
        } else { // Handle clicks on back cards if necessary
            // For this 3-card setup, this part is not essential
            // but for a larger carousel you might want to jump multiple spots.
            // For now, we just rotate one step.
            if (pos < numCards / 2) {
                activeIndex = (activeIndex + 1) % numCards;
            } else {
                activeIndex = (activeIndex - 1 + numCards) % numCards;
            }
        }
        
        updateCarouselClasses();
    });

    // Initial setup
    updateCarouselClasses();
});
