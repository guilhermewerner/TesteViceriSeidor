# Imagem base
FROM node:14 AS build
WORKDIR /app

# Copiar e instalar as dependências
COPY TesteViceriSeidor.App/package*.json ./
RUN npm install

# Copiar o restante dos arquivos e construir o projeto Angular
COPY TesteViceriSeidor.App/ .
RUN npm run build

# Criar imagem final
FROM nginx:alpine
COPY --from=build /app/dist/TesteViceriSeidor.App /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
