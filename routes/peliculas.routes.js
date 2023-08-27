import express from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { crearPeliculaController, eliminarPeliculaDeListaController, obtenerListasController } from '../controllers/peliculas.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';

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


router.delete('/eliminar/:id', [
    validarJWT,
    validarCampos
], eliminarPeliculaDeListaController)

export const peliculasRoutes = router;