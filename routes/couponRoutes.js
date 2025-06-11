const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { verifyToken, requireRole } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Cupones
 *   description: Endpoints para gestión de cupones
 */

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Obtener todos los cupones
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cupones obtenida correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/', verifyToken, couponController.getAll);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Obtener un cupón por su ID
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cupón
 *     responses:
 *       200:
 *         description: Cupón encontrado
 *       404:
 *         description: Cupón no encontrado
 *       401:
 *         description: Token inválido
 */
router.get('/:id', verifyToken, couponController.getById);

/**
 * @swagger
 * /coupons/GetByCode/{code}:
 *   get:
 *     summary: Obtener un cupón por su código
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del cupón
 *     responses:
 *       200:
 *         description: Cupón encontrado
 *       404:
 *         description: Cupón no encontrado
 *       401:
 *         description: Token inválido
 */
router.get('/GetByCode/:code', verifyToken, couponController.getByCode);

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Crear un nuevo cupón
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CouponCode:
 *                 type: string
 *                 example: "SAVE10"
 *               DiscountAmount:
 *                 type: number
 *                 example: 10
 *               MinAmount:
 *                 type: integer
 *                 example: 50
 *               AmountType:
 *                 type: string
 *                 example: "PERCENT"
 *               LimitUse:
 *                 type: integer
 *                 example: 5
 *               DateInit:
 *                 type: string
 *                 format: date-time
 *               DateEnd:
 *                 type: string
 *                 format: date-time
 *               Category:
 *                 type: string
 *                 example: "General"
 *               StateCoupon:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Cupón creado correctamente
 *       403:
 *         description: Rol no autorizado
 *       401:
 *         description: Token inválido
 */
router.post('/', verifyToken, requireRole('ADMINISTRADOR'), couponController.create);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Actualizar un cupón existente
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cupón a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CouponCode:
 *                 type: string
 *                 example: "SAVE20"
 *               DiscountAmount:
 *                 type: number
 *                 example: 20
 *               MinAmount:
 *                 type: integer
 *                 example: 100
 *               AmountType:
 *                 type: string
 *                 example: "PERCENT"
 *               LimitUse:
 *                 type: integer
 *                 example: 10
 *               DateInit:
 *                 type: string
 *                 format: date-time
 *               DateEnd:
 *                 type: string
 *                 format: date-time
 *               Category:
 *                 type: string
 *                 example: "VIP"
 *               StateCoupon:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cupón actualizado correctamente
 *       404:
 *         description: Cupón no encontrado
 *       403:
 *         description: Rol no autorizado
 *       401:
 *         description: Token inválido
 */

router.put('/:id', verifyToken, requireRole('ADMINISTRADOR'), couponController.update);


/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Eliminar un cupón por ID
 *     tags: [Cupones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cupón a eliminar
 *     responses:
 *       200:
 *         description: Cupón eliminado correctamente
 *       404:
 *         description: Cupón no encontrado
 *       403:
 *         description: Rol no autorizado
 *       401:
 *         description: Token inválido
 */
router.delete('/:id', verifyToken, requireRole('ADMINISTRADOR'), couponController.remove);

module.exports = router;
