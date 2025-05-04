// Получаем элемент движущегося круга
const movingCircle = document.querySelector('.moving-circle');
const task5Section = document.querySelector('.task5');

// Функция для обновления позиции круга
function updateCirclePosition(e) {
    // Получаем координаты секции относительно окна
    const rect = task5Section.getBoundingClientRect();
    
    // Вычисляем координаты мыши относительно секции
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Обновляем позицию круга
    movingCircle.style.left = `${x}px`;
    movingCircle.style.top = `${y}px`;
}

// Добавляем обработчик движения мыши только для секции task5
task5Section.addEventListener('mousemove', updateCirclePosition); 