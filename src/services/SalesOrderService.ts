// |-- Internal Dependencies --|
import {
    AddSaleOrder,
    UpdateSaleOrder,
    UpdateSOApprovalLevel,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { UpdateSaleOrderApproval } from 'src/models/SaleOrder.model'

export const SalesOrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationSaleOrder: builder.query({
            providesTags: ['SalesOrder'],
            query: (body: PaginationType) => ({
                url: '/sales-order',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationSaleOrderByGroup: builder.query({
            providesTags: ['SalesOrder'],
            query: (body: PaginationType) => ({
                url: '/sales-order/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SALESORDER BY DEALER-ID DATA *****/
        getSalesOrderByDealerId: builder.query({
            providesTags: ['SalesOrder'],
            query: (dealerId) => ({
                url: `/sales-order/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** GET SALE ORDER INVOICE *****/
        getInvoiceOfSaleOrderById: builder.query({
            providesTags: ['SalesOrder'],
            query: (soNumber) => ({
                url: `/sales-order/get-dealer-invoice/${soNumber}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: (body: AddSaleOrder) => ({
                url: '/sales-order/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: UpdateSaleOrder) => ({
                url: `/sales-order/update-so`,
                method: 'PUT',
                body: { soData: [...body] },
            }),
        }),

        //***** Update *****/
        updateSalesOrderApproval: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: UpdateSaleOrderApproval) => ({
                url: `/sales-order/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        updateSalesOrderInvoiceUrl: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: any) => ({
                url: `/sales-order/update-incoice-url/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        updateSoLevel: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: UpdateSOApprovalLevel) => ({
                url: `/sales-order/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: (id: string) => ({
                url: `/sales-order/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getSalesOrderById: builder.query({
            providesTags: ['SalesOrder'],
            query: (id: string) => ({
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
    useAddSalesOrderMutation,
    useUpdateSalesOrderMutation,
    useGetInvoiceOfSaleOrderByIdQuery,
    useUpdateSalesOrderApprovalMutation,
    useUpdateSalesOrderInvoiceUrlMutation,
    useGetSalesOrderByIdQuery,
    useDeleteSalesOrderMutation,
    useUpdateSoLevelMutation,
} = SalesOrderApi
