import express from 'express';
import usuariosRoutes from '../routes/usuarios.routes.js'

const router = express();

router.use('/usuario', usuariosRoutes);

export default router; 