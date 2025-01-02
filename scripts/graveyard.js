document.addEventListener('DOMContentLoaded', () => {
    const tombstonesGrid = document.querySelector('.tombstones-grid');
    const tokenDetails = document.getElementById('tokenDetails');
    
    // Sample dead tokens data
    const deadTokens = [
        {
            name: "LUNA Classic",
            deathDate: "May 12, 2022",
            lostValue: "$40B",
            apy: "13.66%",
            lore: "Once a beacon of hope in the cosmos, now a cautionary tale of algorithmic hubris."
        },
        {
            name: "SafeMoon",
            deathDate: "April 15, 2022",
            lostValue: "$1B",
            apy: "8.24%",
            lore: "Not so safe, not so lunar. A lesson in the gravity of trust."
        },
        // Add more tokens as needed
    ];

    // Generate tombstones
    deadTokens.forEach(token => {
        const tombstone = document.createElement('div');
        tombstone.className = 'tombstone';
        tombstone.innerHTML = `
            <h3>${token.name}</h3>
            <div class="runes"></div>
        `;
        
        tombstone.addEventListener('click', () => showTokenDetails(token));
        tombstonesGrid.appendChild(tombstone);
    });

    // Close details modal
    document.querySelector('.close-details').addEventListener('click', () => {
        tokenDetails.style.display = 'none';
    });

    function showTokenDetails(token) {
        tokenDetails.querySelector('.token-name').textContent = token.name;
        tokenDetails.querySelector('.token-lore').textContent = token.lore;
        tokenDetails.querySelector('.death-date').textContent = token.deathDate;
        tokenDetails.querySelector('.lost-value').textContent = token.lostValue;
        tokenDetails.querySelector('.current-apy').textContent = token.apy;
        
        tokenDetails.style.display = 'flex';
    }
}); 