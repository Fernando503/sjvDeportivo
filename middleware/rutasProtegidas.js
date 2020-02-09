'use strict'
const { SECRET_TOKEN } = require('../config/generalConfig')
const jwt = require('jsonwebtoken')
const vJWT = (req, res, next) => {
    const token = req.headers['token'];
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    if (token) {
        jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
            if (err) {
                console.log('Token no autorizado. [IP: '+ip+'], ['+req.url+']')
                return res.status(401).json({ mensaje: 'No tienes autorización, token invalido' })
            } else {
                console.log('Token valido. [IP: '+ip+'], ['+req.url+']')
                req.decoded = decoded
                next()
            }
        })
    } else {
        console.log('Token no proporcionado. [IP: '+ip+'], ['+req.url+']')
        res.status(401).send({
            mensaje: 'No se proporciono token'
        })
    }
}

module.exports = { vJWT }