const Universidad = require('../models/Universidad')

exports.createUniversidad =  async (req,res) =>{
    try{
        const universidad = new Universidad(req.body)
        const resultado = await universidad.save();
        return res.json({
            message: 'La universidad fue creada exitosamente',
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