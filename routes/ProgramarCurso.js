const express = require('express');
const router = express.Router()
const ProgramarCursoController = require('../controllers/ProgramarCursoController')

module.exports = function(){
    router.post('/createProgramarCurso',ProgramarCursoController.createProgramarCurso)
    router.get('/listado',ProgramarCursoController.listadoProgramarCurso)
    router.get('/consultaById/:_id',ProgramarCursoController.getProgramarCursobyId)
    // router.patch('/actualizarAlumno',AlumnosController.actualizarAlumno)
    return router;
}