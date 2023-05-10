import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddASRWrapper,
  ASRListingWrapper,
  BarcodeGenerator,
  EditPurchaseOrderWrapper,
} from "./pages/index";
import { AddAttributeWrapper, AttributesListingWrapper } from "./pages/index";
import {
  AddAttributeGroupWrapper,
  AttributesGroupListingWrapper,
} from "./pages/index";
import { AddBarcodeWrapper, BarcodeListingWrapper } from "./pages/index";
import {
  ViewBarcodeWrapper,
  AddCartonBoxWrapper,
  CartonBoxListingWrapper,
} from "./pages/index";
import {
  AddCompanyWrapper,
  ConfigurationCompanyListingWrapper,
  AddDealersCategoryWrapper,
  DealersCategoryListingWrapper,
} from "./pages/index";
import {
  AddGRNWrapper,
  GRNListingWrapper,
  AddItemWrapper,
  ItemListingWrapper,
  AddLanguageWrapper,
} from "./pages/index";
import {
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
} from "./pages/index";
import {
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
} from "./pages/index";
import {
  InwardInventoryWrapper,
  InventoryListingWrapper,
  LoginPage,
  AddOrder,
  OrderListing,
  OutwardRequestListingWrapper,
  AddSaleOrderWrapper,
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
} from "./pages/index";

import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setDeviceId,
  setRefreshToken,
  setUserData,
} from "./redux/slices/authSlice";
import { v4 as uuidv4 } from "uuid";
import {
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
} from "./pages/index";

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
          <Route
            path="/dealers/edit-dealer/:id"
            element={<EditDealerWrapper />}
          />

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

          <Route path="/asr" element={<ASRListingWrapper />} />
          <Route path="/asr/add" element={<AddASRWrapper />} />
          <Route path="/asr/:id" element={<EditASRWrapper />} />

          <Route path="/grn" element={<GRNListingWrapper />} />
          <Route path="/grn/add" element={<AddGRNWrapper />} />

          <Route path="/scheme" element={<SchemeListingWrapper />} />
          <Route path="/scheme/add" element={<AddSchemeWrapper />} />
          <Route path="/scheme/:id" element={<EditSchemeWrapper />} />

          <Route
            path="/purchase-order"
            element={<PurchaseOrderListingWrapper />}
          />
          <Route
            path="/purchase-order/view/:id"
            element={<ViewPurchaseOrderWrapper />}
          />
            <Route
            path="/purchase-order/edit/:id"
            element={<EditPurchaseOrderWrapper />}
          />
          <Route
            path="/purchase-order/add"
            element={<AddPurchaseOrderWrapper />}
          />

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
            path="/configurations/barcode/carton-box/add"
            element={<AddCbBarcodeWrapper />}
          />

          <Route
            path="/configurations/barcode/:barcodeId"
            element={<ViewBarcodeWrapper />}
          />
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
          <Route
            path="/configurations/dealers-category"
            element={<DealersCategoryListingWrapper />}
          />
          <Route
            path="/configurations/language"
            element={<LanguageListingWrapper />}
          />
          <Route path="/barcodes" element={<BarcodeGenerator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
