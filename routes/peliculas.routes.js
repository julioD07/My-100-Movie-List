import express from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { calificarListaController, crearPeliculaController, eliminarPeliculaDeListaController, obtenerListasController } from '../controllers/peliculas.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarLimitePeliculas } from '../middlewares/limite-peliculas.js';

const router = express.Router();

router.get('/obtener', [
    validarJWT,
    validarCampos
], obtenerListasController)

router.post('/crear', [
    validarJWT,
    check('titulo', 'El titulo de la pelicula es obligatorio').not().isEmpty(),
    check('ano_lanzamiento', 'El año de lanzamiento es obligatorio').not().isEmpty(),
    validarLimitePeliculas,
    validarCampos
], crearPeliculaController);


router.delete('/eliminar/:id', [
    validarJWT,
    validarCampos
], eliminarPeliculaDeListaController)

router.post('/calificar', [
    validarJWT,
    check('uidListaPeliculas', 'El id de la lista es obligatorio').not().isEmpty(),
    check('cal', 'La calificacion es obligatoria - Nombre Parametro: cal').not().isEmpty(),
    check('cal', 'La calificacion debe ser un numero - Nombre Parametro: cal').isNumeric(),
    validarCampos
], calificarListaController)


export const peliculasRoutes = router;