document.addEventListener('DOMContentLoaded', () => {
    const initialLoader = document.getElementById('initial-loader');
    const transitionLoader = document.getElementById('transition-loader');
    const loaderTexts = [
        "Summoning the spirits...",
        "Crossing the veil...",
        "Whispers from the beyond..."
    ];
    let currentTextIndex = 0;

    // Initial loader text rotation
    const rotateText = () => {
        const loaderText = initialLoader.querySelector('.loader-text');
        loaderText.textContent = loaderTexts[currentTextIndex];
        currentTextIndex = (currentTextIndex + 1) % loaderTexts.length;
    };
    
    setInterval(rotateText, 2000);

    const MINIMUM_LOAD_TIME = 1200;
    const loadStartTime = Date.now();

    window.addEventListener('load', () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - loadStartTime;
        const remainingTime = Math.max(MINIMUM_LOAD_TIME - elapsedTime, 0);

        setTimeout(() => {
            initialLoader.style.opacity = '0';
            initialLoader.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                initialLoader.classList.add('hidden');
            }, 500);
        }, remainingTime);
    });

    // Handle transition loaders for buttons
    const handleTransition = (text, targetUrl) => {
        transitionLoader.classList.remove('hidden');
        transitionLoader.querySelector('.loader-text').textContent = text;
        transitionLoader.style.opacity = '1';
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1200);
    };

    // Add click handlers to navigation buttons
    document.querySelectorAll('[data-href]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = button.getAttribute('data-href');
            const isGraveyard = button.textContent.includes('Graveyard');
            const loaderText = isGraveyard ? 
                "Opening the gates to the beyond..." : 
                "Preparing your spectral stake...";
            
            handleTransition(loaderText, targetUrl);
        });
    });
}); 