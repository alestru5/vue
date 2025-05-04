// Функция для преобразования строки в массив чисел
function parseNumbers(input) {
    return input.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
}

// Функция глубокого копирования
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }
    
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

// Функция медианы с двумя способами вызова
function calculateMedian(...numbers) {
    // Сортировка массива
    const sorted = numbers.sort((a, b) => a - b);
    const length = sorted.length;
    
    let median;
    if (length % 2 === 0) {
        // Для четного количества чисел берем среднее двух центральных
        median = (sorted[length/2 - 1] + sorted[length/2]) / 2;
    } else {
        // Для нечетного количества берем центральное число
        median = sorted[Math.floor(length/2)];
    }
    
    return median;
}

// 1. Сортировка чисел
function sortNumbers() {
    const input = prompt('Введите числа через пробел:');
    const numbers = parseNumbers(input);
    const sorted = numbers.sort((a, b) => a - b);
    alert(sorted.join(' '));
}

// 2. Остатки от деления на 5
function getRemainders() {
    const input = prompt('Введите числа через пробел:');
    const numbers = parseNumbers(input);
    const remainders = numbers.map(n => n % 5);
    alert(remainders.join(' '));
}

// 3. Медиана чисел
function showMedian() {
    const input = prompt('Введите числа через пробел:');
    const numbers = parseNumbers(input);
    
    // Первый способ вызова - передача аргументов через запятую
    const median1 = calculateMedian(...numbers);
    
    // Второй способ вызова - передача массива с распаковкой
    const median2 = calculateMedian.apply(null, numbers);
    
    alert(`Медиана (способ 1): ${median1}\nМедиана (способ 2): ${median2}`);
}

// 4. Проверка скобок
function checkBrackets() {
    const input = prompt('Введите строку со скобками:');
    const stack = [];
    let isValid = true;
    
    for (let char of input) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) {
                isValid = false;
                break;
            }
            stack.pop();
        }
    }
    
    isValid = isValid && stack.length === 0;
    alert(isValid ? 'Правильная' : 'Неправильная');
}

// 5. Глубокая копия объекта
function deepCopyObject() {
    try {
        const example = {
            name: "John",
            age: 30,
            address: {
                city: "New York",
                street: "Main St"
            },
            hobbies: ["reading", "gaming", "coding"]
        };
        
        const input = prompt('Введите JSON объект (можно скопировать пример):', JSON.stringify(example, null, 4));
        if (input === null) return; // Если пользователь нажал Отмена
        
        const obj = JSON.parse(input);
        const copy = deepCopy(obj);
        
        alert('Исходный объект:\n' + JSON.stringify(obj, null, 4) + 
              '\n\nКопия объекта:\n' + JSON.stringify(copy, null, 4) + 
              '\n\nОбъекты равны: ' + (JSON.stringify(obj) === JSON.stringify(copy)) +
              '\nОбъекты ссылаются на одну область памяти: ' + (obj === copy));
    } catch (e) {
        alert('Ошибка: неверный формат JSON\n' + e.message);
    }
} 