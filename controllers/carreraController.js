const Carrera = require('../models/Carrera')
const Request = require('./requestController')
const Usuarios = require('./usuariosController')

exports.createCarrera =  async (req,res) =>{
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const carrera = new Carrera(req.body)
        const resultado = await carrera.save();
        Request.crearRequest('createCarrera',JSON.stringify(req.body),200);
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
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Carrera.aggregate([
            {
                $project:{
                    nombreCarrera:1,
                    nombreCompletoCoordinador:{ $concat: [ '$nombreCoordinador',' ', '$apellidoCoordinador' ] }
                }
            }
        ]    
        )
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
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
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
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
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