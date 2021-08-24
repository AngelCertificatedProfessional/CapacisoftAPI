const mongoose = require('mongoose');

const ActualizacionSchema = mongoose.Schema({
    version:{
        type:Number,
        required:true,
    },
    tarea:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    creado:{
        type:Date,
        default:Date.now
    }
})

ActualizacionSchema.index({tarea:'text'})

module.exports = mongoose.model('Actualizacion',ActualizacionSchema,'actualizacion')