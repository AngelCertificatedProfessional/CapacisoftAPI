const express = require('express');
const router = express.Router()
const UniversidadesController = require('../controllers/universidadesController')

module.exports = function(){
    router.post('/agregarUniversidad',UniversidadesController.createUniversidad)
    return router;
}