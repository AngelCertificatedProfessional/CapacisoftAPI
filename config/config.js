require('dotenv').config()

const config = {
    bdMongo: process.env.DB_MONGO || '',
    generareRequest: process.env.GENERARREQUEST || false,
    port: process.env.PORT || 3000
};

module.exports = { config };