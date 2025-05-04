// 1. Adapter Pattern
interface ModernPrinter {
    printModern(text: string): void;
}

class OldPrinter {
    print(text: string): void {
        console.log(`Old Printer: ${text}`);
    }
}

class PrinterAdapter implements ModernPrinter {
    constructor(private oldPrinter: OldPrinter) {}

    printModern(text: string): void {
        this.oldPrinter.print(text);
    }
}

// 2. Strategy Pattern
interface SortStrategy {
    sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
    sort(data: number[]): number[] {
        // Реализация пузырьковой сортировки
        return [...data].sort((a, b) => a - b);
    }
}

class QuickSort implements SortStrategy {
    sort(data: number[]): number[] {
        // Реализация быстрой сортировки
        return [...data].sort((a, b) => a - b);
    }
}

class Sorter {
    constructor(private strategy: SortStrategy) {}

    setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy;
    }

    sort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}

// 3. Observer Pattern
interface Observer {
    update(data: string): void;
}

class NewsAgency {
    private observers: Observer[] = [];
    private news: string = "";

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    setNews(news: string): void {
        this.news = news;
        this.notifyObservers();
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.news);
        }
    }
}

class NewsChannel implements Observer {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(`${this.name} received news: ${news}`);
    }
}

// Примеры использования

// 1. Adapter
const oldPrinter = new OldPrinter();
const modernPrinter: ModernPrinter = new PrinterAdapter(oldPrinter);
modernPrinter.printModern("Hello World");

// 2. Strategy
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort([3, 1, 4, 1, 5]));
sorter.setStrategy(new QuickSort());
console.log(sorter.sort([3, 1, 4, 1, 5]));

// 3. Observer
const newsAgency = new NewsAgency();
const channel1 = new NewsChannel("Channel 1");
const channel2 = new NewsChannel("Channel 2");

newsAgency.attach(channel1);
newsAgency.attach(channel2);
newsAgency.setNews("Breaking News!"); 