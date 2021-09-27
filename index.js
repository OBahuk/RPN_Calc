const Calculator = require('./src/calculator');
const calculator = new Calculator();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function waitForInput() {
    readline.question('', input => {
        if (input === 'q') {
            console.log('Thanks for using CLI RPN Calculator!')
            return readline.close();
        }

        if (input === 'c') {
            calculator.actions.clearState();
            console.log('Buffer is clear');
            return waitForInput();
        }

        try {
            handleInput(input);
        } catch (e) {
            console.log('\x1b[31m', 'Error: ' + e);
            calculator.actions.clearState();
        } finally {
            const stackSize = calculator.state.operandsStack.length;
            console.log(calculator.state.operandsStack[stackSize - 1] || 0);
            waitForInput();
        }
    });
}

function handleInput(input){
    let str = input.trim();

    if (!str.length){
        throw 'Please type some digits and operators, use "c" command to clear buffer and "q" command to quit application';
    }

    if (str.length> 1) {
        calculator.handleMultipleInput(str);
        return;
    }

    calculator.handleSingleChar(str);
}


console.log('Welcome CLI RPN Calculator! You can use "c" command to clear buffer and "q" command to quit application')
waitForInput();
