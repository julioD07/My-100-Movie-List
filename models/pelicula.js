import {Schema, model} from 'mongoose';

const PeliculaSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    ano_lanzamiento: {
        type: Number,
        required: [true, 'El año de lanzamiento es obligatorio']
    },
    Url_imagen: {
        type: String,
        default: ''
    },
});

export default model('Pelicula', PeliculaSchema)