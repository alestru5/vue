class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    // Вставка элемента
    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Поиск элемента
    search(value: T): TreeNode<T> | null {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null || node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        }
        return this.searchNode(node.right, value);
    }

    // Изменение элемента
    update(oldValue: T, newValue: T): boolean {
        const node = this.search(oldValue);
        if (node) {
            node.value = newValue;
            return true;
        }
        return false;
    }

    // Удаление элемента
    remove(value: T): void {
        this.root = this.removeNode(this.root, value);
    }

    private removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            // Узел без потомков
            if (node.left === null && node.right === null) {
                return null;
            }
            // Узел с одним потомком
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            // Узел с двумя потомками
            const minNode = this.findMin(node.right);
            node.value = minNode.value;
            node.right = this.removeNode(node.right, minNode.value);
            return node;
        }
    }

    private findMin(node: TreeNode<T>): TreeNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Определение высоты дерева
    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }

        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }
}

import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tree = new BinaryTree<number>();

function showMenu(): void {
    console.log('\nВыберите операцию:');
    console.log('1 - Вставить элемент');
    console.log('2 - Найти элемент');
    console.log('3 - Изменить элемент');
    console.log('4 - Удалить элемент');
    console.log('5 - Показать высоту дерева');
    console.log('6 - Выход');

    rl.question('Ваш выбор: ', handleChoice);
}

function handleChoice(choice: string): void {
    switch (choice) {
        case '1':
            rl.question('Введите число для вставки: ', (value: string) => {
                const num = parseInt(value);
                if (isNaN(num)) {
                    console.log('Ошибка: введите число');
                } else {
                    tree.insert(num);
                    console.log(`Число ${num} добавлено в дерево`);
                }
                showMenu();
            });
            break;

        case '2':
            rl.question('Введите число для поиска: ', (value: string) => {
                const num = parseInt(value);
                if (isNaN(num)) {
                    console.log('Ошибка: введите число');
                } else {
                    const result = tree.search(num);
                    console.log(result ? `Число ${num} найдено` : `Число ${num} не найдено`);
                }
                showMenu();
            });
            break;

        case '3':
            rl.question('Введите число для изменения: ', (oldValue: string) => {
                rl.question('Введите новое значение: ', (newValue: string) => {
                    const oldNum = parseInt(oldValue);
                    const newNum = parseInt(newValue);
                    if (isNaN(oldNum) || isNaN(newNum)) {
                        console.log('Ошибка: введите числа');
                    } else {
                        const updated = tree.update(oldNum, newNum);
                        console.log(updated ? 'Значение обновлено' : 'Значение не найдено');
                    }
                    showMenu();
                });
            });
            break;

        case '4':
            rl.question('Введите число для удаления: ', (value: string) => {
                const num = parseInt(value);
                if (isNaN(num)) {
                    console.log('Ошибка: введите число');
                } else {
                    tree.remove(num);
                    console.log(`Число ${num} удалено из дерева`);
                }
                showMenu();
            });
            break;

        case '5':
            console.log(`Высота дерева: ${tree.getHeight()}`);
            showMenu();
            break;

        case '6':
            console.log('Программа завершена');
            rl.close();
            break;

        default:
            console.log('Неверный выбор');
            showMenu();
            break;
    }
}

// Запуск программы
console.log('Бинарное дерево поиска');
showMenu(); 