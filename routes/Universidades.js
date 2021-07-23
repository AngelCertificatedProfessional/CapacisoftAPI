const express = require('express');
const router = express.Router()
const UniversidadesController = require('../controllers/universidadesController')

module.exports = function(){
    router.post('/agregarUniversidad',UniversidadesController.createUniversidad)
    router.get('/listado',UniversidadesController.listadoUniversidades)
    router.get('/consultaById/:_id',UniversidadesController.getUniversidadbyId)
    router.put('/actualizarUniversidad',UniversidadesController.actualizarUniversidad)
    return router;
}