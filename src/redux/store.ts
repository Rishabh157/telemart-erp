import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { companyApi, dealerApi, userApi, vendorApi } from "src/services";
import { companySlice, dealerSlice, userSlice, vendorSlice } from "./slices";
import attributesGroupSlice from "./slices/attributesGroupSlice";
import attributesSlice from "./slices/attributesSlice";
import inventorySlice from "./slices/inventorySlice";
import itemSlice from "./slices/itemSlice";
import outwardRequestSlice from "./slices/outwardRequestSlice";
import productCategorySlice from "./slices/productCategorySlice";
import productSlice from "./slices/productSlice";
import productSubCategorySlice from "./slices/productSubCategorySlice";
import saleOrderSlice from "./slices/saleOrderSlice";
import warehouseSlice from "./slices/warehouseSlice";

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
        dealer: dealerSlice,
        vendor: vendorSlice,
        user: userSlice,
        company: companySlice,
        warehouse: warehouseSlice,
        inventory : inventorySlice,
        outwardRequest : outwardRequestSlice,
        saleOrder : saleOrderSlice,
        attributesGroup : attributesGroupSlice,
        productCategory : productCategorySlice,
        productSubCategory : productSubCategorySlice,
        attributes : attributesSlice,
        item : itemSlice,
        products : productSlice,
        [dealerApi.reducerPath]: dealerApi.reducer,
        [vendorApi.reducerPath]: vendorApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat([
                // authMiddelware,
                dealerApi.middleware,
                vendorApi.middleware,
                userApi.middleware,
                companyApi.middleware,
            ]),
})

setupListeners(store.dispatch)
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;