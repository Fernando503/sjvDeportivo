'use strict'
const teamModel = require('../models/TeamModel')
const jornadaModel = require('../models/JornadaModel')
const fecha = require('../utils')

const createJornada = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al crear la jornada' })
    }
}

function getAllJornadas(req, res) {
    try {
    	jornadaModel.findOne({}, function callback(err, jor){
    		if(jor)
    			return res.status(404).json({ code:'404', message: 'No se encontrarón jornadas' })
    	
    	})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al obtener las jornadas' })
    }
}

function getListOfJornadas(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al obtener listas de nombres de jornadas' })
    }
}

function finalizarJornada(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al finalizar la jornada' })
    }
}

module.exports = {
    createJornada,
    getAllJornadas,
    getListOfJornadas,
    finalizarJornada
}