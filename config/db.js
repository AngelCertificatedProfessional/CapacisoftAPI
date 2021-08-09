const mongoose = require('mongoose')
const config = require('./config')


const conectarDB = async () => {
    try{
        await mongoose.connect(config.config.bdMongo,{
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