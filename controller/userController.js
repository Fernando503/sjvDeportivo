'use strict'
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = require('../config/generalConfig')
const fecha = require('../utils')

const saveUser = async (req, res) => {
    try {
        const { body } = req
        const user = new userModel()
        user.username = body.usuario
        user.email = body.email
        user.password = body.password
        user.fullName = body.fullName
        user.rol = body.rol
        user.dateCreation = body.create
        const registro = await user.save()


        console.log('Registro creado: ' + registro)
        return res.status(200).json({ code: '00', message: "Usuario creado exitosamente" })

    } catch (err) {
        console.log(err)
        if (err.code == 11000) {
            var cadena = err.errmsg
            var termino = "email_1"
            var posicion = cadena.toLowerCase().indexOf(termino.toLowerCase());
            if (posicion !== -1)
                return res.status(500).json({ code: err.code, message: `El Correo electronico ingresado ya existe` })

            return res.status(500).json({ code: err.code, message: `El Usuario ingresado ya existe` })
        } else {
            return res.status(500).json({ code: 12000, message: `El tipo de usuario ingresado no es permitido` })
        }



        return res.status(500).json({ message: `Error al guardar usuario`, data: err.code })
    }
}

const LocalStrategy = require('passport-local').Strategy;

passport.use('local_login', new LocalStrategy({
        username: 'username',
        password: 'password'
    },
    (username, password, done) => {
        try {
            var fechaActual = ''
            userModel.findOne({ username: username, status: 'Activo' }, function callback(error, user) {
                if (!user)
                    return done(null, false, { message: 'Usuario no encontrado' });

                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        console.log('ERR: -> ' + err)
                    }
                    if (res) {
                        const payload = {
                            Usuario: {
                                email: user.email,
                                username: user.username,
                                permisos: user.rol,
                                picture: user.fullName,
                                UltimaSesion: user.lastLogin
                            }
                        }

                        const token = jwt.sign(payload, SECRET_TOKEN, {
                            expiresIn: 60 * 30
                        })

                        fechaActual = fecha.hoyFecha()
                        //console.log(fechaActual)
                        userModel.updateOne({ "_id": user._id }, { $set: { lastLogin: fechaActual } }, (err, todo) => {
                            // Handle any possible database errors
                            if (err) return done(null, false, { message: err });

                            return done(null, user, { message: 'Login exitoso', token: token });
                        })

                    } else {
                        return done(null, false, { message: 'Contraseña incorrecta' });
                    }
                })
            })
        } catch (error) {
            console.log(error)
            return done(null, false, { message: "Se produjo un error desconocido, contacte al Administrador" });
        }
    }
))



function getUsuarioByUsername(req, res) {
    userModel.findOne({ username: req.query.username }, function callback(error, user) {
        if (!user)
            return res.status(404).json({ message: "No se encontró el usuario" })

        const DatosUser = {
            usuario: user.username,
            email: user.email,
            fullName: user.fullName,
            rol: user.rol,
            UltimaSesion: user.lastLogin
        }

        return res.status(200).json({ code: '00', message: DatosUser })
    })
}

function getAllUsers(req, res) {
    userModel.find({ status: 'Activo' }, function(erros, users) {
        if (!users)
            return res.status(404).json({ message: "No se encontraron usuarios" })

        var lstUser = []
        users.forEach(function(currentValue, index, user) {
            const DatosUser = {
                usuario: user[index].username,
                email: user[index].email,
                fullName: user[index].fullName,
                rol: user[index].rol,
                UltimaSesion: user[index].lastLogin
            }
            lstUser.push(DatosUser)
        })
        return res.status(200).json({ code: '00', message: lstUser })
    })
}

function updateUser(req, res) {
    try {
        var per = req.decoded.Usuario.permisos
        switch (per) {
            case 'Administrador':
                userModel.updateOne({ username: req.body.username }, {
                    $set: {
                        fullName: req.body.fullName,
                        rol: req.body.rol,
                        status: req.body.status
                    }
                }, (err, updateResponse) => {
                    if (err)
                        return res.status(500).json({ code: '01', message: 'Error al actualizar datos del usuario' })

                    console.log(updateResponse)
                    return res.status(200).json({ code: '00', message: 'Se actualizarón los datos correctamente' })
                })
                break
            case 'AdminClient':
                userModel.updateOne({ username: req.body.username }, {
                    $set: {
                        fullName: req.body.fullName,
                        rol: req.body.rol,
                        status: req.body.status
                    }
                }, (err, updateResponse) => {
                    if (err)
                        return res.status(500).json({ code: '01', message: 'Error al actualizar datos del usuario' })

                    console.log(updateResponse)
                    return res.status(200).json({ code: '00', message: 'Se actualizarón los datos correctamente' })
                })
                break
            case 'Seguidor':
                userModel.updateOne({ username: req.body.username }, {
                    $set: {
                        fullName: req.body.fullName
                    }
                }, (err, updateResponse) => {
                    if (err)
                        return res.status(500).json({ code: '01', message: 'Error al actualizar datos del usuario' })

                    console.log(updateResponse)
                    return res.status(200).json({ code: '00', message: 'Se actualizarón los datos correctamente' })
                })
                break
            case 'Usuario':
                userModel.updateOne({ username: req.body.username }, {
                    $set: {
                        fullName: req.body.fullName
                    }
                }, (err, updateResponse) => {
                    if (err)
                        return res.status(500).json({ code: '01', message: 'Error al actualizar datos del usuario' })

                    console.log(updateResponse)
                    return res.status(200).json({ code: '00', message: 'Se actualizarón los datos correctamente' })
                })
                break
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Error al Actualizar usuario' })
    }
}

function deleteUser(req, res) {
    try {
        var per = req.decoded.Usuario.permisos
        if (per == 'Administrador') {
            userModel.updateOne({ username: req.body.username }, { $set: { status: 'Desactivado' } }, (err, todo) => {
                if (err)
                    return res.status(500).json({ code: '01', message: `Error al Eliminar el usuario: ${req.body.username}` })

                return res.status(200).json({ code: '00', message: 'Usuario eliminado correctamente' })
            })
        } else {
            return res.status(401).json({ code: '401', message: 'No posees autorización para realizar la acción' })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Error al Eliminar usuario' })
    }
}

module.exports = {
    saveUser,
    getUsuarioByUsername,
    getAllUsers,
    updateUser,
    deleteUser
}