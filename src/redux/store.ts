import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { apiSlice } from 'src/services'
import {
    barcodeSlice,
    companySlice,
    dealerSlice,
    sideNavLayoutSlice,
    userSlice,
    vendorSlice,
} from './slices'
import ASRSlice from './slices/ASRSlice'
import attributesGroupSlice from './slices/attributesGroupSlice'
import attributesSlice from './slices/attributesSlice'
import cartonBoxSlice from './slices/cartonBoxSlice'
import configurationCompanySlice from './slices/configurationCompanySlice'
import dealersCategorySlice from './slices/dealersCategorySlice'
import dealerPincodeSlice from './slices/dealerPincodeSlice'
import dealerSchemeSlice from './slices/dealerSchemeSlice'
import GRNSlice from './slices/GRNSlice'
import inventorySlice from './slices/inventorySlice'
import itemSlice from './slices/itemSlice'
import languageSlice from './slices/languageSlice'
import outwardRequestSlice from './slices/outwardRequestSlice'
import productCategorySlice from './slices/productCategorySlice'
import productSlice from './slices/productSlice'
import productSubCategorySlice from './slices/productSubCategorySlice'
import PurchaseOrderSlice from './slices/PurchaseOrderSlice'
import saleOrderSlice from './slices/saleOrderSlice'
import schemeSlice from './slices/schemeSlice'
import warehouseSlice from './slices/warehouseSlice'
import authSlice from './slices/authSlice'
import { authMiddleware } from 'src/utils'
import productGroupSlice from './slices/productGroupSlice'
import TaxesSlice from './slices/TaxesSlice'
import areaSlice from './slices/areaSlice'
import countrySlice from './slices/countrySlice'
import statesSlice from './slices/statesSlice'
import districtSlice from './slices/districtSlice'
import tehsilSlice from './slices/tehsilSlice'
import pincodeSlice from './slices/pincodeSlice'
import CartonBoxBarcodeSlice from './slices/CartonBoxBarcodeSlice'
import ProductGroupBarcodeSlice from './slices/productGroupBarcodeSlice'
import NewUserSlice from './slices/NewUserSlice'
import didManagementSlice from './slices/media/didManagementSlice'
import channelManagementSlice from './slices/media/channelManagementSlice'
import tabManagementSlice from './slices/media/tabManagementSlice'
import slotManagementSlice from './slices/media/slotManagementSlice'
import dispositionOneSlice from './slices/configuration/dispositionOneSlice'
import channelGroupSlice from './slices/media/channelGroupSlice'
import channelCategorySlice from './slices/media/channelCategorySlice'
import competitorSlice from './slices/media/competitorManagementSlice'
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
        dealerPincode: dealerPincodeSlice,
        dealerScheme: dealerSchemeSlice,
        vendor: vendorSlice,
        user: userSlice,
        newUser: NewUserSlice,
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
        productGroup: productGroupSlice,
        attributes: attributesSlice,
        tax: TaxesSlice,
        item: itemSlice,
        states: statesSlice,
        district: districtSlice,
        areas: areaSlice,
        language: languageSlice,
        dealersCategory: dealersCategorySlice,
        products: productSlice,
        tehsils: tehsilSlice,
        pincode: pincodeSlice,
        asr: ASRSlice,
        country: countrySlice,
        configurationCompany: configurationCompanySlice,
        barcode: barcodeSlice,
        cartonBoxBarcode: CartonBoxBarcodeSlice,
        productGroupBarcode: ProductGroupBarcodeSlice,
        didManagement: didManagementSlice,
        channelManagement: channelManagementSlice,
        slotManagement: slotManagementSlice,
        tabManagement: tabManagementSlice,
        dispositionOne: dispositionOneSlice,
        channelGroup: channelGroupSlice,
        channelCategory: channelCategorySlice,
        competitor: competitorSlice,

        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authMiddleware, apiSlice.middleware]),
})

setupListeners(store.dispatch)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
