const axios = require('axios');

const getWeather = async (city, apiKey) => {
    try {
        // Construir a URL com parâmetros dinâmicos
        const url = `http://api.openweathermap.org/data/2.5/weather`;
        const response = await axios.get(url, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // ou 'imperial', dependendo da unidade desejada
            }
        });

        // Processar a resposta
        const weatherData = response.data;
        console.log('Dados do clima:', weatherData);
        
        // Exemplo de como você pode acessar informações específicas
        console.log(`Temperatura atual em ${city}: ${weatherData.main.temp}°C`);
        console.log(`Condições: ${weatherData.weather[0].description}`);
        
    } catch (error) {
        console.error('Erro ao obter dados do clima:', error.message);
    }
};

// Exemplo de uso
const city = 'London'; // ou qualquer outra cidade
const apiKey = '46a7866257bfb221e88f52342066f2a3'; // sua chave da API OpenWeatherMap

getWeather(city, apiKey);
