const hangman = {};

hangman.words = [
    'ANDROID',
    'BIONIC',
    'CYBORG',
    'MACHINE',
    'COMPUTER'
];

hangman.guesses = [];
hangman.wrongGuesses = [];
hangman.correctGuesses = 0;
hangman.lives = 6;

hangman.game = function (wordsInLetters, chosenLetter) {
    const completeWord = wordsInLetters.join('');
    let counter = 0;
    let wrongCount = 0;
    wordsInLetters.forEach(item => {
        if (item === chosenLetter) {
            counter++;
            hangman.correctGuesses = hangman.correctGuesses + 1;
        } 
    });

    if (counter === 0) {
        hangman.wrongGuesses.push(chosenLetter);
        hangman.wrongGuesses.forEach(wrong => {
            if (wrong === chosenLetter) {
                wrongCount++;
                if (wrongCount > 1) {
                    alert('Please select a valid letter!')
                }
            }
        });
    }

    if (counter === 0 && chosenLetter != undefined && wrongCount < 2) {
        hangman.lives = hangman.lives - 1;
        $('.lives-update').html(`${hangman.lives}`);
        $('.wrong-letters').append(`${chosenLetter}`);
        
        if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.right-left-leg').show();
            
            $('.final-message').show().html(`

            <p>Oh no! The robot is fully built because you couldn't guess the word! The word was <span class="answer-color">${completeWord}</span>. The cute robot is turning into a <span class="red-killer">KILLER</span> robot!</p>

            <div class="restart-btn">
                <label for="play-again" class="visuallyHidden" id="try-again-btn">Click here to try again</label>
                <input class="play-again" id="restart" type="reset" value="Try Again">
            </div>
            
            `);
            $('.restart-btn').click(function () {
                window.location.reload(true);
            });
            $('.robot-container').hide()
            $('.evil-robot').show();
            $('.guess-word').hide();
            $('.letters-box').hide();
            $('.submit-ltr-guess').hide();
            $('.wrong-letters').hide();
        } else if (hangman.lives === 5) {
            $('.head').show();
        } else if (hangman.lives === 4) {
            $('.robot-body').show();
        } else if (hangman.lives === 3) {
            $('.robot-body').hide();
            $('.right-arm').show();
        } else if (hangman.lives === 2) {
            $('.right-arm').hide();
            $('.both-arms').show();
        } else if (hangman.lives === 1) {
            $('.right-leg').show();
        } else if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.right-left-leg').show();
        } 

    } else if (counter != 0) {
        counter = 0;
        $('.answer').html('');    
       
            for (let i = 0; i < wordsInLetters.length; i++) {

                if (hangman.guesses.includes(wordsInLetters[i])) {
                    $('.answer').append(`${wordsInLetters[i]}`);
                } else {
                    $('.answer').append(`<p class="underscore"> _ </p>`);
                }
        }  if (hangman.correctGuesses === wordsInLetters.length) {
            $('.final-message').show().html(`

            <p>You Are Correct! CONGRATULATIONS!<br> You guessed the word and saved the world from the <span class="red-killer">KILLER</span> robot!</p>
        
            <div class="restart-btn">
                <label for="play-again" class="visuallyHidden" id="try-again-btn">Click here to play again</label>
                <input class="play-again" id="restart" type="reset" value="Play Again">
            </div>

            `);
            $('.restart-btn').click(function () {
                window.location.reload(true);
            });
            $('.guess-word').hide();
            $('.letters-box').hide();
            $('.submit-ltr-guess').hide();
            $('.wrong-letters').hide();
            $('.answer').html(`${completeWord}`);
        }
    }

};


hangman.typedFinalGuess = function (textGuess, wordsInLetters) {
    const completeWord = wordsInLetters.join('');
    const uppercaseGuess = textGuess.toUpperCase();
    if (completeWord === uppercaseGuess) {
        $('.final-message').show().html(`

        <p>You Are Correct! CONGRATULATIONS!<br> You guessed the word and saved the world from the <span class="red-killer">KILLER</span> robot!</p>

        <div class="restart-btn">
            <label for="play-again" class="visuallyHidden" id="try-again-btn">Click to play again</label>
            <input class="play-again" id="restart" type="reset" value="Play Again">
        </div>

        `);
        $('.restart-btn').click(function () {
            window.location.reload(true);
        });
        $('.guess-word').hide();
        $('.letters-box').hide();
        $('.submit-ltr-guess').hide();
        $('.wrong-letters').hide();
        $('.answer').html(`${completeWord}`);
    } else if (textGuess === '') {
        alert('Please type in a valid guess')
    } else {
        hangman.lives = hangman.lives - 1;
        $('.lives-update').html(`${hangman.lives}`);

        if (hangman.lives >= 2) {
            alert(`Your guess was incorrect - you only have ${hangman.lives} robot parts left until the robot becomes a killer robot!`)
        } else if (hangman.lives === 1) {
            alert(`Your guess was incorrect - you only have ${hangman.lives} robot part left until the robot becomes a killer robot!`)
        }

        if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.right-left-leg').show();
            $('.final-message').show().html(`

            <p>Oh no! The robot is fully built because you couldn't guess the word! The word was <span class="answer-color">${completeWord}</span>. The cute robot is turning into a <span class="red-killer">KILLER</span> robot!</p>

            <div class="restart-btn">
                <label for="play-again" class="visuallyHidden" id="try-again-btn">Click here to try again</label>
                <input class="play-again" id="restart" type="reset" value="Try Again">
            </div>
            `);
            $('.restart-btn').click(function () {
                window.location.reload(true);
            });
            $('.robot-container').hide()
            $('.evil-robot').show();
            $('.guess-word').hide();
            $('.letters-box').hide();
            $('.submit-ltr-guess').hide();
            $('.wrong-letters').hide();

        } else if (hangman.lives === 5) {
            $('.head').show();
        } else if (hangman.lives === 4) {
            $('.robot-body').show();
        } else if (hangman.lives === 3) {
            $('.robot-body').hide();
            $('.right-arm').show();
        } else if (hangman.lives === 2) {
            $('.right-arm').hide();
            $('.both-arms').show();
        } else if (hangman.lives === 1) {
            $('.right-leg').show();
        } else if (hangman.lives === 0) {
            $('.right-leg').hide();
            $('.right-left-leg').show();
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

            if (chosenLetter === undefined) {
                alert(`Please select a letter and press the "Guess a Letter" button`)
            }

            if ($('input[name=letter]:checked')) {
                const inputID = $('input[type=radio][name=letter]:checked').attr('id');
                $('label[for="' + inputID + '"]').hide();
                $('input[name=letter]:checked').hide();
            }
                
        });
    };
    hangman.guess();

});



