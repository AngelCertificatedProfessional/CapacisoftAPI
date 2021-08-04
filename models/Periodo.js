const mongoose = require('mongoose')

const PeriodoSchema = mongoose.Schema({
    periodo:{
        type:String,
        required:true,
    },
    fechaInicio:{
        type:Date,
        required:true
    },
    fechaFinal:{
        type:Date,
        required:true
    },
    alumnos:{
        type : Array ,
        "default" : [] 
    },
    creado:{
        type:Date,
        default:Date.now()
    }
})

PeriodoSchema.index({fechaInicio:'text'})

module.exports = mongoose.model('Periodo',PeriodoSchema,'periodo')