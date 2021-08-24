const Actualizacion = require('../models/Actualizacion')
const Usuarios = require('./usuariosController')

exports.createActualizacion =  async (req,res) =>{
    try{
        const actualizacion = new Actualizacion(req.body)
        const resultado = await actualizacion.save();
        return res.json({
            message: 'La actualizacion fue creada exitosamente',
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

exports.listadoActualizacion = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Actualizacion.find({},{'version':1,'tarea':1,'descripcion':1});
        return res.json({
            message: 'Envio de actualizacones',
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