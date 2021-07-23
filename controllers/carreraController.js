const Carrera = require('../models/Carrera')

exports.createCarrera =  async (req,res) =>{
    try{
        const carrera = new Carrera(req.body)
        const resultado = await carrera.save();
        return res.json({
            message: 'La carrera fue creada exitosamente',
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

exports.listadoCarreras = async (req,res) => {
    try{
        const resultado = await Carrera.find({});
        return res.json({
            message: 'Envio de carreras',
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

exports.getCarrerabyId = async (req,res) => {
    try{
        const resultado = await Carrera.findOne({'_id':req.params._id});
        return res.json({
            message: 'Envio de carreras',
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

exports.actualizarCarrera = async (req,res) => {
    try{
        const carrera = await Carrera.findOne({'_id':req.body._id});
        carrera.nombreCarrera = req.body.nombreCarrera;
        carrera.nombreCoordinador = req.body.nombreCoordinador;
        carrera.apellidoCoordinador = req.body.apellidoCoordinador;
        carrera.cantidadSemestres = req.body.cantidadSemestres;
        const resultado = await carrera.save();
        return res.json({
            message: 'Envio de carrera',
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