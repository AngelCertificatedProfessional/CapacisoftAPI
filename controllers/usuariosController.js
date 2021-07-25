const Usuario = require('../models/Usuario')
const Request = require('./requestController')

exports.createUsuario =  async (req,res) =>{
    try{
        const usuario = new Usuario(req.body)
        const resultado = await usuario.save();
        Request.crearRequest('createUsuario',JSON.stringify(req.body),200);
        return res.json({
            message: 'El usuario fue creado exitosamente',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('createUsuario',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoUsuario = async (req,res) => {
    try{
        const resultado = await Usuario.find({},{'usuario':1});
        Request.crearRequest('listadoUsuario','',200);
        return res.json({
            message: 'Envio de curso de cursos',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('listadoUsuario','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getUsuariobyId = async (req,res) => {
    try{
        const resultado = await Usuario.findOne({'_id':req.params._id});
        Request.crearRequest('getUsuariobyId',JSON.stringify(req.params._id),200);
        return res.json({
            message: 'Envio de universidad',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('getUsuariobyId',JSON.stringify(req.params._id),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarUsuario = async (req,res) => {
    try{
        const usuario = await Usuario.findOne({'_id':req.body._id});
        usuario.usuario = req.body.usuario;
        usuario.contrasena = req.body.contrasena;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        const resultado = await usuario.save();
        Request.crearRequest('actualizarUsuario',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de temaCurso',
            data:resultado
        });
    }catch(error){
        console.log(error)
        Request.crearRequest('actualizarUsuario',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}