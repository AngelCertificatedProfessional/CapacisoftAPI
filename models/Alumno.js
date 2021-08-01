const mongoose = require('mongoose')

const AlumnoSchema = mongoose.Schema({
    nombreAlumno:{
        type:String,
        required:true,
    },
    apellidoAlumno:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true
    },
    infoAcademico:{
        universidadId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'universidades'
        },
        carrerId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'carreras'
        },
        semestre:{
            type:Number,
            required:true
        },
        matricula:{
            type:String,
            required:true
        },
        cargaAcademica:{
            type:Number,
            required:true
        },
        estadoAlumno:{
            type:Number,
            required:true
        }
    },
    contacto:{
        correo:{
            type:String,
            required:true
        },
        github:{
            type:String,
        },
        linkedIn:{
            type:String,
        }
    },creado:{
        type:Date,
        default:Date.now()
    }
})

AlumnoSchema.index({nombreAlumno:'text'})

module.exports = mongoose.model('Alumno',AlumnoSchema,'alumno')