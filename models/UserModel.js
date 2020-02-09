'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = Schema({
	username: { type: String, unique: true,  required: true},
	email: { type: String, unique: true, lowercase: true },
	password: { type: String },
	fullName: { type: String },
	rol: { type: String, enum: ['Administrador', 'AdminClient', 'Seguidor','Usuario'] },
	dateCreation: [{
		creation: { type: Date, default: Date.now() },
		createBy: { type: String }
	}],
	status: { type: String, default: "Activo" },
	lastLogin: Date
})

const saltRounds = 512;

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    next()
})


module.exports = mongoose.model('User', UserSchema)