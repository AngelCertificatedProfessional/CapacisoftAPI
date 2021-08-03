const express = require('express');
const router = express.Router()
const CursoController = require('../controllers/cursoController')

module.exports = function(){
    router.post('/agregarCurso',CursoController.createCurso)
    router.get('/listado',CursoController.listadoCursos)
    router.get('/consultaById/:_id',CursoController.getCursobyId)
    router.patch('/actualizarCurso',CursoController.actualizarCurso)
    // router.patch('/actualizarInfoAcademico',AlumnosController.actualizarInfoAcademico)
    // router.patch('/actualizarInfoContacto',AlumnosController.actualizarInfoContacto)
    return router;
}