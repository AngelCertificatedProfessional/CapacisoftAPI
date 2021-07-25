const TemaCurso = require('../models/TemaCurso')
const Request = require('./requestController')

exports.createTemaCurso =  async (req,res) =>{
    try{
        const temaCurso = new TemaCurso(req.body)
        const resultado = await temaCurso.save();
        Request.crearRequest('createTemaCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'El tema fue creado exitosamente',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('createTemaCurso',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoTemaCurso = async (req,res) => {
    try{
        const resultado = await TemaCurso.find({},{'temaCurso':1});
        Request.crearRequest('listadoTemaCurso','',200);
        return res.json({
            message: 'Envio de temas de cursos',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('listadoTemaCurso','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getTemaCursobyId = async (req,res) => {
    try{
        const resultado = await TemaCurso.findOne({'_id':req.params._id});
        Request.crearRequest('getTemaCursobyId',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de universidad',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('getTemaCursobyId',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarTemaCurso = async (req,res) => {
    try{
        const temaCurso = await TemaCurso.findOne({'_id':req.body._id});
        temaCurso.temaCurso = req.body.temaCurso;
        const resultado = await temaCurso.save();
        Request.crearRequest('actualizarTemaCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de temaCurso',
            data:resultado
        });
    }catch(error){
        console.log(error)
        Request.crearRequest('actualizarTemaCurso',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}