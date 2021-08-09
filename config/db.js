const mongoose = require('mongoose')
require('dotenv').config({ path: 'DB_MONGO' })

const conectarDB = async () => {
    try{
        console.log(process.env.DB_MONGO);
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });
        console.log('BD Conectada');
    }catch(error){
        console.log('Hubo un error');
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB;