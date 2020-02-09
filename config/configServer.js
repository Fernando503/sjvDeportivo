'use strict'
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const rutas = require('../rutas/rutas')
const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/API', rutas)

module.exports = app
