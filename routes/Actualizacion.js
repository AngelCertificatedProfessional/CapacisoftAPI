const express = require('express');
const router = express.Router()
const ActualizacionController = require('../controllers/actualizacionController')

module.exports = function(){
    router.post('/agregarActualizacion',ActualizacionController.createActualizacion)
    router.get('/listado',ActualizacionController.listadoActualizacion)
    return router;
}