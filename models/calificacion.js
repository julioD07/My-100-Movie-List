import { Schema, model } from 'mongoose';

const CalificacionSchema = Schema({
    uidListaPeliculas: {
        type: String,
        required: [true, 'El uid de la lista de películas es obligatorio']
    },
    calificacion: {
        type: Number,
        required: [true, 'La calificación es obligatoria']
    },
    uidPertenece: {
        type: String,
        required: [true, 'El uid del usuario al que pertenece la calificación es obligatorio']
    }
});

export default model('Calificacion', CalificacionSchema);