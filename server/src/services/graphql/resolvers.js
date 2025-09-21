const { logger } = require("../../helpers/logger.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op, where } = require("sequelize");
const { setCookie } = require("./helpers/setCookies.js");
const { PubSub, withFilter } = require("graphql-subscriptions");
const {
  getStore,
  getBillboard,
  getCategory,
  getSize,
  getProduct,
  getDupProduct,
  getDupStore,
  getDupBillboard,
  getDupCategory,
} = require("./helpers/getModels.js");
const { cleanString } = require("../../lib/clean-string.js");
const { log } = require("winston");
const { generateOrderId } = require("../../lib/generateId.js");
const sequelizemeta = require("../../models/sequelizemeta.js");

const JWT_SECRET = process.env.JWT_SECRET;
const pubsub = new PubSub(); // in production use

// a nonarrow fun doesnt take a scope
function resolvers() {
  const { db } = this.db;
  const {
    User,
    Customer,
    Admin,
    Order,
    Product,
    Image,
    Store,
    Billboard,
    Category,
    Size,
    Color,
    MpesaSetting,
    StripeSetting,
    Zone,
    ZoneLocation,
    DeliveryAddress,
    Transaction,
    SequelizeMeta,
    PickupMtaani
  } = db.models;

  const resolvers = {
    Store: {
      billboards(store, args, context) {
        return store.getBillboards();
      },
      products(store, args, context) {
        return store.getProducts();
      },
    },
    Billboard: {
      store(billboard, args, context) {
        return billboard.getStore();
      },
    },

    Category: {
      store(category, args, context) {
        return category.getStore();
      },
      products(category, args, context) {
        return category.getProducts();
      },
    },

    Product: {
      store(product, args, context) {
        return product.getStore();
      },
      category(product, args, context) {
        return product.getCategory();
      },
      images(product, args, context) {
        return product.getImages();
      },
    },

    RootQuery: {
      async sequelizeMeta() {
        return SequelizeMeta.findAll()
      },
      async customers(root, args, context) {
        const admin = await Admin.findOne({
          where: {
            id: context.admin.id,
          },
        });
        if (!admin) {
          throw new Error(
            "It seems you are not registered. Sign up to start managing your customers"
          );
        }

        try {
          const customers = await Customer.findAll({
            include: [
              { association: 'customerOrder' },
              { association: 'customerUser', }
            ]
          })
          return customers
        } catch (err) {
          throw new Error(err)
        }

      },

      async customer(root, { userId }, context) {
        const customer = await Customer.findOne({
          where: {
            userId,
          },
        });
        if (!customer) {
          throw new Error("Unautharized operation could not find the customer");
        }
        return customer;
      },

      async customersSearch(root, { page, limit, text }, context) {
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        const query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
            {
              last_name: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
            {
              phone_number: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
          ],
        };

        customers = await Customer.findAll(query);


        return customers;
      },


      async stores(root, args, context) {
        const user = await context.user;
        const admin = await context.admin;
        if (!user) {
          throw new Error(
            "Make sure you are logged in to access your store"
          );
        }

        if (user.role !== "admin") {
          throw new Error("Unauthorized request.")
        }

        if (!admin) {
          throw new Error("Something went wrong fetching stores")
        }

        const query = { order: [["createdAt", "DESC"]] };
        query.where = { "$Store.adminId$": admin.id };

        const stores = await Store.findAll(query);

        if (!stores) {
          throw new Error("Add stores to view them here");
        }

        return stores;
      },

      async store(root, { storeId }, context) {
        if (!context.admin) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (!storeId) { throw new Error("Store id not found") }
        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Could not find the store");
        }

        return store;
      },

      async mpesa(root, { storeId }, context) {
        if (!storeId) {
          throw new Error("Store id is required.")
        }
        try {

          return await MpesaSetting.findOne({
            where: {
              storeId: storeId
            }
          })
        } catch {
          logger.log({
            level: "error",
            message: `Could not retrieve mpesa settings for store ${storeId}`
          })
          throw new Error("Something went wrong")
        }
      },

      async stripe(root, { storeId }, context) {
        if (!storeId) {
          throw new Error("Store id is required.")
        }
        try {

          return await StripeSetting.findOne({
            where: {
              storeId: storeId
            }
          })
        } catch {
          logger.log({
            level: "error",
            message: `Could not retrieve stripe settings for store ${storeId}`
          })
          throw new Error("Something went wrong")
        }
      },

      async billboards(root, { storeId }, context) {

        try {

          const billboards = Billboard.findAll();

          if (!billboards) {
            throw new Error("This store has no billboards yet");
          }
          return billboards ?? [];
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occurred for ${admin.id} while querying for billboards`,
          });
          throw new Error(
            "Something went wrong while getting your billboards",
            error
          );
        }
      },

      async billboard(root, { billboardId }, context) {
        try {
          const billboard = await Billboard.findOne({
            where: {
              id: billboardId,
            },
          });

          if (!billboard) {
            throw new Error("Could not find the billboard");
          }

          return billboard;
        } catch (error) {
          throw new Error("Something went wrong", error);
        }
      },

      async categories(root, { storeId }, context) {
        try {
          let categories

          if (storeId) {
            categories = await Category.findAll({
              where: {
                storeId: storeId,
              },
            });
          } else {
            categories = await Category.findAll();
          }

          if (!categories) {
            throw new Error("This billboard has no categories yet");
          }
          return categories;
        } catch (error) {
          console.log(error)
          logger.log({
            level: "error",
            message: `An error occurred for  while querying for categories`,
          });
          throw new Error(
            "Something went wrong while getting your categories",
            error
          );
        }
      },

      async category(root, { categoryId }, context) {
        try {
          if (!categoryId) {
            throw new Error("Category Id is required");
          }

          const category = await getCategory(Category, categoryId);

          if (!category) {
            throw new Error("Could not find the category");
          }

          return category;
        } catch (error) {
          throw new Error("Something went wrong", error);
        }
      },


      async sizes(root, { storeId }, context) {
        if (!storeId) {
          throw new Error("Billboard id is required.");
        }
        const store = await getStore(Store, storeId, context.admin.id);
        if (!store) {
          throw new Error("Unauthorized operation");
        }

        const sizes = Size.findAll({
          where: {
            storeId: store.id,
          },
        });

        if (!sizes) {
          throw new Error("This billboard has no categories yet");
        }
        return sizes;
      },

      async size(root, { sizeId }, context) {
        const size = await getSize(Size, sizeId);

        if (!size) {
          throw new Error("Could not find the category");
        }

        const store = await getStore(Store, size.storeId, context.admin.id);


        if (!store) {
          throw new Error("Unauthaurized operation");
        }
        return size;
      },

      async colors(root, { storeId }, context) {
        if (!storeId) {
          throw new Error("store id is required.");
        }

        const colors = await Color.findAll({
          where: {
            storeId,
          },
        });


        if (!colors) {
          throw new Error("This store has no colors yet");
        }
        return colors;
      },

      async color(root, { colorId }, context) {
        const color = await Color.findOne({
          where: {
            id: colorId
          }
        });

        if (!color) {
          throw new Error("Could not find the category");
        }

        const store = await getStore(Store, color.storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }
        return color;
      },

      async products(
        root,
        { storeId, categoryId, isFeatured },
        context
      ) {
        let filter = {};
        if (storeId) {
          filter = { ...filter, storeId }
        }
        if (categoryId) {
          filter = { ...filter, categoryId }
        }
        if (isFeatured) {
          filter = { ...filter, isFeatured }
        }

        const products = await Product.findAll({
          where: filter,
          include: ["colors", "images", "sizes", "category", "store"],
        });


        return products;
      },

      async productsByCategory(
        root,
        { categoryId },
        context
      ) {
        const filter = { categoryId };

        const products = await Product.findAll({
          where: filter,
          include: [
            { model: Category, as: 'category' },
            { model: Color, as: 'colors' },
            { model: Size, as: 'sizes' },
            { model: Image, as: "images" }
          ]
        })

        return products;
      },

      async productsWithCategory(root, { page, limit }, context) {
        const products = await Product.findAll({
          include: [
            { model: Category, as: 'category' },
            { model: Color, as: 'colors' },
            { model: Size, as: 'sizes' },
            { model: Image, as: "images" }
          ]
        });

        const grouped = products.reduce((acc, product) => {
          const categoryName = product.category.name; // Access category name
          const categoryId = product.category.id;
          if (!acc[categoryName]) {
            acc[categoryName] = {
              categoryName,
              categoryId,
              products: [],
            };
          }
          acc[categoryName].products.push(product);
          return acc;
        }, {});

        return Object.values(grouped);
      },

      async productsIds(root, { storeId, productIds }, context) {
        let filter = {};
        if (storeId) {
          filter = { ...filter, storeId }
        }

        const products = Product.findAll({
          where: {
            id: productIds,
            storeId: storeId,
          },
          order: [["updatedAt", "ASC"]],
        });

        if (!products) {
          throw new Error("This billboard has no categories yet");
        }
        return products;
      },

      async product(root, { productId }, context) {
        if (!productId) {
          throw new Error("Product Id is required");
        }
        const product = await Product.findOne({
          where: {
            id: productId,
          },
          include: ["images", "category", "colors", "sizes"],
        });

        if (!product) {
          throw new Error("Could not find the product");
        }

        return product;
      },

      async productSearch(root, { page, limit, text, storeId }, context) {
        console.log("HERE", text)
        // if text length less than three skip
        let products = [];
        if (text.length < 3) {
          return {
            products,
          };
        }

        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        const query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }

        query.where = {
          [Op.or]: [
            {
              name: { [Op.iLike]: `%${text}%` },
            },
          ],
        };

        products = await Product.findAll(query);

        console.log("products", products)
        if (products.length === 0) {
          throw new Error(`No results found for "${text}"`);
        }

        return products
      },

      async customerSearch(root, { page, limit, text }, context) {
        const admin = context.admin
        if (!admin) throw new Error("Unauthenticated ensure you are logged in first.")
        // if text length less than three skip
        let customers = [];
        if (text.length < 3) {
          return {
            customers,
          };
        }

        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }

        const query = {
          order: [["createdAt", "DESC"]],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }


        query.where = {
          [Op.or]: [
            {
              first_name: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
            {
              last_name: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
            {
              phone_number: { [Op.iLike]: `%${text}%` },
              userId: context.admin.id,
            },
          ],
        };

        customers = await Customer.findAll(query);
        if (customers.length === 0) {
          throw new Error(`No results found for "${text}"`);
        }

        return customers
      },

      async orders(root, __, context) {
        if (!context.admin) {
          throw new Error(
            "Unauthenticated please make sure you are logged in."
          );
        }

        const orders = await Order.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              association: "customerOrder",
            },
            {
              association: "deliveryAddress",
              include: [
                {
                  association: "deliveryZoneLocation"
                },
                {
                  association: "deliveryPickupMtaani"
                }
              ]
            },
            {
              association: "transactions",
            },
            {
              association: "orderItems",
              include: {
                association: "orderProduct",
              },
            },
          ],
        });

        return orders;
      },
      async ordersByCustomer(root, { customerId }, context) {
        console.log(context)
        // if (!context.user) {
        //   throw new Error(
        //     "Unauthenticated please make sure you are logged in."
        //   );
        // }

        const orders = await Order.findAll({
          where: {
            customerId
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              association: "customerOrder",
            },
            {
              association: "deliveryAddress",
              include: [
                {
                  association: "deliveryPickupMtaani",
                },
                {
                  association: "deliveryZoneLocation",
                  include: {
                    association: "zone"
                  }
                }
              ]
            },
            {
              association: "orderItems",
              include: {
                association: "orderProduct",
              },
            },
          ],
        });

        return orders;
      },

      async order(root, { orderId }, context) {
        if (!context.admin) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (!orderId) {
          throw new Error("Size Id is required");
        }
        const order = await Order.findOne({
          where: {
            id: orderId,
          },
          include: [
            {
              as: "images",
              model: Image,
            },
          ],
        });
        if (!order) {
          throw new Error("Could not find the category");
        }
        const store = await getStore(
          Store,
          order.storeId,
          context.admin.id
        );
        if (!store) {
          throw new Error("Unauthaurized operation");
        }
        return order;
      },

      async zones(root, context) {
        try {
          const zones = await Zone.findAll({
            include: {
              association: "locations"
            }
          })
          return zones
        } catch (error) {
          console.log(error)
          throw new Error("Failed to get all zones")
        }
      },

      async zone(root, { zoneId }, context) {
        try {
          return await Zone.findOne({
            where: {
              id: zoneId
            },
            include: {
              association: "locations"
            }
          })
        } catch (error) {
          throw new Error("Could not find zone")
        }
      },

      async locations(root, context) {
        try {
          const locations = await ZoneLocation.findAll({
            include: {
              association: "zone"
            }
          })
          return locations
        } catch (error) {
          throw new Error("Failed to get all locations")
        }
      },

      async location(root, { locationId }, context) {
        try {
          return await ZoneLocation.findOne({
            where: {
              id: locationId
            },
            include: {
              association: "zone"
            }
          })
        } catch (error) {
          throw new Error("Could not find location")
        }
      },

      async pickupMtaanis(root, context) {
        try {
          const locations = await PickupMtaani.findAll()
          return locations
        } catch (error) {
          console.log(error)
          throw new Error("Failed to get all pickup mtaanis")
        }
      },

      async deliveryAddresses(root, { customerId }, context) {
        try {
          return await DeliveryAddress.findAll({
            where: {
              customerId: customerId
            },
            include: [
              {
                association: "deliveryPickupMtaani",
              },
              {
                association: "deliveryZoneLocation",
                include: {
                  association: "zone"
                }
              }
            ]
          })
        } catch (error) {
          console.log(error)
          throw new Error("Failed to fetch delivery addresses")
        }
      }
    },

    RootMutation: {
      async addCustomer(root, { customer }, context) {
        const merchantsRow = await Admin.findOne({
          where: {
            id: context.admin.id,
          },
        });

        // check if a customer does exist with the same phone number
        const existingCustomer = await Customer.findOne({
          where: {
            phone_number: customer.phone_number,
            userId: merchantsRow.id,
          },
        });

        // update the customer
        if (existingCustomer) {
          await Customer.update(
            {
              ...customer,
            },
            {
              where: {
                phone_number: customer.phone_number,
                userId: merchantsRow.id,
              },
            }
          ).then((customer) => {
            logger.log({
              level: "info",
              message: "customer updated",
            });
            return customer;
          });
        } else {
          // create the new customer
          return await Customer.create({
            ...customer,
          }).then(async (newCustomer) => {
            await Promise.all([newCustomer.setMerchant(merchantsRow.id)]);
            logger.log({
              level: "info",
              message: "Customer was created",
            });
            return newCustomer;
          });
        }
      },

      async addStore(root, { store }, context) {
        const admin = context.admin;

        if (admin) {
          const existingStore = await Store.findOne({
            where: {
              name: store.name,
              adminId: admin.id,
            },
          });

          if (existingStore) {
            throw new Error(
              `Store of name "${existingStore.name}" already exists. Use a different name to create a new store`
            );
          }

          const newStore = await Store.create({
            ...store,
            adminId: admin.id
          }).then(async (newStore) => {
            return Promise.all([newStore.setAdmin(admin.id)]).then(() => {
              logger.log({
                level: "info",
                message: `Store of admin ${admin.id}`,
              });

              return newStore;
            });
          });

          return newStore;
        }
      },

      async updateStore(root, { storeId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }

        let store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unathorized operation could not find the store");
        }

        const duplicateStore = await getDupStore(
          Store,
          payload.name,
          context.admin.id
        );

        if (duplicateStore) {
          if (store.id !== duplicateStore.id) {
            throw new Error(`Store of name "${payload.name}" already exists.`);
          }
        }

        try {
          const id = await Store.update(
            {
              ...store,
              name: payload.name,
            },
            {
              where: {
                id: Number.parseInt(storeId),
                adminId: context.admin.id,
              },
            }
          );

          if (id[0] === 0) {
            throw new Error("Update failed");
          }

          store = await getStore(Store, storeId, context.admin.id);

        } catch (error) {
          console.log("[UPDATING STORE ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A store of the give name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }

        return store;
      },

      // async deleteStore(root, { storeId }, context) {
      //   if (!context.admin) {
      //     throw new Error("Unauthorized make sure you are logged in.");
      //   }

      //   const store = await getStore(Store, storeId, context.admin.id);

      //   if (!store) {
      //     throw new Error("Unauthorized operation");
      //   }
      //   try {
      //     const store = await Store.destroy({
      //       where: {
      //         id: storeId,
      //         userId: context.admin.id,
      //       },
      //     });
      //   } catch (error) {
      //     console.log(error);
      //     return false;
      //   }
      //   return true;
      // },

      async addBillboard(root, { billboard }, context) {
        console.log("Creating billboard".bgBlue, billboard);
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to create a billboard"
          );
        }

        // find the users store
        const store = await getStore(
          Store,
          billboard.storeId,
          context.admin.id
        );

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        const existBillboard = await Billboard.findOne({
          where: {
            storeId: store.id,
            label: billboard.label,
          },
        });

        if (existBillboard) {
          throw new Error(
            `Billboard of name ${billboard.label} already exists.`
          );
        }

        try {
          const newBillboard = await Billboard.create({
            ...billboard,
          });
          return newBillboard;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating billboard for ${admin.id
              } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error(
            "Could not create a billboard try again later",
            error
          );
        }
      },

      async updateBillboard(root, { billboardId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!billboardId) {
          throw new Error("Billboard id is required");
        }

        if (!payload.storeId) {
          throw new Error("Unauthorized operation");
        }

        const store = await getStore(
          Store,
          payload.storeId,
          context.admin.id
        );

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        const billboard = await Billboard.findOne({
          where: {
            id: billboardId,
            storeId: store.id,
          },
        });

        // console.log(billboard);
        if (!billboard) {
          throw new Error("Could not find the billboard");
        }

        const duplicateBillboard = await getDupBillboard(
          Billboard,
          payload.label,
          store.id
        );

        if (duplicateBillboard) {
          if (billboard.id !== duplicateBillboard.id) {
            throw new Error(
              `Billboard of name "${payload.label}" already exists.`
            );
          }
        }

        try {
          if (!payload.label) {
            throw new Error("Label is required");
          }
          if (!payload.imageUrl) {
            throw new Error("Image Url is required");
          }

          const id = await Billboard.update(
            {
              ...billboard,
              label: payload.label,
              imageUrl: payload.imageUrl,
            },
            {
              where: {
                id: Number.parseInt(billboard.id),
                storeId: billboard.storeId,
              },
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed.");
          }

          const updatedBillboard = await getBillboard(Billboard, billboardId);
          return updatedBillboard;
        } catch (error) {
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A billboard of the give name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteBillboard(root, { billboardId, storeId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!billboardId) {
          throw new Error("Billboard ID is requreid");
        }

        if (!storeId) {
          throw new Error("Unauthorized operation store Id does not match");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        const billboard = await Billboard.findOne({
          where: {
            id: billboardId,
            storeId: store.id,
          },
        });
        if (!billboard) {
          throw new Error("Could not find the billboard.");
        }
        try {
          const billboard = await Billboard.destroy({
            where: {
              id: billboardId,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addCategory(__, { category }, context) {
        console.log(category)
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }


        const existingCategory = await Category.findOne({
          where: {
            name: category.name
          },
        });

        if (existingCategory) {
          throw new Error(
            `Category of name ${existingCategory.name} already exists.`
          );
        }

        try {
          const newCategory = await Category.create({
            ...category,
          }).then((newCategory) => {
            return newCategory;
          });
          return newCategory;
        } catch (error) {
          console.log(category)
          logger.log({
            level: "error",
            message: `An error occured while creating category for ${admin.id
              } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error("Could not create a category try again later", error);
        }
      },

      async updateCategory(root, { categoryId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!categoryId) {
          throw new Error("Cateory id is required.");
        }
        if (!payload.name) {
          throw new Error("A name is required");
        }


        const category = await Category.findOne({
          where: {
            id: categoryId,
          },
        });
        if (!category) {
          throw new Error("Could not find the category.");
        }


        const store = await getStore(
          Store,
          category.id
        );
        if (!store) {
          throw new Error("Unauthorized operation.");
        }


        try {
          const id = await Category.update(
            {
              ...category,
              name: payload.name,
            },
            {
              where: {
                id: Number.parseInt(categoryId),
              },
            }
          );
          if (id[0] === 0) {
            throw new Error("Update failed");
          }
          const updatedCategory = await getCategory(Category, categoryId);
          return updatedCategory;
        } catch (error) {
          if (error.validatorKey === "not_unique") {
            throw new Error(
              `A category of the given name ${payload.name} already exists`
            );
          }
          logger.log({
            level: "error",
            message: `update store for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteCategory(root, { categoryId, storeId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!categoryId) {
          throw new Error("Category ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store Id id required");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const category = await Category.destroy({
            where: {
              id: categoryId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addProduct(root, { product }, context) {
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!product.name) {
          throw new Error("Product name is required");
        }
        if (!product.price) {
          throw new Error("product price is required");
        }
        if (!product.categoryId) {
          throw new Error("Product's category id is required");
        }
        if (!product.storeId) {
          throw new Error("Product's store id is required");
        }
        if (!product.images || !product.images.length) {
          throw new Error("Product images is required.");
        }

        const store = await getStore(Store, product.storeId, admin.id);

        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        const existingProduct = await Product.findOne({
          where: {
            name: product.name,
            categoryId: product.categoryId,
            storeId: product.storeId,
          },
        });

        if (existingProduct) {
          throw new Error(
            `Product of name ${existingProduct.name} already exists.`
          );
        }

        const formattedImages = product.images.map((image) => ({
          ...image,
          storeId: product.storeId,
        }));


        try {
          const newProduct = await Product.create(
            {
              ...product,
              images: formattedImages,
            },
            {
              include: [
                {
                  association: "images",
                },
                {
                  association: "sizes",
                },
                {
                  association: "colors",
                },
              ],
            }
          ).then((newProduct) => {
            newProduct.setStore(store.id);
            return newProduct;
          });

          return newProduct;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating product for ${admin.id
              } at ${new Date().toLocaleDateString()}`,
          });
          console.log(error);
          throw new Error("Could not create a product try again later", error);
        }
      },

      async updateProduct(root, { productId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!productId) {
          throw new Error("Product id is required.");
        }
        if (!payload.name) {
          throw new Error("A product name is required");
        }
        if (!payload.storeId) {
          throw new Error("Store id is required");
        }
        if (!payload.categoryId) {
          throw new Error("Category id is required");
        }
        if (!payload.images || !payload.images.length) {
          throw new Error("Product images are required.");
        }

        const product = await getProduct(Product, productId);
        if (!product) {
          throw new Error("Could not find product.");
        }

        const store = await getStore(Store, product.storeId, context.admin.id);
        if (!store) {
          throw new Error("Unauthorized operation.");
        }

        const duplicateProduct = await getDupProduct(Product, payload.name, product.categoryId);
        if (duplicateProduct && product.id !== duplicateProduct.id) {
          throw new Error(`Product with name "${payload.name}" already exists for this store.`);
        }

        try {
          await Product.update(payload, { where: { id: productId } });

          /** Handle Images **/
          const existingImages = await Image.findAll({ where: { productId } });
          const existingImageMap = new Map(existingImages.map(img => [img.url, img.id]));

          const imagesToDelete = existingImages
            .filter(img => !payload.images.some(newImg => newImg.url === img.url))
            .map(img => img.id);

          await Image.destroy({ where: { id: imagesToDelete } });

          const imagesToUpsert = payload.images.map(img => ({
            id: existingImageMap.get(img.url) || undefined,  // If image exists, use ID, else create new
            ...img,
            productId,
          }));

          await Image.bulkCreate(imagesToUpsert, { updateOnDuplicate: ["url"] });

          /** Handle Colors **/
          if (payload.colors) {
            await Color.destroy({ where: { productId } });
            await Color.bulkCreate(payload.colors.map(color => ({ ...color, productId })));
          }

          /** Handle Sizes **/
          if (payload.sizes) {
            await Size.destroy({ where: { productId } });
            await Size.bulkCreate(payload.sizes.map(size => ({ ...size, productId })));
          }

          const updatedProduct = await Product.findByPk(productId, {
            include: ["images", "sizes", "colors"],
          });

          return updatedProduct;
        } catch (error) {
          console.error("[UPDATING PRODUCT ERROR]", error);
          if (error.validatorKey === "not_unique") {
            throw new Error(`A category with the name ${payload.name} already exists`);
          }
          logger.log({
            level: "error",
            message: `Update product failed for ${context.admin.id} on ${new Date().toLocaleDateString()}`,
          });
        }
      },


      async deleteProduct(root, { productId, storeId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!productId) {
          throw new Error("Product ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store ID is required");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const product = await Product.destroy({
            where: {
              id: productId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addImage(root, { image }, context) {
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to create a billboard"
          );
        }

        // find the users store
        const store = await getStore(Store, image.storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        try {
          const newImage = await Image.create({
            ...image,
          });
          return newImage;
        } catch (error) {
          logger.log({
            level: "error",
            message: `An error occured while creating image for ${admin.id
              } at ${new Date().toLocaleDateString()}`,
          });
          throw new Error(
            "Could not create a new image try again later",
            error
          );
        }
      },

      async deleteImage(root, { imageId, storeId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!imageId) {
          throw new Error("Image ID is requreid");
        }

        if (!storeId) {
          throw new Error("Store ID is required");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthaurized operation");
        }

        try {
          const image = await Image.destroy({
            where: {
              id: imageId,
              storeId: store.id,
            },
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return true;
      },

      async addDeliveryAddress(root, { deliveryAddress }, context) {
        const customer = context.customer;
        if (!customer) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add address"
          );
        }

        try {
          if (deliveryAddress.type === "PICK_AND_DROP") {
            const newDeliveryAddress = await DeliveryAddress.create({
              ...deliveryAddress,
              customerId: customer.id,
              zoneLocationId: deliveryAddress.zoneLocationId
            }, {
              include: {
                model: Customer
              }
            })
            return newDeliveryAddress
          }
          if (deliveryAddress.type === "CUSTOM") {
            const newDeliveryAddress = await DeliveryAddress.create({
              ...deliveryAddress,
              customerId: customer.id,
              ...deliveryAddress.customAddress
            }, {
              include: {
                model: Customer
              }
            })
            return newDeliveryAddress
          }
          if (deliveryAddress.type === "PICKUP_MTAANI") {
            const newDeliveryAddress = await DeliveryAddress.create({
              ...deliveryAddress,
              customerId: customer.id,
              pickupMtaaniId: deliveryAddress.pickupMtaaniId
            }, {
              include: {
                model: Customer
              }
            })
            return newDeliveryAddress
          }

        } catch (err) {

          console.log(err)
          throw new Error("Failed to add deliveryAddress", err.message)
        }
      },

      // The order is registered using customer's phone number
      async addOrder(root, { order }, context) {

        const user = context.user
        const customer = context.customer
        // console.log(customer, "\n", user, "\n", admin)

        if (!user) {
          throw new Error("Unauthenticated")
        }
        if (!customer) {
          throw new Error("Please create an account as a customer to place orders")
        }

        try {
          const newOrder = await Order.create(
            {
              ...order,
              customerId: customer.id,
              status: "RECEIVED",
              orderNumber: generateOrderId(),
              paymentStatus: "NOT_PAID",
            },
            {
              include: [
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            }
          ).then((newOrder) => {

            return newOrder

          });

          return newOrder;
        } catch (err) {
          console.log(err)
        }

      },

      async addTransaction(root, { transaction }, context) {

        const order = await Order.findByPk(transaction.orderId)

        try {
          if (!order) {
            logger.log({
              message: `${(new Date()).toLocaleDateString()} Could not fid order id to update transaction` + transaction.orderId + ""
            })
          } else {
            const newTransaction = await Transaction.create({
              ...transaction,
            })

            const paidAmount = (order?.amountPaid ?? 0) + transaction.amount;
            const totalDue = order.orderAmount + (order?.deliveryAmount ?? 0);

            const updatedOrder = await Order.update(
              {
                ...order,
                amountPaid: paidAmount,
                paymentStatus: paidAmount >= totalDue ? "FULL" : "PARTIAL",
              },
              {
                where: {
                  id: order.id,
                },
                returning: true,
                plain: true,
              }
            ).then((result) => {
              return result[1]
            })

            return newTransaction
          }
        } catch (error) {
          console.log(error)
          logger.log({
            level: "error",
            message: `${(new Date()).toLocaleDateString()} Error in Transaction ${error}`
          })
        }
      },

      async updateOrderCheckout(root, { storeId, orderId, payload }, context) {
        if (!orderId) {
          throw new Error("Order id is required");
        }

        if (!storeId) {
          throw new Error("Unauthorized operation");
        }

        const store = await getStore(Store, storeId);

        if (!store) {
          throw new Error("Unauthorized operation");
        }

        const order = await Order.findOne({
          where: {
            id: orderId,
            storeId: store.id,
          },
        });

        if (!order) {
          throw new Error("Could not find the order");
        }

        try {
          const updatedOrder = await Order.update(
            {
              ...order,
              isPaid: payload.isPaid,
              address: payload.address,
              phone: payload.phone_number,
              status: payload.isPaid ? "CONFIRMED" : "PENDING",
            },
            {
              where: {
                id: Number.parseInt(order.id),
                storeId: storeId,
              },
              returning: true,
              plain: true,
            },
            {
              include: ["orderItems"],
            }
          ).then(async (result) => {
            return await Order.findOne({
              where: {
                id: result[1].id,
              },
              include: [
                {
                  association: "customerOrder",
                },
                {
                  association: "orderItems",
                  include: {
                    association: "orderProduct",
                  },
                },
              ],
            });
          });
          return updatedOrder;
        } catch (error) {
          logger.log({
            level: "error",
            message: `update orderItesm for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      // ########## Updating from a admin physically to remove order items
      async updateOrder(root, { orderId, payload }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }
        if (!orderId) {
          throw new Error("Order id is required");
        }

        let order = await Order.findOne({
          where: {
            id: orderId,
          },
        });

        if (!order) {
          throw new Error("Could not find the order");
        }

        try {
          const updatedOrder = await Order.update(
            {
              ...order,
              ...payload
            },
            {
              where: {
                id: order.id,
              },
              returning: true,
              plain: true,
            },
            {
              include: ["orderItems"],
            }
          ).then((result) => {
            return result[1]
          })
          return updatedOrder;
        } catch (error) {
          console.log("EROR", error)
          logger.log({
            level: "error",
            message: `update order for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
          throw new Error("Failed to update order", error.message)
        }
      },
      async addMpesa(root, { mpesa }, context) {
        const admin = context.admin;

        if (!admin)
          throw new Error("Unathenticated please make sure you are logged in.");

        const store = await getStore(Store, mpesa.storeId, admin.id)
        if (!store) {
          throw new Error("Unauthorized operation.")
        }

        const exisistingMpesa = await MpesaSetting.findOne({
          where: {
            storeId: mpesa.storeId
          }
        })
        if (exisistingMpesa)
          throw new Error(`A store can only have one Mpesa payment service. ${store.name} has an existing mpesa payment service. Update or delete.`);

        try {
          const newMpesa = await MpesaSetting.create({
            ...mpesa,
          })

          return newMpesa;
        } catch {
          logger.log({
            level: "error",
            message: `Failed to create mpesa for ${admin.id}`
          })
          throw new Error("Failed to create mpesa settings.")
        }
      },

      async updateMpesa(root, { mpesaId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }
        if (!payload.storeId) {
          throw new Error(
            "Store Id is required"
          );
        }
        const store = await getStore(Store, payload.storeId, context.admin.id);

        if (!store) {
          throw new Error("Unathorized operation could not find the store");
        }


        const mpesa = await MpesaSetting.findOne({
          where: {
            id: mpesaId,
            storeId: payload.storeId
          }
        })

        if (!mpesa) {
          throw new Error("Could not find Mpesa settings")
        }

        try {
          const updatedMpesa = await MpesaSetting.update(
            {
              ...mpesa,
              consumer_key: payload.consumer_key,
              consumer_secret: payload.consumer_secret,
              pass_key: payload.pass_key,
              business_shortcode: payload.business_shortcode,
              account_reference: payload.account_reference,
              transaction_desc: payload.transaction_desc,
              callback_url: payload.callback_url,
            },
            {
              where: {
                id: Number.parseInt(mpesaId),
                storeId: payload.storeId,
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          });
          return updatedMpesa
        } catch (error) {
          logger.log({
            level: "error",
            message: `update mpesa for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteMpesa(root, { mpesaId, storeId }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }


        try {
          await MpesaSetting.destroy({
            where: {
              storeId: storeId,
              id: mpesaId,
            },
          });
        } catch (error) {
          return "failed";
        }
        return "success";
      },

      async addStripe(root, { stripe }, context) {
        const admin = context.admin;

        if (!admin)
          throw new Error("Unathenticated please make sure you are logged in.");

        const store = await getStore(Store, stripe.storeId, admin.id)
        if (!store) {
          throw new Error("Unauthorized operation.")
        }

        const existingStripe = await StripeSetting.findOne({
          where: {
            storeId: stripe.storeId
          }
        })
        if (existingStripe)
          throw new Error(`A store can only have one Stripe payment service. ${store.name} has an existing stripe payment service. Update or delete.`);

        try {
          const newStripe = await StripeSetting.create({
            ...stripe,
          })

          return newStripe;
        } catch {
          logger.log({
            level: "error",
            message: `Failed to create stripe for ${admin.id}`
          })
          throw new Error("Failed to create stripe settings.")
        }
      },

      async updateStripe(root, { stripeId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthenticated please make sure you are logged in");
        }
        if (!payload.storeId) {
          throw new Error(
            "Store Id is required"
          );
        }
        const store = await getStore(Store, payload.storeId, context.admin.id);

        if (!store) {
          throw new Error("Unathorized operation could not find the store");
        }


        const stripe = await StripeSetting.findOne({
          where: {
            id: stripeId,
            storeId: payload.storeId
          }
        })

        if (!stripe) {
          throw new Error("Could not find stripe settings")
        }

        try {
          const updatedStripe = await StripeSetting.update(
            {
              ...stripe,
              api_key: payload.api_key,
              callback_url: payload.callback_url,
              webhook_secret: payload.webhook_secret,
            },
            {
              where: {
                id: Number.parseInt(stripeId),
                storeId: payload.storeId,
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          });
          return updatedStripe
        } catch (error) {
          logger.log({
            level: "error",
            message: `update stripe for ${context.admin.id
              } failed ${new Date().toLocaleDateString()}`,
          });
        }
      },

      async deleteStripe(root, { stripeId, storeId }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }

        const store = await getStore(Store, storeId, context.admin.id);

        if (!store) {
          throw new Error("Unauthorized operation");
        }


        try {
          await StripeSetting.destroy({
            where: {
              storeId: storeId,
              id: stripeId,
            },
          });
        } catch (error) {
          return "failed";
        }
        return "success";
      },

      async addZone(root, { zone }, context) {
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!zone.name) {
          throw new Error("Zone name is required.");
        }
        if (!zone.standardTime) {
          throw new Error("Zone standard time is required.");
        }
        if (!zone.standardPrice) {
          throw new Error("Zone standard price is required.")
        }
        if (!zone.expressPrice) {
          throw new Error("Zone express price is required.")
        }
        try {
          const newZone = await Zone.create({
            ...zone,
            name: cleanString(zone.name)
          })
          return newZone
        } catch (err) {
          if (err.name === "SequelizeUniqueConstraintError") {
            throw new Error(`There is an existing zone with the name ${zone.name} zone name must be unique`)
          }
          throw new Error("Failed to add zone", err.message)
        }
      },

      async updateZone(root, { zoneId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!zoneId) {
          throw new Error("Zone id is required.");
        }

        const zone = await Zone.findOne({
          where: {
            id: zoneId,
          },
        });
        if (!zone) {
          throw new Error("Could not find zone to update.");
        }

        const { id, ...rest } = zone

        try {
          const updatedZone = await Zone.update(
            {
              ...rest,
              ...payload,
              name: cleanString(payload.name)
            },
            {
              where: {
                id: Number.parseInt(zoneId),
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          })
          return updatedZone
        } catch (error) {
          console.log(error)
          if (error.name === "SequelizeUniqueConstraintError") {
            logger.log({
              level: "error",
              message: `update zone for ${context.admin.id
                } failed ${new Date().toLocaleDateString()}`,
            });
            throw new Error(
              `A zone of the given name ${payload.name} already exists`
            );
          }
        }
      },

      async deleteZone(root, { zoneId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!zoneId) {
          throw new Error("Zone ID is requreid");
        }


        try {
          await Zone.destroy({
            where: {
              id: zoneId,
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      },

      async addZoneLocation(root, { location }, context) {
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }
        if (!location.address) {
          throw new Error("ZoneLocation address is required.");
        }
        if (!location.zoneId) {
          throw new Error("ZoneLocation zone is required");
        }

        try {
          const newLocation = await ZoneLocation.create({
            ...location,
            address: cleanString(location.address)
          }, { includes: ["zone"] })
          return newLocation
        } catch (err) {
          console.log(err.name)
          if (err.name === "SequelizeUniqueConstraintError") {
            throw new Error(`There is an existing location with the name ${zone.name} zone name must be unique`)
          }
          throw new Error("Failed to add location", err.message)
        }
      },

      async updateZoneLocation(root, { locationId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!locationId) {
          throw new Error("Cateory id is required.");
        }

        const location = await ZoneLocation.findOne({
          where: {
            id: locationId,
          },
        });
        if (!location) {
          throw new Error("Could not find location to update.");
        }

        const { id, ...rest } = location

        try {
          const updatedLocation = await ZoneLocation.update(
            {
              ...rest,
              ...payload,
              address: cleanString(payload.address)
            },
            {
              where: {
                id: Number.parseInt(locationId),
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          })
          return updatedLocation
        } catch (error) {
          console.log(error)
          if (error.name === "SequelizeUniqueConstraintError") {
            logger.log({
              level: "error",
              message: `update location for ${context.admin.id
                } failed ${new Date().toLocaleDateString()}`,
            });
            throw new Error(
              `A location of the given name ${payload.name} already exists`
            );
          }
        }
      },

      async deleteZoneLocation(root, { locationId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!locationId) {
          throw new Error("ZoneLocation ID is required");
        }


        try {
          await ZoneLocation.destroy({
            where: {
              id: locationId,
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      },

      async addPickupMtaani(root, { pickupMtaani }, context) {
        const admin = context.admin;
        if (!admin) {
          throw new Error(
            "Unauthenticated make sure you are logged in to add a category"
          );
        }

        try {
          const newZone = await PickupMtaani.create({
            ...pickupMtaani,
            name: cleanString(pickupMtaani.locationName)
          })
          return newZone
        } catch (err) {

          throw new Error("Failed to add pickup mtaani", err.message)
        }
      },

      async updatePickupMtaani(root, { pickupMtaaniId, payload }, context) {
        if (!context.admin) {
          throw new Error("Unauthorized make sure you are logged in.");
        }
        if (!pickupMtaaniId) {
          throw new Error("PickupMtaani id is required.");
        }

        const pickupMtaani = await PickupMtaani.findOne({
          where: {
            id: pickupMtaaniId,
          },
        });
        if (!pickupMtaani) {
          throw new Error("Could not find pickupMtaani to update.");
        }

        const { id, ...rest } = pickupMtaani

        try {
          const updatedPickupMtaani = await PickupMtaani.update(
            {
              ...rest,
              ...payload,
            },
            {
              where: {
                id: Number.parseInt(pickupMtaaniId),
              },
              returning: true,
              plain: true,
            }
          ).then((result) => {
            return result[1]
          })
          return updatedPickupMtaani
        } catch (error) {
          throw new Error(error)
        }
      },

      async deletePickupMtaani(root, { pickupMtaaniId }, context) {
        if (!context.admin.id) {
          throw new Error("Unauthenticated make sure you are logged in");
        }

        if (!pickupMtaaniId) {
          throw new Error("Pickup Mtaani ID is requreid");
        }


        try {
          await PickupMtaani.destroy({
            where: {
              id: pickupMtaaniId,
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      },


      async signupAdmin(
        root,
        { user, admin },
        context
      ) {


        return User.findAll({
          where: {
            [Op.or]: [{ phoneNumber: user.phoneNumber }],
            role: "admin"
          },
          raw: true,
        }).then(async (admins) => {
          if (admins?.length) {
            throw new Error("A user with phone number already exists please login");
          }

          return bcrypt.hash(user.password, 10).then(async (hash) => {
            return await User.create({
              ...user,
              password: hash,
            }).then(async (user) => {
              await Admin.create({
                userId: user.id,
                ...admin
              })
              const token = JWT.sign(
                { username: user.phoneNumber, role: user.role, id: user.id },
                JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );
              // set the cookies for the users browser in the context of the user
              setCookie(context, token);
              return { auth: { token }, admin, user };
            });
          });
        });
      },

      async loginAdmin(root, { user }, context) {
        return User.findOne({
          where: {
            phoneNumber: user.phoneNumber,
            role: 'admin'
          },
          raw: true,
        }).then(async (foundUser) => {
          if (!foundUser) throw new Error("No user with phone number found please create an account")

          const passwordValid = await bcrypt.compare(
            user.password,
            foundUser.password
          );
          if (!passwordValid) {
            throw new Error("Password or username does not match");
          }

          const admin = await Admin.findOne({
            where: {
              userId: foundUser.id
            }
          })

          const token = JWT.sign({ username: foundUser.phoneNumber, role: foundUser.role, id: foundUser.id }, JWT_SECRET, {
            expiresIn: "1d",
          });

          setCookie(context, token);
          return { auth: { token }, user: foundUser, admin };

        });
      },

      logoutMerchant(root, params, context) {
        const logout = true;
        setCookie(context, logout); //remove the cookie from clients context
        return {
          message: true,
        };
      },

      async signupCustomer(
        root,
        { user, customer },
        context
      ) {

        return User.findAll({
          where: {
            [Op.or]: [{ phoneNumber: user.phoneNumber }],
            role: "customer"
          },
          raw: true,
        }).then(async (customers) => {
          if (customers?.length) {
            throw new Error("A user with phone number already exists");
          }
          return bcrypt.hash(user.password, 10).then(async (hash) => {
            return await User.create({
              ...user,
              password: hash,
            }).then(async (user) => {
              const newCustomer = await Customer.create({
                userId: user.id,
                ...customer
              })
              if (!newCustomer) {
                throw new Error("Something went wrong could not find cutomer information")
              }
              const token = JWT.sign(
                { phoneNumber: user.phoneNumber, role: user.role, id: user.id, customerId: newCustomer.id, name: newCustomer.name },
                JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );
              // set the cookies for the users browser in the context of the user
              setCookie(context, token);
              return { auth: { token }, customer, user };
            });
          });
        });
      },

      async loginCustomer(root, { user }, context) {
        try {
          return User.findOne({
            where: {
              phoneNumber: user.phoneNumber,
              role: "customer"
            },
            raw: true,
          }).then(async (foundUser) => {
            if (!foundUser) throw new Error("No user with phone number found please create an account")

            const passwordValid = await bcrypt.compare(
              user.password,
              foundUser.password
            );
            if (!passwordValid) {
              throw new Error("Password or username does not match");
            }

            const customer = await Customer.findOne({
              where: {
                userId: foundUser.id
              }
            })

            if (!customer) {
              throw new Error("Something went wrong could not find cutomer information")
            }

            const token = JWT.sign({ phoneNumber: user.phoneNumber, role: foundUser.role, id: foundUser.id, customerId: customer?.id, name: customer.name }, JWT_SECRET, {
              expiresIn: "1d",
            });

            setCookie(context, token);
            return { auth: { token }, user: foundUser, customer };

          });
        } catch (err) {
          console.log(err)
        }

      },
    },

    //   RootSubscription: {
    //     messageAdded: {
    //       subscribe: withFilter(
    //         () => pubsub.asyncIterator(["messageAdded"]),
    //         async (payload, variables) => {
    //           return payload.messageAdded.message.chatId === variables.chatId;
    //         }
    //       ),
    //     },
    //     chatAdded: {
    //       // subscribe: () => pubsub.asyncIterator(["chatAdded"]),
    //       subscribe: withFilter(
    //         () => pubsub.asyncIterator(["chatAdded"]),
    //         async (payload, variables) => {
    //           console.log("variables", variables);
    //           console.log("subscribed admin", variables.userId);
    //           console.log("The payload for", payload.chatAdded.userId);
    //           return payload.chatAdded.userId === variables.userId;
    //         }
    //       ),
    //     },
    //   },
  };

  return resolvers;
}
module.exports = resolvers;
