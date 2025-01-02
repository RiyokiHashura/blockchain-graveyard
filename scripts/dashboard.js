document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing dashboard');
    
    // Debug log to check if elements exist
    console.log('Tab buttons:', document.querySelectorAll('.nav-item').length);
    console.log('Tab panes:', document.querySelectorAll('.tab-pane').length);
    
    initializeTabNavigation();
    initializeTombstoneMinting();
    initializeLeaderboard();
    initializeDecayTracker();
    initializeOracle();
    initializeTabTransitions();
    initializeVaultFeatures();
    initializeStatAnimations();

    // Add click handlers for all stake-related buttons
    const stakeButtons = document.querySelectorAll('.cta-button-large');
    const mintButtons = document.querySelectorAll('.mint-button');
    
    stakeButtons.forEach(stakeButton => {
        stakeButton.addEventListener('click', () => {
            showToast('Connect your wallet to stake!');
        });
    });

    mintButtons.forEach(mintButton => {
        mintButton.addEventListener('click', () => {
            showToast('Connect your wallet to mint NFT!');
        });
    });

    const connectWalletBtn = document.getElementById('connectWalletBtn');

    if (connectWalletBtn) {
        console.log('Found connect wallet button');
        
        connectWalletBtn.addEventListener('click', async () => {
            console.log('Connect wallet button clicked');
            try {
                const provider = window?.phantom?.solana;
                console.log('Provider:', provider);
                
                if (!provider) {
                    console.log('No provider found, opening Phantom website');
                    window.open('https://phantom.app/', '_blank');
                    return;
                }

                console.log('Attempting to connect...');
                await provider.connect();
                console.log('Connected successfully');
                
                connectWalletBtn.textContent = 'Connected';
                connectWalletBtn.style.background = 'rgba(138, 166, 214, 0.2)';
                showToast('Wallet connected successfully!');

            } catch (err) {
                console.error('Failed to connect wallet:', err);
                showToast('Failed to connect wallet');
            }
        });
    } else {
        console.error('Connect wallet button not found');
    }

    // Add click handler for home button
    document.querySelector('.home-button').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Fade out current content
        document.body.classList.add('fade-transition');
        
        // Show transition loader
        const transitionLoader = document.getElementById('transition-loader');
        transitionLoader.style.display = 'flex';
        transitionLoader.querySelector('.loader-text').textContent = "Returning to the crypt...";
        
        // Navigate after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });


    // Add click handler for mint button
    document.querySelector('.mint-button').addEventListener('click', () => {
        showToast('Connect your wallet to mint!');
    });

    // Add click handlers for stake buttons
    document.querySelectorAll('.stake-button-small').forEach(button => {
        button.addEventListener('click', () => {
            showToast('Connect your wallet to stake!');
        });
    });

    // Add click handler for mint button
    const mintButton = document.querySelector('.mint-button');
    if (mintButton) {
        mintButton.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Connect your wallet to mint!');
        });
    }

    // Add toast notification styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: rgba(43, 43, 51, 0.9);
                color: #fff;
                padding: 12px 24px;
                border-radius: 4px;
                border: 1px solid rgba(138, 166, 214, 0.2);
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
            }
            .toast-notification.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
});

function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    function switchTab(tabId) {
        console.log('Switching to tab:', tabId);
        
        // Remove active classes
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            console.log('Removed active from button:', btn.getAttribute('data-tab'));
        });
        
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            console.log('Removed active from pane:', pane.id);
        });
        
        // Add active class to clicked tab and corresponding content
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activePane = document.getElementById(tabId);
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
            console.log('Activated:', tabId);
        } else {
            console.error('Could not find elements for tab:', tabId);
        }
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Initialize first tab as active
    switchTab('vaultsContent');
}

function initializeTombstoneMinting() {
    const projectName = document.getElementById('projectName');
    const deathDate = document.getElementById('deathDate');
    const epitaph = document.getElementById('epitaph');
    const mintButton = document.querySelector('.mint-button');
    
    if (!mintButton) return;
    
    function updatePreview() {
        document.getElementById('previewName').textContent = 
            projectName.value || 'Project Name';
        document.getElementById('previewDate').textContent = 
            deathDate.value ? new Date(deathDate.value).toLocaleDateString() : 'MMDD.YYYY';
        document.getElementById('previewEpitaph').textContent = 
            epitaph.value || 'Here lies a fallen token...';
    }
    
    [projectName, deathDate, epitaph].forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    mintButton.addEventListener('click', () => {
        showToast('Connect your wallet to mint!');
    });
}

