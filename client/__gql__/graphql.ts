/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  customers?: Maybe<Array<Maybe<Customer>>>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  stores?: Maybe<Array<Maybe<Store>>>;
};

export type AdminAuth = {
  __typename?: 'AdminAuth';
  admin?: Maybe<Admin>;
  auth?: Maybe<Auth>;
  user?: Maybe<User>;
};

export type AdminInput = {
  name: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token?: Maybe<Scalars['String']['output']>;
};

export type Billboard = {
  __typename?: 'Billboard';
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt: Scalars['Date']['output'];
  fileId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  store?: Maybe<Store>;
  updatedAt: Scalars['Date']['output'];
  url: Scalars['String']['output'];
};

export type BillboardInput = {
  fileId: Scalars['String']['input'];
  label: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  store?: Maybe<Store>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  storeId: Scalars['Int']['input'];
};

export type CategoryWithProducts = {
  __typename?: 'CategoryWithProducts';
  categoryId?: Maybe<Scalars['Int']['output']>;
  categoryName: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type Color = {
  __typename?: 'Color';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  value: Scalars['String']['output'];
};

export type ColorInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CustomAddressInput = {
  address: Scalars['String']['input'];
  deliveryFee?: InputMaybe<Scalars['Decimal']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  locationId: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerOrder?: Maybe<Array<Maybe<Order>>>;
  customerUser?: Maybe<User>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CustomerAuth = {
  __typename?: 'CustomerAuth';
  auth?: Maybe<Auth>;
  customer?: Maybe<Customer>;
  user?: Maybe<User>;
};

export type CustomerInput = {
  name: Scalars['String']['input'];
};

export type DeliveryAddress = {
  __typename?: 'DeliveryAddress';
  address?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Customer>;
  deliveryFee?: Maybe<Scalars['Decimal']['output']>;
  deliveryPickupMtaani?: Maybe<PickupMtaani>;
  deliveryZoneLocation?: Maybe<ZoneLocation>;
  id: Scalars['Int']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DeliveryAddressType>;
};

export type DeliveryAddressInput = {
  customAddress?: InputMaybe<CustomAddressInput>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  pickupMtaaniId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<DeliveryAddressType>;
  zoneLocationId?: InputMaybe<Scalars['Int']['input']>;
};

export enum DeliveryAddressType {
  Custom = 'CUSTOM',
  PickupMtaani = 'PICKUP_MTAANI',
  PickAndDrop = 'PICK_AND_DROP'
}

export type Image = {
  __typename?: 'Image';
  fileId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  productId: Scalars['Int']['output'];
  storeId: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type ImageInput = {
  fileId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productI?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  url: Scalars['String']['input'];
};

export type LocationInput = {
  address: Scalars['String']['input'];
  zoneId: Scalars['Int']['input'];
};

export type LocationUpdateInput = {
  address: Scalars['String']['input'];
};

export type MpesaSetting = {
  __typename?: 'MpesaSetting';
  account_reference: Scalars['String']['output'];
  business_shortcode: Scalars['String']['output'];
  callback_url?: Maybe<Scalars['String']['output']>;
  consumer_key: Scalars['String']['output'];
  consumer_secret: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  pass_key: Scalars['String']['output'];
  store?: Maybe<Store>;
  transaction_desc: Scalars['String']['output'];
};

export type MpesaSettingInput = {
  account_reference?: InputMaybe<Scalars['String']['input']>;
  business_shortcode?: InputMaybe<Scalars['String']['input']>;
  callback_url?: InputMaybe<Scalars['String']['input']>;
  consumer_key?: InputMaybe<Scalars['String']['input']>;
  consumer_secret?: InputMaybe<Scalars['String']['input']>;
  pass_key?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  transaction_desc?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  amountPaid?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerOrder?: Maybe<Customer>;
  customerPhone?: Maybe<Scalars['String']['output']>;
  deliveryAddress?: Maybe<DeliveryAddress>;
  deliveryAmount?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  orderAmount?: Maybe<Scalars['Decimal']['output']>;
  orderItems: Array<OrderItem>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  paymentStatus: OrderPaymentStatusType;
  status: OrderStatus;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  type?: Maybe<OrderType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type OrderCheckoutInput = {
  address: Scalars['String']['input'];
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber: Scalars['String']['input'];
};

export type OrderInput = {
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  customerName: Scalars['String']['input'];
  customerPhone: Scalars['String']['input'];
  deliveryAddressId?: InputMaybe<Scalars['Int']['input']>;
  deliveryAmount?: InputMaybe<Scalars['Decimal']['input']>;
  orderAmount: Scalars['Decimal']['input'];
  orderItems?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  type: OrderType;
};

export type OrderInputUpdate = {
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  deliveryAmount?: InputMaybe<Scalars['Decimal']['input']>;
  orderAmount?: InputMaybe<Scalars['Decimal']['input']>;
  orderType?: InputMaybe<OrderType>;
  paymentStatus?: InputMaybe<OrderPaymentStatusType>;
  status?: InputMaybe<OrderStatus>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int']['output'];
  order?: Maybe<Order>;
  orderProduct: Product;
  price: Scalars['Decimal']['output'];
  productId?: Maybe<Scalars['Int']['output']>;
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export enum OrderPaymentStatusType {
  Full = 'FULL',
  NotPaid = 'NOT_PAID',
  Partial = 'PARTIAL'
}

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Received = 'RECEIVED'
}

export enum OrderType {
  Delivery = 'delivery',
  SelfCollect = 'selfCollect'
}

export type PickupMtaani = {
  __typename?: 'PickupMtaani';
  agentName?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryFee?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  locationName?: Maybe<Scalars['String']['output']>;
};

export type PickupMtaaniInput = {
  agentName?: InputMaybe<Scalars['String']['input']>;
  deliveryFee?: InputMaybe<Scalars['Decimal']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  colors?: Maybe<Array<Color>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Image>;
  isArchived: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  sizes?: Maybe<Array<Size>>;
  specification?: Maybe<Scalars['String']['output']>;
  store?: Maybe<Store>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductInput = {
  categoryId: Scalars['Int']['input'];
  colors?: InputMaybe<Array<InputMaybe<ColorInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  sizes?: InputMaybe<Array<InputMaybe<SizeInput>>>;
  specification?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
};

export type ProductUpdateInput = {
  categoryId: Scalars['Int']['input'];
  colors?: InputMaybe<Array<InputMaybe<ColorInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  sizes?: InputMaybe<Array<InputMaybe<SizeInput>>>;
  storeId: Scalars['Int']['input'];
};

export type Response = {
  __typename?: 'Response';
  response?: Maybe<Scalars['Boolean']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addBillboard?: Maybe<Billboard>;
  addCategory?: Maybe<Category>;
  addColor?: Maybe<Color>;
  addCustomer?: Maybe<Customer>;
  addDeliveryAddress: DeliveryAddress;
  addImage?: Maybe<Image>;
  addMpesa?: Maybe<MpesaSetting>;
  addOrder?: Maybe<Order>;
  addPickupMtaani?: Maybe<PickupMtaani>;
  addProduct?: Maybe<Product>;
  addSize?: Maybe<Size>;
  addStore?: Maybe<Store>;
  addStripe?: Maybe<StripeSetting>;
  addTransaction?: Maybe<Transaction>;
  addZone?: Maybe<Zone>;
  addZoneLocation?: Maybe<ZoneLocation>;
  deleteBillboard?: Maybe<Response>;
  deleteCategory?: Maybe<Response>;
  deleteColor?: Maybe<Response>;
  deleteImage?: Maybe<Response>;
  deleteMpesa?: Maybe<Response>;
  deletePickupMtaani?: Maybe<Response>;
  deleteProduct?: Maybe<Response>;
  deleteSize?: Maybe<Response>;
  deleteStore?: Maybe<Response>;
  deleteStripe?: Maybe<Response>;
  deleteZone?: Maybe<Response>;
  deleteZoneLocation?: Maybe<Response>;
  loginAdmin?: Maybe<AdminAuth>;
  loginCustomer?: Maybe<CustomerAuth>;
  logoutMerchant?: Maybe<Response>;
  signupAdmin?: Maybe<AdminAuth>;
  signupCustomer?: Maybe<CustomerAuth>;
  updateBillboard?: Maybe<Billboard>;
  updateCategory?: Maybe<Category>;
  updateColor?: Maybe<Color>;
  updateCustomer?: Maybe<Customer>;
  updateMpesa?: Maybe<MpesaSetting>;
  updateOrder?: Maybe<Order>;
  updateOrderCheckout?: Maybe<Order>;
  updatePickupMtaani?: Maybe<PickupMtaani>;
  updateProduct?: Maybe<Product>;
  updateSize?: Maybe<Size>;
  updateStore?: Maybe<Store>;
  updateStripe?: Maybe<StripeSetting>;
  updateZone?: Maybe<Zone>;
  updateZoneLocation?: Maybe<ZoneLocation>;
};


export type RootMutationAddBillboardArgs = {
  billboard: BillboardInput;
};


export type RootMutationAddCategoryArgs = {
  category: CategoryInput;
};


export type RootMutationAddColorArgs = {
  color: ColorInput;
};


export type RootMutationAddCustomerArgs = {
  customer: CustomerInput;
};


export type RootMutationAddDeliveryAddressArgs = {
  deliveryAddress?: InputMaybe<DeliveryAddressInput>;
};


export type RootMutationAddImageArgs = {
  image: ImageInput;
};


export type RootMutationAddMpesaArgs = {
  mpesa: MpesaSettingInput;
};


export type RootMutationAddOrderArgs = {
  order: OrderInput;
};


export type RootMutationAddPickupMtaaniArgs = {
  pickupMtaani?: InputMaybe<PickupMtaaniInput>;
};


export type RootMutationAddProductArgs = {
  product: ProductInput;
};


export type RootMutationAddSizeArgs = {
  size: SizeInput;
};


export type RootMutationAddStoreArgs = {
  store: StoreInput;
};


export type RootMutationAddStripeArgs = {
  stripe: StripeSettingInput;
};


export type RootMutationAddTransactionArgs = {
  transaction: TransactionInput;
};


export type RootMutationAddZoneArgs = {
  zone?: InputMaybe<ZoneInput>;
};


export type RootMutationAddZoneLocationArgs = {
  location?: InputMaybe<LocationInput>;
};


export type RootMutationDeleteBillboardArgs = {
  billboardId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteColorArgs = {
  colorId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteImageArgs = {
  imageId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};


export type RootMutationDeleteMpesaArgs = {
  mpesaId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeletePickupMtaaniArgs = {
  pickupMtaaniId: Scalars['Int']['input'];
};


export type RootMutationDeleteProductArgs = {
  productId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteSizeArgs = {
  sizeId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteStoreArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootMutationDeleteStripeArgs = {
  storeId: Scalars['Int']['input'];
  stripeId: Scalars['Int']['input'];
};


export type RootMutationDeleteZoneArgs = {
  zoneId: Scalars['Int']['input'];
};


export type RootMutationDeleteZoneLocationArgs = {
  locationId: Scalars['Int']['input'];
};


export type RootMutationLoginAdminArgs = {
  user: UserInput;
};


export type RootMutationLoginCustomerArgs = {
  user: UserInput;
};


export type RootMutationSignupAdminArgs = {
  admin: AdminInput;
  user: UserInput;
};


export type RootMutationSignupCustomerArgs = {
  customer: CustomerInput;
  user: UserInput;
};


export type RootMutationUpdateBillboardArgs = {
  billboardId: Scalars['Int']['input'];
  payload: BillboardInput;
};


export type RootMutationUpdateCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  payload: CategoryInput;
};


export type RootMutationUpdateColorArgs = {
  colorId: Scalars['Int']['input'];
  payload: ColorInput;
};


export type RootMutationUpdateCustomerArgs = {
  customerId: Scalars['Int']['input'];
  payload: CustomerInput;
};


export type RootMutationUpdateMpesaArgs = {
  mpesaId: Scalars['Int']['input'];
  payload: MpesaSettingInput;
};


export type RootMutationUpdateOrderArgs = {
  orderId: Scalars['Int']['input'];
  payload: OrderInputUpdate;
};


export type RootMutationUpdateOrderCheckoutArgs = {
  orderId: Scalars['Int']['input'];
  payload: OrderCheckoutInput;
  storeId: Scalars['Int']['input'];
};


export type RootMutationUpdatePickupMtaaniArgs = {
  payload?: InputMaybe<PickupMtaaniInput>;
  pickupMtaaniId: Scalars['Int']['input'];
};


export type RootMutationUpdateProductArgs = {
  payload: ProductInput;
  productId: Scalars['Int']['input'];
};


export type RootMutationUpdateSizeArgs = {
  payload: SizeInput;
  sizeId: Scalars['Int']['input'];
};


export type RootMutationUpdateStoreArgs = {
  payload: StoreInput;
  storeId: Scalars['Int']['input'];
};


export type RootMutationUpdateStripeArgs = {
  payload: StripeSettingInput;
  stripeId: Scalars['Int']['input'];
};


export type RootMutationUpdateZoneArgs = {
  payload: ZoneInput;
  zoneId: Scalars['Int']['input'];
};


export type RootMutationUpdateZoneLocationArgs = {
  locationId: Scalars['Int']['input'];
  payload: LocationUpdateInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  billboard?: Maybe<Billboard>;
  billboards?: Maybe<Array<Maybe<Billboard>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  color: Color;
  colors?: Maybe<Array<Maybe<Color>>>;
  currentMerchant?: Maybe<Admin>;
  customer: Customer;
  customerSearch?: Maybe<Array<Maybe<Customer>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  customersSearch?: Maybe<Array<Maybe<Customer>>>;
  deliveryAddresses?: Maybe<Array<DeliveryAddress>>;
  location: ZoneLocation;
  locations: Array<Maybe<ZoneLocation>>;
  mpesa?: Maybe<MpesaSetting>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  ordersByCustomer: Array<Order>;
  pickupMtaanis?: Maybe<Array<PickupMtaani>>;
  product: Product;
  productSearch?: Maybe<Array<Maybe<Product>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsByCategory?: Maybe<Array<Maybe<Product>>>;
  productsIds: Array<Maybe<Product>>;
  productsWithCategory?: Maybe<Array<Maybe<CategoryWithProducts>>>;
  sequelizeMeta?: Maybe<SequelizeMeta>;
  size: Size;
  sizes?: Maybe<Array<Maybe<Size>>>;
  store: Store;
  stores?: Maybe<Array<Maybe<Store>>>;
  stripe?: Maybe<StripeSetting>;
  user: User;
  zone?: Maybe<Zone>;
  zones: Array<Zone>;
};


export type RootQueryBillboardArgs = {
  billboardId: Scalars['Int']['input'];
};


export type RootQueryBillboardsArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryCategoriesArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type RootQueryColorArgs = {
  colorId: Scalars['Int']['input'];
};


export type RootQueryColorsArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryCustomerArgs = {
  userId: Scalars['Int']['input'];
};


export type RootQueryCustomerSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryCustomersSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryDeliveryAddressesArgs = {
  customerId: Scalars['Int']['input'];
};


export type RootQueryLocationArgs = {
  locationId: Scalars['Int']['input'];
};


export type RootQueryMpesaArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type RootQueryOrdersByCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type RootQueryProductArgs = {
  productId: Scalars['Int']['input'];
};


export type RootQueryProductSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  colorId?: InputMaybe<Scalars['Int']['input']>;
  sizeId?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['Int']['input'];
};


export type RootQueryProductsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryProductsIdsArgs = {
  productIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryProductsWithCategoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuerySizeArgs = {
  sizeId: Scalars['Int']['input'];
};


export type RootQuerySizesArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryStoreArgs = {
  storeId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryStripeArgs = {
  storeId: Scalars['Int']['input'];
};


export type RootQueryZoneArgs = {
  zoneId: Scalars['Int']['input'];
};

export type SequelizeMeta = {
  __typename?: 'SequelizeMeta';
  name?: Maybe<Scalars['String']['output']>;
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Decimal']['output']>;
  updatedAt: Scalars['Date']['output'];
  value: Scalars['String']['output'];
};

export type SizeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  value: Scalars['String']['input'];
};

export type Store = {
  __typename?: 'Store';
  admin?: Maybe<Admin>;
  billboards?: Maybe<Array<Maybe<Billboard>>>;
  colors?: Maybe<Array<Maybe<Color>>>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  mpesa?: Maybe<MpesaSetting>;
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
  updatedAt: Scalars['Date']['output'];
};

export type StoreInput = {
  name: Scalars['String']['input'];
};

export type StripeSetting = {
  __typename?: 'StripeSetting';
  api_key: Scalars['String']['output'];
  callback_url: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  storeId?: Maybe<Store>;
  webhook_secret: Scalars['String']['output'];
};

export type StripeSettingInput = {
  api_key?: InputMaybe<Scalars['String']['input']>;
  callback_url?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['Int']['input'];
  webhook_secret?: InputMaybe<Scalars['String']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  orderTransaction?: Maybe<Order>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  transactionCode?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TransactionInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  orderId?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  transactionCode?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  authToken?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  refreshTOken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer'
}

export type WeightInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Zone = {
  __typename?: 'Zone';
  createdAt?: Maybe<Scalars['Date']['output']>;
  expressPrice?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  locations?: Maybe<Array<ZoneLocation>>;
  name: Scalars['String']['output'];
  standardPrice?: Maybe<Scalars['Decimal']['output']>;
  standardTime: Scalars['String']['output'];
};

export type ZoneInput = {
  expressPrice: Scalars['Decimal']['input'];
  name: Scalars['String']['input'];
  standardPrice: Scalars['Decimal']['input'];
  standardTime: Scalars['String']['input'];
};

export type ZoneLocation = {
  __typename?: 'ZoneLocation';
  address: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  zone?: Maybe<Zone>;
};

export type AddBillboardMutationVariables = Exact<{
  billboard: BillboardInput;
}>;


export type AddBillboardMutation = { __typename?: 'RootMutation', addBillboard?: { __typename: 'Billboard', id: number, label: string, fileId: string, name?: string | null, url: string, store?: { __typename: 'Store', id: number } | null } | null };

export type AddCategoryMutationVariables = Exact<{
  category: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'RootMutation', addCategory?: { __typename: 'Category', id: number, name: string, description?: string | null, store?: { __typename: 'Store', id: number } | null } | null };

export type AddColorMutationVariables = Exact<{
  color: ColorInput;
}>;


export type AddColorMutation = { __typename?: 'RootMutation', addColor?: { __typename: 'Color', id: number, name: string, value: string } | null };

export type AddCustomerMutationVariables = Exact<{
  customer: CustomerInput;
}>;


export type AddCustomerMutation = { __typename?: 'RootMutation', addCustomer?: { __typename: 'Customer', id?: number | null, name?: string | null } | null };

export type AddDeliveryAddressMutationVariables = Exact<{
  deliveryAddress?: InputMaybe<DeliveryAddressInput>;
}>;


export type AddDeliveryAddressMutation = { __typename?: 'RootMutation', addDeliveryAddress: { __typename?: 'DeliveryAddress', id: number, phoneNumber?: string | null, address?: string | null, deliveryFee?: any | null, type?: DeliveryAddressType | null, name?: string | null, locationId?: string | null, lng?: number | null, lat?: number | null, deliveryPickupMtaani?: { __typename?: 'PickupMtaani', id: number, agentName?: string | null, deliveryFee?: any | null, locationName?: string | null } | null, deliveryZoneLocation?: { __typename?: 'ZoneLocation', id: number, address: string, createdAt: any, zone?: { __typename?: 'Zone', id: number, name: string, standardTime: string, standardPrice?: any | null, expressPrice?: any | null, createdAt?: any | null } | null } | null } };

export type AddLocationMutationVariables = Exact<{
  location: LocationInput;
}>;


export type AddLocationMutation = { __typename?: 'RootMutation', addZoneLocation?: { __typename: 'ZoneLocation', address: string, zone?: { __typename?: 'Zone', id: number, name: string } | null } | null };

export type AddMpesaMutationVariables = Exact<{
  mpesa: MpesaSettingInput;
}>;


export type AddMpesaMutation = { __typename?: 'RootMutation', addMpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string } | null };

export type AddOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type AddOrderMutation = { __typename?: 'RootMutation', addOrder?: { __typename?: 'Order', id: number, status: OrderStatus, orderItems: Array<{ __typename?: 'OrderItem', id: number }>, deliveryAddress?: { __typename?: 'DeliveryAddress', phoneNumber?: string | null } | null, customerOrder?: { __typename?: 'Customer', name?: string | null } | null } | null };

export type AddPickupMtaaniMutationVariables = Exact<{
  pickupMtaani?: InputMaybe<PickupMtaaniInput>;
}>;


export type AddPickupMtaaniMutation = { __typename?: 'RootMutation', addPickupMtaani?: { __typename?: 'PickupMtaani', id: number, locationName?: string | null, agentName?: string | null, deliveryFee?: any | null, createdAt?: any | null } | null };

export type AddProductMutationVariables = Exact<{
  product: ProductInput;
}>;


export type AddProductMutation = { __typename?: 'RootMutation', addProduct?: { __typename: 'Product', id: number, name: string, price: number, isArchived: boolean, isFeatured: boolean, store?: { __typename: 'Store', id: number, name: string } | null, category: { __typename: 'Category', id: number, name: string }, colors?: Array<{ __typename?: 'Color', id: number, name: string, value: string }> | null, sizes?: Array<{ __typename?: 'Size', id: number, name: string, value: string }> | null, images: Array<{ __typename?: 'Image', id: number, fileId: string, name?: string | null, url: string }> } | null };

export type AddSizeMutationVariables = Exact<{
  size: SizeInput;
}>;


export type AddSizeMutation = { __typename?: 'RootMutation', addSize?: { __typename: 'Size', id: number, name: string, value: string } | null };

export type AddStoreMutationVariables = Exact<{
  store: StoreInput;
}>;


export type AddStoreMutation = { __typename?: 'RootMutation', addStore?: { __typename: 'Store', id: number, name: string, createdAt: any, updatedAt: any } | null };

export type AddStripeMutationVariables = Exact<{
  stripe: StripeSettingInput;
}>;


export type AddStripeMutation = { __typename?: 'RootMutation', addStripe?: { __typename?: 'StripeSetting', id: number, callback_url: string, webhook_secret: string, api_key: string } | null };

export type AddTransactionMutationVariables = Exact<{
  transaction: TransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'RootMutation', addTransaction?: { __typename?: 'Transaction', phoneNumber?: string | null, amount?: any | null, type?: string | null, transactionCode?: string | null, orderTransaction?: { __typename?: 'Order', id: number, amountPaid?: any | null, orderAmount?: any | null, orderNumber?: string | null, paymentStatus: OrderPaymentStatusType } | null } | null };

export type AddZoneMutationVariables = Exact<{
  zone: ZoneInput;
}>;


export type AddZoneMutation = { __typename?: 'RootMutation', addZone?: { __typename: 'Zone', id: number, name: string, standardPrice?: any | null, standardTime: string, expressPrice?: any | null } | null };

export type CustomerSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomerSearchQuery = { __typename?: 'RootQuery', customerSearch?: Array<{ __typename?: 'Customer', id?: number | null, name?: string | null } | null> | null };

export type DeleteBillboardMutationVariables = Exact<{
  billboardId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteBillboardMutation = { __typename?: 'RootMutation', deleteBillboard?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'RootMutation', deleteCategory?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteColorMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
  colorId: Scalars['Int']['input'];
}>;


export type DeleteColorMutation = { __typename?: 'RootMutation', deleteColor?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteLocationMutationVariables = Exact<{
  locationId: Scalars['Int']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'RootMutation', deleteZoneLocation?: { __typename: 'Response', response?: boolean | null } | null };

export type DeleteMpesaMutationVariables = Exact<{
  mpesaId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteMpesaMutation = { __typename?: 'RootMutation', deleteMpesa?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeletePickupMtaaniMutationVariables = Exact<{
  pickupMtaaniId: Scalars['Int']['input'];
}>;


export type DeletePickupMtaaniMutation = { __typename?: 'RootMutation', deletePickupMtaani?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'RootMutation', deleteProduct?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteSizeMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
  sizeId: Scalars['Int']['input'];
}>;


export type DeleteSizeMutation = { __typename?: 'RootMutation', deleteSize?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteStoreMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type DeleteStoreMutation = { __typename?: 'RootMutation', deleteStore?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteStripeMutationVariables = Exact<{
  stripeId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
}>;


export type DeleteStripeMutation = { __typename?: 'RootMutation', deleteStripe?: { __typename?: 'Response', response?: boolean | null } | null };

export type DeleteZoneMutationVariables = Exact<{
  zoneId: Scalars['Int']['input'];
}>;


export type DeleteZoneMutation = { __typename?: 'RootMutation', deleteZone?: { __typename: 'Response', response?: boolean | null } | null };

export type GetAllStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStoresQuery = { __typename?: 'RootQuery', stores?: Array<{ __typename: 'Store', id: number, name: string } | null> | null };

export type GetBillboardQueryVariables = Exact<{
  billboardId: Scalars['Int']['input'];
}>;


export type GetBillboardQuery = { __typename?: 'RootQuery', billboard?: { __typename: 'Billboard', id: number, label: string, fileId: string, name?: string | null, url: string, store?: { __typename: 'Store', id: number } | null } | null };

export type GetBillboardsQueryVariables = Exact<{
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetBillboardsQuery = { __typename?: 'RootQuery', billboards?: Array<{ __typename: 'Billboard', id: number, label: string, updatedAt: any, fileId: string, name?: string | null, url: string } | null> | null };

export type GetCategoriesQueryVariables = Exact<{
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCategoriesQuery = { __typename?: 'RootQuery', categories?: Array<{ __typename: 'Category', id: number, name: string, updatedAt?: any | null, description?: string | null } | null> | null };

export type GetCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'RootQuery', category?: { __typename: 'Category', id: number, name: string, description?: string | null } | null };

export type GetColorQueryVariables = Exact<{
  colorId: Scalars['Int']['input'];
}>;


export type GetColorQuery = { __typename?: 'RootQuery', color: { __typename?: 'Color', id: number, name: string, value: string } };

export type GetColorsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetColorsQuery = { __typename?: 'RootQuery', colors?: Array<{ __typename: 'Color', id: number, name: string, value: string, updatedAt: any } | null> | null };

export type GetCustomerQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetCustomerQuery = { __typename?: 'RootQuery', customer: { __typename?: 'Customer', id?: number | null, name?: string | null, createdAt?: any | null } };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'RootQuery', customers?: Array<{ __typename?: 'Customer', id?: number | null, name?: string | null, createdAt?: any | null, customerOrder?: Array<{ __typename?: 'Order', id: number, orderNumber?: string | null, customerName?: string | null, customerPhone?: string | null, orderAmount?: any | null, amountPaid?: any | null, deliveryAmount?: any | null, type?: OrderType | null, status: OrderStatus, paymentStatus: OrderPaymentStatusType, createdAt?: any | null, updatedAt?: any | null } | null> | null } | null> | null };

export type GetDeliveryAddressesQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetDeliveryAddressesQuery = { __typename?: 'RootQuery', deliveryAddresses?: Array<{ __typename?: 'DeliveryAddress', id: number, phoneNumber?: string | null, address?: string | null, deliveryFee?: any | null, type?: DeliveryAddressType | null, name?: string | null, locationId?: string | null, lng?: number | null, lat?: number | null, deliveryZoneLocation?: { __typename?: 'ZoneLocation', id: number, address: string, createdAt: any, zone?: { __typename?: 'Zone', id: number, name: string, standardTime: string, standardPrice?: any | null, expressPrice?: any | null, createdAt?: any | null } | null } | null, deliveryPickupMtaani?: { __typename?: 'PickupMtaani', id: number, agentName?: string | null, locationName?: string | null, deliveryFee?: any | null, createdAt?: any | null } | null }> | null };

export type GetLocationQueryVariables = Exact<{
  locationId: Scalars['Int']['input'];
}>;


export type GetLocationQuery = { __typename?: 'RootQuery', location: { __typename?: 'ZoneLocation', id: number, address: string, createdAt: any } };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { __typename?: 'RootQuery', locations: Array<{ __typename?: 'ZoneLocation', id: number, address: string } | null> };

export type GetCurrentMerchantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentMerchantQuery = { __typename?: 'RootQuery', currentMerchant?: { __typename: 'Admin', id?: number | null, name?: string | null } | null };

export type GetMpesaQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetMpesaQuery = { __typename?: 'RootQuery', mpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string, callback_url?: string | null } | null };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'RootQuery', orders: Array<{ __typename?: 'Order', id: number, type?: OrderType | null, status: OrderStatus, customerName?: string | null, customerPhone?: string | null, paymentStatus: OrderPaymentStatusType, orderNumber?: string | null, orderAmount?: any | null, amountPaid?: any | null, deliveryAmount?: any | null, createdAt?: any | null, updatedAt?: any | null, transactions?: Array<{ __typename?: 'Transaction', id?: number | null, phoneNumber?: string | null, amount?: any | null, type?: string | null, transactionCode?: string | null, createdAt?: any | null } | null> | null, customerOrder?: { __typename?: 'Customer', name?: string | null } | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, price: any, quantity: number, orderProduct: { __typename?: 'Product', id: number, name: string, price: number } }>, deliveryAddress?: { __typename?: 'DeliveryAddress', name?: string | null, phoneNumber?: string | null, type?: DeliveryAddressType | null, address?: string | null, deliveryZoneLocation?: { __typename?: 'ZoneLocation', id: number, address: string, createdAt: any, zone?: { __typename?: 'Zone', id: number, name: string, standardTime: string, standardPrice?: any | null, expressPrice?: any | null, createdAt?: any | null } | null } | null, deliveryPickupMtaani?: { __typename?: 'PickupMtaani', id: number, agentName?: string | null, locationName?: string | null, deliveryFee?: any | null, createdAt?: any | null } | null } | null }> };

export type GetPickupMtaanisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPickupMtaanisQuery = { __typename?: 'RootQuery', pickupMtaanis?: Array<{ __typename?: 'PickupMtaani', id: number, locationName?: string | null, agentName?: string | null, deliveryFee?: any | null, createdAt?: any | null }> | null };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'RootQuery', product: { __typename: 'Product', id: number, name: string, price: number, isArchived: boolean, description?: string | null, isFeatured: boolean, specification?: string | null, images: Array<{ __typename?: 'Image', id: number, url: string }>, store?: { __typename: 'Store', id: number, name: string } | null, category: { __typename: 'Category', id: number, name: string }, sizes?: Array<{ __typename: 'Size', id: number, name: string, value: string, price?: any | null }> | null, colors?: Array<{ __typename: 'Color', id: number, name: string, value: string }> | null } };

export type GetProductsQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetProductsQuery = { __typename?: 'RootQuery', products?: Array<{ __typename: 'Product', id: number, name: string, price: number, isArchived: boolean, isFeatured: boolean, updatedAt?: any | null, specification?: string | null, description?: string | null, images: Array<{ __typename: 'Image', id: number, url: string }>, store?: { __typename: 'Store', id: number, name: string } | null, category: { __typename: 'Category', id: number, name: string }, sizes?: Array<{ __typename: 'Size', id: number, name: string, price?: any | null, value: string }> | null, colors?: Array<{ __typename: 'Color', id: number, name: string, value: string }> | null } | null> | null };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetProductsByCategoryQuery = { __typename?: 'RootQuery', productsByCategory?: Array<{ __typename: 'Product', id: number, name: string, price: number, isArchived: boolean, isFeatured: boolean, description?: string | null, specification?: string | null, sizes?: Array<{ __typename: 'Size', id: number, name: string, price?: any | null }> | null, colors?: Array<{ __typename: 'Color', id: number, name: string, value: string }> | null, images: Array<{ __typename?: 'Image', id: number, url: string, fileId: string, name?: string | null }>, category: { __typename?: 'Category', id: number, name: string } } | null> | null };

export type GetProductsOfIdsQueryVariables = Exact<{
  productsIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsOfIdsQuery = { __typename?: 'RootQuery', productsIds: Array<{ __typename?: 'Product', id: number, name: string, price: number } | null> };

export type GetProductsOnlyQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetProductsOnlyQuery = { __typename?: 'RootQuery', products?: Array<{ __typename: 'Product', id: number, name: string, price: number, isFeatured: boolean, updatedAt?: any | null } | null> | null };

export type GetProductsWithCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsWithCategoryQuery = { __typename?: 'RootQuery', productsWithCategory?: Array<{ __typename?: 'CategoryWithProducts', categoryName: string, categoryId?: number | null, products?: Array<{ __typename: 'Product', id: number, name: string, price: number, description?: string | null, specification?: string | null, isFeatured: boolean, sizes?: Array<{ __typename: 'Size', id: number, name: string, price?: any | null }> | null, colors?: Array<{ __typename: 'Color', id: number, name: string, value: string }> | null, category: { __typename: 'Category', id: number, name: string }, images: Array<{ __typename?: 'Image', id: number, url: string, fileId: string, name?: string | null }> } | null> | null } | null> | null };

export type GetSizeQueryVariables = Exact<{
  sizeId: Scalars['Int']['input'];
}>;


export type GetSizeQuery = { __typename?: 'RootQuery', size: { __typename?: 'Size', id: number, name: string, value: string, price?: any | null } };

export type GetSizesQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetSizesQuery = { __typename?: 'RootQuery', sizes?: Array<{ __typename?: 'Size', id: number, name: string, value: string, updatedAt: any, price?: any | null } | null> | null };

export type GetStoreQueryVariables = Exact<{
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStoreQuery = { __typename?: 'RootQuery', store: { __typename: 'Store', id: number, name: string } };

export type GetStripeQueryVariables = Exact<{
  storeId: Scalars['Int']['input'];
}>;


export type GetStripeQuery = { __typename?: 'RootQuery', stripe?: { __typename?: 'StripeSetting', id: number, api_key: string, webhook_secret: string, callback_url: string } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'RootQuery', user: { __typename?: 'User', id?: number | null, email?: string | null, phoneNumber?: string | null, role?: string | null } };

export type GetZoneQueryVariables = Exact<{
  zoneId: Scalars['Int']['input'];
}>;


export type GetZoneQuery = { __typename?: 'RootQuery', zone?: { __typename?: 'Zone', id: number, name: string, standardPrice?: any | null, standardTime: string, expressPrice?: any | null, locations?: Array<{ __typename?: 'ZoneLocation', id: number, address: string }> | null } | null };

export type GetZonesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetZonesQuery = { __typename?: 'RootQuery', zones: Array<{ __typename?: 'Zone', id: number, name: string, standardPrice?: any | null, standardTime: string, expressPrice?: any | null, locations?: Array<{ __typename?: 'ZoneLocation', id: number, address: string, createdAt: any }> | null }> };

export type GetOrdersByCustomerQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetOrdersByCustomerQuery = { __typename?: 'RootQuery', ordersByCustomer: Array<{ __typename?: 'Order', id: number, type?: OrderType | null, status: OrderStatus, paymentStatus: OrderPaymentStatusType, orderNumber?: string | null, orderAmount?: any | null, amountPaid?: any | null, deliveryAmount?: any | null, createdAt?: any | null, updatedAt?: any | null, customerOrder?: { __typename?: 'Customer', name?: string | null } | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, price: any, quantity: number, orderProduct: { __typename?: 'Product', id: number, name: string, price: number } }>, deliveryAddress?: { __typename?: 'DeliveryAddress', name?: string | null, phoneNumber?: string | null, type?: DeliveryAddressType | null, address?: string | null, deliveryZoneLocation?: { __typename?: 'ZoneLocation', id: number, address: string, createdAt: any, zone?: { __typename?: 'Zone', id: number, name: string, standardTime: string, standardPrice?: any | null, expressPrice?: any | null, createdAt?: any | null } | null } | null, deliveryPickupMtaani?: { __typename?: 'PickupMtaani', id: number, agentName?: string | null, locationName?: string | null, deliveryFee?: any | null, createdAt?: any | null } | null } | null }> };

export type ProductSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
  storeId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductSearchQuery = { __typename?: 'RootQuery', productSearch?: Array<{ __typename?: 'Product', id: number, name: string, description?: string | null, price: number, category: { __typename?: 'Category', name: string }, images: Array<{ __typename?: 'Image', fileId: string, name?: string | null, url: string }> } | null> | null };

export type LoginAdminMutationVariables = Exact<{
  user: UserInput;
}>;


export type LoginAdminMutation = { __typename?: 'RootMutation', loginAdmin?: { __typename?: 'AdminAuth', auth?: { __typename?: 'Auth', token?: string | null } | null, admin?: { __typename?: 'Admin', id?: number | null, name?: string | null } | null, user?: { __typename?: 'User', phoneNumber?: string | null, role?: string | null } | null } | null };

export type LoginCustomerMutationVariables = Exact<{
  user: UserInput;
}>;


export type LoginCustomerMutation = { __typename?: 'RootMutation', loginCustomer?: { __typename?: 'CustomerAuth', auth?: { __typename?: 'Auth', token?: string | null } | null, customer?: { __typename?: 'Customer', id?: number | null, name?: string | null } | null, user?: { __typename?: 'User', id?: number | null, phoneNumber?: string | null, role?: string | null } | null } | null };

export type SignUpAdminMutationVariables = Exact<{
  user: UserInput;
  admin: AdminInput;
}>;


export type SignUpAdminMutation = { __typename?: 'RootMutation', signupAdmin?: { __typename?: 'AdminAuth', auth?: { __typename?: 'Auth', token?: string | null } | null, admin?: { __typename?: 'Admin', name?: string | null } | null, user?: { __typename?: 'User', phoneNumber?: string | null, role?: string | null } | null } | null };

export type SignupCustomerMutationVariables = Exact<{
  user: UserInput;
  customer: CustomerInput;
}>;


export type SignupCustomerMutation = { __typename?: 'RootMutation', signupCustomer?: { __typename?: 'CustomerAuth', auth?: { __typename?: 'Auth', token?: string | null } | null, user?: { __typename?: 'User', id?: number | null, phoneNumber?: string | null, email?: string | null, role?: string | null } | null, customer?: { __typename?: 'Customer', id?: number | null, name?: string | null, createdAt?: any | null } | null } | null };

export type UpdateBillboardMutationVariables = Exact<{
  billboardId: Scalars['Int']['input'];
  payload: BillboardInput;
}>;


export type UpdateBillboardMutation = { __typename?: 'RootMutation', updateBillboard?: { __typename: 'Billboard', id: number, label: string, fileId: string, name?: string | null, url: string, store?: { __typename: 'Store', id: number } | null } | null };

export type UpdateCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  payload: CategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'RootMutation', updateCategory?: { __typename: 'Category', id: number, name: string, description?: string | null, store?: { __typename: 'Store', id: number } | null } | null };

export type UpdateColorMutationVariables = Exact<{
  colorId: Scalars['Int']['input'];
  payload: ColorInput;
}>;


export type UpdateColorMutation = { __typename?: 'RootMutation', updateColor?: { __typename: 'Color', id: number, name: string, value: string } | null };

export type UpdateCustomerMutationVariables = Exact<{
  customerId: Scalars['Int']['input'];
  payload: CustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'RootMutation', updateCustomer?: { __typename: 'Customer', id?: number | null, name?: string | null } | null };

export type UpdateLocationMutationVariables = Exact<{
  locationId: Scalars['Int']['input'];
  payload: LocationUpdateInput;
}>;


export type UpdateLocationMutation = { __typename?: 'RootMutation', updateZoneLocation?: { __typename: 'ZoneLocation', address: string } | null };

export type UpdateMpesaMutationVariables = Exact<{
  mpesaId: Scalars['Int']['input'];
  payload: MpesaSettingInput;
}>;


export type UpdateMpesaMutation = { __typename?: 'RootMutation', updateMpesa?: { __typename?: 'MpesaSetting', id?: number | null, consumer_key: string, consumer_secret: string, pass_key: string, business_shortcode: string, account_reference: string, transaction_desc: string } | null };

export type UpdateOrderMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  payload: OrderInputUpdate;
}>;


export type UpdateOrderMutation = { __typename?: 'RootMutation', updateOrder?: { __typename?: 'Order', id: number, orderNumber?: string | null, customerName?: string | null, customerPhone?: string | null, orderAmount?: any | null, amountPaid?: any | null, deliveryAmount?: any | null, type?: OrderType | null, status: OrderStatus, paymentStatus: OrderPaymentStatusType, createdAt?: any | null, updatedAt?: any | null } | null };

export type UpdateOrderCheckoutMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  storeId: Scalars['Int']['input'];
  payload: OrderCheckoutInput;
}>;


export type UpdateOrderCheckoutMutation = { __typename?: 'RootMutation', updateOrderCheckout?: { __typename?: 'Order', id: number, status: OrderStatus, paymentStatus: OrderPaymentStatusType, customerOrder?: { __typename?: 'Customer', id?: number | null, name?: string | null } | null, orderItems: Array<{ __typename?: 'OrderItem', id: number, productId?: number | null, quantity: number }> } | null };

export type UpdatePickupMtaaniMutationVariables = Exact<{
  pickupMtaaniId: Scalars['Int']['input'];
  payload?: InputMaybe<PickupMtaaniInput>;
}>;


export type UpdatePickupMtaaniMutation = { __typename?: 'RootMutation', updatePickupMtaani?: { __typename?: 'PickupMtaani', id: number, locationName?: string | null, agentName?: string | null, deliveryFee?: any | null, createdAt?: any | null } | null };

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  payload: ProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'RootMutation', updateProduct?: { __typename: 'Product', id: number, name: string, price: number, isArchived: boolean, isFeatured: boolean, store?: { __typename: 'Store', id: number, name: string } | null, category: { __typename: 'Category', id: number, name: string }, images: Array<{ __typename?: 'Image', id: number, fileId: string, name?: string | null, url: string }> } | null };

export type UpdateSizeMutationVariables = Exact<{
  sizeId: Scalars['Int']['input'];
  payload: SizeInput;
}>;


export type UpdateSizeMutation = { __typename?: 'RootMutation', updateSize?: { __typename: 'Size', id: number, name: string } | null };

export type UpdateStoreMutationVariables = Exact<{
  storeId: Scalars['Int']['input'];
  payload: StoreInput;
}>;


export type UpdateStoreMutation = { __typename?: 'RootMutation', updateStore?: { __typename: 'Store', id: number, name: string } | null };

export type UpdateStripeMutationVariables = Exact<{
  stripeId: Scalars['Int']['input'];
  payload: StripeSettingInput;
}>;


export type UpdateStripeMutation = { __typename?: 'RootMutation', updateStripe?: { __typename?: 'StripeSetting', id: number, api_key: string, callback_url: string, webhook_secret: string } | null };

export type UpdateZoneMutationVariables = Exact<{
  zoneId: Scalars['Int']['input'];
  payload: ZoneInput;
}>;


export type UpdateZoneMutation = { __typename?: 'RootMutation', updateZone?: { __typename: 'Zone', name: string, standardPrice?: any | null, standardTime: string, expressPrice?: any | null } | null };


export const AddBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboard"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboard"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddBillboardMutation, AddBillboardMutationVariables>;
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<AddColorMutation, AddColorMutationVariables>;
export const AddCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<AddCustomerMutation, AddCustomerMutationVariables>;
export const AddDeliveryAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDeliveryAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deliveryAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DeliveryAddressInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDeliveryAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deliveryAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deliveryAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryPickupMtaani"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryZoneLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}}]}}]}}]} as unknown as DocumentNode<AddDeliveryAddressMutation, AddDeliveryAddressMutationVariables>;
export const AddLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addZoneLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddLocationMutation, AddLocationMutationVariables>;
export const AddMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MpesaSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}}]}}]}}]} as unknown as DocumentNode<AddMpesaMutation, AddMpesaMutationVariables>;
export const AddOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddOrderMutation, AddOrderMutationVariables>;
export const AddPickupMtaaniDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPickupMtaani"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaani"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PickupMtaaniInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPickupMtaani"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pickupMtaani"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaani"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AddPickupMtaaniMutation, AddPickupMtaaniMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"product"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"product"},"value":{"kind":"Variable","name":{"kind":"Name","value":"product"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const AddSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SizeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<AddSizeMutation, AddSizeMutationVariables>;
export const AddStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"store"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"store"},"value":{"kind":"Variable","name":{"kind":"Name","value":"store"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddStoreMutation, AddStoreMutationVariables>;
export const AddStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}}]}}]}}]} as unknown as DocumentNode<AddStripeMutation, AddStripeMutationVariables>;
export const AddTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transaction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"transaction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transaction"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCode"}},{"kind":"Field","name":{"kind":"Name","value":"orderTransaction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amountPaid"}},{"kind":"Field","name":{"kind":"Name","value":"orderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}}]}}]}}]}}]} as unknown as DocumentNode<AddTransactionMutation, AddTransactionMutationVariables>;
export const AddZoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ZoneInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addZone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}}]}}]}}]} as unknown as DocumentNode<AddZoneMutation, AddZoneMutationVariables>;
export const CustomerSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CustomerSearchQuery, CustomerSearchQueryVariables>;
export const DeleteBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteBillboardMutation, DeleteBillboardMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"colorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteColorMutation, DeleteColorMutationVariables>;
export const DeleteLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteZoneLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteLocationMutation, DeleteLocationMutationVariables>;
export const DeleteMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteMpesaMutation, DeleteMpesaMutationVariables>;
export const DeletePickupMtaaniDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePickupMtaani"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaaniId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePickupMtaani"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pickupMtaaniId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaaniId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeletePickupMtaaniMutation, DeletePickupMtaaniMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sizeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteSizeMutation, DeleteSizeMutationVariables>;
export const DeleteStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteStoreMutation, DeleteStoreMutationVariables>;
export const DeleteStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteStripeMutation, DeleteStripeMutationVariables>;
export const DeleteZoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteZone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]} as unknown as DocumentNode<DeleteZoneMutation, DeleteZoneMutationVariables>;
export const GetAllStoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllStores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllStoresQuery, GetAllStoresQueryVariables>;
export const GetBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBillboardQuery, GetBillboardQueryVariables>;
export const GetBillboardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBillboards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"billboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetBillboardsQuery, GetBillboardsQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"colorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetColorQuery, GetColorQueryVariables>;
export const GetColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetColors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetColorsQuery, GetColorsQueryVariables>;
export const GetCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerPhone"}},{"kind":"Field","name":{"kind":"Name","value":"orderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"amountPaid"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetDeliveryAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeliveryAddresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deliveryAddresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryZoneLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryPickupMtaani"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}}]}}]}}]} as unknown as DocumentNode<GetDeliveryAddressesQuery, GetDeliveryAddressesQueryVariables>;
export const GetLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetLocationQuery, GetLocationQueryVariables>;
export const GetLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetCurrentMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCurrentMerchantQuery, GetCurrentMerchantQueryVariables>;
export const GetMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}}]}}]}}]} as unknown as DocumentNode<GetMpesaQuery, GetMpesaQueryVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerPhone"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"amountPaid"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transactionCode"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryZoneLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryPickupMtaani"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetPickupMtaanisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPickupMtaanis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pickupMtaanis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetPickupMtaanisQuery, GetPickupMtaanisQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"specification"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"specification"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"specification"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>;
export const GetProductsOfIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsOfIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetProductsOfIdsQuery, GetProductsOfIdsQueryVariables>;
export const GetProductsOnlyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsOnly"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProductsOnlyQuery, GetProductsOnlyQueryVariables>;
export const GetProductsWithCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsWithCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsWithCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"specification"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsWithCategoryQuery, GetProductsWithCategoryQueryVariables>;
export const GetSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sizeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetSizeQuery, GetSizeQueryVariables>;
export const GetSizesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSizes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sizes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetSizesQuery, GetSizesQueryVariables>;
export const GetStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStoreQuery, GetStoreQueryVariables>;
export const GetStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}}]}}]}}]} as unknown as DocumentNode<GetStripeQuery, GetStripeQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetZoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<GetZoneQuery, GetZoneQueryVariables>;
export const GetZonesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetZones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetZonesQuery, GetZonesQueryVariables>;
export const GetOrdersByCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrdersByCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ordersByCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"amountPaid"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryZoneLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"zone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliveryPickupMtaani"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>;
export const ProductSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<ProductSearchQuery, ProductSearchQueryVariables>;
export const LoginAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginAdminMutation, LoginAdminMutationVariables>;
export const LoginCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginCustomerMutation, LoginCustomerMutationVariables>;
export const SignUpAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"admin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"admin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"admin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpAdminMutation, SignUpAdminMutationVariables>;
export const SignupCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<SignupCustomerMutation, SignupCustomerMutationVariables>;
export const UpdateBillboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBillboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBillboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billboardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billboardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBillboardMutation, UpdateBillboardMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ColorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateColor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"colorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"colorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<UpdateColorMutation, UpdateColorMutationVariables>;
export const UpdateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateZoneLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const UpdateMpesaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMpesa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MpesaSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMpesa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mpesaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mpesaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_key"}},{"kind":"Field","name":{"kind":"Name","value":"consumer_secret"}},{"kind":"Field","name":{"kind":"Name","value":"pass_key"}},{"kind":"Field","name":{"kind":"Name","value":"business_shortcode"}},{"kind":"Field","name":{"kind":"Name","value":"account_reference"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_desc"}}]}}]}}]} as unknown as DocumentNode<UpdateMpesaMutation, UpdateMpesaMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInputUpdate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerPhone"}},{"kind":"Field","name":{"kind":"Name","value":"orderAmount"}},{"kind":"Field","name":{"kind":"Name","value":"amountPaid"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const UpdateOrderCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrderCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderCheckoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrderCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"customerOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateOrderCheckoutMutation, UpdateOrderCheckoutMutationVariables>;
export const UpdatePickupMtaaniDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePickupMtaani"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaaniId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PickupMtaaniInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePickupMtaani"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pickupMtaaniId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pickupMtaaniId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"agentName"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePickupMtaaniMutation, UpdatePickupMtaaniMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SizeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sizeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sizeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateSizeMutation, UpdateSizeMutationVariables>;
export const UpdateStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStoreMutation, UpdateStoreMutationVariables>;
export const UpdateStripeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStripe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StripeSettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStripe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stripeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}},{"kind":"Field","name":{"kind":"Name","value":"callback_url"}},{"kind":"Field","name":{"kind":"Name","value":"webhook_secret"}}]}}]}}]} as unknown as DocumentNode<UpdateStripeMutation, UpdateStripeMutationVariables>;
export const UpdateZoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateZone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ZoneInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateZone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"zoneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zoneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"standardTime"}},{"kind":"Field","name":{"kind":"Name","value":"expressPrice"}}]}}]}}]} as unknown as DocumentNode<UpdateZoneMutation, UpdateZoneMutationVariables>;
