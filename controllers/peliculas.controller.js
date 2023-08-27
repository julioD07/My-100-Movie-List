import { response, request } from "express";
import Pelicula from "../models/pelicula.js";
import ListaPeliculas from "../models/listapeliculas.js";
import pelicula from "../models/pelicula.js";

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

    res.json({ ok: true, msg: "Pelicula creada correctamente", peliculas });
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
                msg:"La pelicula no existe en la lista de peliculas del usuario"
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