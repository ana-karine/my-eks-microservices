# Use uma imagem base adequada
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que o aplicativo vai usar
EXPOSE 3000

# Defina o comando para iniciar o aplicativo
CMD ["npm", "start"]
