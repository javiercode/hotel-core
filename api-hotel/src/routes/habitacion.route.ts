import { Router } from 'express';
import { HabitacionController } from '../controllers/HabitacionController';

/**
 * @swagger
 * tags:
 *   name: Habitacion
 *   description: Gestión de habitaciones
 */

const router = Router();
const habitacionController = new HabitacionController();

/**
 * @swagger
 * /hotel/api/v1/habitacion/register:
 *   post:
 *     summary: Crear una nueva habitación
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: number
 *               tipo:
 *                 type: string
 *               precio:
 *                 type: number
 *               nroCama:
 *                 type: number
 *             required:
 *               - numero
 *               - tipo
 *               - precio
 *               - nroCama
 *     responses:
 *       201:
 *         description: Habitación creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/habitacion/register', habitacionController.create);

/**
 * @swagger
 * /hotel/api/v1/habitacion/list:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de elementos por página
 *     responses:
 *       200:
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 */
router.get('/habitacion/list', habitacionController.findAll);

/**
 * @swagger
 * /hotel/api/v1/habitacion/{id}:
 *   get:
 *     summary: Obtener una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la habitación
 *     responses:
 *       200:
 *         description: Habitación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *       404:
 *         description: Habitación no encontrada
 */
router.get('/habitacion/:id', habitacionController.findOne);

/**
 * @swagger
 * /hotel/api/v1/habitacion/{id}:
 *   put:
 *     summary: Actualizar una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la habitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: number
 *               tipo:
 *                 type: string
 *               precio:
 *                 type: number
 *               nroCama:
 *                 type: number
 *             required:
 *               - numero
 *               - tipo
 *               - precio
 *               - nroCama
 *     responses:
 *       200:
 *         description: Habitación actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Habitación no encontrada
 */
router.put('/habitacion/:id', habitacionController.update);

/**
 * @swagger
 * /hotel/api/v1/habitacion/{id}:
 *   delete:
 *     summary: Eliminar una habitación por ID
 *     tags: [Habitaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la habitación
 *     responses:
 *       204:
 *         description: Habitación eliminada exitosamente
 *       404:
 *         description: Habitación no encontrada
 */
router.delete('/habitacion/:id', habitacionController.delete);

export default router;
