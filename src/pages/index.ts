import AddAttributeWrapper from './configuration/Configuration Screens/attributes/add/AddAttributeWrapper'
import AttributesListingWrapper from './configuration/Configuration Screens/attributes/list/AttributesListingWrapper'
import AddAttributeGroupWrapper from './configuration/Configuration Screens/attributesGroup/add/AddAttributeGroupWrapper'
import AttributesGroupListingWrapper from './configuration/Configuration Screens/attributesGroup/list/AttributesGroupListingWrapper'
import AddBarcodeWrapper from './configuration/Configuration Screens/barcode/add/AddBarcodeWrapper'
import BarcodeListingWrapper from './configuration/Configuration Screens/barcode/list/BarcodeListingWrapper'
import ViewBarcodeWrapper from './configuration/Configuration Screens/barcode/view/ViewBarcodeWrapper'
import AddCartonBoxWrapper from './configuration/Configuration Screens/cartonBox/add/AddCartonBoxWrapper'
import CartonBoxListingWrapper from './configuration/Configuration Screens/cartonBox/list/CartonBoxListingWrapper'
import AddCompanyWrapper from './configuration/Configuration Screens/configurationCompany/add/AddCompanyWrapper'
import ConfigurationCompanyListingWrapper from './configuration/Configuration Screens/configurationCompany/list/ConfigurationCompanyListingWrapper'
import AddDealersCategoryWrapper from './configuration/Configuration Screens/dealersCategory/add/AddDealersCategoryWrapper'
import DealersCategoryListingWrapper from './configuration/Configuration Screens/dealersCategory/list/DealersCategoryListingWrapper'
import AddGRNWrapper from './grn/add/AddGRNWrapper'
import GRNListingWrapper from './grn/list/GRNListingWrapper'
import AddItemWrapper from './configuration/Configuration Screens/item/add/AddItemWrapper'
import ItemListingWrapper from './configuration/Configuration Screens/item/list/ItemListingWrapper'
import AddLanguageWrapper from './configuration/Configuration Screens/language/add/AddLanguageWrapper'
import LanguageListingWrapper from './configuration/Configuration Screens/language/list/LanguageListingWrapper'
import Locations from './configuration/Configuration Screens/locations/Location'
import AddProductCategoryWrapper from './configuration/Configuration Screens/productCategory/add/AddProductCategoryWrapper'
import ProductCategoryListingWrapper from './configuration/Configuration Screens/productCategory/list/ProductCategoryListingWrapper'
import AddProductGroupWrapper from './configuration/Configuration Screens/productGroup/add/AddProductGroupWrapper'
import ProductGroupListingWrapper from './configuration/Configuration Screens/productGroup/list/ProductGroupListingWrapper'
import AddProductWrapper from './configuration/Configuration Screens/products/add/AddProductWrapper'
import ProductsListingWrapper from './configuration/Configuration Screens/products/list/ProductWrapper'
import AddProductSubCategoryWrapper from './configuration/Configuration Screens/productSubCategory/add/AddProductSubCategoryWrapper'
import ProductSubCategoryListingWrapper from './configuration/Configuration Screens/productSubCategory/list/ProductSubCategoryListingWrapper'
import AddPurchaseOrderWrapper from './purchaseOrder/add/AddPurchaseOrderWrapper'
import PurchaseOrderListingWrapper from './purchaseOrder/list/PurchaseOrderListingWrapper'
import AddSchemeWrapper from './scheme/add/AddSchemeWrapper'
import SchemeListingWrapper from './scheme/list/SchemeListingWrapper'
import AddTaxesWrapper from './configuration/Configuration Screens/taxes/add/AddTaxesWrapper'
import TaxesListingWrapper from './configuration/Configuration Screens/taxes/list/TaxesListingWrapper'
import ConfigurationLayout from './configuration/ConfigurationLayout'
import DashboardWrappper from './Dashboard/DashboardWrappper'
import AddDealerWrapper from './dealers/add/AddDealerWrapper'
import DealersListingWrapper from './dealers/list/DealersListingWrapper'
import ViewDealer from './dealers/view'
import DealerActivityTabWrapper from './dealers/view/tabs/DealerActivityTab/DealerActivityTabWrapper'
import DealerGeneralInformationTabWrapper from './dealers/view/tabs/DealerGeneralInformationTab/DealerGeneralInformationTabWrapper'
import DealerWarehouseTabWrapper from './dealers/view/tabs/DealerWarehouseTab/DealerWarehouseTabWrapper'
import DealerSalesOrderTabWrapper from './dealers/view/tabs/DealerSalesOrderTab/DealerSalesOrderTabWrapper'
import AddDealerPinCodeTabWrapper from './dealers/view/tabs/DealerPinCodeTab/add/DealerPinCodeTabWrapper'
import AddDealerSchemeTabWrapper from './dealers/view/tabs/DealerSchemeTab/add/DealerSchemeTabWrapper'
import ListDealerPincodeTabWrapper from './dealers/view/tabs/DealerPinCodeTab/List/ListDealerPincodeTabWrapper'
import ListDealerSchemeTabWrapper from './dealers/view/tabs/DealerSchemeTab/list/ListDealerSchemeTabWrapper'
import DealerOrderLedgerListTabWrapper from './dealers/view/tabs/DealerOrderLedger/list/DealerOrderLedgerListTabWrapper'
import AddDealerWarehouseWarpper from './dealers/view/tabs/DealerWarehouseTab/Add/AddDealerWarehouseWarpper'
import EditDealerWarehouseWrapper from './dealers/view/tabs/DealerWarehouseTab/Edit/EditDealerWarehouseWrapper'
import InwardInventoryWrapper from './inventories/inward-inventory/InwardInventoryWrapper'
import InventoryListingWrapper from './inventories/inventory/list/InventoryListingWrapper'
import LoginPage from './login/LoginPage'
import Order from './orders'
import OrderListing from './orders/all/OrderListing'
import AddSaleOrderWrapper from './saleOrder/add/AddSaleOrderWrapper'
import EditSaleOrderWrapper from './saleOrder/edit/EditSaleOrderWrapper'
import SaleOrderListingWrapper from './saleOrder/list/SaleOrderListingWrapper'
import Test from './test/Test'

