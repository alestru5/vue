// Интерфейс для класса User
interface IUser {
    name: string;
    age: number;
    hello(): void;
}

// Реализация класса User
class User implements IUser {
    constructor(public name: string, public age: number) {}

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

            const user = new User(name, age);
            user.hello();
            rl.close();
        });
    });
}

// Запуск программы
getUserInput(); 