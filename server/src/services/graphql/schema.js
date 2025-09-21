
const typeDefinitions = `#graqhql
    scalar Date
    scalar Decimal
    # tell apollo server @auth can be used with queries, fields, and field definitions so that use it everywhere
    directive @auth on QUERY | FIELD_DEFINITION | FIELD

    type User {
        id: Int
        phoneNumber: String
        email: String
        role: String
        refreshTOken: String
        authToken: String
    }
    type Admin {
        id: Int
        name: String
        customers: [Customer]
        products: [Product]
        stores: [Store]
    }
    type Customer {
        id: Int
        name: String
        createdAt: Date
        customerUser: User
        customerOrder: [Order]
    }
    type MpesaSetting {
        id: Int
        consumer_key: String!
        consumer_secret: String!
        pass_key: String!
        business_shortcode: String!
        account_reference: String!
        transaction_desc: String!
        store: Store
        callback_url: String
    }
    type StripeSetting {
        id: Int!
        api_key: String!
        webhook_secret: String!
        callback_url: String!
        storeId: Store
    }
    type Store {
        id:  Int!
        name: String!
        admin: Admin
        billboards: [Billboard]
        colors: [Color]
        mpesa: MpesaSetting
        products: [Product]
        createdAt: Date!
        updatedAt: Date! 
    }
    type Billboard {
        id: Int!
        label: String!
        url: String!
        fileId: String!
        name: String
        store: Store
        categories: [Category]
        createdAt: Date!
        updatedAt: Date!
    }
    type Category {
        id: Int!
        name: String!
        description: String
        store: Store
        products: [Product]
        updatedAt: Date
    }
    type Size {
        id: Int!
        name: String!
        value: String!
        updatedAt: Date!
        price: Decimal
    }
    type Color {
        id: Int!
        name: String!
        value: String!
        updatedAt: Date!
    }
    type Product{
        id: Int!
        name: String!
        price: Int!
        isFeatured: Boolean!
        isArchived: Boolean!
        sizes: [Size!]
        colors: [Color!]
        description: String
        category: Category!
        store: Store
        images: [Image!]!
        updatedAt: Date
        specification: String
    }

    type CategoryWithProducts {
        categoryName: String!
        categoryId: Int
        products: [Product]
    }
    
    enum DeliveryAddressType {
        CUSTOM
        PICKUP_MTAANI
        PICK_AND_DROP
  }

    type DeliveryAddress {
        id: Int!
        phoneNumber: String
        name: String
        type: DeliveryAddressType

        address: String
        lat: Float
        lng: Float
        locationId: String
        deliveryFee: Decimal

        deliveryZoneLocation: ZoneLocation
        deliveryPickupMtaani: PickupMtaani
        customer: Customer
    }

    enum OrderType {
        selfCollect
        delivery
    }

    enum OrderStatus {
        CONFIRMED
        PENDING
        RECEIVED
        CANCELLED
    }

    enum OrderPaymentStatusType {
        FULL
        PARTIAL
        NOT_PAID
    }


    type Order {
        id: Int!
        orderNumber: String
        customerName: String
        customerPhone: String
        orderAmount: Decimal
        amountPaid: Decimal
        deliveryAmount: Decimal
        type: OrderType
        status: OrderStatus!
        paymentStatus: OrderPaymentStatusType!
        createdAt: Date
        updatedAt: Date

        customerOrder: Customer
        transactions: [Transaction]
        orderItems: [OrderItem!]!
        deliveryAddress: DeliveryAddress

    }

    type OrderItem {
        id: Int!
        price: Decimal!
        quantity: Int!
        productId: Int
        order: Order
        orderProduct: Product!
    }
    type Image {
        id: Int!
        url: String!
        fileId: String!
        name: String
        productId: Int!
        storeId: Int!
    }

    type Transaction {
        id: Int
        phoneNumber: String
        amount: Decimal
        type: String
        transactionCode: String

        orderTransaction: Order
        createdAt: Date
    }

    ####### PICKUP AND DELIVERY #####
    type Zone {
        id: Int!
        name: String!
        standardTime: String!
        standardPrice: Decimal
        expressPrice: Decimal
        locations: [ZoneLocation!]
        createdAt: Date
    }

    type ZoneLocation {
        id: Int!
        address: String!
        zone: Zone
        createdAt: Date!
    }

    type PickupMtaani {
        id: Int!
        locationName: String
        agentName: String
        deliveryFee: Decimal
        createdAt: Date
    }

    type SequelizeMeta {
        name: String
    }

    type RootQuery {
        customers: [Customer] @auth
        customer(userId: Int!): Customer!
        stores: [Store]
        store(storeId: Int):Store!
        billboards(storeId: Int): [Billboard]
        billboard( billboardId: Int!): Billboard
        categories(storeId: Int): [Category]
        category(categoryId: Int!): Category
        sizes(storeId: Int!): [Size]
        size(sizeId: Int!): Size!
        colors(storeId: Int!): [Color]
        color(colorId: Int!): Color!
        mpesa(storeId: Int!): MpesaSetting
        stripe(storeId: Int!): StripeSetting
        orders: [Order!]! @auth
        ordersByCustomer(customerId: Int!): [Order!]! @auth
        order(orderId: Int!): Order
        products(storeId: Int!, categoryId: Int, sizeId: Int, colorId: Int): [Product]
        productsWithCategory(page: Int, limit: Int): [CategoryWithProducts]
        productsByCategory(categoryId: Int!, page: Int, limit: Int): [Product]
        product(productId: Int!): Product!
        productSearch(page: Int, limit: Int, text: String!, storeId: Int): [Product]
        productsIds( storeId: Int,productIds: [Int]): [Product]!
        currentMerchant: Admin @auth
        customersSearch(page: Int, limit: Int, text: String!): [Customer] @auth
        customerSearch(page: Int, limit: Int, text: String!): [Customer] @auth
        zones: [Zone!]!
        zone(zoneId: Int!): Zone
        locations: [ZoneLocation]!
        pickupMtaanis: [PickupMtaani!]
        location(locationId: Int!): ZoneLocation!
        deliveryAddresses(customerId: Int!): [DeliveryAddress!] @auth
        user: User!
        sequelizeMeta: SequelizeMeta
    }


    enum UserRole {
        customer
        admin
    }
    input UserInput {
        email: String
        phoneNumber: String!
        password: String!
        role: UserRole!
    }
    input CustomerInput {
        name: String!
    }

    input AdminInput {
        name: String!
    }

    type Auth {
        token: String
    }

    type Response {
        response: Boolean
    }

    input StoreInput{
        name: String!
    }


    input BillboardInput {
        label: String!
        url: String!
        fileId: String!
        name: String
        storeId: Int!
    }
    input CategoryInput {
        name: String!
        description: String
        storeId: Int!
    }
    input SizeInput {
        id: Int
    name: String!
        value: String!
        price: Decimal!
    }
    input WeightInput {
        id: Int
        name: String!
        value: String!
    }
    input ColorInput {
        id: Int
        name: String!
        value: String!
    }
    input ProductInput{
        name: String!
        price: Int!
        description: String
        specification: String
        images: [ImageInput]
        isFeatured: Boolean
        isArchived: Boolean
        sizes: [SizeInput]
        colors: [ColorInput]
        categoryId: Int!
        storeId: Int!
    }
    input ProductUpdateInput{
        name: String!
        price: Int!
        description: String
        images: [ImageInput]
        isFeatured: Boolean
        isArchived: Boolean
        sizes: [SizeInput]
        colors: [ColorInput]
        categoryId: Int!
        storeId: Int!
    }
    input ImageInput {
        url: String!
        fileId: String!
        name: String
        storeId: Int
        productI: Int
    }
    
    input CustomAddressInput {
        address: String!
        lat: Float!
        lng: Float!
        locationId: String!
        deliveryFee: Decimal
    }

    input DeliveryAddressInput {
        phoneNumber: String!
        name: String!

        type: DeliveryAddressType
        zoneLocationId: Int
        pickupMtaaniId: Int
        customAddress: CustomAddressInput
    }

    input OrderInput {
        type: OrderType!
        orderAmount: Decimal!
        amountPaid: Decimal
        customerPhone: String!
        customerName: String!
        deliveryAmount: Decimal
        deliveryAddressId: Int
        orderItems: [OrderItemInput]
    }
    input OrderInputUpdate {
        status: OrderStatus
        paymentStatus: OrderPaymentStatusType
        orderType: OrderType
        deliveryAmount: Decimal
        orderAmount: Decimal
        amountPaid: Decimal
    }
    input OrderItemInput {
        productId: Int!
        price: Decimal!
        quantity: Int!
    }

    input OrderCheckoutInput {
        isPaid: Boolean
        phoneNumber: String!
        address: String!
    }
  
    
    input MpesaSettingInput {
        consumer_key: String
        consumer_secret: String
        pass_key: String
        business_shortcode: String
        account_reference: String
        transaction_desc: String
        callback_url: String
        storeId: Int
    }
    input StripeSettingInput {
        api_key: String
        webhook_secret: String
        callback_url: String
        storeId: Int!
    }

    ###### Pickup and delivery ######
    input ZoneInput {
        name: String!
        standardTime: String!
        standardPrice: Decimal!
        expressPrice: Decimal!
    }

    input LocationInput {
        address: String!
        zoneId: Int!
    }

    input LocationUpdateInput {
        address: String!
    }

    input PickupMtaaniInput {
        locationName: String
        agentName: String
        deliveryFee: Decimal
    }

    input TransactionInput {
        orderId: Int
        phoneNumber: String
        amount: Decimal
        type: String
        transactionCode: String
    }

    type CustomerAuth {
        auth: Auth
        user: User
        customer: Customer
    }
  
    type AdminAuth {
        auth: Auth
        user: User
        admin: Admin
    }
  

    type RootMutation {
        addCustomer (
            customer: CustomerInput!
        ): Customer
        signupCustomer (
            user: UserInput!
            customer: CustomerInput!
        ):  CustomerAuth
        loginCustomer (
            user: UserInput!
        ):  CustomerAuth
        signupAdmin (
            user: UserInput!
            admin: AdminInput!
        ):  AdminAuth
        loginAdmin (
            user: UserInput!
        ):  AdminAuth
        addStore (
            store: StoreInput!
        ): Store @auth
        addBillboard (
            billboard: BillboardInput!
        ): Billboard @auth
        addCategory (
            category: CategoryInput!
        ): Category @ auth
        addSize (
            size: SizeInput!
        ): Size @auth
        addMpesa (
            mpesa: MpesaSettingInput!
        ): MpesaSetting @auth
        addStripe (
            stripe: StripeSettingInput!
        ): StripeSetting @auth
        addColor (
            color: ColorInput!
        ): Color @auth
        addProduct (
            product: ProductInput!
        ): Product @auth
        addImage (
            image: ImageInput!
        ): Image @auth
        addDeliveryAddress (
            deliveryAddress: DeliveryAddressInput
        ): DeliveryAddress!
        addOrder(
            order: OrderInput!
        ): Order @auth
        addTransaction(
            transaction: TransactionInput!
        ): Transaction

        addPickupMtaani(
            pickupMtaani: PickupMtaaniInput
        ): PickupMtaani @auth
        updatePickupMtaani (
            pickupMtaaniId: Int!
            payload: PickupMtaaniInput
        ): PickupMtaani @auth
        deletePickupMtaani (
            pickupMtaaniId: Int!
        ): Response @auth

        addZone(
            zone: ZoneInput
        ): Zone @auth
        updateZone(
            zoneId: Int!
            payload: ZoneInput!
        ): Zone @auth
        deleteZone(
            zoneId: Int!
        ): Response @auth

        addZoneLocation(
            location: LocationInput
        ): ZoneLocation @auth
        updateZoneLocation(
            locationId: Int!
            payload: LocationUpdateInput!
        ): ZoneLocation @auth
        deleteZoneLocation(
            locationId: Int!
        ): Response @auth

        updateStore (
            storeId: Int!
            payload: StoreInput!
        ): Store @auth
        updateMpesa (
            mpesaId: Int!
            payload: MpesaSettingInput!
        ): MpesaSetting @auth
        updateStripe (
            stripeId: Int!
            payload: StripeSettingInput!
        ): StripeSetting @auth
        updateBillboard (
            billboardId: Int!
            payload: BillboardInput!
        ): Billboard @auth
        updateCategory (
            categoryId: Int!
            payload: CategoryInput!
        ): Category @auth
        updateSize (
            sizeId: Int!
            payload: SizeInput!
        ): Size @auth
        updateColor (
            colorId: Int!
            payload: ColorInput!
        ): Color @auth
        updateProduct (
            productId: Int!
            payload: ProductInput!
        ): Product @auth
        updateOrderCheckout (
            orderId: Int!
            storeId: Int!
            payload: OrderCheckoutInput!
        ): Order
        updateCustomer (
            customerId: Int!
            payload: CustomerInput!
        ): Customer @auth
        updateOrder(
            orderId: Int!
            payload: OrderInputUpdate!
        ): Order @auth

        deleteStore (
            storeId: Int!
        ): Response @auth
        deleteBillboard (
            storeId: Int!
            billboardId: Int!
        ): Response @auth
        deleteCategory (
            categoryId: Int!
            storeId: Int!
        ): Response @auth
        deleteSize (
            storeId: Int!
            sizeId: Int!
        ): Response @auth
        deleteColor (
            storeId: Int!
            colorId: Int!
        ): Response @auth
        deleteMpesa (
            storeId: Int!
            mpesaId: Int!
        ): Response @auth
        deleteStripe (
            storeId: Int!
            stripeId: Int!
        ): Response @auth
        deleteProduct(
            productId: Int!
            storeId: Int!
        ): Response @auth
        deleteImage(
            imageId: Int!
            productId: Int!
        ): Response @auth

        logoutMerchant: Response
    } 

    schema { 
        query: RootQuery
        mutation: RootMutation
    }
`;

module.exports = [typeDefinitions];
