    <script>
        // Hangman JavaScript Implementation
        const words = ["apple", "banana", "orange", "grapes", "lemon"];
        let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        let guessedWord = Array(selectedWord.length).fill('_');
        let attemptsLeft = 6;
        let usedLetters = [];

        const wordDisplay = document.getElementById('word-display');
        const lettersContainer = document.getElementById('letters');
        const feedback = document.getElementById('feedback');
        const speechBubble = document.getElementById('speech-bubble');

        function initializeGame() {
            wordDisplay.textContent = guessedWord.join(' ');
            generateLetterButtons();
        }

        function generateLetterButtons() {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            lettersContainer.innerHTML = '';
            alphabet.split('').forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.classList.add('letter');
                button.onclick = () => handleGuess(letter, button);
                lettersContainer.appendChild(button);
            });
        }

        function handleGuess(letter, button) {
            if (usedLetters.includes(letter) || attemptsLeft === 0) return;

            usedLetters.push(letter);
            button.disabled = true;
            button.classList.add('inactive');

            if (selectedWord.includes(letter)) {
                updateGuessedWord(letter);
                showFeedback("Correct!", true);
            } else {
                attemptsLeft--;
                showFeedback("Incorrect! Try again.", false);
            }

            checkGameOver();
        }

        function updateGuessedWord(letter) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
            wordDisplay.textContent = guessedWord.join(' ');
        }

        function showFeedback(message, isCorrect) {
            feedback.textContent = message;
            feedback.style.color = isCorrect ? 'green' : 'red';
        }

        function checkGameOver() {
            if (!guessedWord.includes('_')) {
                speechBubble.textContent = `You won! The word was ${selectedWord}.`;
            } else if (attemptsLeft === 0) {
                speechBubble.textContent = `Game over! The word was ${selectedWord}.`;
            }
        }

        initializeGame();
    </script>
</body>
</html>