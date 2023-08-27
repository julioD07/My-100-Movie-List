import express from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { crearPeliculaController, obtenerListasController } from '../controllers/peliculas.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';

const router = express.Router();

router.get('/obtener', [
    validarJWT,
    validarCampos
], obtenerListasController)

router.post('/crear', [
    validarJWT,
    check('titulo', 'El titulo de la pelicula es obligatorio').not().isEmpty(),
    check('ano_lanzamiento', 'El año de lanzamiento es obligatorio').not().isEmpty(),
    validarCampos
], crearPeliculaController);

export const peliculasRoutes = router;