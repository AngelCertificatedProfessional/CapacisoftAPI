const express = require('express');
//crear una app de express
const app = express();

const universidad = require('./routes/Universidades');
const carrera = require('./routes/Carreras');
const temaCurso = require('./routes/TemaCurso');


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

//ruta para el home
app.listen(3000,function(){
    console.log(`Listening http://localhost:3000`);
});

