const Coupon = require('../models/coupon');
const createResponse = require('../utils/responseDto');

// Obtener todos los cupones
exports.getAll = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(createResponse({ result: coupons }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

// Obtener cupón por ID
exports.getById = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon)
      return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));

    res.json(createResponse({ result: coupon }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

// Obtener cupón por código
exports.getByCode = async (req, res) => {
  try {
    const code = req.params.code.toLowerCase();
    const coupon = await Coupon.findOne({ where: { CouponCode: code } });
    if (!coupon)
      return res.status(404).json(createResponse({ isSuccess: false, message: 'Código no válido' }));

    res.json(createResponse({ result: coupon }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

// Crear un nuevo cupón con validación de duplicado
exports.create = async (req, res) => {
  try {
    const existing = await Coupon.findOne({ where: { CouponCode: req.body.CouponCode } });

    if (existing) {
      return res.status(400).json(createResponse({
        isSuccess: false,
        message: 'El código de cupón ya existe'
      }));
    }

    const coupon = await Coupon.create(req.body);
    res.status(201).json(createResponse({ result: coupon, message: 'Cupón creado correctamente' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

// Actualizar un cupón por ID con validación de código duplicado
exports.update = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) {
      return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));
    }

    if (req.body.CouponCode && req.body.CouponCode !== coupon.CouponCode) {
      const existing = await Coupon.findOne({ where: { CouponCode: req.body.CouponCode } });
      if (existing) {
        return res.status(400).json(createResponse({
          isSuccess: false,
          message: 'Ya existe otro cupón con ese código'
        }));
      }
    }

    await coupon.update(req.body);
    res.json(createResponse({ result: coupon, message: 'Cupón actualizado correctamente' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

// Eliminar un cupón por ID
exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon)
      return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));

    await coupon.destroy();
    res.json(createResponse({ message: 'Cupón eliminado correctamente' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};
