document.addEventListener('DOMContentLoaded', () => {
    console.log('Main script loaded!');
    
    const initialLoader = document.getElementById('initial-loader');
    const transitionLoader = document.getElementById('transition-loader');
    const mainContent = document.querySelector('main');
    const ctaButton = document.querySelector('.cta-button');
    const ghostsContainer = document.querySelector('.floating-ghosts');
    
    // Only run loader logic if elements exist
    if (initialLoader && mainContent) {
        mainContent.style.opacity = '0';
        if (transitionLoader) transitionLoader.style.display = 'none';
        
        setTimeout(() => {
            initialLoader.classList.add('fade-out');
            setTimeout(() => {
                initialLoader.style.display = 'none';
                mainContent.style.transition = 'opacity 1s ease-in';
                mainContent.style.opacity = '1';
            }, 500);
        }, 2000);
    }
    
    // Only initialize ghosts if container exists
    if (ghostsContainer) {
        initializeFloatingGhosts();
    }
    
    // Only add CTA button listener if it exists
    if (ctaButton) {
        ctaButton.addEventListener('click', async (e) => {
            e.preventDefault();
            // Fade out current content
            document.body.classList.add('fade-transition');
            
            if (transitionLoader) {
                transitionLoader.style.display = 'flex';
                const loaderText = transitionLoader.querySelector('.loader-text');
                if (loaderText) {
                    loaderText.textContent = "Opening the gates to the beyond...";
                }
            }
            
            // Add longer delay for the fade effect
            setTimeout(() => {
                window.location.href = 'https://blockchaingraveyard.xyz/dashboard';
            }, 2000); // Reduced from 4900ms to 2000ms for better UX
        });
    }
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