import { request, response } from "express";
import listapeliculas from "../models/listapeliculas.js";


export const validarLimitePeliculas = async (req = request, res = response, next) => {
    try {
        // TODO Obtenemos el maximo de peliculas permitidas
        const maximoPeliculas = process.env.MAXIMO_PELICULAS

        // TODO Obtener el uid del usuario autenticado
        const {uid} = req.usuarioAutenticado

        // TODO Obtener la propiedad peliculas de la lista de peliculas del usuario
        const listaPeliculasUsuario = await listapeliculas.findOne({uidPertenece:uid, peliculas:{$exists:true}}) 
        
        // TODO Obtener el numero de peliculas de la lista
        const numeroPeliculas = listaPeliculasUsuario.peliculas.length


        // TODO Verificar si el numero de peliculas es mayor a 10
        if (numeroPeliculas >= Number(maximoPeliculas)) {
            return res.status(400).json({
                ok:false,
                msg: `El numero maximo de peliculas permitidas es ${maximoPeliculas}`
            })
        }

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
            error_message:error.message
        })
    }
}