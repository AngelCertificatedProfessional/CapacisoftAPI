const mongoose = require('mongoose')

const UniversidadSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    abreviacion:{
        type:String,
        required:true
    }
})

UniversidadSchema.index({nombre:'text'})

module.exports = mongoose.model('Universidad',UniversidadSchema,'universidad')