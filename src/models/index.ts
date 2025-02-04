// |-- Types --|
export type {
    DealersListResponse,
    AddDealer,
    UpdateDealer,
} from './Dealer.model'
export type {
    DealersRatioListResponse,
    // AddDealer,
    // UpdateDealer,
} from './DealersRatio.model'
export type {
    DealersSchemeAdd,
    DealersSchemeListResponse,
    UpdateDealersScheme,
} from './DealerScheme.model'
export type {
    DealersPincodeAdd,
    DealersPincodeListResponse,
    UpdateDealersPincode,
} from './DealerPinCode.model'
export type {
    AddDealerWarehouse,
    DealerWarehousesListResponse,
    UpdateDealerWarehouse,
} from './DealerWarehouse.model'
export type {
    AddVendorWarehouse,
    VendorWarehousesListResponse,
    UpdateVendorWarehouse,
} from './VendorWarehouse.model'
export type {
    VendorsListResponse,
    AddVendor,
    UpdateVendor,
} from './Vendors.model'
export type {
    UsersListResponse,
    AddUser,
    UpdateUser,
    ChangeCompany,
    AddNewUser,
    UpdateNewUser,
    UsersNewListResponse,
} from './Users.model '
export type {
    CompaniesListResponse,
    AddCompany,
    UpdateCompany,
} from './Company.model'
export type {
    CompanyBranchListResponse,
    AddCompanyBranch,
    UpdateCompanyBranch,
} from './CompanyBranch.model'
export type {
    WarehousesListResponse,
    AddWarehouse,
    UpdateWarehouse,
} from './Warehouse.model'
export type {
    BarcodeListResponseType,
    AddBarcode,
    UpdateBarcode,
    ProductBarcodeGroupResponse,
} from './Barcode.model'
export type {
    AttributesListResponse,
    AddAttributes,
    UpdateAttributes,
} from './Attrbutes.model'

export type {
    AttributesGroupListResponse,
    AddAttributesGroup,
    UpdateAttributesGroup,
} from './AttrbutesGroup.model'

export type { ItemListResponse, AddItem, UpdateItem } from './Item.model'
export type {
    CartonBoxListResponse,
    AddCartonBox,
    UpdateCartonBox,
} from './CartonBox.model'

export type { ASRListResponse, AddASR, UpdateASR } from './ASR.model'
export type {
    LanguageListResponse,
    AddLanguage,
    UpdateLanguage,
} from './Language.model'
export type {
    DealersCategoryListResponse,
    AddDealersCategory,
    UpdateDealersCategory,
} from './DealersCategory.model'

export type {
    ProductSubCategoryListResponse,
    AddProductSubCategory,
    UpdateProductSubCategory,
} from './ProductSubCategory.model'
export type {
    ProductsListResponse,
    AddProducts,
    UpdateProducts,
} from './Products.model'
export type { GRNListResponse, AddGRN, UpdateGRN } from './GRN.model'
export type {
    UpdateSOApprovalLevel,
    SaleOrderListResponse,
    AddSaleOrder,
    UpdateSaleOrder,
} from './SaleOrder.model'
export type {
    UpdateWTApprovalLevel,
    WarehouseTransferListResponse,
    AddWarehouseTransfer,
    UpdateWarehouseTransfer,
} from './WarehouseTransfer.model'
export type {
    InventoryListResponse,
    AddInventory,
    UpdateInventory,
} from './Inventory.model'
export type {
    CompetitorManagementListResponse,
    AddCompetitorManagement,
    UpdateCompetitorManagement,
} from './CompetitorManagement.model'

export type {
    ArtistListResponse,
    AddArtist,
    UpdateArtist,
} from './Artist.model'

export type {
    WebsiteListResponse,
    AddWebsite,
    UpdateWebsite,
} from './website/Website.model'
export type {
    WebsiteBlogListResponse,
    AddWebsiteBlog,
    UpdateWebsiteBlog,
} from './website/WebsiteBlog.model'
export type {
    WebsiteTagsListResponse,
    AddWebsiteTags,
    UpdateWebsiteTags,
} from './website/WebsiteTags.model'
export type { OrderListResponse } from './Order.model'
export type { OrderLedgerResponse } from './OrderLedger.modal'
export type { InquiryListResponse } from './Inquiry.model'
export type {
    DealersSupervisorListResponse,
    DealersSupervisorAdd,
    UpdateDealersSupervisor,
} from './DealerSupervisor.model'
export type {
    LedgerListResponse,
    LedgerAdd,
    UpdateLedger,
} from './Ledger.model'
export type {
    AssetsLocationListResponse,
    AddAssetsLocation,
    UpdateAssetsLocation,
} from './assets/AssetsLocation.modal'
export type {
    AssetsRequestListResponse,
    AddAssetsRequest,
    UpdateAssetsRequest,
} from './assets/AssetsRequest.model'
export type {
    AssetsCategoryListResponse,
    AddAssetsCategory,
    UpdateAssetsCategory,
} from './assets/AssetsCategory.modal'

export type {
    CallerResponse,
    CallerFormBody,
    UpdateCallerForm,
} from './Caller.model'

export type {
    VendorLedgerAdd,
    UpdateVendorLedger,
    VendorLedgerListResponse,
} from './VendorLedger.model'

export type {
    InventoryManagementListResponse,
    addInventoryManagement,
    UpdateInventoryManagement,
} from './InventoryManagement.model'

export type {
    AddWarehouseToComapny,
    UpdateWTCApprovalLevel,
    UpdateWarehouseToComapny,
} from './WarehouseToComapny.model'

// outward & inward warehouse tabs
export type {
    // O/I  DEALER TAB
    OutwardRequestDealerListResponse,

    // O/I  RTV TAB
    OutwardRequestRTVListResponse,

    // O/I  WTW TAB
    OutwardRequestWarehouseListResponse,

    // O/I  WTS TAB
    OutwardRequestWarehouseToSampleListResponse,

    // O/I  WTC TAB
    OutwardRequestWarehouseToCompanyListResponse,
} from './OutwardRequest.model'

// Inward Tabs
export type {
    // O/I DEALER TAB
    InwardDealerRequstListResponse,
} from './InwardRequest.model'

// InventoryFlow.modal
export type {
    BarcodeFlowListResponse,
    BarcodeFlowDataListResponsee,
} from './InventoryFlow.modal'

export type {
    CallCenterMasterListResponse,
    AddCallCenterMaster,
    UpdateCallCenterMaster,
} from './CallCenterMaster.model'
