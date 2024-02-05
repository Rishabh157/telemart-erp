// Order Module Tabs
export enum UserModuleOrderTabsTypes {
    'orderAllTab' = 'ORDER_ALL_TAB',
    'orderFreshTab' = 'ORDER_FRESH_ORDER_TAB',
    'orderApprovedTab' = 'ORDER_APPROVAL_TAB',
    'orderDeliveredTab' = 'ORDER_DELIVERED_TAB',
    'orderDoorCancelledTab' = 'ORDER_DOOR_CANCELLED_TAB',
    'orderHoldTab' = 'ORDER_HOLD_TAB',
    'orderPscTab' = 'ORDER_PSC_TAB',
    'orderUnaTab' = 'ORDER_UNA_TAB',
    'orderPndTab' = 'ORDER_PND_TAB',
    'orderUrgentTab' = 'ORDER_URGENT_TAB',
    'orderNonActionTab' = 'ORDER_NON_ACTION_TAB',
}

export enum UserModuleWarehouseTabsTypes {
    inventories = 'TAB_WAREHOUSE_INVENTORIES',
    //OUTWARD-INVENTORIES Sub Tabs
    outwardInventories = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES',
    outwardInventoriesDealer = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_DEALER',
    outwardInventoriesCustomer = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_CUSTOMER',
    outwardInventoriesRTV = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_RTV',
    outwardInventoriesWareHouse = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_WAREHOUSE',
    outwardInventoriesSample = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_SAMPLE',
    outwardInventoriesECommerce = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_E_COMMERCE',
    outwardInventoriesReplaceMents = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_REPLACEMENTS',
    outwardInventoriesCompany = 'TAB_WAREHOUSE_OUTWARD_INVENTORIES_COMPANY',
    //INWARD-INVENTORIES Sub Tabs
    inwardInventories = 'TAB_WAREHOUSE_INWARD_INVENTORIES',
    inwardInventoriesDealer = 'TAB_WAREHOUSE_INWARD_INVENTORIES_DEALER',
    inwardInventoriesCustomer = 'TAB_WAREHOUSE_INWARD_INVENTORIES_CUSTOMER',
    // inwardInventoriesRTV = 'TAB_WAREHOUSE_INWARD_INVENTORIES_RTV',
    inwardInventoriesWareHouse = 'TAB_WAREHOUSE_INWARD_INVENTORIES_WAREHOUSE',
    inwardInventoriesSample = 'TAB_WAREHOUSE_INWARD_INVENTORIES_SAMPLE',
    inwardInventoriesECommerce = 'TAB_WAREHOUSE_INWARD_INVENTORIES_E_COMMERCE',
    inwardInventoriesReplaceMents = 'TAB_WAREHOUSE_INWARD_INVENTORIES_REPLACEMENTS',
    inwardInventoriesCompany = 'TAB_WAREHOUSE_INWARD_INVENTORIES_COMPANY',
    warehouseDetails = 'TAB_WAREHOUSE_DETAILS',
}

export enum UserModuleActionTypes {
    Add = 'ADD',
    Edit = 'EDIT',
    List = 'LIST',
    Delete = 'DELETE',
    View = 'VIEW',
    genrateGrn = 'GENERATE_GRN',
}

