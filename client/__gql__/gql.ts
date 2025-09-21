/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation addBillboard($billboard: BillboardInput!) {\n  addBillboard(billboard: $billboard) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}": types.AddBillboardDocument,
    "mutation AddCategory($category: CategoryInput!) {\n  addCategory(category: $category) {\n    __typename\n    id\n    name\n    store {\n      __typename\n      id\n    }\n    description\n  }\n}": types.AddCategoryDocument,
    "mutation AddColor($color: ColorInput!) {\n  addColor(color: $color) {\n    __typename\n    id\n    name\n    value\n  }\n}": types.AddColorDocument,
    "mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    name\n    __typename\n  }\n}": types.AddCustomerDocument,
    "mutation AddDeliveryAddress($deliveryAddress: DeliveryAddressInput) {\n  addDeliveryAddress(deliveryAddress: $deliveryAddress) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryPickupMtaani {\n      id\n      agentName\n      deliveryFee\n      locationName\n    }\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}": types.AddDeliveryAddressDocument,
    "mutation AddLocation($location: LocationInput!) {\n  addZoneLocation(location: $location) {\n    __typename\n    address\n    zone {\n      id\n      name\n    }\n  }\n}": types.AddLocationDocument,
    "mutation AddMpesa($mpesa: MpesaSettingInput!) {\n  addMpesa(mpesa: $mpesa) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}": types.AddMpesaDocument,
    "mutation AddOrder($order: OrderInput!) {\n  addOrder(order: $order) {\n    id\n    status\n    orderItems {\n      id\n    }\n    deliveryAddress {\n      phoneNumber\n    }\n    customerOrder {\n      name\n    }\n  }\n}": types.AddOrderDocument,
    "mutation AddPickupMtaani($pickupMtaani: PickupMtaaniInput) {\n  addPickupMtaani(pickupMtaani: $pickupMtaani) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}": types.AddPickupMtaaniDocument,
    "mutation AddProduct($product: ProductInput!) {\n  addProduct(product: $product) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    colors {\n      id\n      name\n      value\n    }\n    sizes {\n      id\n      name\n      value\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}": types.AddProductDocument,
    "mutation AddSize($size: SizeInput!) {\n  addSize(size: $size) {\n    __typename\n    id\n    name\n    value\n  }\n}": types.AddSizeDocument,
    "mutation AddStore($store: StoreInput!) {\n  addStore(store: $store) {\n    __typename\n    id\n    name\n    createdAt\n    updatedAt\n  }\n}": types.AddStoreDocument,
    "mutation AddStripe($stripe: StripeSettingInput!) {\n  addStripe(stripe: $stripe) {\n    id\n    callback_url\n    webhook_secret\n    api_key\n  }\n}": types.AddStripeDocument,
    "mutation AddTransaction($transaction: TransactionInput!) {\n  addTransaction(transaction: $transaction) {\n    phoneNumber\n    amount\n    type\n    transactionCode\n    orderTransaction {\n      id\n      amountPaid\n      orderAmount\n      orderNumber\n      paymentStatus\n    }\n  }\n}": types.AddTransactionDocument,
    "mutation AddZone($zone: ZoneInput!) {\n  addZone(zone: $zone) {\n    __typename\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}": types.AddZoneDocument,
    "query CustomerSearch($page: Int, $limit: Int, $text: String!) {\n  customerSearch(page: $page, limit: $limit, text: $text) {\n    id\n    name\n  }\n}": types.CustomerSearchDocument,
    "mutation deleteBillboard($billboardId: Int!, $storeId: Int!) {\n  deleteBillboard(billboardId: $billboardId, storeId: $storeId) {\n    response\n  }\n}": types.DeleteBillboardDocument,
    "mutation DeleteCategory($categoryId: Int!, $storeId: Int!) {\n  deleteCategory(categoryId: $categoryId, storeId: $storeId) {\n    response\n  }\n}": types.DeleteCategoryDocument,
    "mutation DeleteColor($storeId: Int!, $colorId: Int!) {\n  deleteColor(storeId: $storeId, colorId: $colorId) {\n    response\n  }\n}": types.DeleteColorDocument,
    "mutation DeleteLocation($locationId: Int!) {\n  deleteZoneLocation(locationId: $locationId) {\n    __typename\n    response\n  }\n}": types.DeleteLocationDocument,
    "mutation DeleteMpesa($mpesaId: Int!, $storeId: Int!) {\n  deleteMpesa(mpesaId: $mpesaId, storeId: $storeId) {\n    response\n  }\n}": types.DeleteMpesaDocument,
    "mutation DeletePickupMtaani($pickupMtaaniId: Int!) {\n  deletePickupMtaani(pickupMtaaniId: $pickupMtaaniId) {\n    response\n  }\n}": types.DeletePickupMtaaniDocument,
    "mutation DeleteProduct($productId: Int!, $storeId: Int!) {\n  deleteProduct(productId: $productId, storeId: $storeId) {\n    response\n  }\n}": types.DeleteProductDocument,
    "mutation deleteSize($storeId: Int!, $sizeId: Int!) {\n  deleteSize(storeId: $storeId, sizeId: $sizeId) {\n    response\n  }\n}": types.DeleteSizeDocument,
    "mutation DeleteStore($storeId: Int!) {\n  deleteStore(storeId: $storeId) {\n    response\n  }\n}": types.DeleteStoreDocument,
    "mutation DeleteStripe($stripeId: Int!, $storeId: Int!) {\n  deleteStripe(stripeId: $stripeId, storeId: $storeId) {\n    response\n  }\n}": types.DeleteStripeDocument,
    "mutation DeleteZone($zoneId: Int!) {\n  deleteZone(zoneId: $zoneId) {\n    __typename\n    response\n  }\n}": types.DeleteZoneDocument,
    "query GetAllStores {\n  stores {\n    __typename\n    id\n    name\n  }\n}": types.GetAllStoresDocument,
    "query GetBillboard($billboardId: Int!) {\n  billboard(billboardId: $billboardId) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}": types.GetBillboardDocument,
    "query GetBillboards($storeId: Int) {\n  billboards(storeId: $storeId) {\n    __typename\n    id\n    label\n    updatedAt\n    fileId\n    name\n    url\n  }\n}": types.GetBillboardsDocument,
    "query GetCategories($storeId: Int) {\n  categories(storeId: $storeId) {\n    __typename\n    id\n    name\n    updatedAt\n    description\n  }\n}": types.GetCategoriesDocument,
    "query GetCategory($categoryId: Int!) {\n  category(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    description\n  }\n}": types.GetCategoryDocument,
    "query GetColor($colorId: Int!) {\n  color(colorId: $colorId) {\n    id\n    name\n    value\n  }\n}": types.GetColorDocument,
    "query GetColors($storeId: Int!) {\n  colors(storeId: $storeId) {\n    __typename\n    id\n    name\n    value\n    updatedAt\n  }\n}": types.GetColorsDocument,
    "query GetCustomer($userId: Int!) {\n  customer(userId: $userId) {\n    id\n    name\n    createdAt\n  }\n}": types.GetCustomerDocument,
    "query GetCustomers {\n  customers {\n    id\n    name\n    createdAt\n    customerOrder {\n      id\n      orderNumber\n      customerName\n      customerPhone\n      orderAmount\n      amountPaid\n      deliveryAmount\n      type\n      status\n      paymentStatus\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetCustomersDocument,
    "query GetDeliveryAddresses($customerId: Int!) {\n  deliveryAddresses(customerId: $customerId) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    deliveryPickupMtaani {\n      id\n      agentName\n      locationName\n      deliveryFee\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}": types.GetDeliveryAddressesDocument,
    "query GetLocation($locationId: Int!) {\n  location(locationId: $locationId) {\n    id\n    address\n    createdAt\n  }\n}": types.GetLocationDocument,
    "query GetLocations {\n  locations {\n    id\n    address\n  }\n}": types.GetLocationsDocument,
    "query GetCurrentMerchant {\n  currentMerchant {\n    __typename\n    id\n    name\n  }\n}": types.GetCurrentMerchantDocument,
    "query GetMpesa($storeId: Int!) {\n  mpesa(storeId: $storeId) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n    callback_url\n  }\n}": types.GetMpesaDocument,
    "query GetOrders {\n  orders {\n    id\n    type\n    status\n    customerName\n    customerPhone\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    transactions {\n      id\n      phoneNumber\n      amount\n      type\n      transactionCode\n      createdAt\n    }\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}": types.GetOrdersDocument,
    "query GetPickupMtaanis {\n  pickupMtaanis {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}": types.GetPickupMtaanisDocument,
    "query GetProduct($productId: Int!) {\n  product(productId: $productId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    description\n    isFeatured\n    specification\n    images {\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      value\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}": types.GetProductDocument,
    "query GetProducts($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    updatedAt\n    specification\n    description\n    images {\n      __typename\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      price\n      value\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}": types.GetProductsDocument,
    "query GetProductsByCategory($categoryId: Int!) {\n  productsByCategory(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    description\n    specification\n    sizes {\n      __typename\n      id\n      name\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n    images {\n      id\n      url\n      fileId\n      name\n    }\n    category {\n      id\n      name\n    }\n  }\n}": types.GetProductsByCategoryDocument,
    "query GetProductsOfIds($productsIds: [Int], $storeId: Int) {\n  productsIds(productIds: $productsIds, storeId: $storeId) {\n    id\n    name\n    price\n  }\n}": types.GetProductsOfIdsDocument,
    "query GetProductsOnly($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isFeatured\n    updatedAt\n  }\n}": types.GetProductsOnlyDocument,
    "query GetProductsWithCategory {\n  productsWithCategory {\n    categoryName\n    categoryId\n    products {\n      __typename\n      id\n      name\n      price\n      description\n      specification\n      isFeatured\n      sizes {\n        __typename\n        id\n        name\n        price\n      }\n      colors {\n        __typename\n        id\n        name\n        value\n      }\n      category {\n        __typename\n        id\n        name\n      }\n      images {\n        id\n        url\n        fileId\n        name\n      }\n    }\n  }\n}": types.GetProductsWithCategoryDocument,
    "query GetSize($sizeId: Int!) {\n  size(sizeId: $sizeId) {\n    id\n    name\n    value\n    price\n  }\n}": types.GetSizeDocument,
    "query GetSizes($storeId: Int!) {\n  sizes(storeId: $storeId) {\n    id\n    name\n    value\n    updatedAt\n    price\n  }\n}": types.GetSizesDocument,
    "query GetStore($storeId: Int) {\n  store(storeId: $storeId) {\n    __typename\n    id\n    name\n  }\n}": types.GetStoreDocument,
    "query GetStripe($storeId: Int!) {\n  stripe(storeId: $storeId) {\n    id\n    api_key\n    webhook_secret\n    callback_url\n  }\n}": types.GetStripeDocument,
    "query GetUser {\n  user {\n    id\n    email\n    phoneNumber\n    role\n  }\n}": types.GetUserDocument,
    "query GetZone($zoneId: Int!) {\n  zone(zoneId: $zoneId) {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n    }\n  }\n}": types.GetZoneDocument,
    "query GetZones {\n  zones {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n      createdAt\n    }\n  }\n}": types.GetZonesDocument,
    "query GetOrdersByCustomer($customerId: Int!) {\n  ordersByCustomer(customerId: $customerId) {\n    id\n    type\n    status\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}": types.GetOrdersByCustomerDocument,
    "query ProductSearch($page: Int, $limit: Int, $text: String!, $storeId: Int) {\n  productSearch(page: $page, limit: $limit, text: $text, storeId: $storeId) {\n    id\n    name\n    description\n    price\n    category {\n      name\n    }\n    images {\n      fileId\n      name\n      url\n    }\n  }\n}": types.ProductSearchDocument,
    "mutation LoginAdmin($user: UserInput!) {\n  loginAdmin(user: $user) {\n    auth {\n      token\n    }\n    admin {\n      id\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}": types.LoginAdminDocument,
    "mutation LoginCustomer($user: UserInput!) {\n  loginCustomer(user: $user) {\n    auth {\n      token\n    }\n    customer {\n      id\n      name\n    }\n    user {\n      id\n      phoneNumber\n      role\n    }\n  }\n}": types.LoginCustomerDocument,
    "mutation SignUpAdmin($user: UserInput!, $admin: AdminInput!) {\n  signupAdmin(user: $user, admin: $admin) {\n    auth {\n      token\n    }\n    admin {\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}": types.SignUpAdminDocument,
    "mutation SignupCustomer($user: UserInput!, $customer: CustomerInput!) {\n  signupCustomer(user: $user, customer: $customer) {\n    auth {\n      token\n    }\n    user {\n      id\n      phoneNumber\n      email\n      role\n    }\n    customer {\n      id\n      name\n      createdAt\n    }\n  }\n}": types.SignupCustomerDocument,
    "mutation UpdateBillboard($billboardId: Int!, $payload: BillboardInput!) {\n  updateBillboard(billboardId: $billboardId, payload: $payload) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}": types.UpdateBillboardDocument,
    "mutation UpdateCategory($categoryId: Int!, $payload: CategoryInput!) {\n  updateCategory(categoryId: $categoryId, payload: $payload) {\n    __typename\n    id\n    name\n    description\n    store {\n      __typename\n      id\n    }\n  }\n}": types.UpdateCategoryDocument,
    "mutation UpdateColor($colorId: Int!, $payload: ColorInput!) {\n  updateColor(colorId: $colorId, payload: $payload) {\n    __typename\n    id\n    name\n    value\n  }\n}": types.UpdateColorDocument,
    "mutation UpdateCustomer($customerId: Int!, $payload: CustomerInput!) {\n  updateCustomer(customerId: $customerId, payload: $payload) {\n    id\n    name\n    __typename\n  }\n}": types.UpdateCustomerDocument,
    "mutation UpdateLocation($locationId: Int!, $payload: LocationUpdateInput!) {\n  updateZoneLocation(locationId: $locationId, payload: $payload) {\n    __typename\n    address\n  }\n}": types.UpdateLocationDocument,
    "mutation UpdateMpesa($mpesaId: Int!, $payload: MpesaSettingInput!) {\n  updateMpesa(mpesaId: $mpesaId, payload: $payload) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}": types.UpdateMpesaDocument,
    "mutation UpdateOrder($orderId: Int!, $payload: OrderInputUpdate!) {\n  updateOrder(orderId: $orderId, payload: $payload) {\n    id\n    orderNumber\n    customerName\n    customerPhone\n    orderAmount\n    amountPaid\n    deliveryAmount\n    type\n    status\n    paymentStatus\n    createdAt\n    updatedAt\n  }\n}": types.UpdateOrderDocument,
    "mutation UpdateOrderCheckout($orderId: Int!, $storeId: Int!, $payload: OrderCheckoutInput!) {\n  updateOrderCheckout(orderId: $orderId, storeId: $storeId, payload: $payload) {\n    id\n    status\n    paymentStatus\n    customerOrder {\n      id\n      name\n    }\n    orderItems {\n      id\n      productId\n      quantity\n    }\n  }\n}": types.UpdateOrderCheckoutDocument,
    "mutation UpdatePickupMtaani($pickupMtaaniId: Int!, $payload: PickupMtaaniInput) {\n  updatePickupMtaani(pickupMtaaniId: $pickupMtaaniId, payload: $payload) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}": types.UpdatePickupMtaaniDocument,
    "mutation UpdateProduct($productId: Int!, $payload: ProductInput!) {\n  updateProduct(productId: $productId, payload: $payload) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}": types.UpdateProductDocument,
    "mutation UpdateSize($sizeId: Int!, $payload: SizeInput!) {\n  updateSize(sizeId: $sizeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}": types.UpdateSizeDocument,
    "mutation updateStore($storeId: Int!, $payload: StoreInput!) {\n  updateStore(storeId: $storeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}": types.UpdateStoreDocument,
    "mutation UpdateStripe($stripeId: Int!, $payload: StripeSettingInput!) {\n  updateStripe(stripeId: $stripeId, payload: $payload) {\n    id\n    api_key\n    callback_url\n    webhook_secret\n  }\n}": types.UpdateStripeDocument,
    "mutation UpdateZone($zoneId: Int!, $payload: ZoneInput!) {\n  updateZone(zoneId: $zoneId, payload: $payload) {\n    __typename\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}": types.UpdateZoneDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation addBillboard($billboard: BillboardInput!) {\n  addBillboard(billboard: $billboard) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"): (typeof documents)["mutation addBillboard($billboard: BillboardInput!) {\n  addBillboard(billboard: $billboard) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddCategory($category: CategoryInput!) {\n  addCategory(category: $category) {\n    __typename\n    id\n    name\n    store {\n      __typename\n      id\n    }\n    description\n  }\n}"): (typeof documents)["mutation AddCategory($category: CategoryInput!) {\n  addCategory(category: $category) {\n    __typename\n    id\n    name\n    store {\n      __typename\n      id\n    }\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddColor($color: ColorInput!) {\n  addColor(color: $color) {\n    __typename\n    id\n    name\n    value\n  }\n}"): (typeof documents)["mutation AddColor($color: ColorInput!) {\n  addColor(color: $color) {\n    __typename\n    id\n    name\n    value\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    name\n    __typename\n  }\n}"): (typeof documents)["mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    name\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddDeliveryAddress($deliveryAddress: DeliveryAddressInput) {\n  addDeliveryAddress(deliveryAddress: $deliveryAddress) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryPickupMtaani {\n      id\n      agentName\n      deliveryFee\n      locationName\n    }\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}"): (typeof documents)["mutation AddDeliveryAddress($deliveryAddress: DeliveryAddressInput) {\n  addDeliveryAddress(deliveryAddress: $deliveryAddress) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryPickupMtaani {\n      id\n      agentName\n      deliveryFee\n      locationName\n    }\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddLocation($location: LocationInput!) {\n  addZoneLocation(location: $location) {\n    __typename\n    address\n    zone {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["mutation AddLocation($location: LocationInput!) {\n  addZoneLocation(location: $location) {\n    __typename\n    address\n    zone {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddMpesa($mpesa: MpesaSettingInput!) {\n  addMpesa(mpesa: $mpesa) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}"): (typeof documents)["mutation AddMpesa($mpesa: MpesaSettingInput!) {\n  addMpesa(mpesa: $mpesa) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddOrder($order: OrderInput!) {\n  addOrder(order: $order) {\n    id\n    status\n    orderItems {\n      id\n    }\n    deliveryAddress {\n      phoneNumber\n    }\n    customerOrder {\n      name\n    }\n  }\n}"): (typeof documents)["mutation AddOrder($order: OrderInput!) {\n  addOrder(order: $order) {\n    id\n    status\n    orderItems {\n      id\n    }\n    deliveryAddress {\n      phoneNumber\n    }\n    customerOrder {\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddPickupMtaani($pickupMtaani: PickupMtaaniInput) {\n  addPickupMtaani(pickupMtaani: $pickupMtaani) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"): (typeof documents)["mutation AddPickupMtaani($pickupMtaani: PickupMtaaniInput) {\n  addPickupMtaani(pickupMtaani: $pickupMtaani) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddProduct($product: ProductInput!) {\n  addProduct(product: $product) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    colors {\n      id\n      name\n      value\n    }\n    sizes {\n      id\n      name\n      value\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}"): (typeof documents)["mutation AddProduct($product: ProductInput!) {\n  addProduct(product: $product) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    colors {\n      id\n      name\n      value\n    }\n    sizes {\n      id\n      name\n      value\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddSize($size: SizeInput!) {\n  addSize(size: $size) {\n    __typename\n    id\n    name\n    value\n  }\n}"): (typeof documents)["mutation AddSize($size: SizeInput!) {\n  addSize(size: $size) {\n    __typename\n    id\n    name\n    value\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddStore($store: StoreInput!) {\n  addStore(store: $store) {\n    __typename\n    id\n    name\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation AddStore($store: StoreInput!) {\n  addStore(store: $store) {\n    __typename\n    id\n    name\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddStripe($stripe: StripeSettingInput!) {\n  addStripe(stripe: $stripe) {\n    id\n    callback_url\n    webhook_secret\n    api_key\n  }\n}"): (typeof documents)["mutation AddStripe($stripe: StripeSettingInput!) {\n  addStripe(stripe: $stripe) {\n    id\n    callback_url\n    webhook_secret\n    api_key\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddTransaction($transaction: TransactionInput!) {\n  addTransaction(transaction: $transaction) {\n    phoneNumber\n    amount\n    type\n    transactionCode\n    orderTransaction {\n      id\n      amountPaid\n      orderAmount\n      orderNumber\n      paymentStatus\n    }\n  }\n}"): (typeof documents)["mutation AddTransaction($transaction: TransactionInput!) {\n  addTransaction(transaction: $transaction) {\n    phoneNumber\n    amount\n    type\n    transactionCode\n    orderTransaction {\n      id\n      amountPaid\n      orderAmount\n      orderNumber\n      paymentStatus\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddZone($zone: ZoneInput!) {\n  addZone(zone: $zone) {\n    __typename\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}"): (typeof documents)["mutation AddZone($zone: ZoneInput!) {\n  addZone(zone: $zone) {\n    __typename\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query CustomerSearch($page: Int, $limit: Int, $text: String!) {\n  customerSearch(page: $page, limit: $limit, text: $text) {\n    id\n    name\n  }\n}"): (typeof documents)["query CustomerSearch($page: Int, $limit: Int, $text: String!) {\n  customerSearch(page: $page, limit: $limit, text: $text) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation deleteBillboard($billboardId: Int!, $storeId: Int!) {\n  deleteBillboard(billboardId: $billboardId, storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation deleteBillboard($billboardId: Int!, $storeId: Int!) {\n  deleteBillboard(billboardId: $billboardId, storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteCategory($categoryId: Int!, $storeId: Int!) {\n  deleteCategory(categoryId: $categoryId, storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteCategory($categoryId: Int!, $storeId: Int!) {\n  deleteCategory(categoryId: $categoryId, storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteColor($storeId: Int!, $colorId: Int!) {\n  deleteColor(storeId: $storeId, colorId: $colorId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteColor($storeId: Int!, $colorId: Int!) {\n  deleteColor(storeId: $storeId, colorId: $colorId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteLocation($locationId: Int!) {\n  deleteZoneLocation(locationId: $locationId) {\n    __typename\n    response\n  }\n}"): (typeof documents)["mutation DeleteLocation($locationId: Int!) {\n  deleteZoneLocation(locationId: $locationId) {\n    __typename\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteMpesa($mpesaId: Int!, $storeId: Int!) {\n  deleteMpesa(mpesaId: $mpesaId, storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteMpesa($mpesaId: Int!, $storeId: Int!) {\n  deleteMpesa(mpesaId: $mpesaId, storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeletePickupMtaani($pickupMtaaniId: Int!) {\n  deletePickupMtaani(pickupMtaaniId: $pickupMtaaniId) {\n    response\n  }\n}"): (typeof documents)["mutation DeletePickupMtaani($pickupMtaaniId: Int!) {\n  deletePickupMtaani(pickupMtaaniId: $pickupMtaaniId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteProduct($productId: Int!, $storeId: Int!) {\n  deleteProduct(productId: $productId, storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteProduct($productId: Int!, $storeId: Int!) {\n  deleteProduct(productId: $productId, storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation deleteSize($storeId: Int!, $sizeId: Int!) {\n  deleteSize(storeId: $storeId, sizeId: $sizeId) {\n    response\n  }\n}"): (typeof documents)["mutation deleteSize($storeId: Int!, $sizeId: Int!) {\n  deleteSize(storeId: $storeId, sizeId: $sizeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteStore($storeId: Int!) {\n  deleteStore(storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteStore($storeId: Int!) {\n  deleteStore(storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteStripe($stripeId: Int!, $storeId: Int!) {\n  deleteStripe(stripeId: $stripeId, storeId: $storeId) {\n    response\n  }\n}"): (typeof documents)["mutation DeleteStripe($stripeId: Int!, $storeId: Int!) {\n  deleteStripe(stripeId: $stripeId, storeId: $storeId) {\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteZone($zoneId: Int!) {\n  deleteZone(zoneId: $zoneId) {\n    __typename\n    response\n  }\n}"): (typeof documents)["mutation DeleteZone($zoneId: Int!) {\n  deleteZone(zoneId: $zoneId) {\n    __typename\n    response\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllStores {\n  stores {\n    __typename\n    id\n    name\n  }\n}"): (typeof documents)["query GetAllStores {\n  stores {\n    __typename\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBillboard($billboardId: Int!) {\n  billboard(billboardId: $billboardId) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"): (typeof documents)["query GetBillboard($billboardId: Int!) {\n  billboard(billboardId: $billboardId) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBillboards($storeId: Int) {\n  billboards(storeId: $storeId) {\n    __typename\n    id\n    label\n    updatedAt\n    fileId\n    name\n    url\n  }\n}"): (typeof documents)["query GetBillboards($storeId: Int) {\n  billboards(storeId: $storeId) {\n    __typename\n    id\n    label\n    updatedAt\n    fileId\n    name\n    url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategories($storeId: Int) {\n  categories(storeId: $storeId) {\n    __typename\n    id\n    name\n    updatedAt\n    description\n  }\n}"): (typeof documents)["query GetCategories($storeId: Int) {\n  categories(storeId: $storeId) {\n    __typename\n    id\n    name\n    updatedAt\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategory($categoryId: Int!) {\n  category(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    description\n  }\n}"): (typeof documents)["query GetCategory($categoryId: Int!) {\n  category(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetColor($colorId: Int!) {\n  color(colorId: $colorId) {\n    id\n    name\n    value\n  }\n}"): (typeof documents)["query GetColor($colorId: Int!) {\n  color(colorId: $colorId) {\n    id\n    name\n    value\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetColors($storeId: Int!) {\n  colors(storeId: $storeId) {\n    __typename\n    id\n    name\n    value\n    updatedAt\n  }\n}"): (typeof documents)["query GetColors($storeId: Int!) {\n  colors(storeId: $storeId) {\n    __typename\n    id\n    name\n    value\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomer($userId: Int!) {\n  customer(userId: $userId) {\n    id\n    name\n    createdAt\n  }\n}"): (typeof documents)["query GetCustomer($userId: Int!) {\n  customer(userId: $userId) {\n    id\n    name\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomers {\n  customers {\n    id\n    name\n    createdAt\n    customerOrder {\n      id\n      orderNumber\n      customerName\n      customerPhone\n      orderAmount\n      amountPaid\n      deliveryAmount\n      type\n      status\n      paymentStatus\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetCustomers {\n  customers {\n    id\n    name\n    createdAt\n    customerOrder {\n      id\n      orderNumber\n      customerName\n      customerPhone\n      orderAmount\n      amountPaid\n      deliveryAmount\n      type\n      status\n      paymentStatus\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetDeliveryAddresses($customerId: Int!) {\n  deliveryAddresses(customerId: $customerId) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    deliveryPickupMtaani {\n      id\n      agentName\n      locationName\n      deliveryFee\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}"): (typeof documents)["query GetDeliveryAddresses($customerId: Int!) {\n  deliveryAddresses(customerId: $customerId) {\n    id\n    phoneNumber\n    address\n    deliveryFee\n    deliveryZoneLocation {\n      id\n      address\n      zone {\n        id\n        name\n        standardTime\n        standardPrice\n        expressPrice\n        createdAt\n      }\n      createdAt\n    }\n    deliveryPickupMtaani {\n      id\n      agentName\n      locationName\n      deliveryFee\n      createdAt\n    }\n    type\n    name\n    locationId\n    lng\n    lat\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLocation($locationId: Int!) {\n  location(locationId: $locationId) {\n    id\n    address\n    createdAt\n  }\n}"): (typeof documents)["query GetLocation($locationId: Int!) {\n  location(locationId: $locationId) {\n    id\n    address\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLocations {\n  locations {\n    id\n    address\n  }\n}"): (typeof documents)["query GetLocations {\n  locations {\n    id\n    address\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCurrentMerchant {\n  currentMerchant {\n    __typename\n    id\n    name\n  }\n}"): (typeof documents)["query GetCurrentMerchant {\n  currentMerchant {\n    __typename\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMpesa($storeId: Int!) {\n  mpesa(storeId: $storeId) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n    callback_url\n  }\n}"): (typeof documents)["query GetMpesa($storeId: Int!) {\n  mpesa(storeId: $storeId) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n    callback_url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetOrders {\n  orders {\n    id\n    type\n    status\n    customerName\n    customerPhone\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    transactions {\n      id\n      phoneNumber\n      amount\n      type\n      transactionCode\n      createdAt\n    }\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}"): (typeof documents)["query GetOrders {\n  orders {\n    id\n    type\n    status\n    customerName\n    customerPhone\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    transactions {\n      id\n      phoneNumber\n      amount\n      type\n      transactionCode\n      createdAt\n    }\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPickupMtaanis {\n  pickupMtaanis {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"): (typeof documents)["query GetPickupMtaanis {\n  pickupMtaanis {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProduct($productId: Int!) {\n  product(productId: $productId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    description\n    isFeatured\n    specification\n    images {\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      value\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}"): (typeof documents)["query GetProduct($productId: Int!) {\n  product(productId: $productId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    description\n    isFeatured\n    specification\n    images {\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      value\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProducts($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    updatedAt\n    specification\n    description\n    images {\n      __typename\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      price\n      value\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}"): (typeof documents)["query GetProducts($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    updatedAt\n    specification\n    description\n    images {\n      __typename\n      id\n      url\n    }\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    sizes {\n      __typename\n      id\n      name\n      price\n      value\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsByCategory($categoryId: Int!) {\n  productsByCategory(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    description\n    specification\n    sizes {\n      __typename\n      id\n      name\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n    images {\n      id\n      url\n      fileId\n      name\n    }\n    category {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetProductsByCategory($categoryId: Int!) {\n  productsByCategory(categoryId: $categoryId) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    description\n    specification\n    sizes {\n      __typename\n      id\n      name\n      price\n    }\n    colors {\n      __typename\n      id\n      name\n      value\n    }\n    images {\n      id\n      url\n      fileId\n      name\n    }\n    category {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsOfIds($productsIds: [Int], $storeId: Int) {\n  productsIds(productIds: $productsIds, storeId: $storeId) {\n    id\n    name\n    price\n  }\n}"): (typeof documents)["query GetProductsOfIds($productsIds: [Int], $storeId: Int) {\n  productsIds(productIds: $productsIds, storeId: $storeId) {\n    id\n    name\n    price\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsOnly($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isFeatured\n    updatedAt\n  }\n}"): (typeof documents)["query GetProductsOnly($storeId: Int!) {\n  products(storeId: $storeId) {\n    __typename\n    id\n    name\n    price\n    isFeatured\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsWithCategory {\n  productsWithCategory {\n    categoryName\n    categoryId\n    products {\n      __typename\n      id\n      name\n      price\n      description\n      specification\n      isFeatured\n      sizes {\n        __typename\n        id\n        name\n        price\n      }\n      colors {\n        __typename\n        id\n        name\n        value\n      }\n      category {\n        __typename\n        id\n        name\n      }\n      images {\n        id\n        url\n        fileId\n        name\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductsWithCategory {\n  productsWithCategory {\n    categoryName\n    categoryId\n    products {\n      __typename\n      id\n      name\n      price\n      description\n      specification\n      isFeatured\n      sizes {\n        __typename\n        id\n        name\n        price\n      }\n      colors {\n        __typename\n        id\n        name\n        value\n      }\n      category {\n        __typename\n        id\n        name\n      }\n      images {\n        id\n        url\n        fileId\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSize($sizeId: Int!) {\n  size(sizeId: $sizeId) {\n    id\n    name\n    value\n    price\n  }\n}"): (typeof documents)["query GetSize($sizeId: Int!) {\n  size(sizeId: $sizeId) {\n    id\n    name\n    value\n    price\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSizes($storeId: Int!) {\n  sizes(storeId: $storeId) {\n    id\n    name\n    value\n    updatedAt\n    price\n  }\n}"): (typeof documents)["query GetSizes($storeId: Int!) {\n  sizes(storeId: $storeId) {\n    id\n    name\n    value\n    updatedAt\n    price\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetStore($storeId: Int) {\n  store(storeId: $storeId) {\n    __typename\n    id\n    name\n  }\n}"): (typeof documents)["query GetStore($storeId: Int) {\n  store(storeId: $storeId) {\n    __typename\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetStripe($storeId: Int!) {\n  stripe(storeId: $storeId) {\n    id\n    api_key\n    webhook_secret\n    callback_url\n  }\n}"): (typeof documents)["query GetStripe($storeId: Int!) {\n  stripe(storeId: $storeId) {\n    id\n    api_key\n    webhook_secret\n    callback_url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUser {\n  user {\n    id\n    email\n    phoneNumber\n    role\n  }\n}"): (typeof documents)["query GetUser {\n  user {\n    id\n    email\n    phoneNumber\n    role\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetZone($zoneId: Int!) {\n  zone(zoneId: $zoneId) {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n    }\n  }\n}"): (typeof documents)["query GetZone($zoneId: Int!) {\n  zone(zoneId: $zoneId) {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetZones {\n  zones {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n      createdAt\n    }\n  }\n}"): (typeof documents)["query GetZones {\n  zones {\n    id\n    name\n    standardPrice\n    standardTime\n    expressPrice\n    locations {\n      id\n      address\n      createdAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetOrdersByCustomer($customerId: Int!) {\n  ordersByCustomer(customerId: $customerId) {\n    id\n    type\n    status\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}"): (typeof documents)["query GetOrdersByCustomer($customerId: Int!) {\n  ordersByCustomer(customerId: $customerId) {\n    id\n    type\n    status\n    paymentStatus\n    orderNumber\n    orderAmount\n    amountPaid\n    deliveryAmount\n    createdAt\n    updatedAt\n    customerOrder {\n      name\n    }\n    orderItems {\n      id\n      price\n      quantity\n      orderProduct {\n        id\n        name\n        price\n      }\n    }\n    deliveryAddress {\n      name\n      phoneNumber\n      type\n      address\n      deliveryZoneLocation {\n        id\n        address\n        zone {\n          id\n          name\n          standardTime\n          standardPrice\n          expressPrice\n          createdAt\n        }\n        createdAt\n      }\n      deliveryPickupMtaani {\n        id\n        agentName\n        locationName\n        deliveryFee\n        createdAt\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ProductSearch($page: Int, $limit: Int, $text: String!, $storeId: Int) {\n  productSearch(page: $page, limit: $limit, text: $text, storeId: $storeId) {\n    id\n    name\n    description\n    price\n    category {\n      name\n    }\n    images {\n      fileId\n      name\n      url\n    }\n  }\n}"): (typeof documents)["query ProductSearch($page: Int, $limit: Int, $text: String!, $storeId: Int) {\n  productSearch(page: $page, limit: $limit, text: $text, storeId: $storeId) {\n    id\n    name\n    description\n    price\n    category {\n      name\n    }\n    images {\n      fileId\n      name\n      url\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LoginAdmin($user: UserInput!) {\n  loginAdmin(user: $user) {\n    auth {\n      token\n    }\n    admin {\n      id\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}"): (typeof documents)["mutation LoginAdmin($user: UserInput!) {\n  loginAdmin(user: $user) {\n    auth {\n      token\n    }\n    admin {\n      id\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LoginCustomer($user: UserInput!) {\n  loginCustomer(user: $user) {\n    auth {\n      token\n    }\n    customer {\n      id\n      name\n    }\n    user {\n      id\n      phoneNumber\n      role\n    }\n  }\n}"): (typeof documents)["mutation LoginCustomer($user: UserInput!) {\n  loginCustomer(user: $user) {\n    auth {\n      token\n    }\n    customer {\n      id\n      name\n    }\n    user {\n      id\n      phoneNumber\n      role\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SignUpAdmin($user: UserInput!, $admin: AdminInput!) {\n  signupAdmin(user: $user, admin: $admin) {\n    auth {\n      token\n    }\n    admin {\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}"): (typeof documents)["mutation SignUpAdmin($user: UserInput!, $admin: AdminInput!) {\n  signupAdmin(user: $user, admin: $admin) {\n    auth {\n      token\n    }\n    admin {\n      name\n    }\n    user {\n      phoneNumber\n      role\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SignupCustomer($user: UserInput!, $customer: CustomerInput!) {\n  signupCustomer(user: $user, customer: $customer) {\n    auth {\n      token\n    }\n    user {\n      id\n      phoneNumber\n      email\n      role\n    }\n    customer {\n      id\n      name\n      createdAt\n    }\n  }\n}"): (typeof documents)["mutation SignupCustomer($user: UserInput!, $customer: CustomerInput!) {\n  signupCustomer(user: $user, customer: $customer) {\n    auth {\n      token\n    }\n    user {\n      id\n      phoneNumber\n      email\n      role\n    }\n    customer {\n      id\n      name\n      createdAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateBillboard($billboardId: Int!, $payload: BillboardInput!) {\n  updateBillboard(billboardId: $billboardId, payload: $payload) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateBillboard($billboardId: Int!, $payload: BillboardInput!) {\n  updateBillboard(billboardId: $billboardId, payload: $payload) {\n    __typename\n    id\n    label\n    fileId\n    name\n    url\n    store {\n      __typename\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateCategory($categoryId: Int!, $payload: CategoryInput!) {\n  updateCategory(categoryId: $categoryId, payload: $payload) {\n    __typename\n    id\n    name\n    description\n    store {\n      __typename\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateCategory($categoryId: Int!, $payload: CategoryInput!) {\n  updateCategory(categoryId: $categoryId, payload: $payload) {\n    __typename\n    id\n    name\n    description\n    store {\n      __typename\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateColor($colorId: Int!, $payload: ColorInput!) {\n  updateColor(colorId: $colorId, payload: $payload) {\n    __typename\n    id\n    name\n    value\n  }\n}"): (typeof documents)["mutation UpdateColor($colorId: Int!, $payload: ColorInput!) {\n  updateColor(colorId: $colorId, payload: $payload) {\n    __typename\n    id\n    name\n    value\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateCustomer($customerId: Int!, $payload: CustomerInput!) {\n  updateCustomer(customerId: $customerId, payload: $payload) {\n    id\n    name\n    __typename\n  }\n}"): (typeof documents)["mutation UpdateCustomer($customerId: Int!, $payload: CustomerInput!) {\n  updateCustomer(customerId: $customerId, payload: $payload) {\n    id\n    name\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateLocation($locationId: Int!, $payload: LocationUpdateInput!) {\n  updateZoneLocation(locationId: $locationId, payload: $payload) {\n    __typename\n    address\n  }\n}"): (typeof documents)["mutation UpdateLocation($locationId: Int!, $payload: LocationUpdateInput!) {\n  updateZoneLocation(locationId: $locationId, payload: $payload) {\n    __typename\n    address\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateMpesa($mpesaId: Int!, $payload: MpesaSettingInput!) {\n  updateMpesa(mpesaId: $mpesaId, payload: $payload) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}"): (typeof documents)["mutation UpdateMpesa($mpesaId: Int!, $payload: MpesaSettingInput!) {\n  updateMpesa(mpesaId: $mpesaId, payload: $payload) {\n    id\n    consumer_key\n    consumer_secret\n    pass_key\n    business_shortcode\n    account_reference\n    transaction_desc\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateOrder($orderId: Int!, $payload: OrderInputUpdate!) {\n  updateOrder(orderId: $orderId, payload: $payload) {\n    id\n    orderNumber\n    customerName\n    customerPhone\n    orderAmount\n    amountPaid\n    deliveryAmount\n    type\n    status\n    paymentStatus\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateOrder($orderId: Int!, $payload: OrderInputUpdate!) {\n  updateOrder(orderId: $orderId, payload: $payload) {\n    id\n    orderNumber\n    customerName\n    customerPhone\n    orderAmount\n    amountPaid\n    deliveryAmount\n    type\n    status\n    paymentStatus\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateOrderCheckout($orderId: Int!, $storeId: Int!, $payload: OrderCheckoutInput!) {\n  updateOrderCheckout(orderId: $orderId, storeId: $storeId, payload: $payload) {\n    id\n    status\n    paymentStatus\n    customerOrder {\n      id\n      name\n    }\n    orderItems {\n      id\n      productId\n      quantity\n    }\n  }\n}"): (typeof documents)["mutation UpdateOrderCheckout($orderId: Int!, $storeId: Int!, $payload: OrderCheckoutInput!) {\n  updateOrderCheckout(orderId: $orderId, storeId: $storeId, payload: $payload) {\n    id\n    status\n    paymentStatus\n    customerOrder {\n      id\n      name\n    }\n    orderItems {\n      id\n      productId\n      quantity\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdatePickupMtaani($pickupMtaaniId: Int!, $payload: PickupMtaaniInput) {\n  updatePickupMtaani(pickupMtaaniId: $pickupMtaaniId, payload: $payload) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"): (typeof documents)["mutation UpdatePickupMtaani($pickupMtaaniId: Int!, $payload: PickupMtaaniInput) {\n  updatePickupMtaani(pickupMtaaniId: $pickupMtaaniId, payload: $payload) {\n    id\n    locationName\n    agentName\n    deliveryFee\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateProduct($productId: Int!, $payload: ProductInput!) {\n  updateProduct(productId: $productId, payload: $payload) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}"): (typeof documents)["mutation UpdateProduct($productId: Int!, $payload: ProductInput!) {\n  updateProduct(productId: $productId, payload: $payload) {\n    __typename\n    id\n    name\n    price\n    isArchived\n    isFeatured\n    store {\n      __typename\n      id\n      name\n    }\n    category {\n      __typename\n      id\n      name\n    }\n    images {\n      id\n      fileId\n      name\n      url\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateSize($sizeId: Int!, $payload: SizeInput!) {\n  updateSize(sizeId: $sizeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}"): (typeof documents)["mutation UpdateSize($sizeId: Int!, $payload: SizeInput!) {\n  updateSize(sizeId: $sizeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation updateStore($storeId: Int!, $payload: StoreInput!) {\n  updateStore(storeId: $storeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}"): (typeof documents)["mutation updateStore($storeId: Int!, $payload: StoreInput!) {\n  updateStore(storeId: $storeId, payload: $payload) {\n    __typename\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateStripe($stripeId: Int!, $payload: StripeSettingInput!) {\n  updateStripe(stripeId: $stripeId, payload: $payload) {\n    id\n    api_key\n    callback_url\n    webhook_secret\n  }\n}"): (typeof documents)["mutation UpdateStripe($stripeId: Int!, $payload: StripeSettingInput!) {\n  updateStripe(stripeId: $stripeId, payload: $payload) {\n    id\n    api_key\n    callback_url\n    webhook_secret\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateZone($zoneId: Int!, $payload: ZoneInput!) {\n  updateZone(zoneId: $zoneId, payload: $payload) {\n    __typename\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}"): (typeof documents)["mutation UpdateZone($zoneId: Int!, $payload: ZoneInput!) {\n  updateZone(zoneId: $zoneId, payload: $payload) {\n    __typename\n    name\n    standardPrice\n    standardTime\n    expressPrice\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;