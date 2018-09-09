var timerHTML = $('h3 span');

var time = {
        minutes: 1,
        seconds: 0,
        counting: false,
    },
    setTime;

var timeBackUp = {
    minutes: time.minutes,
    seconds: time.seconds
};
displayTime();

function countDown() {
    if (!timeIsUp()) {
        if (time.seconds === 0) {
            time.seconds = 59;
            time.minutes--;
        } else
            time.seconds--;
    } else {
        showResults();
        return;
    }
    displayTime();
}

function displayTime() {
    if (time.seconds < 10 && time.minutes === 0)
        timerHTML.css('color', 'red');
    timerHTML.text(properFormat(time.minutes) + ':' + properFormat(time.seconds));
}

// Just for UI, it adds zero to the left of the number if it's less than 10
function properFormat(check) {
    if (check < 10) {
        return '0' + check;
    } else {
        return check;
    }
}

// Check if the program ended or not
function timeIsUp() {
    if (time.minutes === 0 && time.seconds === 0)
        return true;
    else
        return false;
}