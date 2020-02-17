'use strict'
const express = require('express')
const routers = express.Router()
const userController = require('../controller/userController')
const equipoController = require('../controller/equipoController')
const jornadaController = require('../controller/jornadaController')
const passport = require('passport')
const secury = require('../middleware/rutasProtegidas')

routers.get('/', (req, res) => {
    res.status(200).send('<h1><center>SJV Deportes</center></h1>')
})

routers.post('/auth', (req, res, next) => {

    passport.authenticate('local_login', { session: false },
        (err, user, info) => {
            //INICIA UNA VARIABLE DE SESION PARA EL LOGIN, PERO EN ESTE CASO CREAEL JWT
            req.login(user, { session: false }, err => {
                if (err) res.status(401).json({ message: 'Fallo en inicio de sesion' });
                if (!user)
                    return res.status(401).json({ message: info.message })
                else
                    return res.status(200).json({ code: '00', message: 'inicio de sesion exitoso', token: info.token });
            });
        })(req, res);
});
routers.post('/user/add', userController.saveUser)
routers.get('/user/getUser', secury.vJWT, userController.getUsuarioByUsername)
routers.get('/users', secury.vJWT, userController.getAllUsers)
routers.put('/user/update', secury.vJWT, userController.updateUser)
routers.delete('/user/delete', secury.vJWT, userController.deleteUser)

// Rutas para Equipos

routers.post('/team/add', secury.vJWT, equipoController.saveTeam)
routers.get('/team/getTeam', secury.vJWT, equipoController.getTeamByName)
routers.get('/teams', secury.vJWT, equipoController.getAllTeams)
routers.put('/team/update', secury.vJWT, equipoController.updateTeam)
routers.delete('/team/delete', secury.vJWT, equipoController.deleteTeam)

// Rutas para Jornadas

routers.post('/jornada/create', secury.vJWT, jornadaController.createJornada)
//routers.get('/jornada/getJornada', secury.vJWT, jornadaController.getTeamByName)
routers.get('/jornadas', secury.vJWT, jornadaController.getAllJornadas)


module.exports = routers