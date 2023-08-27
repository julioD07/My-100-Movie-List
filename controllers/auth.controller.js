import { response, request } from 'express';
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js';
import { generarJWT } from '../helpers/jwt.js';

export const authLoginController = async (req = request, res = response) => {

    const {correo, password} = req.body

    try {

        // TODO Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return  res.status(400).json({
                ok: false,
                msg: "correo / password no son correctos"
            })
        }

        // TODO Verificar si el usuario esta activo
        if (!usuario.estado) {
            return  res.status(400).json({
                ok: false,
                msg: "El usuario no se encuentra activo en la plataforma, favor contactar al administrador"
            })
        }

        // TODO Verificar la contraseña
        const validpassword = bcryptjs.compareSync(password, usuario.password)
        if (!validpassword) {
            return  res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })
        }

        // TODO Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            msg: "Usuario logueado correctamente",
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