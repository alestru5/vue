// Объект счетчика
const counter = {
    count: 0,
    add(value) {
        this.count += value;
        alert(`Текущее значение: ${this.count}`);
    },
    sub(value) {
        this.count -= value;
        alert(`Текущее значение: ${this.count}`);
    }
};

// Функция определения месяца
function getMonthName() {
    const monthNumber = parseInt(prompt('Введите номер месяца (1-12):'));
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const result = monthNumber >= 1 && monthNumber <= 12 
        ? months[monthNumber - 1] 
        : 'Некорректный номер месяца';
    alert(result);
}

// Функция проверки на простое число
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Функция получения простых чисел
function getPrimes() {
    const count = parseInt(prompt('Введите количество простых чисел:'));
    let primes = [];
    let num = 2;
    while (primes.length < count) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    alert(primes.join(' '));
}

// Функция преобразования разделителей
function convertSeparator() {
    const input = prompt('Введите слова через запятую:');
    const result = input.split(',').map(word => word.trim()).join('.');
    alert(result);
}

// Функция проверки на палиндром
function checkPalindrome() {
    const input = prompt('Введите строку для проверки:');
    const str = input.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    const result = str === str.split('').reverse().join('') ? 'Да' : 'Нет';
    alert(result);
} 