const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    usuario:{
        type:String,
        required:true,
    },
    contrasena:{
        type:String,
        required:true,
    },
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    tipoUsuario:{
        type:Number,
        required:true,
    },
    creado:{
        type:Date,
        default:Date.now
    },
    creadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'usuarios'
    }
})

UsuarioSchema.index({usuario:'text'})

module.exports = mongoose.model('Usuario',UsuarioSchema,'usuario')