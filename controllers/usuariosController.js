const Usuario = require('../models/Usuario')
const Request = require('./requestController')
const bcrypt = require('bcrypt-nodejs')

exports.createUsuario =  async (req,res) =>{
    try{
        if((await validaUsuario(req.body.usuario)) > 0) {
            throw 'El usuario ya existe'
        }

        const usuario = new Usuario(req.body)
        //Hasheamos el password
        usuario.contrasena = bcrypt.hashSync(usuario.contrasena,bcrypt.genSaltSync(10));
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
        const resultado = await Usuario.aggregate([
            {
                $lookup:
                    {
                    from: "tipoUsuario",
                    localField: "tipoUsuario",
                    foreignField: "codigo",
                    as: "tipoUsuarios"
                    }
            },
            {
                $unwind:'$tipoUsuarios'
            }
            ,{
                $project:{
                    usuario:1,
                    tipoUsuario:"$tipoUsuarios.tipoUsuario"
                }
            }
        ]    
        )
        
        
        
        Usuario.find({},{'usuario':1,'nombre':1,'tipoUsuario':1});
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

        if((await validaUsuario(req.body.usuario,req.body._id)) > 0) {
            throw 'El usuario ya existe'
        }
        const usuario = await Usuario.findOne({'_id':req.body._id});
        usuario.usuario = req.body.usuario;
        usuario.contrasena = req.body.contrasena;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.tipoUsuario = req.body.tipoUsuario;
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

const validaUsuario = async (usuario,nId) => {

    if(nId === undefined){
        return (await Usuario.countDocuments({'usuario':usuario}));
    }else{
        return (await Usuario.countDocuments({'usuario':usuario,'_id':{'$ne':nId}}));
    }

}