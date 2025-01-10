function handleGuess(letter, button) {
    if (usedLetters.includes(letter) || attemptsLeft === 0) return;

    usedLetters.push(letter);
    button.disabled = true;
    button.classList.add('inactive');

    if (selectedWord.includes(letter)) {
        updateGuessedWord(letter);
        showFeedback("Correct!", true);
        triggerHatAnimation('spin');
        audioFiles.correct.play();
    } else {
        attemptsLeft--;
        drawStickmanPart();
        showFeedback("Incorrect! Try again.", false);
        triggerHatAnimation('wobble');
        audioFiles.incorrect.play();
    }

    checkGameOver(attemptsLeft === 0);
}

function updateGuessedWord(letter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
        }
    }
    wordDisplay.textContent = guessedWord.join(' ');
}

function drawStickmanPart() {
    const index = 9 - attemptsLeft;
    const part = stickmanParts[index];
    if (part) part();
}

function showFeedback(message, isCorrect) {
    feedback.textContent = message;
    feedback.style.color = isCorrect ? 'green' : 'red';
}

function checkGameOver(lastPartDrawn = false) {
    if (!guessedWord.includes('_')) {
        speechBubble.textContent = `You won! The word was ${selectedWord}.`;
        speechBubble.style.display = 'block';
        setTimeout(() => { speechBubble.style.display = 'none'; }, 3000);
        audioFiles.gameWon.play();
    } else if (lastPartDrawn) {
        speechBubble.textContent = `Game over! The word was ${selectedWord}.`;
        speechBubble.style.display = 'block';
        setTimeout(() => { speechBubble.style.display = 'none'; }, 3000);
        audioFiles.gameLost.play();
    }
}
