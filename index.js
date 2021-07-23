const express = require('express');
//crear una app de express
const app = express();

const universidad = require('./routes/Universidades');

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

//ruta para el home
app.listen(3000,function(){
    console.log(`Listening http://localhost:3000`);
});

