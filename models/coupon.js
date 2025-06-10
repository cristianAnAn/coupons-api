const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Coupon = sequelize.define('Coupon', {
  CouponId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CouponCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DiscountAmount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  MinAmount: {
    type: DataTypes.INTEGER
  },
  AmountType: {
    type: DataTypes.STRING
  },
  LimitUse: {
    type: DataTypes.INTEGER
  },
  DateInit: {
    type: DataTypes.DATE
  },
  DateEnd: {
    type: DataTypes.DATE
  },
  Category: {
    type: DataTypes.STRING
  },
  StateCoupon: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  updatedAt: 'LastUpdate',
  createdAt: false,
  tableName: 'Coupons'
});

module.exports = Coupon;
