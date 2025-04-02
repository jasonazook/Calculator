document.addEventListener('DOMContentLoaded', function () {
    const calculatorDisplay = document.querySelector('.calculator-screen');
    const hiddenInput = document.getElementById('hiddenInput');
    const calculatorForm = document.getElementById('calculatorForm');
    const submitButton = document.getElementById('submitButton');

    let currentInput = calculatorDisplay.value || '';
    let waitingForOperand = false;

    // Update display and hidden input
    function updateDisplay() {
        calculatorDisplay.value = currentInput;
        hiddenInput.value = currentInput;
    }

    // Handle number button clicks
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', function () {
            const digit = button.value;

            if (waitingForOperand) {
                currentInput = digit;
                waitingForOperand = false;
            } else {
                currentInput = currentInput === '0' ? digit : currentInput + digit;
            }

            updateDisplay();
        });
    });

    // Handle decimal button click
    document.querySelector('.decimal').addEventListener('click', function () {
        if (waitingForOperand) {
            currentInput = '0.';
            waitingForOperand = false;
        } else if (currentInput.indexOf('.') === -1) {
            currentInput += '.';
        }

        updateDisplay();
    });

    // Handle operator button clicks
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', function () {
            const operator = button.value;

            // Handle case where operator is already at the end
            if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
                currentInput = currentInput.slice(0, -1) + operator;
            } else {
                currentInput += operator;
            }

            waitingForOperand = false;
            updateDisplay();
        });
    });

    // Handle equals button click
    document.querySelector('.equal-sign').addEventListener('click', function () {
        // Submit the form to perform the calculation on the server side
        calculatorForm.submit();
    });

    // Handle clear button click
    document.querySelector('.all-clear').addEventListener('click', function () {
        currentInput = '';
        waitingForOperand = false;
        updateDisplay();
    });
});
