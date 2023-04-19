import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "src/services";
import {
  barcodeSlice,
  companySlice,
  dealerSlice,
  sideNavLayoutSlice,
  userSlice,
  vendorSlice,
} from "./slices";
import ASRSlice from "./slices/ASRSlice";
import attributesGroupSlice from "./slices/attributesGroupSlice";
import attributesSlice from "./slices/attributesSlice";
import cartonBoxSlice from "./slices/cartonBoxSlice";
import configurationCompanySlice from "./slices/configurationCompanySlice";
import dealersCategorySlice from "./slices/dealersCategorySlice";
import GRNSlice from "./slices/GRNSlice";
import inventorySlice from "./slices/inventorySlice";
import itemSlice from "./slices/itemSlice";
import languageSlice from "./slices/languageSlice";
import outwardRequestSlice from "./slices/outwardRequestSlice";
import productCategorySlice from "./slices/productCategorySlice";
import productSlice from "./slices/productSlice";
import productSubCategorySlice from "./slices/productSubCategorySlice";
import PurchaseOrderSlice from "./slices/PurchaseOrderSlice";
import saleOrderSlice from "./slices/saleOrderSlice";
import schemeSlice from "./slices/schemeSlice";
import warehouseSlice from "./slices/warehouseSlice";
import authSlice from "./slices/authSlice";
import { authMiddleware } from "src/utils";

// Middleware for handling 401 Error
// const authMiddelware = () => (next: any) => (action: any) => {
//     if (action.type.includes("rejected") && action.payload.status === 401) {
//         localStorage.clear(
//         window.location.href = "/"
//     }
//     return next(action)
// }

const store = configureStore({
  reducer: {
    auth: authSlice,
    sideNavLayout: sideNavLayoutSlice,
    dealer: dealerSlice,
    vendor: vendorSlice,
    user: userSlice,
    company: companySlice,
    warehouse: warehouseSlice,
    inventory: inventorySlice,
    outwardRequest: outwardRequestSlice,
    saleOrder: saleOrderSlice,
    attributesGroup: attributesGroupSlice,
    productCategory: productCategorySlice,
    cartonBox: cartonBoxSlice,
    scheme: schemeSlice,
    purchaseOrder: PurchaseOrderSlice,
    grn: GRNSlice,
    productSubCategory: productSubCategorySlice,
    attributes: attributesSlice,
    item: itemSlice,
    language: languageSlice,
    dealersCategory: dealersCategorySlice,
    products: productSlice,
    asr: ASRSlice,
    configurationCompany: configurationCompanySlice,
    barcode: barcodeSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authMiddleware, apiSlice.middleware]),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
