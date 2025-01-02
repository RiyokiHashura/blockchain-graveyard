document.addEventListener('DOMContentLoaded', () => {
    // Initialize loaders
    const initialLoader = document.getElementById('initial-loader');
    const transitionLoader = document.getElementById('transition-loader');
    const mainContent = document.querySelector('main');
    
    // Initially hide main content
    mainContent.style.opacity = '0';
    transitionLoader.style.display = 'none';
    
    // Hide initial loader and fade in content
    setTimeout(() => {
        initialLoader.classList.add('fade-out');
        setTimeout(() => {
            initialLoader.style.display = 'none';
            // Fade in main content
            mainContent.style.transition = 'opacity 1s ease-in';
            mainContent.style.opacity = '1';
        }, 500);
    }, 2000);
    
    // Handle navigation with transitions
    document.querySelectorAll('[data-href]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('data-href');
            const isGraveyard = button.textContent.includes('Graveyard');
            
            // Show loader immediately
            const transitionLoader = document.getElementById('transition-loader');
            transitionLoader.style.display = 'flex';
            transitionLoader.querySelector('.loader-text').textContent = 
                isGraveyard ? "Opening the gates to the beyond..." : 
                             "Preparing your spectral stake...";
            
            // Navigate after delay
            setTimeout(() => {
                const targetUrl = href.endsWith('.html') ? href : href + '.html';
                window.location.href = targetUrl;
            }, 4900);
        });
    });
    
    // For the stake button clicks
    document.querySelectorAll('.stake-button-small').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            showToast('Connect your wallet to stake!');
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

function showLoader() {
    const loader = document.getElementById('transition-loader');
    loader.classList.remove('hidden');
    
    return new Promise(resolve => {
        setTimeout(() => {
            loader.classList.add('hidden');
            resolve();
        }, 2500); // Increased from default to 2500ms (2.5 seconds)
    });
}

// For the stake button clicks
document.querySelectorAll('.stake-button-small').forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await showLoader();
        // Additional staking logic here
    });
});

// For the main CTA button
document.querySelector('.cta-button').addEventListener('click', async (e) => {
    e.preventDefault();
    await showLoader();
    window.location.href = e.currentTarget.dataset.href;
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
} 