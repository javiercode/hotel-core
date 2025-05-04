import express, {Router} from 'express';
import UserController from '../controllers/user.controller';

const router = Router ();


/**
 * @swagger
 * /hotel/api/v1/user/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: 
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               nombre:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
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
router.post('/user/register', UserController.create);

/**
 * @swagger
 * /hotel/api/v1/user/verificar:
 *   post:
 *     summary: Verificación de usuario
 *     tags: 
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta de la verificación
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
router.post('/user/verificar', UserController.verificar);


//router.put('/usuario/edit/:id',UserController.edit);
//router.delete('/usuario/delete/:id',UserController.desactivar);
//router.use(express.urlencoded({extended:true}));
//router.post('/usuario/updateFoto/:username',UserController.updateFoto);
//router.get('/usuario/getFoto/:username',UserController.obtenerFoto);

export default router;