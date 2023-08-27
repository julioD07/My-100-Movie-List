import {Schema, model} from 'mongoose';

const PeliculaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    ano_lanzamiento: {
        type: Number,
        required: [true, 'El año de lanzamiento es obligatorio']
    },
    Url_imagen: {
        type: String,
    },
});

export default model('Pelicula', PeliculaSchema)