/// ==============================================
// Filename:InventoryManagementService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import {
    addInventoryManagement,
    UpdateInventoryManagement,
    //UpdatePOApprovalLevel,
} from 'src/models/InventoryManagement.model'

export const inventoryManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: (body: PaginationType) => ({
                url: '/inventory-management',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PURCHASEORDER BY VENDOR-ID DATA *****/
        // getInventoryManagementByVendorId: builder.query({
        //     providesTags: ['inventoryManagement'],
        //     query: (vendorId) => ({
        //         url: `/purchase-order/get-by-vendor/${vendorId}`,
        //         method: 'GET',
        //     }),
        // }),

        //***** GET *****/
        getAllInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: () => ({
                url: '/inventory-management',
                method: 'GET',
                // body,
            }),
        }),
        //***** GET BY PARENT CATEGORY*****/
        //   getSubCategoryByParent: builder.query({
        //     providesTags: ["inventoryManagement"],
        //     query: (id) => ({
        //       url: `/product-order/get-by-parent-category/${id}`,
        //       method: "GET",
        //       // body,
        //     }),
        //   }),

        //selection by productCategoryId
        //   getProductCategoryIdSubCategory: builder.query({
        //     providesTags: ["inventoryManagement"],
        //     query: (id) => ({
        //       url: `product-sub-category/get-by-parent-category/${id}`,

        //       method: "GET",
        //     }),
        //   }),

        //***** ADD *****/
        addInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: (body: addInventoryManagement) => ({
                url: '/inventory-management/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: ({ body, id }: UpdateInventoryManagement) => ({
                url: `/inventory-management/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        // updatePoLevel: builder.mutation({
        //     invalidatesTags: ['inventoryManagement'],
        //     query: ({ body, id }: UpdatePOApprovalLevel) => ({
        //         url: `/purchase-order/approval-level/${id}`,

        //         method: 'PUT',
        //         body,
        //     }),
        // }),

        // **** GET BY ID
        getInventoryManagementById: builder.query({
            providesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'GET',
            }),
        }),

        //**** Export
        // exportinventoryManagementData: builder.mutation({
        //     query: (body: PaginationType) => ({
        //         url: '',

        //         params: {
        //             _page: body.page,
        //             _limit: body.limit,
        //         },
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        // **** Delete
        deleteInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'DELETE',
            }),
        }),
        // getByPoCode: builder.query({
        //     providesTags: ['inventoryManagement'],
        //     query: (poCode) => ({
        //         url: `/purchase-order/get-by-po/${poCode}`,
        //         method: 'get',
        //     }),
        // }),

        getByIdInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'get',
            }),
        }),
    }),
})
export const {
    useGetInventoryManagementQuery,
    useGetAllInventoryManagementQuery,
    useAddInventoryManagementMutation,
    useUpdateInventoryManagementMutation,
    useGetInventoryManagementByIdQuery,
    //useGetInventoryManagementByVendorIdQuery,
    useDeleteInventoryManagementMutation,
    //useExportinventoryManagementDataMutation,
    //useGetByPoCodeQuery,
    useGetByIdInventoryManagementQuery,
    //useUpdatePoLevelMutation,
    //useGetSubCategoryByParentQuery,
} = inventoryManagementApi
