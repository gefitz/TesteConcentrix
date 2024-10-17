const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/UsuarioRoutes');

dotenv.config();
const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => res.send('API MySQL MVC Rodando!'));

module.exports = app;