import { Schema, model } from "mongoose";

export const ListaPeliculaSchema = Schema({
    nombre: {
      type: String,
      required: [true, 'El nombre de la lista es obligatorio']
    },
    peliculas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
      }
    ]
  });

export default model('ListaPeliculas', ListaPeliculaSchema)