import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { existeEmail, existeUsername } from '../helpers/db-validators.js';
import { registrarUsuariosController } from '../controllers/usuarios.controller.js'

const router = Router();

// router.get('/', (req, res) => {
//     res.json({ ok: true, mensaje: 'Hola Mundo' });
// });

router.post('/registrar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('username').custom(existeUsername),
    check('password', 'El password debe ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo')
        .custom(existeEmail), 
    validarCampos
], registrarUsuariosController)

// export default router;
export const usuariosRoutes = router
