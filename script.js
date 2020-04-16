let operator = ''
let symbols = {'+':"add", '-':"subtract", 'x':"multiply", '÷':"divide"};
let decimalAllowed = true;
let numberAllowed = true;
let equalAllowed = false;
let maxLength = 9;
let defaultFontSize = 64;

function add(userInput1, userInput2) {
    let sum = userInput1 + userInput2
    return sum;
}

function subtract(userInput1, userInput2) {
    let difference = userInput1 - userInput2
    return difference;
}

function multiply(userInput1, userInput2) {
    let product = userInput1 * userInput2
    return product;
}

function divide(userInput1, userInput2) {
    if (userInput2 === 0) {
        populateDisplay("UNDEFINED");
    }
    
    let quotient = userInput1 / userInput2
    return quotient;
}

function operate(userInput1, userInput2, operator) {
    userInput1 = parseFloat(userInput1);
    userInput2 = parseFloat(userInput2);

    if (operator === 'add') {
        let sum = add(userInput1, userInput2);
        //populateDisplay(sum);
        return sum;
    }

    else if (operator === 'subtract') {
        let difference = subtract(userInput1, userInput2);
        //populateDisplay(difference);
        return difference;
    }

    else if (operator === 'multiply') {
        let product = multiply(userInput1, userInput2);
        //populateDisplay(product);
        return product;
    }

    else if (operator === 'divide') {
        let quotient = divide(userInput1, userInput2);
        //populateDisplay(quotient);
        return quotient;
    }
}

function addListeners() {
    let userInputString = '';
    let displayString = ''

    const functions = document.querySelectorAll('.functionButtons')
    functions.forEach((div) => {		
		div.addEventListener('click', function(e) {
            if (displayString.length === 0) {
                userInputString = '0' + '|' + e.target.innerText + '|';
                displayString = 0 + e.target.innerText;
            };
            
            if (displayString.length > 1 && displayString.slice(-1) in symbols) {
                userInputString = userInputString.slice(0,-3) + '|' + e.target.innerText + '|';
                displayString = displayString.slice(0,-1) + e.target.innerText;
            }
            
            else {
                userInputString = userInputString + '|' + e.target.innerText + '|';
                displayString = displayString + e.target.innerText;
            }

            populateDisplay(displayString);

            decimalAllowed = true;
            numberAllowed = true;
            equalAllowed = false;
        });
    });
    
    const equalOperator = document.getElementById('equalOperator');
	equalOperator.addEventListener('click', function(e) {
        if (equalAllowed === true) {
            let expressionArray = userInputString.split('|');
            console.log(expressionArray);

            do {
                
                if (expressionArray.indexOf('x') >= 0) {
                    let operatorPosition = expressionArray.indexOf('x')
                    let product = operate(expressionArray[operatorPosition-1], expressionArray[operatorPosition+1], 'multiply')
                    expressionArray.splice(operatorPosition-1, 3, product);
                    console.log(expressionArray);
                };
                
                if (expressionArray.indexOf('÷') >= 0) {
                    let operatorPosition = expressionArray.indexOf('÷')
                    let quotient = operate(expressionArray[operatorPosition-1], expressionArray[operatorPosition+1], 'divide')
                    expressionArray.splice(operatorPosition-1, 3, quotient);
                    console.log(expressionArray);
                };
                
                if (expressionArray.indexOf('+') >= 0) {
                    let operatorPosition = expressionArray.indexOf('+')
                    let sum = operate(expressionArray[operatorPosition-1], expressionArray[operatorPosition+1], 'add')
                    expressionArray.splice(operatorPosition-1, 3, sum);
                    console.log(expressionArray);
                };
                
                if (expressionArray.indexOf('-') >= 0) {
                    let operatorPosition = expressionArray.indexOf('-')
                    let difference = operate(expressionArray[operatorPosition-1], expressionArray[operatorPosition+1], 'subtract')
                    expressionArray.splice(operatorPosition-1, 3, difference);
                    console.log(expressionArray);
                };

            } while (expressionArray.length > 1);

            expressionArray[0] = massageData(expressionArray[0]);
            userInputString = expressionArray[0];
            displayString = expressionArray[0];

            populateDisplay(displayString);

            decimalAllowed = false;
            numberAllowed = false;
            equalAllowed = false;
        };
    });

    const decimal = document.getElementById('decimal');
    decimal.addEventListener('click', function(e) {
        if (decimalAllowed === true) {  
            userInputString = userInputString + e.target.innerText;
            displayString = displayString + e.target.innerText;
            populateDisplay(displayString);
            decimalAllowed = false;
        };
    });

    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function(e) {
        userInputString = ''
        displayString = ''
        decimalAllowed = true;
        numberAllowed = true;
        equalAllowed = false;
        populateDisplay('0');
    });
    
    const numbers = document.querySelectorAll('.numberButtons')
    numbers.forEach((div) => {		
		div.addEventListener('click', function(e) {
            if (numberAllowed === true) {
                userInputString = userInputString + e.target.innerText;
                displayString = displayString + e.target.innerText;
                equalAllowed = true;
                populateDisplay(displayString);
            }
        });
    });
};

function populateDisplay(displayString) {
    let textSize = checkFontSize(displayString);
    console.log(textSize);
    const displayField = document.getElementById('displayField');
    displayField.style.fontSize = textSize + 'px';
    displayField.innerText = displayString;
};

function massageData(expressionResult) {

    if (expressionResult.toString().length > maxLength) {
        let integer = Math.floor(expressionResult);
        let decimal = expressionResult - integer;

        let decimalLength = maxLength - integer.toString().length + 1; //Add '1' because zero is included in decimal
        return integer + decimal.toString().slice(1,decimalLength);
    }

    return expressionResult;
}

function checkFontSize(displayString) {
    if (displayString.length < maxLength) {
        return defaultFontSize;
    }

    else {
        return ((maxLength * defaultFontSize) / displayString.length);
    }
}

addListeners();