const express = require('express');
const redisClient = require('./redisClient');
const apiConsumer = require('./apiConsumer');

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '46a7866257bfb221e88f52342066f2a3';

// Middleware para validar a chave da API
if (!WEATHER_API_KEY) {
    console.error('A chave da API de clima está ausente');
    process.exit(1); // Encerra a aplicação se a chave da API estiver ausente
}

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city || 'London';
        
        // Validação do parâmetro de entrada
        if (!city) {
            return res.status(400).json({ error: 'O parâmetro cidade é obrigatório' });
        }

        const cachedData = await redisClient.get(city);
        
        if (cachedData) {
            console.log(`Cache encontrado para a cidade: ${city}`);
            return res.json(JSON.parse(cachedData));
        }

        // Chamada à API com timeout
        const apiData = await apiConsumer.getWeather(city, WEATHER_API_KEY, { timeout: 5000 });
        await redisClient.set(city, JSON.stringify(apiData), 'EX', 3600); // Cache por 1 hora

        console.log(`Cache não encontrado para a cidade: ${city}, dados obtidos da API`);
        res.json(apiData);
    } catch (error) {
        console.error('Erro ao buscar dados de clima:', error);
        res.status(500).json({ error: 'Algo deu errado!', message: error.message });
    }
});

app.get('/health', (req, res) => res.send('Saudável'));
app.get('/ready', (req, res) => res.send('Pronto'));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ error: 'Algo deu errado!', message: err.message });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
