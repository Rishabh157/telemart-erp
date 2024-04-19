

// |-- External Dependencies --|
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

// |-- Internal Dependencies --|
import { apiSlice } from 'src/services'
import { filePickerSlice } from 'src/services/FilePickerServices'
import {
    barcodeSlice,
    dealerSlice,
    sideNavLayoutSlice,
    userSlice,
    vendorSlice,
} from './slices'
import ListingPaginationSlice from './slices/ListingPaginationSlice'
import DealerWarehouseSlice from './slices/DealerWarehouseSlice'
import VendorWarehouseSlice from './slices/VendorWarehouseSlice'
import GRNSlice from './slices/GRNSlice'
import inventorySlice from './slices/inventorySlice'
import outwardRequestSlice from './slices/warehouseOutwardSlice/outwardRequestDealerSlice'
import inwardRequestSlice from './slices/warehouseInwardSlice/inwardRequestDealerSlice'
import PurchaseOrderSlice from './slices/PurchaseOrderSlice'
import InventoryManagementSlice from './slices/InventoryManagementSlice'
import saleOrderSlice from './slices/saleOrderSlice'
import warehouseSlice from './slices/warehouseSlice'
import authSlice from './slices/authSlice'
import { authMiddleware } from 'src/utils'
import areaSlice from './slices/areaSlice'
import countrySlice from './slices/countrySlice'
import statesSlice from './slices/statesSlice'
import districtSlice from './slices/districtSlice'
import tehsilSlice from './slices/tehsilSlice'
import pincodeSlice from './slices/pincodeSlice'
import CartonBoxBarcodeSlice from './slices/CartonBoxBarcodeSlice'
import ProductGroupBarcodeSlice from './slices/productGroupBarcodeSlice'
import NewUserSlice from './slices/NewUserSlice'
import slotManagementSlice from './slices/media/slotManagementSlice'
import websiteBlogSlice from './slices/website/websiteBlogSlice'
import websitePageSlice from './slices/website/websitePageSlice'
import orderSlice from './slices/orderSlice'
import inquirySlice from './slices/inquirySlice'
import inboundCallerSlice from './slices/media/inboundCallerSlice'
import assetLocationSlice from './slices/assets/assetsLocationSlice'
import assetsRequestSlice from './slices/assets/assetsRequestSlice'
import assetsCategorySlice from './slices/assets/assetsCategorySlice'
import vendorLedgerSlice from './slices/VendorLedgerSlice'
import userAcessSlice from './slices/access/userAcessSlice'
import returnToVendorSlice from './slices/returnToVendorSlice'
import warehouseTransferSlice from './slices/warehouseTransferSlice'
import warehouseToSampleSlice from './slices/warehouseToSampleSlice'
import warehouseToComapnySlice from './slices/WarehouseToComapnySlice'
import InventoryFlowSlice from './slices/InventoryFlowSlice'
import InwardDealerSlice from './slices/InwardDealerSlice'
import ComplainSlice from './slices/ComplainSlice'
import MoneybackSlice from './slices/MoneybackSlice'
import ProductReplacementSlice from './slices/ProductReplacementSlice'
import warehouseAssignedOrderSlice from './slices/warehouseOrders/warehouseAssignedOrderSlice'
import OfferAppliedNdrSlice from './slices/OfferAppliedNdrSlice'
import outwardCustomerSlice from './slices/outwardCustomerSlice'
import DashboardSlice from './slices/DashboardSlice'
import MultiOrderSearchSlice from './slices/MultiOrderSearchSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        userAccess: userAcessSlice,
        dashboard: DashboardSlice,
        sideNavLayout: sideNavLayoutSlice,
        listingPagination: ListingPaginationSlice,
        dealer: dealerSlice,
        dealerWarehouse: DealerWarehouseSlice,
        vendor: vendorSlice,
        vendorWarehouse: VendorWarehouseSlice,
        user: userSlice,
        newUser: NewUserSlice,
        warehouse: warehouseSlice,
        inventory: inventorySlice,
        outwardRequest: outwardRequestSlice,
        inwardRequest: inwardRequestSlice,
        saleOrder: saleOrderSlice,
        purchaseOrder: PurchaseOrderSlice,
        inventoryManagement: InventoryManagementSlice,
        grn: GRNSlice,
        states: statesSlice,
        district: districtSlice,
        areas: areaSlice,
        tehsils: tehsilSlice,
        pincode: pincodeSlice,
        country: countrySlice,
        barcode: barcodeSlice,
        cartonBoxBarcode: CartonBoxBarcodeSlice,
        productGroupBarcode: ProductGroupBarcodeSlice,
        slotManagement: slotManagementSlice,
        websiteBlog: websiteBlogSlice,
        websitePage: websitePageSlice,
        order: orderSlice,
        inquiry: inquirySlice,
        inboundCaller: inboundCallerSlice,
        assetLocation: assetLocationSlice,
        assetsRequest: assetsRequestSlice,
        assetsCategory: assetsCategorySlice,
        vendorLedger: vendorLedgerSlice,
        returnToVendor: returnToVendorSlice,
        warehouseTransfer: warehouseTransferSlice,
        warehouseToSample: warehouseToSampleSlice,
        warehouseToComapny: warehouseToComapnySlice,
        inventoryFlow: InventoryFlowSlice,
        inwardDealer: InwardDealerSlice,
        complain: ComplainSlice,
        moneyback: MoneybackSlice,
        productReplacement: ProductReplacementSlice,
        warehouseOrdersAssigned: warehouseAssignedOrderSlice,
        offerAppliedNdr: OfferAppliedNdrSlice,
        outwardCustomer: outwardCustomerSlice,
        multiOrderSearch: MultiOrderSearchSlice,
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
