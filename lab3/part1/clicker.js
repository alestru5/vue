// Получаем элементы
const counterElement = document.getElementById('counter');
const clickRateElement = document.getElementById('clickRate');

// Инициализируем переменные
let counter = localStorage.getItem('clickerCounter') ? parseInt(localStorage.getItem('clickerCounter')) : 0;
let startTime = localStorage.getItem('clickerStartTime') ? new Date(localStorage.getItem('clickerStartTime')) : new Date();
let lastClickTime = localStorage.getItem('lastClickTime') ? new Date(localStorage.getItem('lastClickTime')) : startTime;
let clicksInLastSecond = 0;
let lastSecondUpdate = new Date();

// Обновляем отображение счетчика
counterElement.textContent = counter;

// Функция для обновления скорости кликов
function updateClickRate() {
    const now = new Date();
    const timeDiff = (now - lastSecondUpdate) / 1000; // в секундах
    
    if (timeDiff >= 1) {
        const rate = clicksInLastSecond / timeDiff;
        clickRateElement.textContent = `Средняя скорость: ${rate.toFixed(2)} кликов/сек`;
        clicksInLastSecond = 0;
        lastSecondUpdate = now;
    }
}

// Функция для увеличения счетчика
function incrementCounter() {
    counter++;
    counterElement.textContent = counter;
    localStorage.setItem('clickerCounter', counter);
    
    const now = new Date();
    localStorage.setItem('lastClickTime', now);
    
    clicksInLastSecond++;
    updateClickRate();
}

// Сохраняем время начала при первой загрузке
if (!localStorage.getItem('clickerStartTime')) {
    localStorage.setItem('clickerStartTime', startTime);
}

// Обновляем скорость кликов каждую секунду
setInterval(updateClickRate, 1000); 