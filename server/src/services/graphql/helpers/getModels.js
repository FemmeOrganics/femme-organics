
const getStore = async (Store, storeId, ) => {
  const store = await Store.findOne({
    where: {
      id: Number.parseInt(storeId),
    },
  });
  return store;
};

const getDupStore = async (Store, name, adminId) => {
  const store = await Store.findOne({
    where: {
      name: name,
      adminId: Number.parseInt(adminId),
    },
  });
  return store;
};

const getBillboard = async (Billboard, billboardId) => {
  const billboard = await Billboard.findOne({
    where: {
      id: Number.parseInt(billboardId),
    },
  });

  return billboard;
};

const getDupBillboard = async (Billboard, label, storeId) => {
  const billboard = await Billboard.findOne({
    where: {
      label: label,
      storeId: Number.parseInt(storeId),
    },
  });

  return billboard;
};

const getProduct = async (Product, productId) => {
  const product = await Product.findOne({
    where: {
      id: Number.parseInt(productId),
    },
  });

  return product;
};

const getDupProduct = async (Product, name, categoryId) => {
  const product = await Product.findOne({
    where: {
      name: name,
      categoryId: Number.parseInt(categoryId),
    },
  });

  return product;
};

const getCategory = async (Category, categoryId) => {
  const category = await Category.findOne({
    where: {
      id: Number.parseInt(categoryId),
    },
  });

  return category;
};

const getDupCategory = async (Category, name, billboardId) => {
  const category = await Category.findOne({
    where: {
      name: name,
      billboardId: Number.parseInt(billboardId),
    },
  });

  return category;
};


const getSize = async (Size, sizeId) => {
  const size = await Size.findOne({
    where: {
      id: Number.parseInt(sizeId),
    },
  });

  return size;
};

const getDupSize = async (Size, name, storeId) => {
  const size = await Size.findOne({
    where: {
      name: name,
      storeId: storeId,
    },
  });

  return size;
};



const getCustomer = async (Customer, customerId, adminId) => {
  const customer = await Customer.findOne({
    where: {
      id: Number.parseInt(customerId),
      adminId: Number.parseInt(adminId),
    },
  });

  return customer;
};

const getCusByNumber = async (Customer, phoneNumber, adminId) => {
  const customer = await Customer.findOne({
    where: {
      phoneNumber: phoneNumber,
      adminId: Number.parseInt(adminId),
    },
  });

  return customer;
};

module.exports = {
  getStore: getStore,
  getDupStore: getDupStore,
  getBillboard: getBillboard,
  getDupBillboard: getDupBillboard,
  getCategory: getCategory,
  getDupCategory: getDupCategory,
  getSize: getSize,
  getDupSize: getDupSize,
  getProduct: getProduct,
  getDupProduct: getDupProduct,
  getCustomer: getCustomer,
  getCusByNumber: getCusByNumber,
};
