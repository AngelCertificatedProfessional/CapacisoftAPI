const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({
    nombreCurso:{
        type:String,
        required:true,
    },
    proveedor:{
        type:Number,
        required:true
    },
    nombreInstructor:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    detalleCurso:{
        urlCurso:{
            type:String,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        horas:{
            type:Number,
            required:true
        },
        herramientas:{
            type:String
        },
        proveeCertificado:{
            type:Boolean
        }
    },
    temaCurso:{
        type : Array ,
        "default" : [] 
    },
    creado:{
        type:Date,
        default:Date.now
    }
})

CursoSchema.index({nombreAlumno:'text'})

module.exports = mongoose.model('Curso',CursoSchema,'curso')