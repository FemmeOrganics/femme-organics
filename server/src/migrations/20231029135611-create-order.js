/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deliveryAddressId: {
        type : Sequelize.INTEGER,
        references: {
          model: "DeliveryAddresses",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM(["selfCollect", "delivery"])
      },
      status: {
        type: Sequelize.ENUM(["CONFIRMED", "PENDING", "RECEIVED", "CANCELLED"]),
      },
      paymentStatus: {
        type: Sequelize.ENUM(["FULL", "PARTIAL", "NOT_PAID"]),
      },
      orderAmount: {
        type: Sequelize.DECIMAL,
      },
      deliveryAmount: {
        type: Sequelize.DECIMAL,
      },
      amountPaid: {
        type: Sequelize.DECIMAL,
      },
      orderNumber: {
        type: Sequelize.STRING,
        length: 50,
        unique: true
      },
      customerName: {
        type: Sequelize.STRING,
        length: 50,
      },
      customerPhone: {
        type: Sequelize.STRING,
        length: 50,
      },
      customerId: {
        type : Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};