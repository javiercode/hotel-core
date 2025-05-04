import { Router } from 'express';
import { ReservaController } from '../controllers/ReservaController';

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de reservas
 */

const router = Router();
const reservaController = new ReservaController();

/**
 * @swagger
 * /hotel/api/v1/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               idHabitacion:
 *                 type: number
 *             required:
 *               - fechaInicio
 *               - fechaFin
 *               - estado
 *               - idHabitacion
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/reservas', reservaController.create);

/**
 * @swagger
 * /hotel/api/v1/reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
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
router.get('/reservas', reservaController.findAll);

/**
 * @swagger
 * /hotel/api/v1/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
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
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/reservas/:id', reservaController.findOne);

/**
 * @swagger
 * /hotel/api/v1/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               idHabitacion:
 *                 type: number
 *             required:
 *               - fechaInicio
 *               - fechaFin
 *               - estado
 *               - idHabitacion
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/reservas/:id', reservaController.update);

/**
 * @swagger
 * /hotel/api/v1/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       204:
 *         description: Reserva eliminada exitosamente
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/reservas/:id', reservaController.delete);

/**
 * @swagger
 * /hotel/api/v1/reservas/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [PENDIENTE, CONFIRMADO, CANCELADO, PAGADO, CHECK_IN, CHECK_OUT]
 *     responses:
 *       200:
 *         description: Estado de la reserva actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Reserva no encontrada
 */
router.patch('/reservas/:id/estado', reservaController.actualizarEstado);

export default router;