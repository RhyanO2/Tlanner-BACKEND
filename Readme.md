# Tlanner-BACKEND

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=222)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![MVC](https://img.shields.io/badge/Arquitetura-MVC-blueviolet?style=for-the-badge)](#arquitetura-mvc)
[![Swagger](https://img.shields.io/badge/Swagger-API--Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Jest](https://img.shields.io/badge/Tests-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Este repositório contém o backend da aplicação Tlanner, desenvolvido em **JavaScript** (Node.js), seguindo arquitetura **MVC** e preparado para fácil deployment com **Docker**.

## Tecnologias Principais
- **JavaScript** (Node.js)
- **Arquitetura MVC**
- **Swagger/OpenAPI** – documentação automática dos endpoints
- **Jest** – alguns testes automatizados
- **Docker**

## Documentação da API

A documentação detalhada dos endpoints REST está disponível via Swagger (OpenAPI).  
Após rodar a aplicação, acesse:

```
http://localhost:3000/api-docs
```

## Como rodar localmente

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/RhyanO2/Tlanner-BACKEND.git
   cd Tlanner-BACKEND
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   - Crie um arquivo `.env` conforme as necessidades do projeto.
   - Exemplo de variáveis: `PORT`, `DB_HOST`, `DB_USER`, `DB_PASS`, etc.

4. **Rodar o servidor:**
   ```bash
   npm start
   ```

5. **Executar os testes:**
   ```bash
   npm test
   ```

6. **Usando Docker:**
   ```bash
   docker build -t tlanner-backend .
   docker run -p 3000:3000 tlanner-backend
   ```

## Estrutura do Projeto

- `src/`
  - `controllers/` — Lógica dos endpoints (Controllers)
  - `models/` — Modelos e definições de dados
  - `routes/` — Definição das rotas da API
  - `docs/` — Configuração do Swagger/OpenAPI
  - Outros arquivos de suporte à aplicação
- `tests/` — Testes automatizados com Jest
- `Dockerfile` — Deploy simplificado via Docker

## Observações

- Consulte a documentação Swagger/OpenAPI para detalhes dos endpoints: `/api-docs`
- O projeto possui testes automatizados cobrindo partes principais da lógica.
- Sugestões, dúvidas ou problemas? Abra uma issue!

---
