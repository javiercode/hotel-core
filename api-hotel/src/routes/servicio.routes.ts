import {Router} from 'express';
import ServicioController from '../controllers/servicio.controller';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: servicio
 *   description: Servicios de hotel
 */

/**
 * @swagger
 * /hotel/api/v1/servicio/list/{page}/{limit}:
 *   get:
 *     summary: Obtiene una lista de servicios
 *     tags: [servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Límite de elementos por página
 *     responses:
 *       200:
 *         description: Lista de servicios paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Operación exitosa"
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 total:
 *                   type: number
 *                   example: 50
 *                 suma:
 *                   type: number
 *                   example: 500
 */
router.get('/servicio/list/:page/:limit',ServicioController.list);
/**
 * @swagger
 * /hotel/api/v1/servicio/create:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags: [servicio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "nombre"
 *               descripcion:
 *                 type: string
 *                 example: "Descripcion de Ejemplo"
 *               precio:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Operación exitosa"
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                 total:
 *                   type: number
 *                   example: 1
 *                 suma:
 *                   type: number
 *                   example: 100
 */
router.post('/servicio/create',ServicioController.create);
/**
 * @swagger
 * /hotel/api/v1/servicio/edit/{id}:
 *   put:
 *     summary: Edita un Servicio existente
 *     tags: [servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "nombre"
 *               descripcion:
 *                 type: string
 *                 example: "Descripcion de Ejemplo"
 *               precio:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Servicio editado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Operación exitosa"
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                 total:
 *                   type: number
 *                   example: 1
 *                 suma:
 *                   type: number
 *                   example: 100
 */
router.put('/servicio/edit/:id',ServicioController.edit);
/**
 * @swagger
 * /hotel/api/v1/servicio/delete/{id}:
 *   delete:
 *     summary: Elimina un Servicio existente
 *     tags: [servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Operación exitosa"
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                 total:
 *                   type: number
 *                   example: 1
 *                 suma:
 *                   type: number
 *                   example: 100
 */
router.delete('/servicio/delete/:id',ServicioController.delete);

export default router;