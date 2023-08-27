import { Schema, model } from "mongoose";

export const ListaPeliculaSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la lista es obligatorio"],
    },
    peliculas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pelicula",
      },
    ],
    uidPertenece: {
      type: String,
      required: [true, "El uid del usuario al que pertenece la lista es obligatorio"],
    },
    calificacion: {
      type: Number,
      default: 0,
    }
  },

  {
    timestamps: {
      createdAt: "fechaCreacion", // Cambia el nombre de la propiedad createdAt a fechaCreacion
      updatedAt: "fechaActualizacion", // Cambia el nombre de la propiedad updatedAt a fechaActualizacion
    },
  }
);

export default model("ListaPeliculas", ListaPeliculaSchema);
