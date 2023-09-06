import { response, request } from "express";
import Pelicula from "../models/pelicula.js";
import ListaPeliculas from "../models/listapeliculas.js";
import Calificacion from "../models/calificacion.js";

export const crearPeliculaController = async (
  req = request,
  res = response
) => {
  try {
    const { uid } = req.usuarioAutenticado;

    const { titulo, ano_lanzamiento, url = "" } = req.body;

    // TODO Crear la pelicula
    const pelicula = new Pelicula({
      titulo,
      ano_lanzamiento,
      url,
    });

    // TODO Guardar la pelicula en la base de datos 
    await pelicula.save();

   // Obtener el ID de la película recién creada
   const peliculaId = pelicula._id;

   // Actualizar la lista de películas del usuario
   const peliculas = await ListaPeliculas.findOneAndUpdate(
     { uidPertenece: uid },
     {
       $push: {
         peliculas: peliculaId, // Agregar el ID de la película a la lista de películas del usuario
       },
     },
     { new: true }
   );

    res.status(201).json({ ok: true, msg: "Pelicula creada correctamente", peliculas, idPeliculaCreada: peliculaId });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error_message: error.message,
    });
  }
};

export const obtenerListasController = async (req = request, res = response) => {
    
    try {

        // TODO Obtener parametros de la query
        const {id} = req.query

        // TODO Si el id viene en la query, obtener la lista de peliculas del usuario con el id
        if (id) {
            const listaPeliculas = await ListaPeliculas.findById(id)
            return res.json({
                ok:true,
                msg:"Lista de peliculas obtenida correctamente",
                listaPeliculas
            })
        }

        const listas = await ListaPeliculas.find()
        
        res.json({
            ok:true,
            msg:"Listas de peliculas obtenidas correctamente",
            listas
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
            error_message:error.message
        })
    }
}

export const eliminarPeliculaDeListaController = async (req = request, res = response) => {

    try {
        
        // TODO Obtener el ID de la pelicula a eliminar
        const {id} = req.params

        // TODO Obtener el ID del usuario autenticado
        const {uid} = req.usuarioAutenticado

        // TODO Obtener la lista de peliculas del usuario autenticado
        const { peliculas } = await ListaPeliculas.findOne({uidPertenece:uid})

        // TODO Verificar si la pelicula a eliminar existe en la lista de peliculas del usuario autenticado
        const existePelicula = peliculas.includes(id)

        if (!existePelicula) {
            return res.status(400).json({
                ok:false,
                msg:"La pelicula no pertenece a la lista de peliculas propia del usuario"
            })
        }

        // TODO Eliminar la pelicula de la lista de peliculas del usuario autenticado
        const listaPeliculas = await ListaPeliculas.findOneAndUpdate(
            {uidPertenece:uid},
            {
                $pull:{
                    peliculas:id
                }
            },
            {new:true}
        )

        // TODO Eliminar la pelicula de la base de datos
        await Pelicula.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:"Pelicula eliminada de la lista correctamente",
            listaPeliculas
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
            error_message:error.message
        })
    }

}

export const calificarListaController = async (req = request, res = response) => {
    try {
        
        // TODO obtener los datos del body
        const {uidListaPeliculas, cal} = req.body

        // TODO Obtener el ID del usuario autenticado
        const {uid} = req.usuarioAutenticado

        // TODO validar si el usuario ya califico la lista de peliculas
        const calificacionExistente = await Calificacion.findOne({uidListaPeliculas, uidPertenece:uid})

        if (calificacionExistente) {
            return res.status(400).json({
                ok:false,
                msg:"El usuario ya califico la lista de peliculas"
            })
        }

        // TODO Instanciar la calificacion
        const calificacion = await new Calificacion({
            uidListaPeliculas,
            calificacion:cal,
            uidPertenece:uid
        })

        // TODO Guardar la calificacion en la base de datos
        await calificacion.save()

        // TODO Obtener todas las calificaciones de la lista de peliculas y calcular el promedio
        const calificacionesLista = await Calificacion.find({uidListaPeliculas})

        // TODO Calcular el promedio de las calificaciones
        const promedio = calificacionesLista.reduce((acc, calificacion) => acc + calificacion.calificacion, 0) / calificacionesLista.length

        // // TODO Actualizar la calificacion de la lista de peliculas
        const listaActualizada = await ListaPeliculas.findByIdAndUpdate(uidListaPeliculas, {calificacion:promedio})


        res.json({
            ok:true,
            msg:"Calificacion de lista de peliculas realizada correctamente",
            calificacion,
            promedio,
            uidUsuarioAutenticado:uid,
            listaActualizada
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador",
            error_message:error.message
        })
    }
}