const hangman = {};

hangman.words = [
    'ANDROID',
    'BIONIC',
    'CYBORG',
    'MACHINE',
    'ARTIFICIAL'
];

hangman.guesses = [];
hangman.correctGuesses = 0;
hangman.lives = 6;

hangman.game = function (wordsInLetters, chosenLetter) {
    const completeWord = wordsInLetters.join('');
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
            $('.right-leg').hide();
            $('.left-leg').show();
            alert(`YOU LOSE, the word was ${completeWord}`);
            $('.ltr-btn').unbind('click');
            $('.guess-btn').unbind('click');
        } else if (hangman.lives === 5) {
            $('.head').show();
            console.log('5')
        } else if (hangman.lives === 4) {
            $('.body').show();
        } else if (hangman.lives === 3) {
            $('.body').hide();
            $('.right-arm').show();
        } else if (hangman.lives === 2) {
            $('.right-arm').hide();
            $('.left-arm').show();
        } else if (hangman.lives === 1) {
            $('.right-leg').show();
        } else if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.left-leg').show();
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
            alert(`you win! The word was ${completeWord}`);
        }
    }

};

hangman.typedFinalGuess = function (textGuess, wordsInLetters) {
    const completeWord = wordsInLetters.join('');
    const uppercaseGuess = textGuess.toUpperCase();
    if (completeWord === uppercaseGuess) {
        alert(`you win! The word was ${completeWord}`);
        $('.answer').html(`${completeWord}`);
    } else if (textGuess === '') {
        alert('please enter a valid guess')
    } else {
        hangman.lives = hangman.lives - 1;
        $('.lives-update').html(`${hangman.lives}`);
        console.log('you lose a life tho')
        if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.left-leg').show();
            alert(`YOU LOSE, the word was ${completeWord}`);
            $('.ltr-btn').unbind('click');
            $('.guess-btn').unbind('click');
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

hangman.finalGuess = function() {

    $('.guess-btn').click(function(event) {
        event.preventDefault();
        const textGuess = $('input[name=guess-text]').val();
        hangman.typedFinalGuess(textGuess, hangman.selectedWord);
        $('#form')[0].reset();
    });
}
hangman.finalGuess();


$(document).ready(function () {

    hangman.guess = function () {
        $('.ltr-btn').click(function (event) {
            event.preventDefault();
            const chosenLetter = $('input[name=letter]:checked').val();
            hangman.guesses.push(chosenLetter);
            hangman.game(hangman.selectedWord, chosenLetter);
            console.log(hangman.guesses);

            if ($('input[name=letter]:checked')) {
                const inputID = $('input[type=radio][name=letter]:checked').attr('id');
                $('label[for="' + inputID + '"]').fadeOut();
                $('input[name=letter]:checked').fadeOut();
            }
        });
    };
    hangman.guess();
});



