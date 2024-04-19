// |-- External Dependencies --|
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

// |-- Internal Dependencies --|
import { apiSlice } from 'src/services'
import { filePickerSlice } from 'src/services/FilePickerServices'
import { authMiddleware } from 'src/utils'
import {
    barcodeSlice,
    dealerSlice,
    sideNavLayoutSlice,
} from './slices'
import CartonBoxBarcodeSlice from './slices/CartonBoxBarcodeSlice'
import ComplainSlice from './slices/ComplainSlice'
import DashboardSlice from './slices/DashboardSlice'
import InventoryManagementSlice from './slices/InventoryManagementSlice'
import ListingPaginationSlice from './slices/ListingPaginationSlice'
import userAcessSlice from './slices/access/userAcessSlice'
import areaSlice from './slices/areaSlice'
import assetsCategorySlice from './slices/assets/assetsCategorySlice'
import assetLocationSlice from './slices/assets/assetsLocationSlice'
import assetsRequestSlice from './slices/assets/assetsRequestSlice'
import authSlice from './slices/authSlice'
import countrySlice from './slices/countrySlice'
import districtSlice from './slices/districtSlice'
import inquirySlice from './slices/inquirySlice'
import inventorySlice from './slices/inventorySlice'
import inboundCallerSlice from './slices/media/inboundCallerSlice'
import orderSlice from './slices/orderSlice'
import pincodeSlice from './slices/pincodeSlice'
import ProductGroupBarcodeSlice from './slices/productGroupBarcodeSlice'
import statesSlice from './slices/statesSlice'
import tehsilSlice from './slices/tehsilSlice'
import inwardRequestSlice from './slices/warehouseInwardSlice/inwardRequestDealerSlice'
import warehouseAssignedOrderSlice from './slices/warehouseOrders/warehouseAssignedOrderSlice'
import outwardRequestSlice from './slices/warehouseOutwardSlice/outwardRequestDealerSlice'
import websiteBlogSlice from './slices/website/websiteBlogSlice'
import websitePageSlice from './slices/website/websitePageSlice'


const store = configureStore({
    reducer: {
        auth: authSlice,
        userAccess: userAcessSlice,
        dashboard: DashboardSlice,
        sideNavLayout: sideNavLayoutSlice,
        listingPagination: ListingPaginationSlice,
        dealer: dealerSlice,
        inventory: inventorySlice,
        outwardRequest: outwardRequestSlice,
        inwardRequest: inwardRequestSlice,
        inventoryManagement: InventoryManagementSlice,
        states: statesSlice,
        district: districtSlice,
        areas: areaSlice,
        tehsils: tehsilSlice,
        pincode: pincodeSlice,
        country: countrySlice,
        barcode: barcodeSlice,
        cartonBoxBarcode: CartonBoxBarcodeSlice,
        productGroupBarcode: ProductGroupBarcodeSlice,
        websiteBlog: websiteBlogSlice,
        websitePage: websitePageSlice,
        order: orderSlice,
        inquiry: inquirySlice,
        inboundCaller: inboundCallerSlice,
        assetLocation: assetLocationSlice,
        assetsRequest: assetsRequestSlice,
        assetsCategory: assetsCategorySlice,
        complain: ComplainSlice,
        warehouseOrdersAssigned: warehouseAssignedOrderSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [filePickerSlice.reducerPath]: filePickerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            authMiddleware,
            apiSlice.middleware,
            filePickerSlice.middleware,
        ]),
})

setupListeners(store.dispatch)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
