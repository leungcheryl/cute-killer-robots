const hangman = {};

hangman.words = [
    'MAGENTA',
    'BLUE',
    'RED',
    'PURPLE',
    'GREEN'
];

hangman.guesses = [];
hangman.correctGuesses = 0;
hangman.lives = 6;
hangman.finalGuess;


hangman.selection = function (wordsInLetters, chosenLetter) {

    console.log(wordsInLetters);
    console.log(chosenLetter);
    let counter = 0;
    wordsInLetters.forEach(item => {
        if (item === chosenLetter) {
            counter++;
            hangman.correctGuesses = hangman.correctGuesses + 1;
        }
    });
    
    if (counter === 0) {
        console.log('lose a life');
        hangman.lives = hangman.lives - 1;
        $('.lives-update').html(`${hangman.lives}`);
        $('.wrong-letters').append(`${chosenLetter}`);
        if (hangman.lives === 0) {
            alert('YOU LOSE');
            window.location.reload(true);
        }

    } else if (counter != 0) {
        console.log('yay')
        counter = 0;
        $('.answer').html('');    
       
            for (let i = 0; i < wordsInLetters.length; i++) {

                if (hangman.guesses.includes(wordsInLetters[i])) {
                    console.log(wordsInLetters[i]);
                    $('.answer').append(`${wordsInLetters[i]}`);
                } else {
                    $('.answer').append(`<p class="underscore"> _ </p>`);
                }
        }  if (hangman.correctGuesses === wordsInLetters.length) {
            console.log('you win!')
        }
    }

};

hangman.typedFinalGuess = function (textGuess, wordsInLetters) {
    const completeWord = wordsInLetters.join('');
    const uppercaseGuess = textGuess.toUpperCase();
    if (completeWord === uppercaseGuess) {
        console.log('you win!');
    } else {
        hangman.lives = hangman.lives - 1;
        $('.lives-update').html(`${hangman.lives}`);
        console.log('you lose a life tho')
        if (hangman.lives === 0) {
            alert('YOU LOSEEEE');
        }
    }
}

hangman.chosenWord = function() {

    randomNumber = Math.floor(Math.random() * Math.floor(hangman.words.length));
    randomWord = hangman.words[randomNumber];
    lives = $('.lives-update').append(hangman.lives);
    wordsInLetters = randomWord.split('');
    wordsInLetters.forEach(list => {
        $('.answer').append(`
        <span class="correctLetter">
            <p class="underscore"> _ </p>
        </span>
        `)
    });
    return wordsInLetters;
}

hangman.selectedWord = hangman.chosenWord();


hangman.guess = function() {
    $('.ltr-btn').click(function (event) {
        event.preventDefault();
        const chosenLetter = $('input[name=letter]:checked').val();
        hangman.guesses.push(chosenLetter);
        hangman.selection(hangman.selectedWord, chosenLetter);
        console.log(hangman.guesses);
    });
};
hangman.guess();

hangman.finalGuess = function() {

    $('.guess-btn').click(function(event) {
        event.preventDefault();
        const textGuess = $('input[name=guess-text]').val();
        hangman.typedFinalGuess(textGuess, hangman.selectedWord);
        $('#form')[0].reset();
    });
}
hangman.finalGuess();






