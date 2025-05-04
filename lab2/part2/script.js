// Вспомогательная функция для вывода в консоль
function log(message) {
    const console = document.getElementById('console');
    console.textContent += message + '\n';
    console.scrollTop = console.scrollHeight;
}

// Задание 1: Класс User
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    hello() {
        log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Задание 2: Класс User через функции
function FuncUser(name, age) {
    this.name = name;
    this.age = age;
}

FuncUser.prototype.hello = function() {
    log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
};

// Задание 3: Класс User с телефоном
class UserWithTel {
    #tel = '';

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get tel() {
        return this.#tel;
    }

    set tel(value) {
        if (/^\+7\d{10}$/.test(value)) {
            this.#tel = value;
        } else {
            log('Неверный формат телефона. Используйте формат +7xxxxxxxxxx');
        }
    }

    hello() {
        log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Задание 4: Класс User с валидацией возраста
class UserWithAge {
    #age = 0;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        const num = parseInt(value);
        if (Number.isInteger(num) && num >= 1 && num <= 100) {
            this.#age = num;
        } else {
            log('Возраст должен быть целым числом от 1 до 100');
        }
    }

    hello() {
        log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Задание 5: Класс Student
class Student extends User {
    #knowledge = 0;

    constructor(name, age) {
        super(name, age);
    }

    hello() {
        log(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`);
    }

    learn() {
        this.#knowledge++;
        log(`Знания студента ${this.name} увеличены до ${this.#knowledge}`);
    }
}

// Задание 6: Переопределение метода reverse
Array.prototype.reverse = function() {
    return [...this, ...this];
};

// Глобальные переменные для хранения объектов
let currentUser = null;
let currentFuncUser = null;
let currentUserWithTel = null;
let currentUserWithAge = null;
let currentStudent = null;

// Обработчики событий
function createUser() {
    const name = document.getElementById('userName').value;
    const age = document.getElementById('userAge').value;
    currentUser = new User(name, age);
    currentUser.hello();
}

function createFuncUser() {
    const name = document.getElementById('funcUserName').value;
    const age = document.getElementById('funcUserAge').value;
    currentFuncUser = new FuncUser(name, age);
    currentFuncUser.hello();
}

function setUserTel() {
    if (!currentUserWithTel) {
        currentUserWithTel = new UserWithTel('Default', 0);
    }
    const tel = document.getElementById('userTel').value;
    currentUserWithTel.tel = tel;
    log(`Текущий телефон: ${currentUserWithTel.tel}`);
}

function setUserAge() {
    if (!currentUserWithAge) {
        currentUserWithAge = new UserWithAge('Default', 0);
    }
    const age = document.getElementById('userAgeSetter').value;
    currentUserWithAge.age = age;
    log(`Текущий возраст: ${currentUserWithAge.age}`);
}

function createStudent() {
    const name = document.getElementById('studentName').value;
    const age = document.getElementById('studentAge').value;
    currentStudent = new Student(name, age);
    currentStudent.hello();
}

function studentLearn() {
    if (currentStudent) {
        currentStudent.learn();
    } else {
        log('Сначала создайте студента');
    }
}

function testReverse() {
    const input = document.getElementById('arrayInput').value;
    const array = input.split(',').map(item => item.trim());
    const result = array.reverse();
    log(`Исходный массив: [${array.join(', ')}]`);
    log(`Результат reverse: [${result.join(', ')}]`);
} 