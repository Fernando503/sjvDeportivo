'use strict'
const teamModel = require('../models/TeamModel')
const jornadaModel = require('../models/JornadaModel')
const fecha = require('../utils')
const robin = require('roundrobin');

const createJornada = async (req, res) => {
    try {

        teamModel.find({ status: 'Activo' }, function callback(err, teams) {
            if (!teams)
                return res.status(404).json({ code: '404', message: 'No se encontraron equipos' })

            var lstFecha = []
            var lstTeam = []
            var lstFinal = []
            var lstXfechas = []
            var lstXJornada1 = []
            var lstXJornada2 = []
            var totalTeams
            var fecha = 1
            teams.forEach(function(currentValue, index, team) {
                if (req.body.categoria != null) {
                    if (team[index].category == req.body.categoria) {
                        const DatosTeam = {
                            Nombre: team[index].teamName
                        }
                        lstTeam.push(DatosTeam)
                    }
                }
            })

            totalTeams = lstTeam.length
            if (totalTeams % 2 != 0) {
                console.log('Sumando un equipo nuevo')
                totalTeams = totalTeams + 1
                const DatosTeam = {
                    Nombre: 'Vacio'
                }
                lstTeam.push(DatosTeam)
            }

            // Creando jornadas 
            lstFecha = robin(totalTeams, lstTeam)

            // procesando Primera Jornada
            for (var i = 0; i < lstFecha.length; i++) {
                lstXfechas = []
                for (var j = 0; j < lstFecha[i].length; j++) {
                    if (lstFecha[i][j].length == 2) {
                        const dataPartido = {
                            EquipoA: lstFecha[i][j][0].Nombre,
                            EquipoB: lstFecha[i][j][1].Nombre
                        }
                        lstXfechas.push(dataPartido)
                    } else { console.log('Este juego cuenta con más de 2 equipos') }

                }
                lstXfechas = lstXfechas.sort(function() { return Math.random() - 0.1 })

                const xJor = {
                    Fecha: fecha,
                    Partidos: lstXfechas
                }
                lstXJornada1.push(xJor)
                fecha++
            }
            const datosPriV = {
                Nombre: 'Primera Vuelta',
                Jornada: lstXJornada1
            }
            lstFinal.push(datosPriV)

            // Procesando Segunda Jornada
            for (var i = 0; i < lstFecha.length; i++) {
                lstXfechas = []
                for (var j = 0; j < lstFecha[i].length; j++) {
                    if (lstFecha[i][j].length == 2) {
                        const dataPartido = {
                            EquipoA: lstFecha[i][j][1].Nombre,
                            EquipoB: lstFecha[i][j][0].Nombre
                        }
                        lstXfechas.push(dataPartido)
                    } else { console.log('Este juego cuenta con más de 2 equipos') }

                }
                lstXfechas = lstXfechas.sort(function() { return Math.random() - 0.1 })
                const xJor = {
                    Fecha: fecha,
                    Partidos: lstXfechas
                }
                lstXJornada2.push(xJor)
                fecha++
            }

            const datosSegV = {
                Nombre: 'Segunda Vuelta',
                Jornada: lstXJornada2
            }
            lstFinal.push(datosSegV)

            console.log('Iniciando guardado de jornadas')
            for (var i = 0; i < lstFinal.length; i++) {
                for (var j = 0; j < lstFinal[i].Jornada.length; j++) {
                    for (var k = 0; k < lstFinal[i].Jornada[j].Partidos.length; k++) {
                        try {
                            const jornd = new jornadaModel()
                            jornd.fechaJornada = lstFinal[i].Jornada[j].Fecha
                            jornd.vuelta = lstFinal[i].Nombre
                            jornd.partido = lstFinal[i].Jornada[j].Partidos[k]
                            jornd.cat = req.body.categoria

                            jornd.save((err, jornadaStored) => {
                                if (err) res.status(500).send({ message: "Error al guardar Jornada" })

                                console.log('Jornada guardada Correctamente')
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
            }
            return res.status(200).json({ code: '00', message: lstFinal })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al crear la jornada' })
    }
}

function getAllJornadas(req, res) {
    try {
        var lstJornadas = []
        jornadaModel.find({ status: 'Activo' }, function callback(err, jor) {
            if (!jor)
                return res.status(404).json({ code: '404', message: 'No se encontrarón jornadas' })

            jor.forEach(function(currentValue, index, jorn) {
                if (req.query.cat != null) {
                    if (jorn[index].cat == req.query.cat) {
                        const DatosJorn = {
                            Vuelta: jorn[index].vuelta,
                            Fecha: jorn[index].fechaJornada,
                            Partido: jorn[index].partido,
                            FechaJuego: jorn[index].fechaJuego,
                            Estado: jorn[index].estado
                        }
                        lstJornadas.push(DatosJorn)
                    }
                }
            })

            return res.status(200).json({ code: '00', message: lstJornadas })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al obtener las jornadas' })
    }
}

function getListOfJornadas(req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al obtener listas de nombres de jornadas' })
    }
}

function finalizarJornada(req, res) {
    try {
        var per = req.decoded.Usuario.permisos
        if (per == 'Administrador' || per == 'AdminClient' || per == 'Seguidor') {
            jornadaModel.findOne({ vuelta: req.body.vuelta, fechaJornada: req.body.fecha, partido: req.body.partido }, function callback(err, jorModifi) {
                console.log(jorModifi._id)
                jornadaModel.updateOne({ _id: jorModifi._id }, { $set: { estado: req.body.status } }, (err, updateResponse) => {
                    if (err)
                        return res.status(500).json({ code: '01', message: 'Error al actualizar estado de la jornada' })

                    console.log(updateResponse)
                    return res.status(200).json({ code: '00', message: 'Se actualizarón los datos correctamente' })
                })
            })
        } else {
            return res.status(401).json({ code: '401', message: 'No cuentas con permiso para realizar esta acción' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Ocurrio un error al finalizar la jornada' })
    }
}


module.exports = {
    createJornada,
    getAllJornadas,
    getListOfJornadas,
    finalizarJornada
}