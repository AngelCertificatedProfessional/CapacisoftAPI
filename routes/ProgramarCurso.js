const express = require('express');
const router = express.Router()
const ProgramarCursoController = require('../controllers/ProgramarCursoController')

module.exports = function(){
    router.post('/createProgramarCurso',ProgramarCursoController.createProgramarCurso)
    router.get('/listado',ProgramarCursoController.listadoProgramarCurso)
    router.get('/consultaById/:_id',ProgramarCursoController.getProgramarCursobyId)
    router.get('/getAlumnoByProgramarCurso/:_id/:_idAlumno',ProgramarCursoController.getAlumnoByProgramarCurso)
    router.put('/actualizarProgramarCurso',ProgramarCursoController.actualizarProgramarCurso)
    router.patch('/actualizarProgramarCursoAlumno',ProgramarCursoController.actualizarProgramarCursoAlumno)
    router.get('/listadoGastosByPeriodo/:_id',ProgramarCursoController.listadoGastosByPeriodo)
    return router;
}