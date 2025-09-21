/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      zoneLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ZoneLocations",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      pickupMtaaniId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PickupMtaanis",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      type: {
        type: Sequelize.ENUM(["CUSTOM", "PICKUP_MTAANI", "PICK_AND_DROP"])
      },
      // Custom location
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      locationId: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      deliveryFee: {
        type: Sequelize.DECIMAL
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable('DeliveryAddresses');
  }
};