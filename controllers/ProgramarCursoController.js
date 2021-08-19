const ProgramarCurso = require('../models/ProgramarCurso')
const Request = require('./requestController')
const Usuarios = require('./usuariosController')
const mongoose = require('mongoose')

exports.createProgramarCurso=  async (req,res) =>{
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const programarCurso = new ProgramarCurso(req.body)
        const resultado = await programarCurso.save();
        Request.crearRequest('createProgramarCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'El programar del curso fue creado exitosamente',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('createProgramarCurso',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.listadoProgramarCurso= async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }

        const resultado = await ProgramarCurso.aggregate([
            {
                $lookup:
                {
                    from: "curso",
                    localField: "cursoId",
                    foreignField: "_id",
                    as: "cursos"
                }
            },
            {
                $unwind:'$cursos'
            },
            {
                $lookup:
                {
                    from: "periodo",
                    localField: "periodoId",
                    foreignField: "_id",
                    as: "periodos"
                }
            },
            {
                $unwind:'$periodos'
            },
            {
                $project:{
                    _id:1,
                    cursoNombre:'$cursos.nombreCurso',
                    periodoNombre:'$periodos.periodo'
                }
            }
        ]    
        )

        Request.crearRequest('listadoProgramarCurso','',200);
        return res.json({
            message: 'Envio de periodos',
            data:resultado
        });
    }catch(error){
        Request.crearRequest('listadoProgramarCurso','',500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getProgramarCursobyId = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await ProgramarCurso.aggregate([
            {
                $match:{
                    '_id':new mongoose.Types.ObjectId(req.params._id)
                }
            },
            {
                $lookup:
                {
                    from: "curso",
                    localField: "cursoId",
                    foreignField: "_id",
                    as: "cursos"
                }
            },
            {
                $unwind:'$cursos'
            },
            {
                $lookup:
                {
                    from: "periodo",
                    localField: "periodoId",
                    foreignField: "_id",
                    as: "periodos"
                }
            },
            {
                $unwind:'$periodos'
            },
            {
                $project:{
                    _id:1,
                    cursoId:1,
                    fechaInicioCurso:1,
                    periodoId:1,
                    tipoCurso:1,
                    precioFinal:1,
                    alumnos:1,
                    creado:1,
                    tipoCursoDes: {
                        $switch: {
                            branches: [
                                { case: {$eq: ['$tipoCurso', 1]}, then: 'Teorico' },
                                { case: {$eq: ['$tipoCurso', 2]}, then: 'Practico' },
                                { case: {$eq: ['$tipoCurso', 3]}, then: 'Teorico y Practico' }
                                ],
                            default: ''
                        }
                    },
                    cursoNombre:'$cursos.nombreCurso',
                    periodoNombre:'$periodos.periodo'
                }
            }
        ]    
        )
        Request.crearRequest('getProgramarCursobyId',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de curso programado',
            data:resultado[0]
        });
    }catch(error){
        Request.crearRequest('getProgramarCursobyId',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarProgramarCurso = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const programarCurso = await ProgramarCurso.findOne({'_id':req.body._id});
        programarCurso.alumnos = req.body.alumnos;
        programarCurso.cursoId = req.body.cursoId;
        programarCurso.fechaInicioCurso = req.body.fechaInicioCurso;
        programarCurso.periodoId = req.body.periodoId;
        programarCurso.tipoCurso = req.body.tipoCurso;
        programarCurso.precioFinal = req.body.precioFinal;
        const resultado = await programarCurso.save();
        Request.crearRequest('actualizarProgramarCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de periodo',
            data:resultado
        });
    }catch(error){
        console.log(error)
        Request.crearRequest('actualizarProgramarCurso',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.getAlumnoByProgramarCurso = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await ProgramarCurso.aggregate([
            {
                $unwind : "$alumnos"
            },
            {
                $match:{
                    '_id':new mongoose.Types.ObjectId(req.params._id),
                    "alumnos._id": req.params._idAlumno
                }
            },
            {
                $project:{
                    _id:1,
                    alumnos:1
                }
            }
        ]    
        )
        Request.crearRequest('getAlumnoByProgramarCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'Envio de curso programado',
            data:resultado[0]
        });
    }catch(error){
        Request.crearRequest('getAlumnoByProgramarCurso',JSON.stringify(req.body),500,error);
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}