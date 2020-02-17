'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fecha = require('../utils')

const JornadaSchema = Schema({
	fechaJornada: { type: String },
	vuelta: String,
	partido: Schema.Types.Mixed,
	fechaJuego: { type: Date, default: null },
	cat: String,
	estado: { type: String, default: 'Pendiente' },
	status: { type: String, default: 'Activo' }
})

module.exports = mongoose.model('Jornada', JornadaSchema)


