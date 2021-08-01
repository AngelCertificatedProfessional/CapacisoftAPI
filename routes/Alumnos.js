const express = require('express');
const router = express.Router()
const AlumnosController = require('../controllers/alumnosController')

module.exports = function(){
    router.post('/agregarAlumno',AlumnosController.createAlumno)
    router.get('/listado',AlumnosController.listadoAlunnos)
    router.get('/consultaById/:_id',AlumnosController.getAlunnosbyId)
    router.patch('/actualizarAlumno',AlumnosController.actualizarAlumno)
    router.patch('/actualizarInfoAcademico',AlumnosController.actualizarInfoAcademico)
    router.patch('/actualizarInfoContacto',AlumnosController.actualizarInfoContacto)
    return router;
}