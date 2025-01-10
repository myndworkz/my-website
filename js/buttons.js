function generateLetterButtons(lettersContainer) {
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
