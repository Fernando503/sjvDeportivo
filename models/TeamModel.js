'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fecha = require('../utils')

const TeamSchema = Schema({
	teamName: { type: String, unique: true,  required: true },
	representante: { type: String, required: true },
	category: { type: String, enum: ['Futbol','Futbol Sala','Volleyball','Basketball'] },
	jornada: { type: String, required: true },
	players: Schema.Types.Mixed,
	avatar: { type: String },
	dateCreation: [{
		creation: { type: Date, default: fecha.hoyFecha() },
		createBy: { type: String }
	}],
	status: { type: String, default: "Activo" }
})

module.exports = mongoose.model('Team', TeamSchema)