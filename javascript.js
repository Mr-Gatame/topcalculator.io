let currentValue = '';
let previousValue = '';
let operator = '';

document.addEventListener("DOMContentLoaded", function () {
    let equals = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");
    let clear = document.querySelector(".clear");
    let screen = document.querySelector(".screen");

    let number = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let currentScreen = document.querySelector('.current');
    let previousScreen = document.querySelector('.previous');

    number.forEach((number) => number.addEventListener('click', function (e) {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;

    }))

    operators.forEach((op) => op.addEventListener('click', function (e) {
        if (previousValue === '' && currentValue !== '') {
            operate(e.target.textContent);
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent = currentValue;
        } else {
            calculate();
            operator = op.textContent;
            previousScreen.textContent = currentValue + ' ' + operator;
            currentValue = ''
            currentScreen.textContent = '';
        }
    }))

    clear.addEventListener('click', function () {
        previousValue = '';
        currentValue = '';
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue;
    })

    equals.addEventListener('click', function () {
        if (previousValue === '' && currentValue === '') {
            currentScreen.textContent = '';
        } else {
            calculate();
            currentValue = previousValue;
            previousValue = '';
            previousScreen.textContent = '';
            currentScreen.textContent = roundResult(currentValue);
        }
    })

    decimal.addEventListener('click', function () {
        currentValue += '.';
        currentScreen.textContent = currentValue;
    })

})

function handleNumber(num) {
    currentValue += num;
}

function operate(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === '+') {
        previousValue += currentValue;
        currentValue = previousValue;
    } else if (operator === '-') {
        previousValue -= currentValue;
        currentValue = previousValue;
    } else if (operator === 'x') {
        previousValue *= currentValue;
        currentValue = previousValue;
    } else if (operator === '/') {
        previousValue /= currentValue;
        currentValue = previousValue;
    }


}

function roundResult(number) {
    return Math.round(number * 100000) / 100000
}

