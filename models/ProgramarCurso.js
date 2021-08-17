const mongoose = require('mongoose')

const ProgramarCursoSchema = mongoose.Schema({
    cursoId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'universidad'
    },
    fechaInicioCurso:{
        type:Date,
        required:true
    },
    periodoId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'periodo'
    },
    tipoCurso:{
        type:Number,
        required:true,
    },
    precioFinal:{
        type:Number,
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

ProgramarCursoSchema.index({fechaInicioCurso:'date'})

module.exports = mongoose.model('ProgramarCurso',ProgramarCursoSchema,'programarCurso')