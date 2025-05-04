require('dotenv').config({ path: `.env.${process.env.BUILD_ENV || 'local'}` });
console.log('Текущий режим:', process.env.MODE);
console.log('API_URL:', process.env.API_URL);

const axios = require('axios');

axios.get(process.env.API_URL)
    .then(response => {
        console.log('Успех!');
        console.log(response.data);
    })
    .catch(error => {
        console.log('Ошибка!');
        console.log(error.toString());
    }); 