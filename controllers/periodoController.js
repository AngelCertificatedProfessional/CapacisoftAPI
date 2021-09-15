const Periodo = require('../models/Periodo')
const Request = require('./requestController')
const Usuarios = require('./usuariosController')

exports.createPeriodo =  async (req,res) =>{
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const periodo = new Periodo(req.body)
        const resultado = await periodo.save();
        Request.crearRequest('createPeriodo',JSON.stringify(req.body),200);
        return res.json({
            message: 'El periodo fue creado exitosamente',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('createPeriodo',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoPeriodo= async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Periodo.find({},{'periodo':1});
        Request.crearRequest('listadoPeriodo','',200);
        return res.json({
            message: 'Envio de periodos',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('listadoPeriodo','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getPeriodobyId = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Periodo.findOne({'_id':req.params._id});
        Request.crearRequest('getPeriodobyId',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de universidad',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('getPeriodobyId',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarPeriodo = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const periodo = await Periodo.findOne({'_id':req.body._id});
        periodo.periodo = req.body.periodo;
        periodo.fechaInicio = req.body.fechaInicio;
        periodo.fechaFinal = req.body.fechaFinal;
        periodo.alumnos = req.body.alumnos;
        const resultado = await periodo.save();
        Request.crearRequest('actualizarPeriodo',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de periodo',
            data:resultado
        });
    }catch(error){
        console.log(error)
        Request.crearRequest('actualizarPeriodo',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoAlumnosByPeriodo= async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Periodo.findOne({'_id':req.params._id});
        // const resultado = await Periodo.find({},{'periodo':1});
        Request.crearRequest('listadoPeriodo','',200);
        return res.json({
            message: 'Envio de periodos',
            data:resultado.alumnos
        });
    }catch(error){
        Request.crearRequest('listadoPeriodo','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoBajasByPeriodo= async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }

        const resultado = await Periodo.aggregate([
                { 
                    "$unwind": "$alumnos" 
                },
                {
                    '$match':{
                        'alumnos.alumnoBaja':true
                    }
                },
                {
                    '$project':{
                        'alumnos':1
                    }
                },
                {
                    '$group': {
                        _id: {
                            '$month': '$alumnos.fechaBaja'
                        }, 
                        'alumnos': {
                            '$sum': 1
                        } 
                    }
                },
                {
                    '$sort':{
                        _id:1
                     }
                }
            ])
        Request.crearRequest('listadoBajasByPeriodo','',200);
        return res.json({
            message: 'Envio de periodos',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('listadoBajasByPeriodo','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}