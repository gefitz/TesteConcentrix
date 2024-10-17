const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticateToken } = require('../middleware/auth'); // Desestrutura corretamente

// Rotas protegidas
router.get('/', authenticateToken, usuarioController.getAllUsuarios);
router.get('/:id', authenticateToken, usuarioController.getUsuarioByid);
router.put('/:id', authenticateToken, usuarioController.putUsuario);
router.delete('/:id', authenticateToken, usuarioController.deleteUsuario);

// Rotas públicas
router.post('/cadastro', usuarioController.createUsuario);
router.post('/login', usuarioController.login);

module.exports = router;