import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes
 */

const router = Router();
const clienteController = new ClienteController();

/**
 * @swagger
 * /hotel/api/v1/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *                 nullable: true
 *             required:
 *               - nombre
 *               - email
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/clientes', clienteController.create);


/**
 * @swagger
 * /hotel/api/v1/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
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
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/clientes', clienteController.findAll);

/**
 * @swagger
 * /hotel/api/v1/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/clientes/:id', clienteController.findOne);

/**
 * @swagger
 * /hotel/api/v1/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *                 nullable: true
 *             required:
 *               - nombre
 *               - email
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/clientes/:id', clienteController.update);


/**
 * @swagger
 * /hotel/api/v1/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/clientes/:id', clienteController.delete);

export default router;
