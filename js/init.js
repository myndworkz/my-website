document.addEventListener("DOMContentLoaded", () => {
    const words = ["apple", "banana", "orange", "grapes", "lemon"];
    let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let guessedWord = Array(selectedWord.length).fill('_');
    let attemptsLeft = 9;
    let usedLetters = [];

    const wordDisplay = document.getElementById('word-display');
    const lettersContainer = document.getElementById('letters');
    const feedback = document.getElementById('feedback');
    const speechBubble = document.getElementById('speech-bubble');
    const stickmanCanvas = document.getElementById('stickman-canvas');
    const ctx = stickmanCanvas.getContext('2d');

    const audioFiles = {
        correct: new Audio('https://myndworkz.github.io/my-website/WellDone.mp3'),
        incorrect: new Audio('https://myndworkz.github.io/my-website/OhNoTryAgain.mp3'),
        encouragement: new Audio('https://myndworkz.github.io/my-website/KeepGoing.mp3'),
        gameWon: new Audio('https://myndworkz.github.io/my-website/CongratulationsYouWon.mp3'),
        gameLost: new Audio('https://myndworkz.github.io/my-website/GameOver.mp3'),
        ready: new Audio('https://myndworkz.github.io/my-website/ReadyForTheNextRound.mp3'),
    };

    const stickmanParts = [
        () => { ctx.moveTo(50, 250); ctx.lineTo(50, 50); ctx.stroke(); },
        () => { ctx.moveTo(50, 50); ctx.lineTo(100, 50); ctx.stroke(); },
        () => { ctx.moveTo(100, 50); ctx.lineTo(100, 75); ctx.stroke(); },
        () => { ctx.beginPath(); ctx.arc(100, 100, 25, 0, Math.PI * 2); ctx.stroke(); },
        () => { ctx.moveTo(100, 125); ctx.lineTo(100, 200); ctx.stroke(); },
        () => { ctx.moveTo(100, 150); ctx.lineTo(70, 180); ctx.stroke(); },
        () => { ctx.moveTo(100, 150); ctx.lineTo(130, 180); ctx.stroke(); },
        () => { ctx.moveTo(100
