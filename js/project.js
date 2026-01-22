document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('.project-banner, .content-block');
    
    if (sections.length === 0) return;

    // Initialize z-indices to ensure correct stacking order
    sections.forEach((section, index) => {
        section.style.zIndex = index + 1;
    });

    // Create a scroll track container for snapping
    const scrollTrack = document.createElement('div');
    scrollTrack.className = 'scroll-track';
    scrollTrack.style.position = 'absolute';
    scrollTrack.style.top = '0';
    scrollTrack.style.left = '0';
    scrollTrack.style.width = '100%';
    scrollTrack.style.pointerEvents = 'none';
    scrollTrack.style.zIndex = '-100';
    document.body.appendChild(scrollTrack);

    function setDimensions() {
        // Set body height to allow scrolling
        // Height = (number of sections) * 100vh
        // This creates the scrollable area that drives the animation
        document.body.style.height = `${sections.length * 100}vh`;
        
        // Populate scroll track with snap points
        scrollTrack.innerHTML = '';
        sections.forEach(() => {
            const snapPoint = document.createElement('div');
            snapPoint.style.height = '100vh';
            snapPoint.style.scrollSnapAlign = 'start';
            scrollTrack.appendChild(snapPoint);
        });
    }

    function onScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        
        sections.forEach((section, index) => {
            // Calculate the scroll position for this section
            const sectionScrollStart = index * vh;
            const sectionScrollEnd = (index + 1) * vh;
            
            // First section (banner) - handle fade out when scrolling down
            if (index === 0) {
                if (scrollY < vh) {
                    // Banner is visible
                    let fadeOutProgress = scrollY / vh;
                    let opacity = 1 - (fadeOutProgress * 0.8); // Fade to 20% opacity
                    section.style.opacity = Math.max(0.2, opacity);
                    section.classList.add('is-active');
                    section.style.pointerEvents = scrollY < vh * 0.5 ? 'auto' : 'none';
                } else {
                    section.style.opacity = 0.2;
                    section.classList.add('is-active');
                    section.style.pointerEvents = 'none';
                }
                return;
            }

            // For other sections
            const start = (index - 1) * vh;
            let progress = (scrollY - start) / vh;
            
            // Steeper transition: Fades in between 10% and 60% of the scroll distance
            let opacity = (progress - 0.1) / 0.5;
            opacity = Math.max(0, Math.min(1, opacity));
            
            // Apply transition effect
            section.style.transition = 'opacity 0.3s ease-out';
            section.style.opacity = opacity;

            // Disable pointer events on mostly transparent sections
            section.style.pointerEvents = opacity > 0.9 ? 'auto' : 'none';

            // Trigger internal content animation with smoother transitions
            if (opacity > 0.2) {
                section.classList.add('is-active');
            } else {
                section.classList.remove('is-active');
            }
        });
    }

    window.addEventListener('resize', () => {
        setDimensions();
        onScroll();
    });
    
    window.addEventListener('scroll', onScroll);
    
    // Initial setup
    setDimensions();
    onScroll();

    console.log('Project page scripts loaded.');
});