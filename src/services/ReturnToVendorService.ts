/// ==============================================
// Filename:ReturnToVendorService.tsx
// Type: Service Component
// Last Updated: OCOTOBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    // AddReturnToVendor,
    UpdateSaleOrder,
    UpdateSOApprovalLevel,
} from 'src/models/ReturnToVendor.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { UpdateSaleOrderApproval } from 'src/models/ReturnToVendor.model'

// type AddReturnToVendor = {
//     soNumber: string
//     dealerId: string
//     dealerWareHouseId: string
//     companyWareHouseId: string
//     companyId: string
//     productSalesOrder:
// }

export const ReturnToVendorServiceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationSaleOrder: builder.query({
            providesTags: ['rtv-master'],
            query: (body: PaginationType) => ({
                url: 'rtv-master/sales-order',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationSaleOrderByGroup: builder.query({
            providesTags: ['rtv-master'],
            query: (body: PaginationType) => ({
                url: '/sales-order/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SALESORDER BY DEALER-ID DATA *****/
        getSalesOrderByDealerId: builder.query({
            providesTags: ['rtv-master'],
            query: (dealerId) => ({
                url: `/sales-order/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addReturnToVendor: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (body: any) => ({
                url: 'rtv-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateSalesOrder: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateSaleOrder) => ({
                url: `/sales-order/update-so`,
                method: 'PUT',
                body: { soData: [...body] },
            }),
        }),

        //***** Update *****/
        updateSalesOrderApproval: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateSaleOrderApproval) => ({
                url: `/sales-order/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** Update *****/
        updateSoLevel: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateSOApprovalLevel) => ({
                url: `/sales-order/approval-level/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteSalesOrder: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (id) => ({
                url: `/sales-order/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getSalesOrderById: builder.query({
            providesTags: ['rtv-master'],
            query: (id) => ({
                url: `/sales-order/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetPaginationSaleOrderQuery,
    useGetPaginationSaleOrderByGroupQuery,
    useGetSalesOrderByDealerIdQuery,
    useAddReturnToVendorMutation,
    useUpdateSalesOrderMutation,
    useUpdateSalesOrderApprovalMutation,
    useGetSalesOrderByIdQuery,
    useDeleteSalesOrderMutation,
    useUpdateSoLevelMutation,
} = ReturnToVendorServiceApi
