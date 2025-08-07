# Use uma imagem base do Node.js
FROM node:20-bookworm-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto do código da aplicação
COPY . .

# Comando para iniciar o servidor de desenvolvimento do Vite
# O --host 0.0.0.0 é crucial para que o servidor seja acessível de fora do container
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]