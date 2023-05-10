import AddASRWrapper from "./asr/add/AddASRWrapper";
import ASRListingWrapper from "./asr/list/ASRListingWrapper";
import AddAttributeWrapper from "./configuration/Configuration Screens/attributes/add/AddAttributeWrapper";
import AttributesListingWrapper from "./configuration/Configuration Screens/attributes/list/AttributesListingWrapper";
import AddAttributeGroupWrapper from "./configuration/Configuration Screens/attributesGroup/add/AddAttributeGroupWrapper";
import AttributesGroupListingWrapper from "./configuration/Configuration Screens/attributesGroup/list/AttributesGroupListingWrapper";
import AddBarcodeWrapper from "./configuration/Configuration Screens/barcode/add/AddBarcodeWrapper";
import BarcodeListingWrapper from "./configuration/Configuration Screens/barcode/list/BarcodeListingWrapper";
import ViewBarcodeWrapper from "./configuration/Configuration Screens/barcode/view/ViewBarcodeWrapper";
import AddCartonBoxWrapper from "./configuration/Configuration Screens/cartonBox/add/AddCartonBoxWrapper";
import CartonBoxListingWrapper from "./configuration/Configuration Screens/cartonBox/list/CartonBoxListingWrapper";
import AddCompanyWrapper from "./configuration/Configuration Screens/configurationCompany/add/AddCompanyWrapper";
import ConfigurationCompanyListingWrapper from "./configuration/Configuration Screens/configurationCompany/list/ConfigurationCompanyListingWrapper";
import AddDealersCategoryWrapper from "./configuration/Configuration Screens/dealersCategory/add/AddDealersCategoryWrapper";
import DealersCategoryListingWrapper from "./configuration/Configuration Screens/dealersCategory/list/DealersCategoryListingWrapper";
import AddGRNWrapper from "./grn/add/AddGRNWrapper";
import GRNListingWrapper from "./grn/list/GRNListingWrapper";
import AddItemWrapper from "./configuration/Configuration Screens/item/add/AddItemWrapper";
import ItemListingWrapper from "./configuration/Configuration Screens/item/list/ItemListingWrapper";
import AddLanguageWrapper from "./configuration/Configuration Screens/language/add/AddLanguageWrapper";
import LanguageListingWrapper from "./configuration/Configuration Screens/language/list/LanguageListingWrapper";
import Locations from "./configuration/Configuration Screens/locations/Location";
import AddProductCategoryWrapper from "./configuration/Configuration Screens/productCategory/add/AddProductCategoryWrapper";
import ProductCategoryListingWrapper from "./configuration/Configuration Screens/productCategory/list/ProductCategoryListingWrapper";
import AddProductGroupWrapper from "./configuration/Configuration Screens/productGroup/add/AddProductGroupWrapper";
import ProductGroupListingWrapper from "./configuration/Configuration Screens/productGroup/list/ProductGroupListingWrapper";
import AddProductWrapper from "./configuration/Configuration Screens/products/add/AddProductWrapper";
import ProductsListingWrapper from "./configuration/Configuration Screens/products/list/ProductWrapper";
import AddProductSubCategoryWrapper from "./configuration/Configuration Screens/productSubCategory/add/AddProductSubCategoryWrapper";
import ProductSubCategoryListingWrapper from "./configuration/Configuration Screens/productSubCategory/list/ProductSubCategoryListingWrapper";
import AddPurchaseOrderWrapper from "./purchaseOrder/add/AddPurchaseOrderWrapper";
import PurchaseOrderListingWrapper from "./purchaseOrder/list/PurchaseOrderListingWrapper";
import AddSchemeWrapper from "./scheme/add/AddSchemeWrapper";
import SchemeListingWrapper from "./scheme/list/SchemeListingWrapper";
import AddTaxesWrapper from "./configuration/Configuration Screens/taxes/add/AddTaxesWrapper";
import TaxesListingWrapper from "./configuration/Configuration Screens/taxes/list/TaxesListingWrapper";
import ConfigurationLayout from "./configuration/ConfigurationLayout";
import DashboardWrappper from "./Dashboard/DashboardWrappper";
import AddDealerWrapper from "./dealers/add/AddDealerWrapper";
import DealersListingWrapper from "./dealers/list/DealersListingWrapper";
import ViewDealer from "./dealers/view";
import DealerActivityTabWrapper from "./dealers/view/tabs/DealerActivityTab/DealerActivityTabWrapper";
import DealerGeneralInformationTabWrapper from "./dealers/view/tabs/DealerGeneralInformationTab/DealerGeneralInformationTabWrapper";
import DealerWarehouseTabWrapper from "./dealers/view/tabs/DealerWarehouseTab/DealerWarehouseTabWrapper";
import InwardInventoryWrapper from "./inventories/inward-inventory/InwardInventoryWrapper";
import InventoryListingWrapper from "./inventories/list/InventoryListingWrapper";
import LoginPage from "./login/LoginPage";
import AddOrder from "./orders/add/AddOrder";
import OrderListing from "./orders/OrderListing";
import OutwardRequestListingWrapper from "./outwardRequest/list/OutwardRequestListingWrapper";
import AddSaleOrderWrapper from "./saleOrder/add/AddSaleOrderWrapper";
import EditSaleOrderWrapper from "./saleOrder/edit/EditSaleOrderWrapper";
import SaleOrderListingWrapper from "./saleOrder/list/SaleOrderListingWrapper";
import Test from "./test/Test";
import UsersListingWrapper from "./users/list/UsersListingWrapper";
import AddVendorWrapper from "./vendors/add/AddVendorWrapper";
import VendorsListingWrapper from "./vendors/list/VendorsListingWrapper";
import ViewVendor from "./vendors/view";
import VendorActivityTabWrapper from "./vendors/view/tabs/VendorActivityTab/VendorActivityTabWrapper";
import VendorGeneralInformationTabWrapper from "./vendors/view/tabs/VendorGeneralInformationTab/VendorGeneralInformationTabWrapper";
import VendorWarehouseTabWrapper from "./vendors/view/tabs/VendorWarehouseTab/VendorWarehouseTabWrapper";
import AddWarehouseWrapper from "./warehouses/add/AddWarehouseWrapper";
import WarehousesListingWrapper from "./warehouses/list/WarehousesListingWrapper";
import ProfileWrappper from "./profile/ProfileWrapper";
import EditCompanyWrapper from "./configuration/Configuration Screens/configurationCompany/edit/EditCompanyWrapper";
import EditAttributeWrapper from "./configuration/Configuration Screens/attributes/edit/EditAttributeWrapper";
import EditProductCategoryWrapper from "./configuration/Configuration Screens/productCategory/edit/EditProductCategoryWrapper";
import EditAttributeGroupWrapper from "./configuration/Configuration Screens/attributesGroup/edit/EditAttributeGroupWrapper";
import EditProductGroupWrapper from "./configuration/Configuration Screens/productGroup/edit/EditProductGroupWrapper";
import EditItemWrapper from "./configuration/Configuration Screens/item/edit/EditItemWrapper";
import EditCartonBoxWrapper from "./configuration/Configuration Screens/cartonBox/edit/EditCartonBoxWrapper";
import EditASRWrapper from "./asr/edit/EditASRWrapper";
import EditTaxesWrapper from "./configuration/Configuration Screens/taxes/edit/EditTaxesWrapper";
import EditLanguageWrapper from "./configuration/Configuration Screens/language/edit/EditLanguageWrapper";
import EditDealersCategoryWrapper from "./configuration/Configuration Screens/dealersCategory/edit/EditDealersCategoryWrapper";
import EditProductSubCategoryWrapper from "./configuration/Configuration Screens/productSubCategory/edit/EditProductSubCategoryWrapper";
import EditVendorWrapper from "./vendors/edit/EditVendorWrapper";
import EditDealerWrapper from "./dealers/edit/EditDealerWrapper";
import EditWarehouseWrapper from "./warehouses/edit/EditWarehouseWrapper";
import EditProductWrapper from "./configuration/Configuration Screens/products/edit/EditProductWrapper";
import EditSchemeWrapper from "./scheme/edit/EditSchemeWrapper";
import ViewPurchaseOrderWrapper from "./purchaseOrder/view/ViewPurchaseOrderWrapper";
import AddCbBarcodeWrapper from "./configuration/Configuration Screens/barcode/AddCb/AddCbWrapper";
import BarcodeGenerator from "./configuration/Configuration Screens/barcode/list/components/BarcodeGroup/BarcodeGenerator";
import EditPurchaseOrderWrapper from "./purchaseOrder/edit/EditPurchaseOrderWrapper";
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
  InwardInventoryWrapper,
  InventoryListingWrapper,
  LoginPage,
  AddOrder,
  OrderListing,
  OutwardRequestListingWrapper,
  AddSaleOrderWrapper,
  EditSaleOrderWrapper,
  SaleOrderListingWrapper,
  Test,
  UsersListingWrapper,
  AddVendorWrapper,
  VendorsListingWrapper,
  ViewVendor,
  VendorActivityTabWrapper,
  VendorGeneralInformationTabWrapper,
  VendorWarehouseTabWrapper,
  AddWarehouseWrapper,
  WarehousesListingWrapper,
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
};
