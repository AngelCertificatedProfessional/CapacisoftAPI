const Request = require('../models/Request')
require('dotenv').config({path:'.env'});

exports.crearRequest = async(proceso,req,estatus) =>{
    console.log(process.env.GENERARREQUEST)
    if(process.env.GENERARREQUEST === 'true'){
        try{
            let body = {
                proceso:proceso,
                estatus:estatus,
                request:req
            }
            const request = new Request(body)
            await request.save();
        }catch(error){
            console.log(error)
        }
    }


}