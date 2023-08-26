import { response, request } from 'express';
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/jwt.js';

export const authLoginController = async (req = request, res = response) => {

    const {username, password} = req.body

    try {

        // TODO Verificar si el email existe
        const usuario = await Usuario.findOne({username})
        if (!usuario) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos"
            })
        }

        // TODO Verificar si el usuario esta activo
        if (!usuario.estado) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos - estado: false"
            })
        }

        // TODO Verificar la contraseña
        const validpassword = bcryptjs.compareSync(password, usuario.password)
        if (!validpassword) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos - password"
            })
        }

        // TODO Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            msg: "Login OK",
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
            error_message: error.message
        })
    }
};