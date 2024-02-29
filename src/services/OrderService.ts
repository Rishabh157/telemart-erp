/// ==============================================
// Filename:OrderService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const OrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getOrder: builder.query({
            providesTags: ['order'],
            query: (body: PaginationType) => ({
                url: '/order-inquiry',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllOrder: builder.query({
            providesTags: ['order'],
            query: () => ({
                url: '/order-inquiry',
                method: 'GET',
                // body,
            }),
        }),

        //***** Global Order Search *****/
        getAllOrderGlobalSearch: builder.query({
            providesTags: ['order'],
            query: (body) => ({
                url: '/order-inquiry/global-search',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        // updateOrder: builder.mutation({
        //     invalidatesTags: ['order'],
        //     query: ({ body, id }: UpdateOrder) => ({
        //         url: `/order-inquiry/${id}`,
        //         method: 'PUT',
        //         body,
        //     }),
        // }),

        // **** GET BY ID
        getOrderById: builder.query({
            providesTags: ['order'],
            query: (id) => ({
                url: `/order-inquiry/${id}`,
                method: 'GET',
            }),
        }),

        //**** Export
        exportOrderData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        //**** Status
        updateOrderStatus: builder.mutation({
            invalidatesTags: ['order'],
            query: (id) => ({
                url: `/order-inquiry/completed/${id}`,
                method: 'PUT',
            }),
        }),

        //**** Get Single Order Flow
        getOrderFlow: builder.query({
            providesTags: ['order'],
            query: (id) => ({
                url: `/order-inquiry-flow/`,
                method: 'GET',
                params: {
                    orderId: id,
                },
            }),
        }),

        // **** Delete
        deleteOrder: builder.mutation({
            invalidatesTags: ['order'],
            query: (id) => ({
                url: `/order-inquiry/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** Dispached Order Barcode *****/
        dispatchedOrderBarcode: builder.mutation({
            invalidatesTags: ['order'],
            query: (body: any) => ({
                url: 'bar-code/order-dispatch',
                method: 'PUT',
                body,
            }),
        }),

        //**  Get Warehosue and dealer of specific order
        getDealerOfOrder: builder.query({
            // providesTags: ['order'],
            query: ({ companyId, schemeId, pincodeId }) => ({
                url: `/dealer-scheme/scheme/${schemeId}/pincode/${pincodeId}`,
                method: 'GET',
            }),
        }),

        //***** Dispached Order Barcode *****/
        assignOrderToDealerOrWarehouse: builder.mutation({
            invalidatesTags: ['order'],
            query: (body: any) => ({
                url: '/order-inquiry/assign-order',
                method: 'PUT',
                body,
            }),
        }),

        //***** Approved Order Status *****/
        approvedOrderStatus: builder.mutation({
            invalidatesTags: ['order'],
            query: (orderId: any) => ({
                url: `/order-inquiry/approve-order/${orderId}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useGetOrderByIdQuery,
    useGetAllOrderGlobalSearchQuery,
    useExportOrderDataMutation,
    useDeleteOrderMutation,
    useGetOrderFlowQuery,
    useGetAllOrderQuery,
    useDispatchedOrderBarcodeMutation,
    useGetDealerOfOrderQuery,
    useAssignOrderToDealerOrWarehouseMutation,
    useApprovedOrderStatusMutation,
} = OrderApi
