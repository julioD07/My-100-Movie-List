import Usuario from "../models/usuario.js"


// const esRolValido = async(rol = '') => {
//     const existeRol = await Rol.findOne({ rol })

//     if (!existeRol) {
//         throw new Error(`El rol ${rol} no esta registrado en la BD`)
//     }
// }

export const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`)
    }
}

export const existeUsername = async (username = '') => {
    const existeUsername = await Usuario.findOne({ username })

    if (existeUsername) { 
        throw new Error(`El username ${username} ya se encuentra registrado en la BD`)
    }
}


export const existeUsuarioPorID = async (id) => {
    const existeUsuarioId = await Usuario.findById(id)

    if (!existeUsuarioId) {
        throw new Error(`El id ${id} no se encuentra registrado en la BD`)
    }
}