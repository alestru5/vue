// Запрещаем выделение текста
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Запрещаем контекстное меню
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Запрещаем копирование
document.addEventListener('copy', function(e) {
    e.preventDefault();
});

// Запрещаем вырезание
document.addEventListener('cut', function(e) {
    e.preventDefault();
});

// Запрещаем вставку
document.addEventListener('paste', function(e) {
    e.preventDefault();
}); 