const Coupon = require('../models/coupon');
const createResponse = require('../utils/responseDto');

exports.getAll = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(createResponse({ result: coupons }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

exports.getById = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));
    res.json(createResponse({ result: coupon }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

exports.getByCode = async (req, res) => {
  try {
    const code = req.params.code.toLowerCase();
    const coupon = await Coupon.findOne({ where: { CouponCode: code } });
    if (!coupon) return res.status(404).json(createResponse({ isSuccess: false, message: 'Código no válido' }));
    res.json(createResponse({ result: coupon }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

exports.create = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(createResponse({ result: coupon, message: 'Cupón creado' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

exports.update = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.body.CouponId);
    if (!coupon) return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));
    await coupon.update(req.body);
    res.json(createResponse({ result: coupon, message: 'Cupón actualizado' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};

exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json(createResponse({ isSuccess: false, message: 'Cupón no encontrado' }));
    await coupon.destroy();
    res.json(createResponse({ message: 'Cupón eliminado' }));
  } catch (error) {
    res.status(500).json(createResponse({ isSuccess: false, message: error.message }));
  }
};
