// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import {
    addPurchaseOrder,
    UpdatePurchaseOrder,
    UpdatePOApprovalLevel,
} from 'src/models/PurchaseOrder.model'

export const purchaseOrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getPurchaseOrder: builder.query({
            providesTags: ['PurchaseOrder'],
            query: (body: PaginationType) => ({
                url: '/purchase-order',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PURCHASEORDER BY VENDOR-ID DATA *****/
        getPurchaseOrderByVendorId: builder.query({
            providesTags: ['PurchaseOrder'],
            query: (vendorId) => ({
                url: `/purchase-order/get-by-vendor/${vendorId}`,
                method: 'GET',
            }),
        }),

        //***** GET *****/
        getAllPurchaseOrder: builder.query({
            providesTags: ['PurchaseOrder'],
            query: () => ({
                url: '/purchase-order',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addPurchaseOrder: builder.mutation({
            invalidatesTags: ['PurchaseOrder'],
            query: (body: addPurchaseOrder) => ({
                url: '/purchase-order/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatePurchaseOrder: builder.mutation({
            invalidatesTags: ['PurchaseOrder'],
            query: ({ body, id }: UpdatePurchaseOrder) => ({
                url: `/purchase-order/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        updatePoLevel: builder.mutation({
            invalidatesTags: ['PurchaseOrder'],
            query: ({ body, id }: UpdatePOApprovalLevel) => ({
                url: `/purchase-order/approval-level/${id}`,

                method: 'PUT',
                body,
            }),
        }),
        // **** GET BY ID
        getPurchaseOrderById: builder.query({
            providesTags: ['PurchaseOrder'],
            query: (id) => ({
                url: `/purchase-order/${id}`,
                method: 'GET',
            }),
        }),
        
        // **** Delete
        deletePurchaseOrder: builder.mutation({
            invalidatesTags: ['PurchaseOrder'],
            query: (id) => ({
                url: `/purchase-order/${id}`,
                method: 'DELETE',
            }),
        }),

        getByIdPurchaseOrder: builder.query({
            providesTags: ['PurchaseOrder'],
            query: (id) => ({
                url: `/Purchase-order/${id}`,
                method: 'get',
            }),
        }),
    }),
})
export const {
    useGetPurchaseOrderQuery,
    useGetAllPurchaseOrderQuery,
    useAddPurchaseOrderMutation,
    useUpdatePurchaseOrderMutation,
    useGetPurchaseOrderByIdQuery,
    useGetPurchaseOrderByVendorIdQuery,
    useDeletePurchaseOrderMutation,
    useGetByIdPurchaseOrderQuery,
    useUpdatePoLevelMutation,
} = purchaseOrderApi
