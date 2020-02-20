'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fecha = require('../utils')

const ResultadoSchema = Schema({
	jornada: String,
	fecha: String,
	categoria: String,
	equipoA: [{
		nombre: String,
		tarjetas: Schema.Types.Mixed,
		resultado: Schema.Types.Mixed,
		goleadores: Schema.Types.Mixed,
		status: String
	}],
	equipoB: [{
		nombre: String,
		tarjetas: Schema.Types.Mixed,
		resultado: Schema.Types.Mixed,
		goleadores: Schema.Types.Mixed,
		status: String
	}],
	dateCreation: [{
		creation: { type: Date, default: fecha.hoyFecha() },
		createBy: { type: String }
	}],
	estado: { type: String },
	status: { type: String, default: "Activo" }
})

module.exports = mongoose.model('Result', ResultadoSchema)