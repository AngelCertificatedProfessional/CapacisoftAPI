require('dotenv').config()

const config = {
    bdMongo: process.env.DB_MONGO || '',
    generareRequest: process.env.GENERARREQUEST || false,
};

module.exports = { config };