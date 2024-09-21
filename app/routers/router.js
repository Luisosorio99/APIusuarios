let express = require('express');
let router = express.Router();

const Usuarios = require('../controllers/usuarios.controller.js');

// Rutas para Usuarios
router.post('/api/usuario/crear', Usuarios.create); 
router.get('/api/usuario/:id', Usuarios.getUsuarioById); 
router.put('/api/usuario/actualizar/:id', Usuarios.updateById); 
router.delete('/api/usuario/eliminar/:id', Usuarios.deleteById); 
router.get('/api/usuarios', Usuarios.getAllUsuarios);

module.exports = router;
