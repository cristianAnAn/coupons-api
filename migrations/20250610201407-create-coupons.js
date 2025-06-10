'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coupons', {
      CouponId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      CouponCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DiscountAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      MinAmount: {
        type: Sequelize.INTEGER
      },
      AmountType: {
        type: Sequelize.STRING
      },
      LimitUse: {
        type: Sequelize.INTEGER
      },
      DateInit: {
        type: Sequelize.DATE
      },
      DateEnd: {
        type: Sequelize.DATE
      },
      Category: {
        type: Sequelize.STRING
      },
      StateCoupon: {
        type: Sequelize.BOOLEAN
      },
      LastUpdate: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coupons');
  }
};
