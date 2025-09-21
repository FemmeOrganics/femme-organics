const createCustomer = async (Customer, customer, merchantId) => {
  customer = await Customer.create({
    ...customer, // whatsapp_name and the phone number
  }).then((newCustomer) => {
    newCustomer.setMerchant(merchantId);
    return newCustomer;
  });
  return customer;
};
module.exports = {
  createCustomer: createCustomer,
};
