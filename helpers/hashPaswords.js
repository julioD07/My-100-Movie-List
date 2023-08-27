import bcryptjs from 'bcryptjs'

export const encriptarContraseña = async (password = '') => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt)
}