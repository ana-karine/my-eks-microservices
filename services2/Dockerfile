# Use a imagem oficial do Redis
FROM redis:6.2

# Opcional: Configure o Redis (por exemplo, appendonly, intervalos de salvamento)
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Exponha a porta do Redis
EXPOSE 6379

# Opcional: Inicie o Redis com uma configuração personalizada
# CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
CMD ["redis-server"]
