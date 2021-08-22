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
    fechaFinalizaCurso:{
        type:Date,
    },
    calificacionCurso:{
        type:Number,
    },
    notasCurso:{
        type:String,
    },
})

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
    alumnos:[AlumnoSchema],
    creado:{
        type:Date,
        default:Date.now()
    }
})

ProgramarCursoSchema.index({fechaInicioCurso:'date'})

module.exports = mongoose.model('ProgramarCurso',ProgramarCursoSchema,'programarCurso')