import express from 'express';
import { usuariosRoutes, authRoutes, peliculasRoutes } from '../routes/index.js'

const router = express();

router.use('/usuario', usuariosRoutes);
router.use('/auth', authRoutes)
router.use('/peliculas', peliculasRoutes)

export default router; 