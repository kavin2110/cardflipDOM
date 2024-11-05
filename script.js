const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

let cards = ["A", "A", "B", "B"]; // 4 cards with 2 pairs
let flippedCards = [];
let matchedPairs = 0;

// Initialize and shuffle the game board
function initializeGame() {
    gameBoard.innerHTML = "";      // Clear the board
    flippedCards = [];             // Reset flipped cards
    matchedPairs = 0;              // Reset matched pairs count
    shuffleCards();

    // Create and display each card
    cards.forEach(value => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.value = value;
        card.innerHTML = `<div class="front"></div><div class="back">${value}</div>`;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Shuffle cards array
function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

// Flip card and check for match
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("flip")) return;

    this.classList.add("flip");       // Flip the card to show its value
    flippedCards.push(this);          // Add card to flipped cards array

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matchedPairs++;           // Increment matched pairs
            flippedCards = [];        // Clear flipped cards
            if (matchedPairs === 2) alert("You won!"); // Check for win
        } else {
            setTimeout(() => {
                card1.classList.remove("flip");
                card2.classList.remove("flip");
                flippedCards = [];    // Clear flipped cards
            }, 1000);
        }
    }
}

// Restart button listener
restartButton.addEventListener("click", initializeGame);

// Start game on load
initializeGame();
