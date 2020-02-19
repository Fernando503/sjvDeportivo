'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fecha = require('../utils')

const ResultadoSchema = Schema({
	
	dateCreation: [{
		creation: { type: Date, default: fecha.hoyFecha() },
		createBy: { type: String }
	}],
	status: { type: String, default: "Activo" }
})

module.exports = mongoose.model('Result', ResultadoSchema)