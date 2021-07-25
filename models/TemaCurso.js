const mongoose = require('mongoose')

const TemaCursoSchema = mongoose.Schema({
    temaCurso:{
        type:String,
        required:true,
    },
    creado:{
        type:Date,
        default:Date.now()
    }
})

TemaCursoSchema.index({nombre:'text'})

module.exports = mongoose.model('TemaCurso',TemaCursoSchema,'temaCurso')