const express = require('express');
const router = express.Router()
const TemaCursoController = require('../controllers/temaCursoController')

module.exports = function(){
    router.post('/agregarTemaCurso',TemaCursoController.createTemaCurso)
    router.get('/listado',TemaCursoController.listadoTemaCurso)
    router.get('/consultaById/:_id',TemaCursoController.getTemaCursobyId)
    router.put('/actualizarTemaCurso',TemaCursoController.actualizarTemaCurso)
    return router;
}