import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddASRWrapper from "./pages/configuration/Configuration Screens/asr/add/AddASRWrapper";
import ASRListingWrapper from "./pages/configuration/Configuration Screens/asr/list/ASRListingWrapper";
import AddAttributeWrapper from "./pages/configuration/Configuration Screens/attributes/add/AddAttributeWrapper";
import AttributesListingWrapper from "./pages/configuration/Configuration Screens/attributes/list/AttributesListingWrapper";
import AddAttributeGroupWrapper from "./pages/configuration/Configuration Screens/attributesGroup/add/AddAttributeGroupWrapper";
import AttributesGroupListingWrapper from "./pages/configuration/Configuration Screens/attributesGroup/list/AttributesGroupListingWrapper";
import AddBarcodeWrapper from "./pages/configuration/Configuration Screens/barcode/add/AddBarcodeWrapper";
import BarcodeListingWrapper from "./pages/configuration/Configuration Screens/barcode/list/BarcodeListingWrapper";
import ViewBarcodeWrapper from "./pages/configuration/Configuration Screens/barcode/view/ViewBarcodeWrapper";
import AddCartonBoxWrapper from "./pages/configuration/Configuration Screens/cartonBox/add/AddCartonBoxWrapper";
import CartonBoxListingWrapper from "./pages/configuration/Configuration Screens/cartonBox/list/CartonBoxListingWrapper";
import AddCompanyWrapper from "./pages/configuration/Configuration Screens/configurationCompany/add/AddCompanyWrapper";
import ConfigurationCompanyListingWrapper from "./pages/configuration/Configuration Screens/configurationCompany/list/ConfigurationCompanyListingWrapper";
import AddDealersCategoryWrapper from "./pages/configuration/Configuration Screens/dealersCategory/add/AddDealersCategoryWrapper";
import DealersCategoryListingWrapper from "./pages/configuration/Configuration Screens/dealersCategory/list/DealersCategoryListingWrapper";
import AddGRNWrapper from "./pages/configuration/Configuration Screens/grn/add/AddGRNWrapper";
import GRNListingWrapper from "./pages/configuration/Configuration Screens/grn/list/GRNListingWrapper";
import AddItemWrapper from "./pages/configuration/Configuration Screens/item/add/AddItemWrapper";
import ItemListingWrapper from "./pages/configuration/Configuration Screens/item/list/ItemListingWrapper";
import AddLanguageWrapper from "./pages/configuration/Configuration Screens/language/add/AddLanguageWrapper";
import LanguageListingWrapper from "./pages/configuration/Configuration Screens/language/list/LanguageListingWrapper";
import Locations from "./pages/configuration/Configuration Screens/locations/Location";
import AddProductCategoryWrapper from "./pages/configuration/Configuration Screens/productCategory/add/AddProductCategoryWrapper";
import ProductCategoryListingWrapper from "./pages/configuration/Configuration Screens/productCategory/list/ProductCategoryListingWrapper";
import AddProductGroupWrapper from "./pages/configuration/Configuration Screens/productGroup/add/AddProductGroupWrapper";
import ProductGroupListingWrapper from "./pages/configuration/Configuration Screens/productGroup/list/ProductGroupListingWrapper";
import AddProductWrapper from "./pages/configuration/Configuration Screens/products/add/AddProductWrapper";
import ProductsListingWrapper from "./pages/configuration/Configuration Screens/products/list/ProductWrapper";
import AddProductSubCategoryWrapper from "./pages/configuration/Configuration Screens/productSubCategory/add/AddProductSubCategoryWrapper";
import ProductSubCategoryListingWrapper from "./pages/configuration/Configuration Screens/productSubCategory/list/ProductSubCategoryListingWrapper";
import AddPurchaseOrderWrapper from "./pages/configuration/Configuration Screens/purchaseOrder/add/AddPurchaseOrderWrapper";
import PurchaseOrderListingWrapper from "./pages/configuration/Configuration Screens/purchaseOrder/list/PurchaseOrderListingWrapper";
import AddSchemeWrapper from "./pages/configuration/Configuration Screens/scheme/add/AddSchemeWrapper";
import SchemeListingWrapper from "./pages/configuration/Configuration Screens/scheme/list/SchemeListingWrapper";
import AddTaxesWrapper from "./pages/configuration/Configuration Screens/taxes/add/AddTaxesWrapper";
import TaxesListingWrapper from "./pages/configuration/Configuration Screens/taxes/list/TaxesListingWrapper";
import ConfigurationLayout from "./pages/configuration/ConfigurationLayout";
import DashboardWrappper from "./pages/Dashboard/DashboardWrappper";
import AddDealerWrapper from "./pages/dealers/add/AddDealerWrapper";
import DealersListingWrapper from "./pages/dealers/list/DealersListingWrapper";
import ViewDealer from "./pages/dealers/view";
import DealerActivityTabWrapper from "./pages/dealers/view/tabs/DealerActivityTab/DealerActivityTabWrapper";
import DealerGeneralInformationTabWrapper from "./pages/dealers/view/tabs/DealerGeneralInformationTab/DealerGeneralInformationTabWrapper";
import DealerWarehouseTabWrapper from "./pages/dealers/view/tabs/DealerWarehouseTab/DealerWarehouseTabWrapper";
import InwardInventoryWrapper from "./pages/inventories/inward-inventory/InwardInventoryWrapper";
import InventoryListingWrapper from "./pages/inventories/list/InventoryListingWrapper";
import LoginPage from "./pages/login/LoginPage";
import AddOrder from "./pages/orders/add/AddOrder";
import OrderListing from "./pages/orders/OrderListing";
import OutwardRequestListingWrapper from "./pages/outwardRequest/list/OutwardRequestListingWrapper";
import AddSaleOrderWrapper from "./pages/saleOrder/add/AddSaleOrderWrapper";
import SaleOrderListingWrapper from "./pages/saleOrder/list/SaleOrderListingWrapper";
import Test from "./pages/test/Test";
import UsersListingWrapper from "./pages/users/list/UsersListingWrapper";
import AddVendorWrapper from "./pages/vendors/add/AddVendorWrapper";
import VendorsListingWrapper from "./pages/vendors/list/VendorsListingWrapper";
import ViewVendor from "./pages/vendors/view";
import VendorActivityTabWrapper from "./pages/vendors/view/tabs/VendorActivityTab/VendorActivityTabWrapper";
import VendorGeneralInformationTabWrapper from "./pages/vendors/view/tabs/VendorGeneralInformationTab/VendorGeneralInformationTabWrapper";
import VendorWarehouseTabWrapper from "./pages/vendors/view/tabs/VendorWarehouseTab/VendorWarehouseTabWrapper";
import AddWarehouseWrapper from "./pages/warehouses/add/AddWarehouseWrapper";
import WarehousesListingWrapper from "./pages/warehouses/list/WarehousesListingWrapper";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setDeviceId,
  setRefreshToken,
  setUserData,
} from "./redux/slices/authSlice";
import { v4 as uuidv4 } from "uuid";
import ProfileWrappper from "./pages/profile/ProfileWrapper";
import EditCompanyWrapper from "./pages/configuration/Configuration Screens/configurationCompany/edit/EditCompanyWrapper";
import EditAttributeWrapper from "./pages/configuration/Configuration Screens/attributes/edit/EditAttributeWrapper";
import EditProductCategoryWrapper from "./pages/configuration/Configuration Screens/productCategory/edit/EditProductCategoryWrapper";
import EditAttributeGroupWrapper from "./pages/configuration/Configuration Screens/attributesGroup/edit/EditAttributeGroupWrapper";
import EditProductGroupWrapper from "./pages/configuration/Configuration Screens/productGroup/edit/EditProductGroupWrapper";
import EditItemWrapper from "./pages/configuration/Configuration Screens/item/edit/EditItemWrapper";
import EditCartonBoxWrapper from "./pages/configuration/Configuration Screens/cartonBox/edit/EditCartonBoxWrapper";
import EditASRWrapper from "./pages/configuration/Configuration Screens/asr/edit/EditASRWrapper";
import EditTaxesWrapper from "./pages/configuration/Configuration Screens/taxes/edit/EditTaxesWrapper";
import EditLanguageWrapper from "./pages/configuration/Configuration Screens/language/edit/EditLanguageWrapper";
import EditDealersCategoryWrapper from "./pages/configuration/Configuration Screens/dealersCategory/edit/EditDealersCategoryWrapper";
import EditProductSubCategoryWrapper from "./pages/configuration/Configuration Screens/productSubCategory/edit/EditProductSubCategoryWrapper";
import EditVendorWrapper from "./pages/vendors/edit/EditVendorWrapper";
import EditDealerWrapper from "./pages/dealers/edit/EditDealerWrapper";
import EditWarehouseWrapper from "./pages/warehouses/edit/EditWarehouseWrapper";
import EditProductWrapper from "./pages/configuration/Configuration Screens/products/edit/EditProductWrapper";
import EditSchemeWrapper from "./pages/configuration/Configuration Screens/scheme/edit/EditSchemeWrapper";

