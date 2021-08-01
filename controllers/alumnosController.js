const Alumno = require('../models/Alumno')
const mongoose = require('mongoose')
const Request = require('./requestController')

exports.createAlumno =  async (req,res) =>{
    try{
        const alumnos = new Alumno(req.body)
        const resultado = await alumnos.save();
        Request.crearRequest('createAlumnos',JSON.stringify(req.body),200);
        return res.json({
            message: 'El alumno fue creada exitosamente',
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

exports.listadoAlunnos = async (req,res) => {
    try{
        const resultado = await Alumno.aggregate([
            {
                $project:{
                    matricula:"$infoAcademico.matricula",
                    nombreCompletoAlumno:{ $concat: [ '$nombreAlumno',' ', '$apellidoAlumno' ] }
                }
            }
        ]    
        )
        return res.json({
            message: 'Envio de alumnos',
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

exports.getAlunnosbyId = async (req,res) => {
    try{
        const resultado = await Alumno.aggregate([
            {
                $match:{
                    '_id':new mongoose.Types.ObjectId(req.params._id)
                }
            },
            {
                $lookup:
                {
                    from: "universidad",
                    localField: "infoAcademico.universidadId",
                    foreignField: "_id",
                    as: "universidades"
                }
            },
            {
                $unwind:'$universidades'
            },
            {
                $lookup:
                {
                    from: "carrera",
                    localField: "infoAcademico.carrerId",
                    foreignField: "_id",
                    as: "carreras"
                }
            },
            {
                        $unwind:'$carreras'
            }
            ,{
                $project:{
                    _id:1,
                    creado:1,
                    nombreAlumno:1,
                    apellidoAlumno:1,
                    edad:1,
                    contacto:1,
                    infoAcademico:1,
                    nombreUniversidad:'$universidades.nombre',
                    nombreCarrera:'$carreras.nombreCarrera',
                    estadoAlumno: {
                        $switch: {
                           branches: [
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 1]}, then: 'Alumno' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 2]}, then: 'Alumno/Trabajador' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 3]}, then: 'Alumno/Servicio Social' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 4]}, then: 'Alumno/Servicio Social Segunda Etapa' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 5]}, then: 'Alumno/Practicas Profesinales' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 6]}, then: 'Alumno/Proyecto de vinculación' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 7]}, then: 'Alumno/Otros Proyectos' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 8]}, then: 'Trabajador' },
                              { case: {$eq: ['$infoAcademico.estadoAlumno', 9]}, then: 'Desempleado' },
                              
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

exports.actualizarAlumno = async (req,res) => {
    try{
        const alumno = await Alumno.findOne({'_id':req.body._id});
        alumno.nombreAlumno = req.body.nombreAlumno;
        alumno.apellidoAlumno = req.body.apellidoAlumno;
        alumno.edad = req.body.edad;
        const resultado = await alumno.save();
        return res.json({
            message: 'Envio de alumnos',
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

exports.actualizarInfoAcademico = async (req,res) => {
    try{
        const alumno = await Alumno.findOne({'_id':req.body._id});
        console.log(req.body)
        alumno.infoAcademico.universidadId = req.body.infoAcademico.universidadId;
        alumno.infoAcademico.carrerId = req.body.infoAcademico.carrerId;
        alumno.infoAcademico.matricula = req.body.infoAcademico.matricula;
        alumno.infoAcademico.semestre = req.body.infoAcademico.semestre;
        alumno.infoAcademico.cargaAcademica = req.body.infoAcademico.cargaAcademica;
        alumno.infoAcademico.estadoAlumno = req.body.infoAcademico.estadoAlumno;

        const resultado = await alumno.save();
        return res.json({
            message: 'Envio de alumnos',
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

exports.actualizarInfoContacto = async (req,res) => {
    try{
        const alumno = await Alumno.findOne({'_id':req.body._id});
        console.log(req.body)
        alumno.contacto.correo = req.body.contacto.correo;
        alumno.contacto.github = req.body.contacto.github;
        alumno.contacto.linkedIn = req.body.contacto.linkedIn;

        const resultado = await alumno.save();
        return res.json({
            message: 'Envio de alumnos',
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