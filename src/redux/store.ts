

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
import CreateBatchOrderSlice from './slices/CreateBatchOrderSlice'
import DashboardSlice from './slices/DashboardSlice'
import DealerLedgerSlice from './slices/DealerLedgerSlice'
import DealerSupervisorSlice from './slices/DealerSupervisorSlice'
import DealerToDealerSlice from './slices/DealerToDealerOrderSlice'
import DealerWarehouseSlice from './slices/DealerWarehouseSlice'
import InventoryFlowSlice from './slices/InventoryFlowSlice'
import InventoryManagementSlice from './slices/InventoryManagementSlice'
import InwardDealerSlice from './slices/InwardDealerSlice'
import ListingPaginationSlice from './slices/ListingPaginationSlice'
import MoneybackSlice from './slices/MoneybackSlice'
import MultiOrderSearchSlice from './slices/MultiOrderSearchSlice'
import OfferAppliedNdrSlice from './slices/OfferAppliedNdrSlice'
import ProductReplacementSlice from './slices/ProductReplacementSlice'
import PurchaseOrderSlice from './slices/PurchaseOrderSlice'
import warehouseToComapnySlice from './slices/WarehouseToComapnySlice'
import userAcessSlice from './slices/access/userAcessSlice'
import areaSlice from './slices/areaSlice'
import assetsCategorySlice from './slices/assets/assetsCategorySlice'
import assetLocationSlice from './slices/assets/assetsLocationSlice'
import assetsRequestSlice from './slices/assets/assetsRequestSlice'
import authSlice from './slices/authSlice'
import countrySlice from './slices/countrySlice'
import dealerInventorySlice from './slices/dealerInventorySlice'
import DealerOrderLedgerSlice from './slices/dealerOrderLedgerSlice'
import dealerPincodeSlice from './slices/dealerPincodeSlice'
import dealersRatioSlice from './slices/dealersRatioSlice'
import districtSlice from './slices/districtSlice'
import houseArrestSlice from './slices/houseArrestSlice'
import inquirySlice from './slices/inquirySlice'
import inventorySlice from './slices/inventorySlice'
import inboundCallerSlice from './slices/media/inboundCallerSlice'
import slotManagementSlice from './slices/media/slotManagementSlice'
import orderSlice from './slices/orderSlice'
import outwardCustomerSlice from './slices/outwardCustomerSlice'
import pincodeSlice from './slices/pincodeSlice'
import ProductGroupBarcodeSlice from './slices/productGroupBarcodeSlice'
import returnToVendorSlice from './slices/returnToVendorSlice'
import saleOrderSlice from './slices/saleOrderSlice'
import statesSlice from './slices/statesSlice'
import tehsilSlice from './slices/tehsilSlice'
import inwardRequestSlice from './slices/warehouseInwardSlice/inwardRequestDealerSlice'
import warehouseAssignedOrderSlice from './slices/warehouseOrders/warehouseAssignedOrderSlice'
import outwardRequestSlice from './slices/warehouseOutwardSlice/outwardRequestDealerSlice'
import warehouseSlice from './slices/warehouseSlice'
import warehouseToSampleSlice from './slices/warehouseToSampleSlice'
import warehouseTransferSlice from './slices/warehouseTransferSlice'
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
        dealerRatio: dealersRatioSlice,
        dealerPincode: dealerPincodeSlice,
        dealerSupervisor: DealerSupervisorSlice,
        dealerLedger: DealerLedgerSlice,
        dealerWarehouse: DealerWarehouseSlice,
        dealerOrderLedger: DealerOrderLedgerSlice,
        warehouse: warehouseSlice,
        inventory: inventorySlice,
        outwardRequest: outwardRequestSlice,
        inwardRequest: inwardRequestSlice,
        saleOrder: saleOrderSlice,
        purchaseOrder: PurchaseOrderSlice,
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
        slotManagement: slotManagementSlice,
        websiteBlog: websiteBlogSlice,
        websitePage: websitePageSlice,
        order: orderSlice,
        inquiry: inquirySlice,
        inboundCaller: inboundCallerSlice,
        assetLocation: assetLocationSlice,
        assetsRequest: assetsRequestSlice,
        assetsCategory: assetsCategorySlice,
        returnToVendor: returnToVendorSlice,
        warehouseTransfer: warehouseTransferSlice,
        warehouseToSample: warehouseToSampleSlice,
        warehouseToComapny: warehouseToComapnySlice,
        inventoryFlow: InventoryFlowSlice,
        inwardDealer: InwardDealerSlice,
        complain: ComplainSlice,
        moneyback: MoneybackSlice,
        productReplacement: ProductReplacementSlice,
        houseArrest: houseArrestSlice,
        warehouseOrdersAssigned: warehouseAssignedOrderSlice,
        createBatch: CreateBatchOrderSlice,
        offerAppliedNdr: OfferAppliedNdrSlice,
        outwardCustomer: outwardCustomerSlice,
        dealerInventory: dealerInventorySlice,
        multiOrderSearch: MultiOrderSearchSlice,
        delaerToDealer: DealerToDealerSlice,
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
