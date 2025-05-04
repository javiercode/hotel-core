import {Router} from 'express';
import LoginController from '../controllers/login.controller';

const router = Router ();
/**
 * @swagger
 * /hotel/api/v1/login:
 *   post:
 *     summary: Inicio de session
 *     tags: 
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta del registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 code:
 *                   type: number
 *                 data:
 *                   type: object
 *                 total:
 *                   type: number
 *                 suma:
 *                   type: number
 */
router.post('/login',LoginController.login);
router.post('/verifyEmail',LoginController.verifyEmail);

export default router;