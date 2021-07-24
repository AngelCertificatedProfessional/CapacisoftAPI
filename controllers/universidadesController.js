const Universidad = require('../models/Universidad')

exports.createUniversidad =  async (req,res) =>{
    try{
        const universidad = new Universidad(req.body)
        const resultado = await universidad.save();
        return res.json({
            message: 'La universidad fue creada exitosamente',
            data:resultado
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoUniversidades = async (req,res) => {
    try{
        const resultado = await Universidad.find({},{'nombre':1,'abreviacion':1});
        return res.json({
            message: 'Envio de universidades',
            data:resultado
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getUniversidadbyId = async (req,res) => {
    try{
        const resultado = await Universidad.findOne({'_id':req.params._id});
        return res.json({
            message: 'Envio de universidad',
            data:resultado
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarUniversidad = async (req,res) => {
    try{
        const universidad = await Universidad.findOne({'_id':req.body._id});
        universidad.nombre = req.body.nombre;
        universidad.abreviacion = req.body.abreviacion;
        const resultado = await universidad.save();
        return res.json({
            message: 'Envio de universidad',
            data:resultado
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}