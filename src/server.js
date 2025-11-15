const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`O servidor está rodando em localhost:${PORT || 3000}`);
});