const express = require('express');
const router = express.Router()
const CursoController = require('../controllers/cursoController')

module.exports = function(){
    router.post('/agregarCurso',CursoController.createCurso)
    router.get('/listado',CursoController.listadoCursos)
    router.get('/consultaById/:_id',CursoController.getCursobyId)
    router.patch('/actualizarCurso',CursoController.actualizarCurso)
    router.patch('/actualizarDetalleCurso',CursoController.actualizarDetalleCurso)
    router.patch('/actualizarTemaCurso',CursoController.actualizarTemaCurso)
    return router;
}