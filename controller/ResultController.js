'use strict'
const resultModel = require('../models/ResultModel')
const fecha = require('../utils')

const saveResult = async (req, res) => {
    try {
        var user = req.decoded.Usuario.username
        const { body } = req
        const resu = new resultModel()
        resu.jornada = body.jornada
        resu.fecha = body.fecha
        resu.categoria = body.categoria
        resu.equipoA = {
            nombre: body.EquipoA.nombre,
            tarjetas: body.EquipoA.tarjetas,
            resultado: body.EquipoA.resultado,
            goleadores: body.EquipoA.goleadores,
            status: body.EquipoA.status
        }
        resu.equipoB = {
            nombre: body.EquipoB.nombre,
            tarjetas: body.EquipoB.tarjetas,
            resultado: body.EquipoB.resultado,
            goleadores: body.EquipoB.goleadores,
            status: body.EquipoB.status
        }
        resu.status = body.status
        resu.dateCreation = { createBy: user }
        const regResult = await resu.save()

        console.log('Registro creado {Resultado}: OK')
        return res.status(200).json({ code: '00', message: "Resultado creado exitosamente" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al guardar el resultado' })
    }
}

function getAllResultados(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener los resultados' })
    }
}

function getTablaPosiciones(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener datos de tabla de posiciones' })
    }
}

function getResultByGame(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener resultado' })
    }
}

function getResultByJornadaAndFecha(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener resultado' })
    }
}

function expResultByCat(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener resultado' })
    }
}

function getEstadisticas(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Algo salio mal, al obtener estadisticas' })
    }
}


module.exports = {
    saveResult,
    getAllResultados,
    getTablaPosiciones,
    getResultByGame,
    getResultByJornadaAndFecha,
    expResultByCat,
    getEstadisticas
}