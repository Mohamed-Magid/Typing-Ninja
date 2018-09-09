// Variables
var results = { // Results object
        correct: 0,
        incorrect: 0
    },
    currentPlace = 0, // Current word user types
    input = $('input'), // Input Selector
    paragraphHTML = $('p'), // Paragraph Selector
    audio = { // Audio object
        error: document.getElementById('errorAudio'),
        done: document.getElementById('doneAudio')
    },
    subRegEx; // Used in real-time checking
//-------------------------------------------


initialize();
// With every key stroke
input.keydown(function (e) {
    startTime();
    if (spacePressed(e)) {
        var currentWord = input.val();
        checker(currentWord);
        clearInput();
    }
    if (finishedTyping())
        showResults();
});

// For real time checking
input.keyup(function () {
    
    standBy();
});

//-------------------------------------------

// Set General Settings
function initialize() {
    clearInput();
    randomize(); // Select Random Paragraph
    var textHTML = '';
    // Write the pragraph with spans in the HTML
    for (var i = 0; i < strArray.length; i++) {
        textHTML += '<span>' + strArray[i] + '</span> ';
    }
    paragraphHTML.html(textHTML);

    clearInput(); // Clears input after refresh

    colorify('standBy', 1, '#000', '#cff500'); // Stand by on first word
}

//-------------------------------------------

// Disable paste in input field
input.on('paste', function (e) {
    e.preventDefault();
});

//-------------------------------------------

// Check if user pressed space
function spacePressed(e) {
    var key = e.keyCode;
    if (key == 32) {
        e.preventDefault();
        return true;
    } else
        return false;
}

//-------------------------------------------

// Starts time if it's not already started
function startTime() {
    if (!time.counting && (input.val().length != 0 || results.incorrect != 0)) {
        setTime = setInterval(countDown, 1000);
        time.counting = true;

    } else
        return;
}

//-------------------------------------------

// To color the next word in queue
function standBy() {
    subRegEx = new RegExp('^' + input.val(), 'g');
    if (subRegEx.test(strArray[currentPlace])) {
        colorify('standBy', currentPlace + 1, '#000', '#cff500');
    } else {
        colorify('standBy', currentPlace + 1, '#fff', '#f00');
    }
}

//-------------------------------------------

// Clears the input field after pressing space
function clearInput() {
    input.val('');
}

//-------------------------------------------

// Check if user typed correct word
function checker(currentWord) {
    if (currentWord === strArray[currentPlace++]) {
        results.correct++;
        colorify('check', currentPlace, '#35ff35', null);

    } else {
        results.incorrect++;
        colorify('check', currentPlace, '#f00', null);
        audio.error.play();
    }
    colorify('standBy', currentPlace, null, 'transparent'); // Remove highlighting
}

//-------------------------------------------

// Multi uses coloring function
function colorify(method, position, fontColor, bgColor) {
    if (method === 'check')
        $('p span:nth-of-type(' + position + ')').css('color', fontColor)

    else if (method === 'standBy') {
        $('p span:nth-of-type(' + position + ')').css({
            'color': fontColor,
            'background-color': bgColor
        });
    }
}

//-------------------------------------------
function finishedTyping() {
    if (currentPlace === strArray.length)
        return true;
    else
        return false;
}
// Display Results
function showResults() {
    input.attr('disabled', 'disabled');
    clearInterval(setTime);
    audio.done.play();
    $('#done span:first-of-type').html('Correct Words: <span>' + results.correct + '</span> words');
    $('#done span:nth-of-type(2)').html('Incorrect Words: <span>' + results.incorrect + '</span> words');
    $('#done span:nth-of-type(3)').text('Your WPM Rate: ' + Math.floor(results.correct / (timeBackUp.minutes + (timeBackUp.seconds / 60))) + ' W/M');
    $('#done').css('display', 'block');
}

function resetter() {
    // Reset time Rules
    clearInterval(setTime);
    time.minutes = timeBackUp.minutes;
    time.seconds = timeBackUp.seconds;
    displayTime();
    time.counting = false;
    timerHTML.css('color', '#fff');
    // Reset General Rules
    currentPlace = 0;
    results.correct = 0;
    results.incorrect = 0;
    // Reset Input
    input.removeAttr('disabled');

    // Initialize the page
    initialize();
    $('#done').css('display', 'none');
}