export enum UserModuleOtherActionTypes {
    slotDefinition = 'SLOT_DEFINITION',
    slots = 'SLOTS',
}
export enum UserModuleTabsTypes {
    generalInformation = 'GENERAL_INFORMATION',
    purchaseOrder = 'PURCHASE_ORDER',
    vendoreWarehouse = 'VENDOR_WAREHOUSE',
    returnToVendor = 'RETURN_TO_VENDOR',
    vendorLedger = 'VENDOR_LEDGER',
    vendorActivity = 'VENDOR_ACTIVITY',
    dealerWarehouse = 'DEALER_WAREHOUSE',
    dealerWarehouseAdd = 'DEALER_WAREHOUSE_ADD',
    dealerSaleOrder = 'DEALER_SALE_ORDER',
    dealerSalesOrderAdd = 'DEALER_SALE_ORDER_ADD',
    dealerLedger = 'DEALER_LEDGER',
    dealerLedgerCreditAmountAdd = 'DEALER_LEDGER_CREDIT_AMOUNT_ADD',
    dealerLedgerCreditNoteAdd = 'DEALER_LEDGER_CREDIT_NOTE_ADD',
    dealerLedgerDebitNoteAdd = 'DEALER_LEDGER_DEBIT_NOTE_ADD',
    dealerOrderLedger = 'DEALER_ORDER_LEDGER',
    dealerActivity = 'DEALER_ACTIVITY',
    dealerPincode = 'DEALER_PINCODE',
    dealerPincodeAdd = 'DEALER_PINCODE_ADD',
    dealerScheme = 'DEALER_SCHEME',
    dealerSchemeAdd = 'DEALER_SCHEME_ADD',
}
export enum UserModuleAddActionTypes {
    vendorPoAdd = 'PURCHASE_ORDER_ADD',
    vendorWarehouseAdd = 'VENDOR_WAREHOUSE_ADD',
    vendorLedgerCreditNote = 'VENDOR_LEDGER_CREDIT_ADD',
    vendorLedgerDebitNote = 'VENDOR_LEDGER_DEBIT_ADD',
    dealerWareHouseAdd = 'DEALER_WAREHOUSE_ADD',
    dealerSalesOrderAdd = 'DEALER_SALE_ORDER_ADD',
    dealerLedgerCreditAmout = 'DEALER_LEDGER_CREDIT_AMOUNT_ADD',
    dealerLedgerCreditNote = 'DEALER_LEDGER_CREDIT_NOTE_ADD',
    dealerLedgerDebitNote = 'DEALER_LEDGER_DEBIT_NOTE_ADD',
    dealerPincodeAdd = 'DEALER_PINCODE_ADD',
    dealerSchemeAdd = 'DEALER_SCHEME_ADD',
    tabWarehouseInventoryAdd = 'TAB_WAREHOUSE_INVENTORIES_ADD',
}
export enum UserModuleNameTypes {
    dashboard = 'DASHBOARD',
    vendor = 'VENDOR',
    dealer = 'DEALER',
    dealerRatio = 'DEALER_RATIO',
    user = 'USER',
    wareHouse = 'WAREHOUSE',
    saleOrder = 'SALE_ORDER',
    // new modules
    rtvTransfer = 'RTV_TRANSFER',
    wtsTransfer = 'WAREHOUSE_TRANSFER',
    warehouseToSampleTransfer = 'WAREHOUSE_TO_SAMPLE',
    warehouseToCompanyTransfer = 'WAREHOUSE_TO_COMPANY_TRANSFER',
    asr = 'ASR',
    purchaseOrder = 'PURCHASE_ORDER',
    grn = 'GRN',
    inventoryFlow = 'INVENTORY_FLOW',
    inquiry = 'INQUIRY',
    order = 'ORDER',
    callerPage = 'CALLER_PAGE',
    attribute = 'ATTRIBUTE',
    attributeGroup = 'ATTRIBUTE_GROUP',
    productCategory = 'PRODUCT_CATEGORY',
    productSubCategory = 'PRODUCT_SUB_CATEGORY',
    productGroup = 'PRODUCT_GROUP',
    scheme = 'SCHEME',
    tax = 'TAX',
    item = 'ITEM',
    product = 'PRODUCT',
    cartonBox = 'CARTON_BOX',
    company = 'COMPANY',
    companyBranch = 'COMPANY_BRANCH',
    barcode = 'BARCODE',
    country = 'COUNTRY',
    state = 'STATE',
    district = 'DISTRICT',
    tehsil = 'TEHSIL',
    pincode = 'PINCODE',
    area = 'AREA',
    language = 'LANGUAGE',
    dealerCategory = 'DEALER_CATEGORY',
    channelGroup = 'CHANNEL_GROUP',
    channelCategory = 'CHANNEL_CATEGORY',
    channelManagement = 'CHANNEL_MANAGEMENT',
    didManagement = 'DID_MANAGEMENT',
    artist = 'ARTIST',
    tapeManangement = 'TAPE_MANAGEMENT',
    competitor = 'COMPETITOR',
    slotManagement = 'SLOT_MANAGEMENT',
    assetRequest = 'ASSET_REQUEST',
    assetCategory = 'ASSET_CATEGORY',
    assetLocation = 'ASSET_LOCATION',
    assetRelocation = 'ASSET_RELOCATION',
    assetAllocation = 'ASSET_ALLOCATION',
    dispositionOne = 'DISPOSITION_ONE',
    dispositionTwo = 'DISPOSITION_TWO',
    dispositionThree = 'DISPOSITION_THREE',
    initialCallerOne = 'INITIAL_CALLER_ONE',
    initialCallerTwo = 'INITIAL_CALLER_TWO',
    initialCallerThree = 'INITIAL_CALLER_THREE',
    dispositionComplaint = 'DISPOSITION_COMPLAINT',
    ndrDisposition = 'NDR_DISPOSITION',

    website = 'WEBSITE',
    websiteBlog = 'WEBSITE_BLOG',
    websitePage = 'WEBSITE_PAGE',
    websiteTags = 'WEBSITE_TAGS',
    configuration = 'CONFIGURATION',
    media = 'MEDIA',
    assets = 'ASSETS',
    allWebsite = 'ALL_WEBSITES',
    disposition = 'DISPOSITION',
    locations = 'LOCATIONS',
    WarehouseTransfer = 'WAREHOUSETRANSFER',
    warehouseToComapny = 'WAREHOUSETOCOMPANY',
    callCenterMaster = "CALL_CENTER_MASTER"
}

//  export const myMove = {
//     ...UserModuleActionTypes,
//     ...UserModuleTabsTypes,
//     ...UserModuleAddActionTypes,
//   }
