// Получаем элементы
const display = document.getElementById('display');

// Состояние калькулятора
let currentMode = 'basic';
let currentExpression = '';
let lastResult = null;
let newNumber = true;

// Переключение режима
function switchMode(mode) {
    currentMode = mode;
    clearDisplay();
}

// Добавление символа на дисплей
function appendToDisplay(value) {
    if (display.value === 'Ошибка') {
        clearDisplay();
    }
    
    // Если начинаем новое число после результата
    if (lastResult !== null && !isNaN(value) && newNumber) {
        clearDisplay();
        lastResult = null;
    }
    
    // Проверка на корректность ввода операторов
    if (['+', '-', '*', '/'].includes(value)) {
        if (display.value === '' && value !== '-') {
            return; // Не добавляем оператор в начало, кроме минуса
        }
        if (['+', '-', '*', '/'].includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1); // Заменяем предыдущий оператор
        }
    }
    
    display.value += value;
    newNumber = false;
}

// Очистка дисплея
function clearDisplay() {
    display.value = '';
    currentExpression = '';
    lastResult = null;
    newNumber = true;
}

// Проверка приоритета операторов
function getPrecedence(op) {
    switch(op) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

// Выполнение операции
function performOperation(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : null;
        default: return null;
    }
}

// Преобразование в РПН
function toRPN(expr) {
    let output = [];
    let operators = [];
    let tokens = expr.match(/(-?\d*\.?\d+)|[()+\-*/]/g) || [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            if (operators.length) operators.pop(); // Удаляем '('
        } else {
            while (operators.length && operators[operators.length - 1] !== '(' &&
                   getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        const op = operators.pop();
        if (op === '(' || op === ')') continue;
        output.push(op);
    }

    return output;
}

// Вычисление РПН
function evaluateRPN(tokens) {
    let stack = [];

    for (let token of tokens) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            if (stack.length < 2) return null;
            let b = stack.pop();
            let a = stack.pop();
            let result = performOperation(a, b, token);
            if (result === null) return null;
            stack.push(result);
        }
    }

    return stack.length === 1 ? stack[0] : null;
}

// Базовый режим калькулятора
function calculateBasic() {
    const expression = display.value;
    const match = expression.match(/^(-?\d*\.?\d+)([-+*/])(-?\d*\.?\d+)$/);
    
    if (!match) {
        return 'Ошибка';
    }

    const [_, a, op, b] = match;
    const result = performOperation(a, b, op);
    return result !== null ? result : 'Ошибка';
}

// Расширенный режим калькулятора
function calculateRPN() {
    try {
        const rpn = toRPN(display.value);
        const result = evaluateRPN(rpn);
        return result !== null ? result : 'Ошибка';
    } catch (e) {
        return 'Ошибка';
    }
}

// Основная функция вычисления
function calculate() {
    if (display.value === '' || display.value === 'Ошибка') {
        return;
    }

    const result = currentMode === 'basic' ? calculateBasic() : calculateRPN();
    display.value = result;
    lastResult = result !== 'Ошибка' ? result : null;
    newNumber = true;
} 