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
            // First section (index 0) is the base, always visible underneath
            if (index === 0) {
                section.style.opacity = 1;
                section.classList.add('is-active');
                return;
            }

            // Calculate opacity for subsequent sections
            // Section i fades in between scroll position (i-1)*vh and i*vh
            const start = (index - 1) * vh;
            
            // Calculate progress (0 to 1) within the section's scroll range
            let progress = (scrollY - start) / vh;
            
            // Steeper transition: Fades in between 10% and 60% of the scroll distance
            // This ensures we don't linger in a semi-transparent state
            let opacity = (progress - 0.1) / 0.5;
            
            // Clamp opacity between 0 and 1
            opacity = Math.max(0, Math.min(1, opacity));
            
            section.style.opacity = opacity;

            // Disable pointer events on mostly transparent sections to allow hovering on content below.
            section.style.pointerEvents = opacity > 0.9 ? 'auto' : 'none';

            // Trigger internal content animation when section starts appearing
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