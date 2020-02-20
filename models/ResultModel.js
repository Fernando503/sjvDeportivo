'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fecha = require('../utils')

const ResultadoSchema = Schema({
	jornada: String,
	fecha: Date,
	categoria: String,
	equipoA: [{
		tarjetas: Schema.Types.Mixed,
		resultado: Number,
		goleadores: Schema.Types.Mixed,
		status: String
	}],
	equipoB: [{
		tarjetas: Schema.Types.Mixed,
		resultado: Number,
		goleadores: Schema.Types.Mixed,
		status: String
	}],
	dateCreation: [{
		creation: { type: Date, default: fecha.hoyFecha() },
		createBy: { type: String }
	}],
	status: { type: String, default: "Activo" }
})

module.exports = mongoose.model('Result', ResultadoSchema)