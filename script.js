const hangman = {};

hangman.words = [
    'MAGENTA',
    'BLUE',
    'RED',
    'PURPLE',
    'GREEN'
];



hangman.selection = function (wordsInLetters, chosenLetter) {
    console.log(wordsInLetters);
    console.log(chosenLetter);
    let position = wordsInLetters.indexOf(chosenLetter);
    
    let roundCounter = 0;
    wordsInLetters.forEach(item => {
        if (item === chosenLetter) {
            roundCounter++;
        }
    });
    
    if (roundCounter === 0) {
        console.log('lose a life');
    } else if (roundCounter != 0) {
        console.log('yay')
        roundCounter = 0;
        $('.answer').html('');

       
            for (let i = 0; i < wordsInLetters.length; i++) {
                if (chosenLetter === wordsInLetters[i]) {
                    console.log(chosenLetter);
                    console.log(wordsInLetters[i]);
                    $('.answer').append(`${chosenLetter}`);
                } else {
                    $('.answer').append(`
                <p class="underscore"> _ </p>
                `)
                }
           
        }
    }
    
};

hangman.chosenWord = function() {

    randomNumber = Math.floor(Math.random() * Math.floor(hangman.words.length));
    randomWord = hangman.words[randomNumber];
    wordsInLetters = randomWord.split('');
    // for (let i = 0; i < wordsInLetters.length; i++) 
    
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
        hangman.selection(hangman.selectedWord, chosenLetter);

    });
};

hangman.guess();

// console.log(typeof hangman.guess);


// const selection = (wordsInLetters, chosenLetter) => {
//     // console.log(typeof wordsInLetters.forEach);
//     console.log("array?: ", typeof wordsInLetters);
//     wordsInLetters.forEach(item => {
//         if (item === chosenLetter) {
//             console.log('yay');
//         } 
//     });

//     // if (word sInLetters === chosenLetter) {
//     //     console.log('true')
//     // } else {
//     //     console.log('none')
//     // }

//     // console.log(checks); 
// };





