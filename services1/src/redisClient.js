const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
    console.error('Erro no cliente Redis:', err);
});

redisClient.on('ready', () => {
    console.log('Cliente Redis está pronto');
});

module.exports = redisClient;