import VendorActivityTabWrapper from './vendors/view/tabs/VendorActivityTab/VendorActivityTabWrapper'
import VendorGeneralInformationTabWrapper from './vendors/view/tabs/VendorGeneralInformationTab/VendorGeneralInformationTabWrapper'
import VendorWarehouseTabWrapper from './vendors/view/tabs/VendorWarehouseTab/VendorWarehouseTabWrapper'
import VendorPurchaseOrderTabWrapper from './vendors/view/tabs/VendorPurchaseOrderTab/list/VendorPurchaseOrderTabWrapper'
import AddPurchaseOrderTabWrapper from './vendors/view/tabs/VendorPurchaseOrderTab/add/AddPurchaseOrderTabWrapper'
import AddWarehouseWrapper from './warehouses/add/AddWarehouseWrapper'
import WarehousesListingWrapper from './warehouses/list/WarehousesListingWrapper'
import ViewWarehouseWrapper from './warehouses/view/ViewWarehouseWrapper'
import ProfileWrappper from './profile/ProfileWrapper'
import EditCompanyWrapper from './configuration/Configuration Screens/configurationCompany/edit/EditCompanyWrapper'
import EditAttributeWrapper from './configuration/Configuration Screens/attributes/edit/EditAttributeWrapper'
import EditProductCategoryWrapper from './configuration/Configuration Screens/productCategory/edit/EditProductCategoryWrapper'
import EditAttributeGroupWrapper from './configuration/Configuration Screens/attributesGroup/edit/EditAttributeGroupWrapper'
import EditProductGroupWrapper from './configuration/Configuration Screens/productGroup/edit/EditProductGroupWrapper'
import EditItemWrapper from './configuration/Configuration Screens/item/edit/EditItemWrapper'
import EditCartonBoxWrapper from './configuration/Configuration Screens/cartonBox/edit/EditCartonBoxWrapper'
import EditTaxesWrapper from './configuration/Configuration Screens/taxes/edit/EditTaxesWrapper'
import EditLanguageWrapper from './configuration/Configuration Screens/language/edit/EditLanguageWrapper'
import EditDealersCategoryWrapper from './configuration/Configuration Screens/dealersCategory/edit/EditDealersCategoryWrapper'
import EditProductSubCategoryWrapper from './configuration/Configuration Screens/productSubCategory/edit/EditProductSubCategoryWrapper'
import EditVendorWrapper from './vendors/edit/EditVendorWrapper'
import EditDealerWrapper from './dealers/edit/EditDealerWrapper'
import EditWarehouseWrapper from './warehouses/edit/EditWarehouseWrapper'
import EditProductWrapper from './configuration/Configuration Screens/products/edit/EditProductWrapper'
import EditSchemeWrapper from './scheme/edit/EditSchemeWrapper'
import ViewPurchaseOrderWrapper from './purchaseOrder/view/ViewPurchaseOrderWrapper'
import AddCbBarcodeWrapper from './configuration/Configuration Screens/barcode/AddCb/AddCbWrapper'
import BarcodeGenerator from './configuration/Configuration Screens/barcode/list/components/BarcodeGroup/BarcodeGenerator'
import EditPurchaseOrderWrapper from './purchaseOrder/edit/EditPurchaseOrderWrapper'
import DidManagementListingWrapper from './media/didManagement/list/DidManagementListingWrapper'
import OrganisationHierarchy from './configuration/Configuration Screens/organizationHeirarchy/OrganizationHeirarchy'
import EditDidManagementWrapper from './media/didManagement/edit/EditDidManagementWrapper'
import ChannelManagementListingWrapper from './media/channelManagement/list/ChannelManagementListingWrapper'
import EditChannelManagementWrapper from './media/channelManagement/edit/EditChannelManagementWrapper'
import SlotManagementListingWrapper from './media/slotManagement/list/SlotManagementListingWrapper'
import AddSlotManagement from './media/slotManagement/add/AddSlotManagement'
import AddTapeManagementWrapper from './media/tapeManagement/add/AddTapeManagementWrapper'
import TapeManagementListingWrapper from './media/tapeManagement/list/TapeManagementListingWrapper'
import AddCompetitorWrapper from './media/competitorManagement/add/AddCompetitorWrapper'
import CompetitorManagementListingWrapper from './media/competitorManagement/list/CompetitorManagementListingWrapper'
import EditCompetitorWraper from './media/competitorManagement/edit/EditCompetitorWrapper'
import AddDidManagementWrapper from './media/didManagement/add/AddDidManagementWrapper'
import ChannelGroupListingWrapper from './media/channelGroup/list/ChannelGroupListingWrapper'
import AddChannelGroupWrapper from './media/channelGroup/add/AddChannelGroupWrapper'
import EditChannelGroupWrapper from './media/channelGroup/edit/EditChannelGroupWrapper'
import EditChannelGroup from './media/channelGroup/edit/EditChannelGroup'
import AddChannelManagementWrapper from './media/channelManagement/add/AddChannelManagementWrapper'
import ChannelCategoryListingWrapper from './media/channelCategory/list/ChannelCategoryListingWrapper'
import AddChannelCategoryWrapper from './media/channelCategory/add/AddChannelCategoryWrapper'
import EditTapeManagementWrapper from './media/tapeManagement/edit/EditTapeManagementWrapper'
import EditChannelCategoryWrapper from './media/channelCategory/edit/EditChannelCategoryWrapper'
import ArtistListingWrapper from './media/artist/list/ArtistListingWrapper'
import AddArtistWrapper from './media/artist/add/AddArtistWrapper'
import EditArtistWrapper from './media/artist/edit/EditArtistWrapper'
import AssetsLocationWrapper from './assets/assetLocation/list/AssetsLocationWrapper'
import EditAssetsLocatonWrapper from './assets/assetLocation/edit/EditAssetsLocatonWrapper'
import AddAssetsLocationWrapper from './assets/assetLocation/add/AddAssetsLocationWrapper'
import AddAssetsCategoryWrapper from './assets/assetsCategory/add/AddAssetsCategoryWrapper'
import AssetsCategoryWrapper from './assets/assetsCategory/list/AssetsCategoryWrapper'
import EditAssetsCategoryWrapper from './assets/assetsCategory/edit/EditAssetsCategoryWrapper'
import EditAssetsRequestwrapper from './assets/assetsRequest/edit/EditAssetsRequestwrapper'
import Auth from './login/Auth'
import AddSlotManagementWrapper from './media/slotManagement/add/AddSlotManagementWrapper'
import EditSlotManagementWrapper from './media/slotManagement/edit/EditSlotManagementWrapper'
import InbouundWrapper from './media/Inbound/InboundWrapper'
import WebstieListingWrapper from './websites/website/list/WebsiteListingWrapper'
import AddWebsiteWrapper from './websites/website/add/AddwebsiteWrapper'
import EditWebsiteWrapper from './websites/website/edit/EditWebsiteWrapper'
import DispositionOneListingWrapper from './disposition/dispositionOne/list/DispositionOneListingWrapper'
import ListWebstieBlogWrapper from './websites/website-blog/list/ListWebsiteBlogWrapper'
import AddWebsiteBlogWrapper from './websites/website-blog/add/AddWebsiteBlogWrapper'
import EditWebsiteBlogWrapper from './websites/website-blog/edit/EditWebsiteBlogWrapper'
import WebsiteBlogViewWrapper from './websites/website-blog/view/WebsiteBlogViewWrapper'
import WebsitePageListingWrapper from './websites/websitePage/list/WebsitePageListingWrapper'
import AddWebsitePageWrapper from './websites/websitePage/add/AddwebsitePageWrapper'
import EditWebsitePageWrapper from './websites/websitePage/edit/EditWebsitePageWrapper'
import ViewWebsitePageWrapper from './websites/websitePage/view/ViewWebsitePageWrapper'
import InitialCallOneListingWrapper from './disposition/initialcallerone/list/InitialCallOneListingWrapper'
import InitialCallTwoListingWrapper from './disposition/initialcallertwo/list/InitialCallTwoListingWrapper'
import DispositionTwoListingWrapper from './disposition/dispositionTwo/list/DispositionTwoListingWrapper'
import DispositionThreeListingWrapper from './disposition/dispositionThree/list/DispositionThreeListingWrapper'
import AddDispositionOneWrappper from './disposition/dispositionOne/add/AddDispositionOneWrapper'
import PageNotFound from '../PageNotFound'
import AddDispositionThreeWrappper from './disposition/dispositionThree/add/AddDispositionThreeWrappper'
import EditDispositionThreeWrapper from './disposition/dispositionThree/edit/EditDispositionThreeWrapper'
import AddDispositionTwoWrapper from './disposition/dispositionTwo/add/AddDispositionTwoWrapper'
import EditDispositionTwoWrapper from './disposition/dispositionTwo/edit/EditDispositionTwoWrapper'
import EditDispositionOneWrappper from './disposition/dispositionOne/edit/EditDispositionOneWrapper'
import AddInitialCallOneWrapper from './disposition/initialcallerone/add/AddInitialCallOneWrapper'
import AddInitialCallTwoWrapper from './disposition/initialcallertwo/add/AddInitialCallTwoWrapper'
import EditInitialCallOneWrapper from './disposition/initialcallerone/edit/EditInitialCallOneWrapper'
import EditInitialCallTwoWrapper from './disposition/initialcallertwo/edit/EditInitialCallTwoWrapper'
import DispositionComplaintListingWrapper from './disposition/dispositionComplaint/list/DispositionComplaintListingWrapper'
import AddDispositionComplaintWrappper from './disposition/dispositionComplaint/add/AddDispositionComplaintWrapper'
import EditDispositionComplaintWrappper from './disposition/dispositionComplaint/edit/EditDispositionComplaintWrapper'
import InitialCallThreeListingWrapper from './disposition/icInitialCaller/list/InitialCallThreeListingWrapper'
import EditInitialCallThreeWrapper from './disposition/icInitialCaller/edit/EditInitialCallThreeWrapper'
import AddInitialCallThreeWrappper from './disposition/icInitialCaller/add/AddInitialCallThreeWrapper'
import ViewDispositionThreeWrappper from './disposition/dispositionThree/View/ViewDispositionThreeWrapper'
import ViewInitialCallThreeWrappper from './disposition/icInitialCaller/View/ViewInitialCallThreeWrapper'
import OrderViewWrapper from './orders/view/OrderViewWrapper'
import InquiryViewWrapper from './inquiry/view/InquiryViewWrapper'
import InquiryListingWrapper from './inquiry/list/InquiryListingWrapper'
import InfluencerListingWrapper from './websites/influencerManagement/list/InfluencerListingWrapper'
import AddAssetsRequestWrapper from './assets/assetsRequest/add/AddAssetsRequestWrapper'
import AddAssetsRelocationWrapper from './assets/assetsRelocation/add/AddAssetsRelocationWrapper'
import AssetsRelocationWrapper from './assets/assetsRelocation/list/AssetsRelocationWrapper'
import AssetsRequestWrapper from './assets/assetsRequest/list/AssetsRequestWrapper'
import AssetsAllocationWrapper from './assets/assetsAllocation/list/AssetsAllocationWrapper'
import AddAssetsAllocationWrapper from './assets/assetsAllocation/add/AddAssetsAllocationWrapper'
import AddInfluencerWrapper from './websites/influencerManagement/add/AddInfluencerWrapper'
import CallListingWrapper from './call/list/CallListingWrapper'
import WebsiteTagListingWrapper from './websites/website-tags/list/WebsiteTagListingWrapper'
import AddWebsiteTagsWrapper from './websites/website-tags/add/AddWebsiteTagsWrapper'
import EditWebsiteTagWrapper from './websites/website-tags/edit/EditWebsiteTagWrapper'
import ViewWebsiteTagsWrapper from './websites/website-tags/view/ViewWebsiteTagsWrapper'
import ListDealerSupervisorTabWrapper from './dealers/view/tabs/DealerSupervisorTab/list/ListDealerSupervisorTabWrapper'
import DealerSupervisorTabWrapper from './dealers/view/tabs/DealerSupervisorTab/add/DealerSupervisorTabWrapper'
import UserAccessWrapper from './userAccess/UserAccessWrapper'
import ApprovedOrderListing from './orders/approvedorders/ApprovedOrderListing'
import ApprovedOrderViewWrapper from './orders/approvedorders/view/ApprovedOrderViewWrapper'
import EditDealerSchemeWrapper from './dealers/view/tabs/DealerSchemeTab/edit/EditDealerSchemeWrapper'
import DealerListLedgerTabWrapper from './dealers/view/tabs/DealerLedgerTap/list/DealerListLedgerTabWrapper'
import AddVendorWarehouseWrapper from './vendors/view/tabs/VendorWarehouseTab/Add/AddVendorWarehouseWrapper'
import EditVendorWarehouseWrapper from './vendors/view/tabs/VendorWarehouseTab/Edit/EditVendorWarehouseWrapper'

