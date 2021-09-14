const mongoose = require('mongoose')

const AlumnoSchema = mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'alumno'
    },
    matricula:{
        type:String,
    },
    nombreCompletoAlumno:{
        type:String,
    },
    alumnoBaja:{
        type:Boolean,
    },
    fechaBaja:{
        type:Date,
    }
})

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
    alumnos:[AlumnoSchema],
    creado:{
        type:Date,
        default:Date.now
    }
})

PeriodoSchema.index({fechaInicio:'text'})

module.exports = mongoose.model('Periodo',PeriodoSchema,'periodo')