function initializeLeaderboard() {
    const leaderboardData = [
        { username: "GhostlyGary", staked: "1.2M", score: 666 },
        { username: "SpookySam", staked: "985K", score: 613 },
        { username: "NecroNick", staked: "820K", score: 589 },
        { username: "PhantomPhil", staked: "750K", score: 521 },
        { username: "WrapithWraith", staked: "690K", score: 487 },
        { username: "CryptoCorpse", staked: "580K", score: 432 },
        { username: "SpectralSarah", staked: "490K", score: 398 },
        { username: "ZombieZach", staked: "410K", score: 367 },
        { username: "BansheeBarry", staked: "380K", score: 345 },
        { username: "GrimGreta", staked: "320K", score: 312 }
    ];

    function updateLeaderboard(data) {
        const tbody = document.getElementById('leaderboardBody');
        tbody.innerHTML = '';
        
        data.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.className = `rank-${index + 1}`;
            row.innerHTML = `
                <td>
                    <div class="rank-badge">#${index + 1}</div>
                </td>
                <td>${entry.username}</td>
                <td>${entry.staked}</td>
                <td>${entry.score}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function shuffleLeaderboard() {
        const shuffled = [...leaderboardData]
            .sort(() => Math.random() - 0.5)
            .map(entry => ({
                ...entry,
                score: Math.floor(Math.random() * 300) + 300
            }));
        updateLeaderboard(shuffled);
    }

    document.querySelector('.refresh-button').addEventListener('click', shuffleLeaderboard);
    updateLeaderboard(leaderboardData);
}

function initializeDecayTracker() {
    const canvas = document.getElementById('decayChart');
    if (!canvas) {
        console.error('⚠️ Decay Tracker Error: #decayChart not found in DOM.');
        return;
    }
    const ctx = canvas.getContext('2d');
    
    if (window.decayChartInstance) {
        window.decayChartInstance.destroy();
    }

    // Simplified decay data generation
    const days = Array.from({length: 30}, (_, i) => i); // 30 days
    
    const generateDecayData = (params) => {
        const { initialCrash, bounceDay, bounceStrength, finalDecayRate } = params;
        return days.map(day => ({
            x: day,
            y: Math.max(0, Math.min(100, 
                // Initial value and crash
                100 * (1 - initialCrash * (1 - Math.exp(-day/2))) +
                // Recovery bounce
                (day > bounceDay ? bounceStrength * Math.exp(-(day - bounceDay)/3) : 0) +
                // Final decay
                -day * finalDecayRate +
                // Small random noise
                (Math.random() - 0.5) * 2
            ))
        }));
    };

    const datasets = [
        {
            label: 'LUNA Classic',
            data: generateDecayData({
                initialCrash: 0.85,    // 85% initial crash
                bounceDay: 5,          // Bounce after 5 days
                bounceStrength: 30,    // 30% recovery attempt
                finalDecayRate: 0.5    // Gradual decline
            }),
            borderColor: 'rgba(138, 166, 214, 0.8)',
            backgroundColor: 'rgba(138, 166, 214, 0.1)',
        },
        {
            label: 'SafeMoon',
            data: generateDecayData({
                initialCrash: 0.6,     // 60% initial crash
                bounceDay: 3,          // Quick small bounce
                bounceStrength: 15,    // 15% recovery attempt
                finalDecayRate: 1.2    // Faster decline
            }),
            borderColor: 'rgba(255, 99, 132, 0.8)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
        },
        {
            label: 'Squid Game',
            data: generateDecayData({
                initialCrash: 0.95,    // 95% initial crash
                bounceDay: 7,          // Late small bounce
                bounceStrength: 10,    // 10% recovery attempt
                finalDecayRate: 0.8    // Medium decline
            }),
            borderColor: 'rgba(75, 192, 192, 0.8)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
        }
    ].map(dataset => ({
        ...dataset,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true
    }));

    window.decayChartInstance = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Days Since Death'
                    },
                    ticks: {
                        callback: value => value === 0 ? 'Death' : `Day ${value}`
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Liquidity Remaining (%)'
                    },
                    ticks: {
                        callback: value => `${value}%`
                    }
                }
            }
        }
    });
}

// Initialize on tab switch
document.addEventListener('DOMContentLoaded', () => {
    const decayTab = document.querySelector('[data-tab="decayContent"]');
    if (decayTab) {
        decayTab.addEventListener('click', () => {
            setTimeout(initializeDecayTracker, 100);
        });
    }
});

// Make switchTab available globally
window.switchTab = function(tabId) {
    console.log('Switching to tab:', tabId);
    
    const tabButtons = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Remove active classes
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to clicked tab and corresponding content
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    const activePane = document.getElementById(tabId);
    
    if (activeButton && activePane) {
        activeButton.classList.add('active');
        activePane.classList.add('active');
    }
};

function initializeOracle() {
    const messages = document.getElementById('oracleMessages');
    const input = document.getElementById('userQuestion');
    const consultButton = document.querySelector('.consult-button');
    
    if (!consultButton) return;

    consultButton.addEventListener('click', () => {
        const question = input.value.trim();
        if (!question) {
            addMessage("The void whispers... but says nothing.");
            return;
        }
        
        addMessage(question, true);
        input.value = '';
        consultButton.disabled = true;
        
        setTimeout(() => {
            const response = responses[Math.floor(Math.random() * responses.length)];
            addMessage(response);
            consultButton.disabled = false;
        }, 1500);
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !consultButton.disabled) {
            consultButton.click();
        }
    });
}

function initializeTabTransitions() {
    const loadingMessages = [
        "Summoning spirits...",
        "Consulting the void...",
        "Awakening ancient protocols...",
        "Channeling ethereal data...",
        "Materializing spectral interface..."
    ];
    
    function showLoading(tabId) {
        const tab = document.getElementById(tabId);
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        
        const message = document.createElement('div');
        message.className = 'loading-message';
        message.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        
        overlay.appendChild(message);
        tab.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
        }, 1000);
    }
    
    // Modify existing switchTab function
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabId) {
        showLoading(tabId);
        setTimeout(() => {
            originalSwitchTab(tabId);
        }, 300);
    };
}

function initializeVaultFeatures() {
    const vaultContent = document.getElementById('vaultsContent');
    const tbody = vaultContent.querySelector('tbody');
    
    // Add filters
    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'vault-filters';
    filtersDiv.innerHTML = `
        <select class="vault-filter" id="ageFilter">
            <option value="">Sort by Age</option>
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
            <option value="random">Random</option>
        </select>
        <select class="vault-filter" id="apyFilter">
            <option value="">Sort by APY</option>
            <option value="high">Highest First</option>
            <option value="low">Lowest First</option>
        </select>
    `;
    
    const tableContainer = vaultContent.querySelector('.ghost-vault-tracker');
    tableContainer.insertBefore(filtersDiv, tableContainer.firstChild);
    
    // Add click handlers for all stake buttons
    document.querySelectorAll('.cta-button-large, .stake-button-small').forEach(button => {
        button.addEventListener('click', () => {
            showToast('Connect your wallet to stake!');
        });
    });
}

function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }
    }, 2500);
}

function animateValue(element, start, end, duration, isCurrency) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const formatValue = (value) => {
        if (element.id === 'totalValueHaunted') {
            return `$${(value / 1e6).toFixed(1)}M`;
        }
        return Math.round(value).toLocaleString();
    };
    
    const animate = () => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatValue(end);
            return;
        }
        element.textContent = formatValue(current);
        requestAnimationFrame(animate);
    };
    
    animate();
}

function initializeStatAnimations() {
    const tvhElement = document.getElementById('totalValueHaunted');
    const vaultsElement = document.getElementById('activeVaults');
    
    // Parse initial values (384.5K = 384500)
    const tvhValue = 384500;
    const vaultsValue = 21;
    
    // Animate from 0 to final value
    animateValue(tvhElement, 0, tvhValue, 2000, true); // true flag for currency format
    animateValue(vaultsElement, 0, vaultsValue, 2000);
}

function initializeStakeButtons() {
    // Add click handlers for all stake buttons in the dashboard
    document.querySelectorAll('.stake-button').forEach(button => {
        button.addEventListener('click', () => {
            showToast('Connect your wallet to stake!');
        });
    });
}

function showStakeToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }
    }, 2500);
}

// Add click handlers for stake buttons
document.querySelectorAll('.stake-button-small').forEach(button => {
    button.addEventListener('click', () => {
        showStakeToast('Connect your wallet to stake!');
    });
});






