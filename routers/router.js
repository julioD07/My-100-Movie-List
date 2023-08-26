import express from 'express';
import { usuariosRoutes, authRoutes } from '../routes/index.js'

const router = express();

router.use('/usuario', usuariosRoutes);
router.use('/auth', authRoutes)

export default router; 