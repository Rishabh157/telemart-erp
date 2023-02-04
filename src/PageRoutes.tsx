import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddASRWrapper from "./pages/configuration/Configuration Screens/asr/add/AddASRWrapper";
import ASRListingWrapper from "./pages/configuration/Configuration Screens/asr/list/ASRListingWrapper";
import AttributesListingWrapper from "./pages/configuration/Configuration Screens/attributes/list/AttributesListingWrapper";
import AddAttributeGroupWrapper from "./pages/configuration/Configuration Screens/attributesGroup/add/AddAttributeGroupWrapper";
import AttributesGroupListingWrapper from "./pages/configuration/Configuration Screens/attributesGroup/list/AttributesGroupListingWrapper";
import CartonBoxListingWrapper from "./pages/configuration/Configuration Screens/cartonBox/list/CartonBoxListingWrapper";
import AddCompanyWrapper from "./pages/configuration/Configuration Screens/configurationCompany/add/AddCompanyWrapper";
import ConfigurationCompanyListingWrapper from "./pages/configuration/Configuration Screens/configurationCompany/list/ConfigurationCompanyListingWrapper";
import DealersCategoryListingWrapper from "./pages/configuration/Configuration Screens/dealersCategory/list/DealersCategoryListingWrapper";
import GRNListingWrapper from "./pages/configuration/Configuration Screens/grn/list/GRNListingWrapper";
import ItemListingWrapper from "./pages/configuration/Configuration Screens/item/list/ItemListingWrapper";
import LanguageListingWrapper from "./pages/configuration/Configuration Screens/language/list/LanguageListingWrapper";
import ProductCategoryListingWrapper from "./pages/configuration/Configuration Screens/productCategory/list/ProductCategoryListingWrapper";
import AddProductWrapper from "./pages/configuration/Configuration Screens/products/add/AddProductWrapper";
import ProductsListingWrapper from "./pages/configuration/Configuration Screens/products/list/ProductWrapper";
import ProductSubCategoryListingWrapper from "./pages/configuration/Configuration Screens/productSubCategory/list/ProductSubCategoryListingWrapper";
import AddPurchaseOrderWrapper from "./pages/configuration/Configuration Screens/purchaseOrder/add/AddPurchaseOrderWrapper";
import PurchaseOrderListingWrapper from "./pages/configuration/Configuration Screens/purchaseOrder/list/PurchaseOrderListingWrapper";
import AddSchemeWrapper from "./pages/configuration/Configuration Screens/scheme/add/AddSchemeWrapper";
import SchemeListingWrapper from "./pages/configuration/Configuration Screens/scheme/list/SchemeListingWrapper";
import TaxesListingWrapper from "./pages/configuration/Configuration Screens/taxes/list/TaxesListingWrapper";
import ConfigurationLayout from "./pages/configuration/ConfigurationLayout";
import DashboardWrappper from "./pages/Dashboard/DashboardWrappper";
import AddDealerWrapper from "./pages/dealers/add/AddDealerWrapper";
import DealersListingWrapper from "./pages/dealers/list/DealersListingWrapper";
import ViewDealer from "./pages/dealers/view";
import DealerOrderTab from "./pages/dealers/view/tabs/orderTab/DealerOrderTab";
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

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardWrappper />} />
          <Route path="/orders" element={<OrderListing />} />
          <Route path="/orders/add-order" element={<AddOrder />} />
          <Route path="/dealers" element={<DealersListingWrapper />} />
          <Route path="/dealers/add-dealer" element={<AddDealerWrapper />} />
          <Route path="/vendors" element={<VendorsListingWrapper />} />
          <Route path="/vendors/add-vendor" element={<AddVendorWrapper />} />
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
          <Route
            path="/warehouse/add-warehouse"
            element={<AddWarehouseWrapper />}
          />
          <Route path="/inventories" element={<InventoryListingWrapper />} />
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
            <Route path="orders" element={<DealerOrderTab />} />
            <Route path="activities" element={"Activities"} />
            <Route path="delivery-boys" element={"Delivery Boys"} />
          </Route>
          <Route path="users" element={<UsersListingWrapper />} />
          <Route path="test" element={<Test />} />
          <Route path="/configurations" element={<ConfigurationLayout />} />
          <Route
            path="/configurations/attributes"
            element={<AttributesListingWrapper />}
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
            path="/configurations/product-category"
            element={<ProductCategoryListingWrapper />}
          />
          <Route
            path="/configurations/product-sub-category"
            element={<ProductSubCategoryListingWrapper />}
          />
          <Route path="/configurations/item" element={<ItemListingWrapper />} />
          <Route
            path="/configurations/products"
            element={<ProductsListingWrapper />}
          />

          <Route
            path="/configurations/products/add"
            element={<AddProductWrapper />}
          />

          <Route
            path="/configurations/carton-box"
            element={<CartonBoxListingWrapper />}
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
            path="/configurations/taxes"
            element={<TaxesListingWrapper />}
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
          <Route
            path="/configurations/company"
            element={<ConfigurationCompanyListingWrapper />}
          />

          <Route
            path="/configurations/company/add"
            element={<AddCompanyWrapper />}
          />

          <Route path="/configurations/asr" element={<ASRListingWrapper />} />
          <Route path="/configurations/asr/add" element={<AddASRWrapper />} />
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
