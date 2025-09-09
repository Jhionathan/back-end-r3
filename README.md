<p align="center">
back-end-r3-suprimentos
</p>

# Tecnologias e Informações
- NodeJS
- TypeScript
- NestJS
- TypeORM

# Instalação e execução

1) Renomeie o arquivo `.env.example` para `.env`
> Esse arquivo contem variáveis de ambiente e não é versionado
`cp .env.example .env`

2) Suba os container
> Com esse comando vamos subir e destravar o terminal
`docker-compose up -d`

3) Acompanhe os logs da aplicação
> Alterações no código são refletidas automaticamente
`docker logs --tail 1000 -f NAME`

### Acessando o projeto pelo browser
`http://localhost:3000/api-docs`
