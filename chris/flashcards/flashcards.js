// Card stacks data
const cardStacks = {
    'polish-days-week': {
        name: 'Polish Days of the Week',
        cards: [
            { english: 'Monday', polish: 'poniedziałek' },
            { english: 'Tuesday', polish: 'wtorek' },
            { english: 'Wednesday', polish: 'środa' },
            { english: 'Thursday', polish: 'czwartek' },
            { english: 'Friday', polish: 'piątek' },
            { english: 'Saturday', polish: 'sobota' },
            { english: 'Sunday', polish: 'niedziela' }
        ]
    },
    'polish-days-month': {
        name: 'Polish Days of the Month',
        cards: [
            { english: 'First', polish: 'pierwszy' },
            { english: 'Second', polish: 'drugi' },
            { english: 'Third', polish: 'trzeci' },
            { english: 'Fourth', polish: 'czwarty' },
            { english: 'Fifth', polish: 'piąty' },
            { english: 'Sixth', polish: 'szósty' },
            { english: 'Seventh', polish: 'siódmy' },
            { english: 'Eighth', polish: 'ósmy' },
            { english: 'Ninth', polish: 'dziewiąty' },
            { english: 'Tenth', polish: 'dziesiąty' },
            { english: 'Eleventh', polish: 'jedenasty' },
            { english: 'Twelfth', polish: 'dwunasty' },
            { english: 'Thirteenth', polish: 'trzynasty' },
            { english: 'Fourteenth', polish: 'czternasty' },
            { english: 'Fifteenth', polish: 'piętnasty' },
            { english: 'Sixteenth', polish: 'szesnasty' },
            { english: 'Seventeenth', polish: 'siedemnasty' },
            { english: 'Eighteenth', polish: 'osiemnasty' },
            { english: 'Nineteenth', polish: 'dziewiętnasty' },
            { english: 'Twentieth', polish: 'dwudziesty' },
            { english: 'Twenty-first', polish: 'dwudziesty pierwszy' },
            { english: 'Twenty-second', polish: 'dwudziesty drugi' },
            { english: 'Twenty-third', polish: 'dwudziesty trzeci' },
            { english: 'Twenty-fourth', polish: 'dwudziesty czwarty' },
            { english: 'Twenty-fifth', polish: 'dwudziesty piąty' },
            { english: 'Twenty-sixth', polish: 'dwudziesty szósty' },
            { english: 'Twenty-seventh', polish: 'dwudziesty siódmy' },
            { english: 'Twenty-eighth', polish: 'dwudziesty ósmy' },
            { english: 'Twenty-ninth', polish: 'dwudziesty dziewiąty' },
            { english: 'Thirtieth', polish: 'trzydziesty' },
            { english: 'Thirty-first', polish: 'trzydziesty pierwszy' }
        ]
    }
};

// Game state
let currentStack = null;
let activeCards = [];
let completedCards = [];
let currentCard = null;
let showingAnswer = false;

// DOM elements
const stackSelection = document.getElementById('stack-selection');
const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('completion-screen');
const stackButtons = document.querySelectorAll('.stack-button');
const backButton = document.getElementById('back-button');
const playAgainButton = document.getElementById('play-again-button');
const englishWord = document.getElementById('english-word');
const polishInput = document.getElementById('polish-input');
const submitButton = document.getElementById('submit-button');
const feedback = document.getElementById('feedback');
const progressText = document.getElementById('progress-text');

// Initialize game
function init() {
    stackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stackId = button.getAttribute('data-stack');
            startGame(stackId);
        });
    });

    backButton.addEventListener('click', () => {
        resetGame();
        showScreen('stack-selection');
    });

    playAgainButton.addEventListener('click', () => {
        resetGame();
        showScreen('stack-selection');
    });

    submitButton.addEventListener('click', checkAnswer);
    
    polishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !showingAnswer) {
            checkAnswer();
        }
    });
}

// Start a new game with selected stack
function startGame(stackId) {
    currentStack = cardStacks[stackId];
    activeCards = [...currentStack.cards];
    completedCards = [];
    showingAnswer = false;
    
    showScreen('game-screen');
    showNextCard();
    updateProgress();
}

// Show next card
function showNextCard() {
    if (activeCards.length === 0) {
        // All cards completed
        showScreen('completion-screen');
        return;
    }

    // Select random card from active cards
    const randomIndex = Math.floor(Math.random() * activeCards.length);
    currentCard = activeCards[randomIndex];
    
    englishWord.textContent = currentCard.english;
    polishInput.value = '';
    polishInput.focus();
    feedback.textContent = '';
    feedback.className = 'feedback';
    showingAnswer = false;
    submitButton.disabled = false;
}

// Normalize string by removing accents/diacritics
// Handles Polish characters explicitly since some (like ł) aren't decomposed by Unicode normalization
function normalizeString(str) {
    // Polish character mappings
    const polishMap = {
        'ą': 'a', 'Ą': 'A',
        'ć': 'c', 'Ć': 'C',
        'ę': 'e', 'Ę': 'E',
        'ł': 'l', 'Ł': 'L',
        'ń': 'n', 'Ń': 'N',
        'ó': 'o', 'Ó': 'O',
        'ś': 's', 'Ś': 'S',
        'ź': 'z', 'Ź': 'Z',
        'ż': 'z', 'Ż': 'Z'
    };
    
    // Replace Polish characters
    let normalized = str;
    for (const [polish, latin] of Object.entries(polishMap)) {
        normalized = normalized.replace(new RegExp(polish, 'g'), latin);
    }
    
    // Also handle other accented characters using Unicode normalization
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    return normalized;
}

// Check user's answer
function checkAnswer() {
    if (showingAnswer) {
        // User has seen the answer, show next card
        showNextCard();
        return;
    }

    const userAnswer = normalizeString(polishInput.value.trim().toLowerCase());
    const correctAnswer = normalizeString(currentCard.polish.toLowerCase());

    if (userAnswer === correctAnswer) {
        // Correct answer
        feedback.textContent = 'Correct! ✓';
        feedback.className = 'feedback correct';
        
        // Remove card from active cards and add to completed
        const cardIndex = activeCards.findIndex(card => card.english === currentCard.english);
        if (cardIndex !== -1) {
            activeCards.splice(cardIndex, 1);
            completedCards.push(currentCard);
        }
        
        updateProgress();
        
        // Wait a moment, then show next card
        setTimeout(() => {
            if (activeCards.length > 0) {
                showNextCard();
            } else {
                showScreen('completion-screen');
            }
        }, 1500);
    } else {
        // Incorrect answer
        feedback.textContent = `Incorrect. The correct answer is: "${currentCard.polish}"`;
        feedback.className = 'feedback incorrect';
        showingAnswer = true;
        submitButton.textContent = 'Continue';
        
        // Card stays in activeCards, will be shown again later
    }
}

// Update progress display
function updateProgress() {
    const total = currentStack.cards.length;
    const completed = completedCards.length;
    progressText.textContent = `${completed} / ${total}`;
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Reset game state
function resetGame() {
    currentStack = null;
    activeCards = [];
    completedCards = [];
    currentCard = null;
    showingAnswer = false;
    polishInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    submitButton.textContent = 'Submit';
    submitButton.disabled = false;
}

// Initialize when page loads
init();
