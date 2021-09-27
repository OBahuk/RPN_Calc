class Calculator {
    constructor(height, width) {
        this.state = {
            operatorsQueue: [],
            operandsStack: [],
        };
        this.operatorsMap = {
            "+": function(a, b){ return a + b },
            "-": function(a, b){ return a - b },
            "*": function(a, b){ return a * b },
            "/": function(a, b){ return a / b },
        };
        this.actions = {
            clearState: () => {
                this.operatorsQueue = [];
                this.operandsStack = [];
            },
            addToOperators: (operator) => {
                return this.state.operatorsQueue.push(operator)
            },
            getAndRemoveOperator: () => {
                return this.state.operatorsQueue.shift()
            },
            addToOperands: (operand) => {
                return this.state.operandsStack.push(operand)
            },
            getAndRemoveOperand: () => {
                return this.state.operandsStack.pop()
            },
        };
    }

    handleMultipleInput = (str) => {
        const input = str.split(' ');
        const {actions, state, operatorsMap} = this;
        const { state: {operatorsQueue, operandsStack}} = this;
        const {addToOperators, addToOperands, getAndRemoveOperator, getAndRemoveOperand} = actions;

        input.forEach( item => {
            if (operatorsMap[item]) {
                addToOperators(item)
                return;
            }

            const number = Number(item)

            if (!isNaN(number)) {
                addToOperands(number)
                return;
            }

            throw 'only numbers and - + * / operators allowed. User input include ' + item;
        })

        if (operandsStack.length - operatorsQueue.length !== 1) {
            throw 'extra operator: ' + operandsStack.join(' ') + ' ' + operatorsQueue.join(' ');
        }

        let result = getAndRemoveOperand();

        while(operandsStack.length) {
            const b = result;
            const a = getAndRemoveOperand();
            const operator = getAndRemoveOperator();
            result = operatorsMap[operator](a, b)
        }

        addToOperands(result)
    }

    handleSingleChar = (char) => {
        const {actions, state, operatorsMap} = this;
        const { state: {operatorsQueue, operandsStack}} = this;
        const {
            addToOperators, addToOperands, getAndRemoveOperator, getAndRemoveOperand
        } = actions;

        if (operatorsMap[char]) {
            if (!operandsStack.length) {
                throw 'extra operator: ' + operandsStack.join(' ') + ' ' + operatorsQueue.join(' ') + ' ' + char;
            }

            addToOperators(char)
        } else {
            const number = Number(char)

            if (isNaN(number)) {
                throw 'only numbers and - + * / operators allowed. User input include ' + char;
            }
            addToOperands(number)
        }

        if (operandsStack.length - operatorsQueue.length !== 1) {
            return
        }

        let result = getAndRemoveOperand();

        while(operandsStack.length) {
            const b = result;
            const a = getAndRemoveOperand();
            const operator = getAndRemoveOperator();
            result = operatorsMap[operator](a, b)
        }

        addToOperands(result)
    }
}

module.exports = Calculator;