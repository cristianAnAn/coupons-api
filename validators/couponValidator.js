const Joi = require('joi');

const couponSchema = Joi.object({
  CouponCode: Joi.string().min(3).max(50).required(),
  DiscountAmount: Joi.number().positive().required(),
  MinAmount: Joi.number().integer().min(0),
  AmountType: Joi.string().valid('PERCENT', 'FLAT'),
  LimitUse: Joi.number().integer().min(0),
  DateInit: Joi.date().iso().required(),
  DateEnd: Joi.date().iso().greater(Joi.ref('DateInit')).required(),
  Category: Joi.string().min(2).max(50),
  StateCoupon: Joi.boolean()
});

module.exports = {
  couponSchema
};
