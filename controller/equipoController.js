'use strict'
const teamModel = require('../models/TeamModel')
const fecha = require('../utils')

const saveTeam = async (req, res) => {
    try {

        const { body } = req
        const team = new teamModel()
        team.teamName = body.nombre
        team.representante = body.representante
        team.category = body.categoria
        team.jornada = body.jornada
        team.players = body.jugadores
        team.avatar = body.imagen
        team.dateCreation = { createBy: body.create }
        const registroTeam = await team.save()

        console.log('Registro de Equipo creado exitosamente: ')
        return res.status(200).json({ code: '00', message: 'Equipo guardado correctamente' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Error al guardar el Equipo' })
    }
}

function getTeamByName(req, res) {
    try {
        teamModel.findOne({ teamName: req.query.name }, function callback(err, team) {
            if (!team)
                return res.status(404).json({ code: '404', message: 'El equipo no fue encontrado' })

            const DatosTeam = {
                Nombre: team.teamName,
                Representante: team.representante,
                Categoria: team.category,
                Jornada: team.jornada,
                Jugadores: team.players,
                Imagen: team.avatar
            }
            return res.status(200).json({ code: '00', message: DatosTeam })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '01', message: 'Sucedio un error al buscar el Equipo' })
    }
}

function getAllTeams(req, res) {
    try {
        teamModel.find({ status: 'Activo' }, function callback(err, teams) {
            if (!teams)
                return res.status(404).json({ code: '404', message: 'No se encontraron equipos' })

            var lstTeam = []
            teams.forEach(function(currentValue, index, team) {
                if (req.query.cat != null) {
                    if (team[index].category == req.query.cat) {
                        const DatosTeam = {
                            Nombre: team[index].teamName,
                            Representante: team[index].representante,
                            Categoria: team[index].category,
                            Jornada: team[index].jornada,
                            Jugadores: team[index].players,
                            Imagen: team[index].avatar
                        }
                        lstTeam.push(DatosTeam)
                    }
                } else {
                    const DatosTeam = {
                        Nombre: team[index].teamName,
                        Representante: team[index].representante,
                        Categoria: team[index].category,
                        Jornada: team[index].jornada,
                        Jugadores: team[index].players,
                        Imagen: team[index].avatar
                    }
                    lstTeam.push(DatosTeam)
                }
            })
            return res.status(200).json({ code: '00', message: lstTeam })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ code: '00', message: 'Error al buscar los equipos' })
    }
}

function updateTeam(req, res) {
    try {
        var per = req.decoded.Usuario.permisos
        if (per == 'Administrador') {
            teamModel.updateOne({ teamName: req.body.name }, {
                $set: {
                    representante: req.body.representante,
                    players: req.body.jugadores,
                    avatar: req.body.imagen,
                    status: req.body.estado
                }
            }, (err, Tupdate) => {
                if (err)
                    return res.status(500).json({ code: '01', message: 'Ocurrio un error al momento de actualizar los datos' })

                return res.status(200).json({ code: '00', message: 'Los datos del equipo se actualizarón correctamente' })
            })

        } else if (per == 'AdminClient') {
            teamModel.updateOne({ teamName: req.body.name }, {
                $set: {
                    representante: req.body.representante,
                    players: req.body.jugadores,
                    avatar: req.body.imagen
                }
            }, (err, Tupdate) => {
                if (err)
                    return res.status(500).json({ code: '01', message: 'Ocurrio un error al momento de actualizar los datos' })

                return res.status(200).json({ code: '00', message: 'Los datos del equipo se actualizarón correctamente' })
            })
        } else {
            return res.status(401).json({ code: '401', message: 'No posees autorización para realizar esta acción' })
        }
    } catch (err) {
        console.log(err)
    }
}

function deleteTeam(req, res) {
    try {
        var per = req.decoded.Usuario.permisos
        if (per == 'Administrador' || per == 'AdminClient') {
            teamModel.updateOne({ teamName: req.body.name }, { $set: { representante: 'Desactivado' } }, (err, delet) => {
                if (err)
                    return res.status(500).json({ code: '01', message: 'Error al eliminar el equipo' })

                return res.status(200).json({ code: '00', message: 'El equipo se elimino correctamente' })
            })
        } else {
            return res.status(401).json({ code: '401', message: 'No posees autorización para realizar la acción' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    saveTeam,
    getTeamByName,
    getAllTeams,
    updateTeam,
    deleteTeam
}