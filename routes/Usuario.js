const express = require('express');
const router = express.Router()
const UsuarioController = require('../controllers/usuariosController')

module.exports = function(){
    router.post('/agregarUsuario',UsuarioController.createUsuario)
    router.get('/listado',UsuarioController.listadoUsuario)
    router.get('/consultaById/:_id',UsuarioController.getUsuariobyId)
    router.put('/actualizarUsuario',UsuarioController.actualizarUsuario)
    return router;
}