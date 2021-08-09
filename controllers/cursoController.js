const Curso = require('../models/Curso')
const mongoose = require('mongoose')
const Request = require('./requestController')
const Usuarios = require('./usuariosController')

exports.createCurso =  async (req,res) =>{
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const curso = new Curso(req.body)
        const resultado = await curso.save();
        Request.crearRequest('createCurso',JSON.stringify(req.body),200);
        return res.json({
            message: 'El curso fue creada exitosamente',
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

exports.listadoCursos = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Curso.aggregate([
            {
                $project:{
                    nombreCurso:1,
                    proveedorDesc: {
                        $switch: {
                            branches: [
                                { case: {$eq: ['$proveedor', 1]}, then: 'Udemy' },
                                { case: {$eq: ['$proveedor', 2]}, then: 'Coursera' },
                                { case: {$eq: ['$proveedor', 3]}, then: 'Platzi' },
                                { case: {$eq: ['$proveedor', 4]}, then: 'Otros' }
                                ],
                            default: ''
                        }
                    }
                }
        }])
        return res.json({
            message: 'Envio de cursos',
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

exports.getCursobyId = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const resultado = await Curso.aggregate([
            {
                $match:{
                    '_id':new mongoose.Types.ObjectId(req.params._id)
                }
            },
            {
                $project:{
                    _id:1,
                    nombreCurso:1,
                    proveedor:1,
                    nombreInstructor:1,
                    descripcion:1,
                    detalleCurso:1,
                    temaCurso:1,
                    creado:1,
                    proveedorDesc: {
                        $switch: {
                            branches: [
                                { case: {$eq: ['$proveedor', 1]}, then: 'Udemy' },
                                { case: {$eq: ['$proveedor', 2]}, then: 'Coursera' },
                                { case: {$eq: ['$proveedor', 3]}, then: 'Platzi' },
                                { case: {$eq: ['$proveedor', 4]}, then: 'Otros' }
                                ],
                            default: ''
                        }
                    }
                }
            }
        ]    
        )

        return res.json({
            message: 'Envio de Alumnos',
            data:resultado[0]
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: 'Algo salio mal',
            data: error
        });
    }
}

exports.actualizarCurso = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const curso = await Curso.findOne({'_id':req.body._id});
        curso.nombreCurso = req.body.nombreCurso;
        curso.proveedor = req.body.proveedor;
        curso.nombreInstructor = req.body.nombreInstructor;
        curso.descripcion = req.body.descripcion;
        const resultado = await curso.save();
        return res.json({
            message: 'Envio de cursos',
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

exports.actualizarDetalleCurso = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const curso = await Curso.findOne({'_id':req.body._id});
        console.log(req.body)
        curso.detalleCurso.urlCurso = req.body.detalleCurso.urlCurso;
        curso.detalleCurso.precio = req.body.detalleCurso.precio;
        curso.detalleCurso.horas = req.body.detalleCurso.horas;
        curso.detalleCurso.proveeCertificado = req.body.detalleCurso.proveeCertificado;
        curso.detalleCurso.herramientas = req.body.detalleCurso.herramientas;

        const resultado = await curso.save();
        return res.json({
            message: 'Envio de Cursos',
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

exports.actualizarTemaCurso = async (req,res) => {
    try{
        if(!await Usuarios.validaSesionUsuario(req.headers.authorization)){
            throw "El usuario no tiene derecho a utilizar este metodo"
        }
        const curso = await Curso.findOne({'_id':req.body._id});
        console.log(req.body)
        curso.temaCurso = req.body.temaCurso;

        const resultado = await curso.save();
        return res.json({
            message: 'Envio de cursos',
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