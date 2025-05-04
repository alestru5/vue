// Определение типов с помощью Type Alias
type UserName = string;
type UserAge = number;

type UserType = {
    name: UserName;
    age: UserAge;
    hello: () => void;
}

// Реализация класса User с использованием Type Alias
class UserWithTypes implements UserType {
    constructor(public name: UserName, public age: UserAge) {}

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Использование readline для получения ввода от пользователя
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для получения данных от пользователя
function getUserInput(): void {
    rl.question('Введите ваше имя: ', (name: string) => {
        rl.question('Введите ваш возраст: ', (ageStr: string) => {
            const age = parseInt(ageStr);
            
            if (isNaN(age)) {
                console.log('Ошибка: возраст должен быть числом');
                rl.close();
                return;
            }

            const typedUser: UserType = new UserWithTypes(name, age);
            typedUser.hello();
            rl.close();
        });
    });
}

// Запуск программы
getUserInput(); 