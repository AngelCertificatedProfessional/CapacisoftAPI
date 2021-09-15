const express = require('express');
const router = express.Router()
const PeriodoController = require('../controllers/periodoController')

module.exports = function(){
    router.post('/agregarPeriodo',PeriodoController.createPeriodo)
    router.get('/listado',PeriodoController.listadoPeriodo)
    router.get('/consultaById/:_id',PeriodoController.getPeriodobyId)
    router.put('/actualizarPeriodo',PeriodoController.actualizarPeriodo)
    router.get('/listadoAlumnosByPeriodo/:_id',PeriodoController.listadoAlumnosByPeriodo)
    router.get('/listadoBajasByPeriodo',PeriodoController.listadoBajasByPeriodo)
    return router;
}