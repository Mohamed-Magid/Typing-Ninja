// Variables
var string = 'Mom is a great cook. She started cooking when she was three years old! I know that sounds silly, but she would help her mother cook. And, now I’m helping my mom cook. I like to make chicken the best. Baked chicken is my most favorite thing to make. It is also my favorite food to eat. One day, when mom was sick, I tried to make the chicken all by myself. I washed the chicken and put it in a pan in the oven to bake. When the bell rang to tell me the chicken was done, I opened the oven door. Guess what? The chicken was not cooked! I started to laugh. I laughed and laughed and laughed! Did you know what I did? I forgot to turn on the oven! The oven! Did you know what I did next? I called on the telephone for pizza to come to our house. Mom was happy that I “cooked” by myself. She was happy that we could eat the pizza together. Guess what? We will have chicken some other night.',
    strArray = string.split(' '), // Convert the string into array
    userArray = [], // Push what user types into array
    wordCount = strArray.length, // Number of words in the paragraph
    rightCount = 0, // Number of right words typed by the user
    wrongCount = 0, // Number of wrong words typed by the user
    currentPlace = 0, // Current word user types
    txt = '', // Used to type the paragraph in HTML
    input = $('input'), // Input Selector
    paragraph = $('p'); // Paragraph Selector
//-------------------------------------------
// Write the pragraph with spans in the HTML
for (var i = 0; i < wordCount; i++) {
    txt += '<span>' + strArray[i] + ' </span>';
    paragraph.html(txt + '\n');
}

// With every key stroke
input.keydown(function (event) {
    startTime();
    if (spacePressed(event)) {
        standBy();
        var currentWord = input.val();
        userArray.push(noSpace(currentWord));
        clearInput();
        checker();
    }
});

// Check if user pressed space
function spacePressed(event) {
    var key = event.keyCode;
    if (key == 32)
        return true;
    else
        return false;
}

function startTime() {
    if (!time.counting) {
        setTime = setInterval(countDown, 1000);
        time.counting = true;
    } else
        return;
}

// To color the next word in queue
function standBy() {
    colorify(currentPlace + 2, 'yellow');
}

// To fix the bug of space added to each word typed by the user
function noSpace(word) {
    word = word.replace(' ', '');
    return word;
}

// Clears the input field after pressing space
function clearInput() {
    input.val('');
}

// Check if user typed correct word
function checker() {
    if (strArray[currentPlace] == userArray[currentPlace]) {
        currentPlace++;
        rightCount++;
        colorify(currentPlace, '#35ff35');
    } else {
        currentPlace++;
        wrongCount++;
        colorify(currentPlace, '#f00');
    }
}

// Colors the specific word sent to it in the parameter
function colorify(word, color) {
    $('p span:nth-of-type(' + word + ')').css('color', color);
}

function showResults() {
    $('#done span:first-of-type').html('Right Words: <span>' + rightCount + '</span> words');
    $('#done span:nth-of-type(2)').html('Wrong Words: <span>' + wrongCount + '</span> words');
    $('#done span:nth-of-type(3)').text('Your WPM Rate: ' + rightCount + ' W/M');
    $('#done').css('display', 'block');
}