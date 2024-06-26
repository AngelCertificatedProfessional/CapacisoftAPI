const express = require('express');
const config = require('./config/config')
//crear una app de express
const app = express();

const universidad = require('./routes/Universidades');
const carrera = require('./routes/Carreras');
const temaCurso = require('./routes/TemaCurso');
const usuario = require('./routes/Usuario');
const alumnos = require('./routes/Alumnos');
const cursos = require('./routes/Cursos');
const periodo = require('./routes/Periodo');
const programarCurso = require('./routes/ProgramarCurso');
const actualizacion = require('./routes/Actualizacion');
//Crear la conexion a la BD
const conectarDB = require('./config/db');

var cors = require('cors')
app.use(cors())
conectarDB();
//habilitar body parser para ller datos del formulario
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
/* Seccion para las rutas*/
app.use('/api/universidad',universidad());
app.use('/api/carrera',carrera());
app.use('/api/temaCurso',temaCurso());
app.use('/api/usuario',usuario());
app.use('/api/alumno',alumnos());
app.use('/api/curso',cursos());
app.use('/api/periodo',periodo());
app.use('/api/programarCurso',programarCurso());
app.use('/api/actualizacion',actualizacion());

//ruta para el home
app.listen(config.config.port,err => {
    if (err) {
      console.error("Error: ", err);
      return;
    }
    console.log(`Listening http://localhost:${config.config.port}`);
});

