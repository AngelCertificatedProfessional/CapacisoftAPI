const express = require('express');
const router = express.Router()
const CarreraController = require('../controllers/carreraController')

module.exports = function(){
    router.post('/agregarCarrera',CarreraController.createCarrera)
    router.get('/listado',CarreraController.listadoCarreras)
    router.get('/consultaById/:_id',CarreraController.getCarrerabyId)
    router.put('/actualizarCarrera',CarreraController.actualizarCarrera)
    return router;
}