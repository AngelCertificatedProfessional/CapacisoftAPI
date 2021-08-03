const Curso = require('../models/Curso')
const mongoose = require('mongoose')
const Request = require('./requestController')

exports.createCurso =  async (req,res) =>{
    try{
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

// exports.actualizarInfoAcademico = async (req,res) => {
//     try{
//         const alumno = await Alumno.findOne({'_id':req.body._id});
//         console.log(req.body)
//         alumno.infoAcademico.universidadId = req.body.infoAcademico.universidadId;
//         alumno.infoAcademico.carrerId = req.body.infoAcademico.carrerId;
//         alumno.infoAcademico.matricula = req.body.infoAcademico.matricula;
//         alumno.infoAcademico.semestre = req.body.infoAcademico.semestre;
//         alumno.infoAcademico.cargaAcademica = req.body.infoAcademico.cargaAcademica;
//         alumno.infoAcademico.estadoAlumno = req.body.infoAcademico.estadoAlumno;

//         const resultado = await alumno.save();
//         return res.json({
//             message: 'Envio de alumnos',
//             data:resultado
//         });
//     }catch(error){
//         console.log(error)
//         res.status(500).json({
//             error: 'Algo salio mal',
//             data: error
//         });
//     }
// }

// exports.actualizarInfoContacto = async (req,res) => {
//     try{
//         const alumno = await Alumno.findOne({'_id':req.body._id});
//         console.log(req.body)
//         alumno.contacto.correo = req.body.contacto.correo;
//         alumno.contacto.github = req.body.contacto.github;
//         alumno.contacto.linkedIn = req.body.contacto.linkedIn;

//         const resultado = await alumno.save();
//         return res.json({
//             message: 'Envio de alumnos',
//             data:resultado
//         });
//     }catch(error){
//         console.log(error)
//         res.status(500).json({
//             error: 'Algo salio mal',
//             data: error
//         });
//     }
// }