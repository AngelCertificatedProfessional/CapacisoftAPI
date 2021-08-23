const mongoose = require('mongoose');

const CarrerasSchema = mongoose.Schema({
    nombreCarrera:{
        type:String,
        required:true,
    },
    nombreCoordinador:{
        type:String,
        required:true
    },
    apellidoCoordinador:{
        type:String,
        required:true
    },
    cantidadSemestres:{
        type:Number,
        required:true
    },
    creado:{
        type:Date,
        default:Date.now
    }
})

CarrerasSchema.index({nombreCarrera:'text'})

module.exports = mongoose.model('Carrera',CarrerasSchema,'carrera')