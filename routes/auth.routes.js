import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { authLoginController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'El passoword es obligatorio').not().isEmpty(),
    validarCampos
],authLoginController )

export const authRoutes = router