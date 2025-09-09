FROM node:22-alpine as development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT 9229

WORKDIR /usr/src/app

# Instalar dependências do sistema
RUN apk add --no-cache git

# Instalar Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar apenas os arquivos de configuração de pacotes
COPY --chown=node:node package*.json ./

# Limpar cache do npm e instalar dependências
RUN npm cache clean --force && \
    npm i

# Copiar o restante do código
COPY --chown=node:node . .

# Remover o package-lock.json e reinstalar (evita problemas de cache)
RUN rm -f package-lock.json && \
    npm i

# Build do projeto
RUN npm run build

# Mudar para usuário não-root
USER node

# Estágio de produção (sem alterações)
FROM node:18.16.0-alpine3.17 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT $PORT
WORKDIR /usr/src/app
RUN apk add --no-cache tzdata git
ENV TZ America/Sao_Paulo
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm ci --omit=dev --ignore-scripts
COPY --from=development /usr/src/app/dist ./dist
RUN npm rebuild bcrypt --build-from-source
USER node
CMD ["node", "dist/src/main"]