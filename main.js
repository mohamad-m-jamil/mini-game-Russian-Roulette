// Variables
let numPlayers;
let players = []; // Store player names
let playerTurns = {}; // To track turns for each player
let bulletChamber;
let currentTurn = 1;
const maxAttempts = 6; // Each player gets 6 attempts
let gameStarted = false;
let alivePlayers = []; // Track alive players

// Get DOM elements
const startBtn = document.getElementById('start-btn');
const submitNamesBtn = document.getElementById('submit-names');
const fireBtn = document.getElementById('fire-btn');
const playersInput = document.getElementById('players');
const playerSelect = document.getElementById('choose-player');
const roundInfo = document.getElementById('round-info');
const resultDisplay = document.getElementById('result');
const gameInfo = document.getElementById('game-info');
const nameInputs = document.getElementById('name-inputs');
const nameFields = document.getElementById('name-fields');

// Start Game Button Click
startBtn.addEventListener('click', () => {
    numPlayers = parseInt(playersInput.value);

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert('Please enter a valid number of players.');
        return;
    }

    // Show name input fields
    nameFields.innerHTML = '';
    for (let i = 1; i <= numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `player-name-${i}`;
        input.placeholder = `Player ${i} name`;
        nameFields.appendChild(input);
    }
    nameInputs.classList.remove('hidden');
});

// Submit Names Button Click
submitNamesBtn.addEventListener('click', () => {
    players = [];
    alivePlayers = [];

    for (let i = 1; i <= numPlayers; i++) {
        const playerName = document.getElementById(`player-name-${i}`).value || `Player ${i}`;
        players.push(playerName);
        alivePlayers.push(playerName);
        playerTurns[playerName] = 0; // Set turns for each player to 0
    }

    nameInputs.classList.add('hidden');
    startGame();
});

// Function to start the game
function startGame() {
    bulletChamber = Math.floor(Math.random() * maxAttempts) + 1; // Random bullet chamber (1-6)
    currentTurn = 1;
    gameStarted = true;
    resultDisplay.textContent = '';
    roundInfo.textContent = `${alivePlayers[0]}'s Turn`;
    fireBtn.disabled = false;
    populatePlayerDropdown();
    gameInfo.classList.remove('hidden');
}

// Populate player dropdown
function populatePlayerDropdown() {
    playerSelect.innerHTML = '';
    alivePlayers.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.textContent = player;
        playerSelect.appendChild(option);
    });
}

// Fire Button Click
fireBtn.addEventListener('click', () => {
    if (!gameStarted) return;

    const selectedPlayer = playerSelect.value;
    playerTurns[selectedPlayer]++;

    // Player pulls the trigger
    if (currentTurn === bulletChamber) {
        resultDisplay.textContent = `${selectedPlayer} met w tile3 mn lla3be!`;
        alivePlayers = alivePlayers.filter(player => player !== selectedPlayer);
        if (alivePlayers.length === 1) {
            resultDisplay.textContent += ` ${alivePlayers[0]} ribe7 mabrouk!`;
            fireBtn.disabled = true;
            gameStarted = false;
            return;
        }
        resetBullet();
    } else {
        resultDisplay.textContent = `${selectedPlayer} fik tkamel ma mitet!`;
        currentTurn++;

        if (currentTurn > maxAttempts) {
            resetBullet();
        }
    }
    populatePlayerDropdown();
});

// Reset the bullet for the next round
function resetBullet() {
    bulletChamber = Math.floor(Math.random() * maxAttempts) + 1;
    currentTurn = 1;
}