// import asr
import { ASRListingWrapper, EditASRWrapper, AddASRWrapper } from './asr'
// import vendors
import { AddVendorWrapper, VendorsListingWrapper, ViewVendor } from './vendors'

// import Users
import { AddUserWrapper, UsersListingWrapper } from './users'

export {
    AddASRWrapper,
    ASRListingWrapper,
    AddAttributeWrapper,
    AttributesListingWrapper,
    AddAttributeGroupWrapper,
    AttributesGroupListingWrapper,
    AddBarcodeWrapper,
    BarcodeListingWrapper,
    ViewBarcodeWrapper,
    AddCartonBoxWrapper,
    CartonBoxListingWrapper,
    AddCompanyWrapper,
    ConfigurationCompanyListingWrapper,
    AddDealersCategoryWrapper,
    DealersCategoryListingWrapper,
    AddGRNWrapper,
    GRNListingWrapper,
    AddItemWrapper,
    ItemListingWrapper,
    AddLanguageWrapper,
    LanguageListingWrapper,
    Locations,
    AddProductCategoryWrapper,
    ProductCategoryListingWrapper,
    AddProductGroupWrapper,
    ProductGroupListingWrapper,
    AddProductWrapper,
    ProductsListingWrapper,
    AddProductSubCategoryWrapper,
    ProductSubCategoryListingWrapper,
    AddPurchaseOrderWrapper,
    PurchaseOrderListingWrapper,
    AddSchemeWrapper,
    SchemeListingWrapper,
    AddTaxesWrapper,
    TaxesListingWrapper,
    ConfigurationLayout,
    DashboardWrappper,
    AddDealerWrapper,
    DealersListingWrapper,
    ViewDealer,
    DealerActivityTabWrapper,
    DealerGeneralInformationTabWrapper,
    DealerWarehouseTabWrapper,
    EditDealerWarehouseWrapper,
    DealerSalesOrderTabWrapper,
    AddDealerPinCodeTabWrapper,
    AddDealerSchemeTabWrapper,
    ListDealerPincodeTabWrapper,
    ListDealerSchemeTabWrapper,
    DealerOrderLedgerListTabWrapper,
    AddDealerWarehouseWarpper,
    InwardInventoryWrapper,
    InventoryListingWrapper,
    LoginPage,
    OrderListing,
    AddSaleOrderWrapper,
    EditSaleOrderWrapper,
    SaleOrderListingWrapper,
    Test,
    UsersListingWrapper,
    AddUserWrapper,
    AddVendorWrapper,
    VendorsListingWrapper,
    AddPurchaseOrderTabWrapper,
    ViewVendor,
    VendorActivityTabWrapper,
    VendorGeneralInformationTabWrapper,
    VendorWarehouseTabWrapper,
    VendorPurchaseOrderTabWrapper,
    AddWarehouseWrapper,
    WarehousesListingWrapper,
    ViewWarehouseWrapper,
    ProfileWrappper,
    EditCompanyWrapper,
    EditAttributeWrapper,
    EditProductCategoryWrapper,
    EditAttributeGroupWrapper,
    EditProductGroupWrapper,
    EditItemWrapper,
    EditCartonBoxWrapper,
    EditASRWrapper,
    EditTaxesWrapper,
    EditLanguageWrapper,
    EditDealersCategoryWrapper,
    EditProductSubCategoryWrapper,
    EditVendorWrapper,
    EditDealerWrapper,
    EditWarehouseWrapper,
    EditProductWrapper,
    EditSchemeWrapper,
    ViewPurchaseOrderWrapper,
    AddCbBarcodeWrapper,
    BarcodeGenerator,
    EditPurchaseOrderWrapper,
    OrganisationHierarchy,
    DidManagementListingWrapper,
    EditDidManagementWrapper,
    AddDidManagementWrapper,
    ChannelManagementListingWrapper,
    EditChannelManagementWrapper,
    SlotManagementListingWrapper,
    AddSlotManagement,
    TapeManagementListingWrapper,
    AddTapeManagementWrapper,
    CompetitorManagementListingWrapper,
    AddCompetitorWrapper,
    EditCompetitorWraper,
    ChannelGroupListingWrapper,
    AddChannelGroupWrapper,
    EditChannelGroupWrapper,
    EditChannelGroup,
    AddChannelManagementWrapper,
    ChannelCategoryListingWrapper,
    AddChannelCategoryWrapper,
    EditTapeManagementWrapper,
    EditChannelCategoryWrapper,
    ArtistListingWrapper,
    AddArtistWrapper,
    EditArtistWrapper,
    AssetsLocationWrapper,
    EditAssetsLocatonWrapper,
    AddAssetsLocationWrapper,
    AddAssetsCategoryWrapper,
    AssetsCategoryWrapper,
    EditAssetsCategoryWrapper,
    EditAssetsRequestwrapper,
    Auth,
    AddSlotManagementWrapper,
    EditSlotManagementWrapper,
    InbouundWrapper,
    WebstieListingWrapper,
    AddWebsiteWrapper,
    EditWebsiteWrapper,
    DispositionOneListingWrapper,
    ListWebstieBlogWrapper,
    AddWebsiteBlogWrapper,
    EditWebsiteBlogWrapper,
    WebsiteBlogViewWrapper,
    WebsitePageListingWrapper,
    AddWebsitePageWrapper,
    EditWebsitePageWrapper,
    ViewWebsitePageWrapper,
    InitialCallOneListingWrapper,
    InitialCallTwoListingWrapper,
    DispositionTwoListingWrapper,
    DispositionThreeListingWrapper,
    AddDispositionOneWrappper,
    PageNotFound,
    AddDispositionThreeWrappper,
    EditDispositionThreeWrapper,
    AddDispositionTwoWrapper,
    EditDispositionTwoWrapper,
    EditDispositionOneWrappper,
    AddInitialCallOneWrapper,
    AddInitialCallTwoWrapper,
    EditInitialCallOneWrapper,
    EditInitialCallTwoWrapper,
    DispositionComplaintListingWrapper,
    AddDispositionComplaintWrappper,
    EditDispositionComplaintWrappper,
    InitialCallThreeListingWrapper,
    EditInitialCallThreeWrapper,
    AddInitialCallThreeWrappper,
    ViewDispositionThreeWrappper,
    ViewInitialCallThreeWrappper,
    OrderViewWrapper,
    Order,
    InquiryViewWrapper,
    InquiryListingWrapper,
    InfluencerListingWrapper,
    AddAssetsRequestWrapper,
    AddAssetsRelocationWrapper,
    AssetsRelocationWrapper,
    AssetsRequestWrapper,
    AssetsAllocationWrapper,
    AddAssetsAllocationWrapper,
    AddInfluencerWrapper,
    CallListingWrapper,
    WebsiteTagListingWrapper,
    AddWebsiteTagsWrapper,
    EditWebsiteTagWrapper,
    ViewWebsiteTagsWrapper,
    ListDealerSupervisorTabWrapper,
    DealerSupervisorTabWrapper,
    UserAccessWrapper,
    ApprovedOrderListing,
    ApprovedOrderViewWrapper,
    EditDealerSchemeWrapper,
    DealerListLedgerTabWrapper,
    AddVendorWarehouseWrapper,
    EditVendorWarehouseWrapper,
}
