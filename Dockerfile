FROM node:20-alpine
## Vitest roda em node -v>=20
WORKDIR /app

COPY package*.json ./

RUN npm install
## Não instala dev dependencies
COPY . .

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000  

# Comando para executar a aplicação
CMD ["node", "src/server.js"]