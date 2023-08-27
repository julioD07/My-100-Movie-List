import { request, response } from "express"
import Usuario from "../models/usuario.js"
import { encriptarContraseña } from "../helpers/hashPaswords.js"


export const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre = 'No name', apiKey, page = 1, limit = 10} = req.query

    const { limit = 5, desde = 0 } = req.query
    const query = {estado: true}

    

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(desde)
                .limit(Number(limit))
    ])

    res.json({
        ok: true,
        msg: "Todos los usuarios listados correctamente",
        total,
        usuarios
    })
}



    export const registrarUsuariosController = async (req = request, res = response) => {

        try {
            const { username, nombre, correo, password } = req.body

            // ! Crear una lista de peliculas vacia para el usuario
            const listasPeliculas = {
                nombre: `Lista de peliculas de ${username}`,
                peliculas: [],
            }

            const usuario = new Usuario({
                username,
                password,
                nombre, 
                correo, 
                listasPeliculas
            });
            
            // Encriptar la contraseña  
            usuario.password = await encriptarContraseña(password)

            //Guardar en la BD
            await usuario.save()

            res.status(201).json({
                ok: true, 
                msg: "Usuario Registrado Correctamente",
                usuario
            })

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                ok: false,
                msg: "Hable con el administrador",
                error_message: error.message
            })
        }

        
    }