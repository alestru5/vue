// Задание 1: Счетчик посещений
document.addEventListener('DOMContentLoaded', () => {
    // Получаем текущее количество посещений из localStorage
    let visitCount = localStorage.getItem('visitCount');
    
    // Если это первое посещение, устанавливаем счетчик в 1
    if (visitCount === null) {
        visitCount = 1;
    } else {
        // Иначе увеличиваем счетчик на 1
        visitCount = parseInt(visitCount) + 1;
    }
    
    // Сохраняем новое значение в localStorage
    localStorage.setItem('visitCount', visitCount);
    
    // Обновляем текст на странице
    const visitCountElement = document.getElementById('visitCount');
    visitCountElement.textContent = `Вы посетили эту страницу ${visitCount} раз`;
    
    // Показываем модальное окно с информацией
    alert(`Вы посетили эту страницу ${visitCount} раз`);
});

// Задание 2: Загрузка изображений по порядку
function loadImagesInOrder() {
    const container = document.getElementById('orderedImages');
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL изображения ${i + 1}:`);
        if (!url) continue;
        
        const img = document.createElement('img');
        img.src = url;
        img.onerror = () => {
            const p = document.createElement('p');
            p.textContent = "Can't load image";
            container.appendChild(p);
        };
        img.onload = () => container.appendChild(img);
    }
}

// Задание 3: Загрузка изображений без порядка
function loadImagesWithoutOrder() {
    const container = document.getElementById('unorderedImages');
    container.innerHTML = '';
    
    const urls = [];
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL изображения ${i + 1}:`);
        if (url) urls.push(url);
    }
    
    urls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.onerror = () => {
            const p = document.createElement('p');
            p.textContent = "Can't load image";
            container.appendChild(p);
        };
        img.onload = () => container.appendChild(img);
    });
}

// Задание 4: Загрузка изображений с async/await
async function loadImagesAsync() {
    const container = document.getElementById('asyncImages');
    container.innerHTML = '';
    
    const urls = [];
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL изображения ${i + 1}:`);
        if (url) urls.push(url);
    }
    
    for (const url of urls) {
        try {
            const img = document.createElement('img');
            img.src = url;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            container.appendChild(img);
        } catch (error) {
            const p = document.createElement('p');
            p.textContent = "Can't load image";
            container.appendChild(p);
        }
    }
}

// Задание 5: Проверка IP-адресов
async function checkIPs() {
    const inputs = document.querySelectorAll('.ip-input input');
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    
    const blockedCountries = ['Russia', 'Belarus', 'Afghanistan', 'China', 'Venezuela', 'Iran'];
    let isBlocked = false;
    
    for (const input of inputs) {
        if (!input.value) continue;
        
        try {
            const response = await fetch(`https://api.geoiplookup.io/?query=${input.value}`);
            const data = await response.json();
            
            if (blockedCountries.includes(data.country)) {
                isBlocked = true;
                break;
            }
        } catch (error) {
            console.error('Error checking IP:', error);
        }
    }
    
    if (isBlocked) {
        resultDiv.textContent = 'Our services are not available in your country';
        resultDiv.className = 'error';
    } else {
        resultDiv.textContent = 'Welcome to our website!';
        resultDiv.className = 'success';
    }
} 