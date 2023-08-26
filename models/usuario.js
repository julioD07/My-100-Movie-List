import mongoose, { model } from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    username: {
        type:String ,
        required: [true, 'El username es obligatorio'],
        unique: [true,'Este username ya existe'],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type:String ,
        required: [true, 'El correo es obligatorio'],
        unique: [true,'Este correo ya existe'],
    },
    // rol: {
    //     type: String,
    //     required: true,
    //     // enum: ['ADMIN_ROLE', 'USER_ROLE']
    // },
    estado: {
        type: Boolean,
        default: true // false - Inactivo / true- Activo
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    calificacion: {
        type: Number,
    },
    peliculas: {
        type: Array,
        default: []
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

export default mongoose.model('Usuario', UsuarioSchema) 