// Определение типа для точки
type Point = {
    x: number;
    y: number;
}

// Перегрузки функции distance
function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;
function distance(a: number | Point, b: number | Point, c?: number, d?: number): number {
    // Если переданы координаты точек по отдельности
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
        return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2));
    }
    // Если переданы объекты точек
    if (typeof a === 'object' && typeof b === 'object') {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }
    throw new Error('Invalid arguments');
}

import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askForInput(): void {
    console.log('Выберите способ ввода координат:');
    console.log('1 - Ввести координаты отдельно (x1,y1,x2,y2)');
    console.log('2 - Ввести две точки как объекты');
    
    rl.question('Ваш выбор (1 или 2): ', (choice: string) => {
        if (choice === '1') {
            getCoordinatesInput();
        } else if (choice === '2') {
            getPointsInput();
        } else {
            console.log('Неверный выбор');
            rl.close();
        }
    });
}

function getCoordinatesInput(): void {
    rl.question('Введите x1: ', (x1Str: string) => {
        rl.question('Введите y1: ', (y1Str: string) => {
            rl.question('Введите x2: ', (x2Str: string) => {
                rl.question('Введите y2: ', (y2Str: string) => {
                    const x1 = parseFloat(x1Str);
                    const y1 = parseFloat(y1Str);
                    const x2 = parseFloat(x2Str);
                    const y2 = parseFloat(y2Str);

                    if ([x1, y1, x2, y2].some(isNaN)) {
                        console.log('Ошибка: все координаты должны быть числами');
                        rl.close();
                        return;
                    }

                    const result = distance(x1, y1, x2, y2);
                    console.log(`Расстояние между точками: ${result}`);
                    rl.close();
                });
            });
        });
    });
}

function getPointsInput(): void {
    console.log('Введите координаты первой точки:');
    rl.question('x1: ', (x1Str: string) => {
        rl.question('y1: ', (y1Str: string) => {
            console.log('Введите координаты второй точки:');
            rl.question('x2: ', (x2Str: string) => {
                rl.question('y2: ', (y2Str: string) => {
                    const x1 = parseFloat(x1Str);
                    const y1 = parseFloat(y1Str);
                    const x2 = parseFloat(x2Str);
                    const y2 = parseFloat(y2Str);

                    if ([x1, y1, x2, y2].some(isNaN)) {
                        console.log('Ошибка: все координаты должны быть числами');
                        rl.close();
                        return;
                    }

                    const p1: Point = { x: x1, y: y1 };
                    const p2: Point = { x: x2, y: y2 };
                    const result = distance(p1, p2);
                    console.log(`Расстояние между точками: ${result}`);
                    rl.close();
                });
            });
        });
    });
}

// Запуск программы
askForInput(); 