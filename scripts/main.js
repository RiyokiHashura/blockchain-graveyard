document.addEventListener('DOMContentLoaded', () => {
    // Initialize loaders
    const initialLoader = document.getElementById('initial-loader');
    const transitionLoader = document.getElementById('transition-loader');
    
    // Hide initial loader after delay
    setTimeout(() => {
        initialLoader.classList.add('fade-out');
        setTimeout(() => {
            initialLoader.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Handle navigation with transitions
    document.querySelectorAll('[data-href]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('data-href');
            const isGraveyard = button.textContent.includes('Graveyard');
            const loaderText = isGraveyard ? 
                "Opening the gates to the beyond..." : 
                "Preparing your spectral stake...";
            
            // Show transition loader
            transitionLoader.classList.remove('hidden');
            transitionLoader.querySelector('.loader-text').textContent = loaderText;
            
            // Navigate after delay, appending .html for actual file
            setTimeout(() => {
                const targetUrl = href.endsWith('.html') ? href : href + '.html';
                window.location.href = targetUrl;
            }, 1000);
        });
    });
    
    // Initialize floating ghosts
    initializeFloatingGhosts();
});

function initializeFloatingGhosts() {
    const ghostsContainer = document.querySelector('.floating-ghosts');
    const numGhosts = 5;
    
    for (let i = 0; i < numGhosts; i++) {
        const ghost = document.createElement('div');
        ghost.className = 'ghost';
        ghost.style.left = `${Math.random() * 100}%`;
        ghost.style.top = `${Math.random() * 100}%`;
        ghost.style.animationDelay = `${Math.random() * 2}s`;
        ghostsContainer.appendChild(ghost);
    }
} 