const PageRoutes = () => {
  const deviceId = localStorage.getItem("device-id") || "";
  if (deviceId === "") {
    const uniqueId = uuidv4();
    localStorage.setItem("device-id", uniqueId);
  }

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userDataLs = localStorage.getItem("userData") || "{}";
  const userData = JSON.parse(userDataLs);

  dispatch(setAccessToken(accessToken));
  dispatch(setRefreshToken(refreshToken));
  dispatch(setDeviceId(deviceId));
  dispatch(setUserData(userData));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardWrappper />} />
          <Route path="/profile" element={<ProfileWrappper />} />
          <Route path="/orders" element={<OrderListing />} />
          <Route path="/orders/add-order" element={<AddOrder />} />
          <Route path="/dealers" element={<DealersListingWrapper />} />
          <Route path="/dealers/add-dealer" element={<AddDealerWrapper />} />
          <Route path="/dealers/edit-dealer/:id" element={<EditDealerWrapper />} />

          <Route path="/vendors" element={<VendorsListingWrapper />} />
          <Route path="/vendors/add-vendor" element={<AddVendorWrapper />} />
          <Route
            path="/vendors/edit-vendor/:id"
            element={<EditVendorWrapper />}
          />

          <Route path="/vendors/:vendorId" element={<ViewVendor />}>
            <Route
              path="general-information"
              element={<VendorGeneralInformationTabWrapper />}
            />
            <Route path="purchase-order" element={"Purchase Order"} />
            <Route path="warehouse" element={<VendorWarehouseTabWrapper />} />
            <Route path="return-to-vendor" element={"Return To Vendor"} />
            <Route path="ledger" element={"Ledger"} />
            <Route path="activities" element={<VendorActivityTabWrapper />} />
          </Route>

          <Route path="/warehouse" element={<WarehousesListingWrapper />} />
          <Route path="/warehouse/:id" element={<EditWarehouseWrapper />} />

          <Route
            path="/warehouse/add-warehouse"
            element={<AddWarehouseWrapper />}
          />
          <Route path="/inventories" element={<InventoryListingWrapper />} />
          <Route
            path="/inventories/inward-inventory"
            element={<InwardInventoryWrapper />}
          />
          <Route path="/sale-order" element={<SaleOrderListingWrapper />} />
          <Route
            path="/sale-order/add-sale-order"
            element={<AddSaleOrderWrapper />}
          />
          <Route
            path="/outward-request"
            element={<OutwardRequestListingWrapper />}
          />

          <Route path="/dealers/:dealerId" element={<ViewDealer />}>
            <Route
              path="general-information"
              element={<DealerGeneralInformationTabWrapper />}
            />
            <Route path="sale-order" element={"Sale Order"} />
            <Route path="warehouse" element={<DealerWarehouseTabWrapper />} />
            <Route path="ledger" element={"Ledger"} />
            <Route path="activities" element={<DealerActivityTabWrapper />} />
          </Route>
          <Route path="users" element={<UsersListingWrapper />} />
          <Route path="test" element={<Test />} />
          <Route path="/configurations" element={<ConfigurationLayout />} />
          <Route
            path="/configurations/attributes"
            element={<AttributesListingWrapper />}
          />

          <Route
            path="/configurations/attributes/add"
            element={<AddAttributeWrapper />}
          />
          <Route
            path="/configurations/attributes/:id"
            element={<EditAttributeWrapper />}
          />

          <Route
            path="/configurations/product-group"
            element={<ProductGroupListingWrapper />}
          />

          <Route
            path="/configurations/product-group/add"
            element={<AddProductGroupWrapper />}
          />

          <Route
            path="/configurations/product-group/:id"
            element={<EditProductGroupWrapper />}
          />
          <Route
            path="/configurations/attributes-group"
            element={<AttributesGroupListingWrapper />}
          />

          <Route
            path="/configurations/attributes-group/add"
            element={<AddAttributeGroupWrapper />}
          />
          <Route
            path="/configurations/attributes-group/:id"
            element={<EditAttributeGroupWrapper />}
          />
          <Route
            path="/configurations/product-category"
            element={<ProductCategoryListingWrapper />}
          />
          <Route
            path="/configurations/product-category/add"
            element={<AddProductCategoryWrapper />}
          />
          <Route
            path="/configurations/product-category/:id"
            element={<EditProductCategoryWrapper />}
          />

          <Route
            path="/configurations/product-sub-category"
            element={<ProductSubCategoryListingWrapper />}
          />
          <Route
            path="/configurations/product-sub-category/add"
            element={<AddProductSubCategoryWrapper />}
          />
          <Route
            path="/configurations/product-sub-category/:id"
            element={<EditProductSubCategoryWrapper />}
          />

          <Route path="/configurations/item" element={<ItemListingWrapper />} />
          <Route path="/configurations/item/add" element={<AddItemWrapper />} />
          <Route
            path="/configurations/item/:id"
            element={<EditItemWrapper />}
          />

          <Route
            path="/configurations/products"
            element={<ProductsListingWrapper />}
          />

          <Route
            path="/configurations/products/add"
            element={<AddProductWrapper />}
          />
          <Route
            path="/configurations/product/:id"
            element={<EditProductWrapper />}
          />
          <Route
            path="/configurations/carton-box"
            element={<CartonBoxListingWrapper />}
          />
          <Route
            path="/configurations/carton-box/add"
            element={<AddCartonBoxWrapper />}
          />
          <Route
            path="/configurations/carton-box/:id"
            element={<EditCartonBoxWrapper />}
          />

          <Route
            path="/configurations/scheme"
            element={<SchemeListingWrapper />}
          />

          <Route
            path="/configurations/scheme/add"
            element={<AddSchemeWrapper />}
          />
          
          <Route
            path="/configurations/scheme/:id"
            element={<EditSchemeWrapper />}
          />
          <Route
            path="/configurations/taxes/add"
            element={<AddTaxesWrapper />}
          />

          <Route
            path="/configurations/taxes"
            element={<TaxesListingWrapper />}
          />

          <Route
            path="/configurations/taxes/:id"
            element={<EditTaxesWrapper />}
          />

          <Route
            path="/configurations/barcode"
            element={<BarcodeListingWrapper />}
          />

          <Route
            path="/configurations/barcode/add"
            element={<AddBarcodeWrapper />}
          />

          <Route
            path="/configurations/barcode/:barcodeId"
            element={<ViewBarcodeWrapper />}
          />
          <Route
            path="/configurations/purchase-order"
            element={<PurchaseOrderListingWrapper />}
          />

          <Route
            path="/configurations/purchase-order/add"
            element={<AddPurchaseOrderWrapper />}
          />

          <Route path="/configurations/grn" element={<GRNListingWrapper />} />
          <Route path="/configurations/grn/add" element={<AddGRNWrapper />} />

          <Route
            path="/configurations/company"
            element={<ConfigurationCompanyListingWrapper />}
          />
          <Route
            path="/configurations/dealers-category/add"
            element={<AddDealersCategoryWrapper />}
          />
          <Route
            path="/configurations/dealers-category/:id"
            element={<EditDealersCategoryWrapper />}
          />

          <Route
            path="/configurations/company/add"
            element={<AddCompanyWrapper />}
          />
          <Route
            path="/configurations/company/:id"
            element={<EditCompanyWrapper />}
          />
          <Route
            path="/configurations/language/add"
            element={<AddLanguageWrapper />}
          />
          <Route
            path="/configurations/language/:id"
            element={<EditLanguageWrapper />}
          />

          <Route path="/configurations/location" element={<Locations />} />

          <Route path="/configurations/asr" element={<ASRListingWrapper />} />
          <Route path="/configurations/asr/add" element={<AddASRWrapper />} />
          <Route path="/configurations/asr/:id" element={<EditASRWrapper />} />
          <Route
            path="/configurations/dealers-category"
            element={<DealersCategoryListingWrapper />}
          />
          <Route
            path="/configurations/language"
            element={<LanguageListingWrapper />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
