const app = require('./app');
const PORT = process.env.PORT || 3000;
const {createTable} = require('./confg/db');


app.listen(PORT, async () => {
  await createTable();
  console.log(`Servidor rodando na porta ${PORT}`);
});
