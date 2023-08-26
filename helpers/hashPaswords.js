import brcyptjs from 'bcryptjs'

export const encriptarContraseña = async (password = '') => {
    const salt = brcyptjs.genSaltSync();
    return brcyptjs.hashSync(password, salt)
}