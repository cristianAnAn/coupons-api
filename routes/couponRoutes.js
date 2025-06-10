const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { verifyToken, requireRole } = require('../middlewares/auth');

router.get('/', verifyToken, couponController.getAll);
router.get('/:id', verifyToken, couponController.getById);
router.get('/GetByCode/:code', verifyToken, couponController.getByCode);

router.post('/', verifyToken, requireRole('ADMINISTRADOR'), couponController.create);
router.put('/', verifyToken, requireRole('ADMINISTRADOR'), couponController.update);
router.delete('/:id', verifyToken, requireRole('ADMINISTRADOR'), couponController.remove);

module.exports = router;
