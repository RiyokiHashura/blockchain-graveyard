function initializePhantomWallet() {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', async () => {
            try {
                const provider = window?.phantom?.solana;
                
                if (!provider) {
                    window.open('https://phantom.app/', '_blank');
                    return;
                }

                const response = await provider.connect();
                const publicKey = response.publicKey.toString();
                
                connectWalletBtn.textContent = 'Connected';
                connectWalletBtn.style.background = 'rgba(138, 166, 214, 0.2)';
                showToast('Wallet connected successfully!');
                
            } catch (err) {
                console.error('Failed to connect wallet:', err);
                showToast('Failed to connect wallet');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializePhantomWallet); 