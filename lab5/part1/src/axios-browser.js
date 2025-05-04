const result = document.getElementById('result');

axios.get('https://vk.com')
    .then(response => {
        result.textContent = 'Успех!\n' + JSON.stringify(response.data, null, 2);
    })
    .catch(error => {
        result.textContent = 'Ошибка!\n' + error;
    }); 