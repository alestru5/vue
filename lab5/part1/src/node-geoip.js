const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
    .then(response => {
        console.log('Успех!');
        console.log(response.data);
    })
    .catch(error => {
        console.log('Ошибка!');
        console.log(error.toString());
    }); 