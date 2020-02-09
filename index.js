'use strict'
const app = require('./config/configServer')
const config = require('./config/generalConfig')
const mongoose = require('mongoose')

mongoose.connect(config.db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar con la base de datos: ${err}`)
    }
    console.log('Conexión establecida con MongoDB')
})


app.listen(config.port, ()=>{
	console.log(`Running in http://localhost:${config.port}`)
})