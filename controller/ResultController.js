'use strict'
const resultModel = require('../models/ResultModel')
const fecha = require('../utils')

const saveResult = async(req,res) =>{
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al guardar el resultado' })
	}
}

function getAllResultados(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener los resultados' })
	}
}

function getTablaPosiciones(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener datos de tabla de posiciones' })
	}
}

function getResultByGame(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener resultado' })
	}
}

function getResultByJornadaAndFecha(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener resultado' })
	}
}

function expResultByCat(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener resultado' })
	}
}

function getEstadisticas(req,res){
	try{

	}catch(err){
		console.log(err)
		return res.status(500).json({ code:'01', message:'Algo salio mal, al obtener estadisticas' })
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