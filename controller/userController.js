'use strict'
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const passport = require('passport')
const fecha = require('../utils')

const saveUser = async (req,res)=>{
	try{
		const { body } = req
		const user = new userModel()
		user.username 			= body.usuario
		user.email    			= body.email
		user.password			= body.password
		user.fullName			= body.fullName
		user.rol				= body.rol
		user.dateCreation		= body.create
		const registro 			= await user.save()


		console.log('Registro creado: '+ registro)
		return res.status(200).json({message: "Usuario creado exitosamente"})

	}catch(err){
		console.log(err)
		return res.status(500).json({message: `Error al guardar usuario`, data:err})
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
            userModel.findOne({ username: username }, function callback(error, user) {
                if (!user)
                    return done(null, false, { message: 'Usuario no encontrado' });

                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        console.log('ERR: -> ' + err)
                    }
                    if (res) {
                       
                        fechaActual = fecha.hoyFecha()
                        //console.log(fechaActual)
                        userModel.updateOne({ "_id": user._id }, { $set: { lastLogin: fechaActual } }, (err, todo) => {
                            // Handle any possible database errors
                            if (err) return done(null, false, { message: err });

                            return done(null, user, { message: 'Login exitoso'});
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



function getUsuarioByUsername(req,res){
	userModel.findOne({username: req.query.username}, function callback(error, user){
		if (!user)
			return res.status(404).json({message: "No se encontró el usuario"})

		const DatosUser = {
				usuario 		: user.username,
				email			: user.email,
				fullName		: user.fullName,
				rol				: user.rol,
				UltimaSesion 	: user.lastLogin
			}

		return res.status(200).json({message: DatosUser})
	})
}

module.exports = {
	saveUser,
	getUsuarioByUsername
}