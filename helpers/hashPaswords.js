import bcryptjs from 'bcryptjs'

export const encriptarContraseña = async (password = '') => {
    const salt = brcyptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt)
}