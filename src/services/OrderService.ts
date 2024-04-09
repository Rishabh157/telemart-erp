/// ==============================================
// Filename:OrderService.tsx
// Type: Service Component
// Last Updated: JULY 30, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const OrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getOrder: builder.query({
            providesTags: ['order', 'batch-order'],
            query: (body: PaginationType) => ({
                url: '/order-inquiry',
                method: 'POST',
                body,
            }),
        }),
        // for warehouse first call
        getWHFristCallAssignedOrder: builder.query({
            providesTags: ['order', 'batch-order'],
            query: (body: PaginationType) => ({
                url: '/order-inquiry/warehouse-first-call',
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

        //***** Get order details by phone number using courier ndr page *****/
        getWarehouseNdrOrderByPhoneNumber: builder.query({
            providesTags: ['order'],
            query: (phoneNo: string) => ({
                url: `/order-inquiry/get-warehouse-ndr/${phoneNo}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** Get order details by phone number using courier ndr page *****/
        updateCourierOrderData: builder.mutation({
            query: ({ id, body }) => ({
                url: `/order-inquiry/update-courier-ndr/${id}`,
                method: 'PUT',
                body,
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

        //***** Assign Order *****/
        assignOrderToDealerOrWarehouse: builder.mutation({
            invalidatesTags: ['order', 'batch-order'],
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

        //***** Get Old Order By Order Number *****/
        getOldOrderDetailsByOrderNumber: builder.query({
            // providesTags: ['order'],
            query: (orderNumber: any) => ({
                url: `/order-inquiry/get-by-order-number/${orderNumber}`,
                method: 'GET',
            }),
        }),

        //***** update first call id *****/
        updateWarehouseFirstCall: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ id, body }) => ({
                url: `/order-inquiry/first-call-confirmation/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** approved warehouse first call *****/
        approvedWHFirstCallApproval: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ body, id }: { body: any; id: string }) => ({
                url: `/order-inquiry/approve-first-call/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** get unauth order details by phone number  *****/
        getWHFirstCallOrderDetails: builder.query({
            // providesTags: ['order'],
            query: (phoneNumber: string) => ({
                url: `/order-inquiry/unauth/get-active-order/${phoneNumber}`,
                method: 'GET',
            }),
        }),

        //***** update unauth details by dialer phone number *****/
        updateWHFirstCallUnauthOrder: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ id, body }) => ({
                url: `order-inquiry/unauth/first-call-confirmation/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //Dealer Ndr gett data in
        getOrderByNumberUsingForNdrDealer: builder.query({
            // providesTags: ['order'],
            query: (phoneNumber: string | null) => ({
                url: `/order-inquiry/get-dealer-ndr/${phoneNumber}`,
                method: 'GET',
            }),
        }),

        updateNdrDealerDialer: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ id, body }) => ({
                url: `order-inquiry/update-dealer-ndr/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // Update offer Applied Order
        updateOfferAppliedNdrOrder: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ id, body }) => ({
                url: `/order-inquiry/change-scheme/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // get multiple search order by mobile no and order no
        getMultiSearchOrderByMobAndOrderNo: builder.mutation({
            invalidatesTags: ['order'],
            query: (body) => ({
                url: `/order-inquiry/get-multiple-orders`,
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const {
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useGetOrderByIdQuery,
    useGetWarehouseNdrOrderByPhoneNumberQuery,
    useUpdateCourierOrderDataMutation,
    useGetAllOrderGlobalSearchQuery,
    useExportOrderDataMutation,
    useDeleteOrderMutation,
    useGetOrderFlowQuery,
    useGetAllOrderQuery,
    useDispatchedOrderBarcodeMutation,
    useGetDealerOfOrderQuery,
    useAssignOrderToDealerOrWarehouseMutation,
    useApprovedOrderStatusMutation,
    useGetOldOrderDetailsByOrderNumberQuery,
    useUpdateWarehouseFirstCallMutation,
    useApprovedWHFirstCallApprovalMutation,
    useGetWHFirstCallOrderDetailsQuery,
    useUpdateWHFirstCallUnauthOrderMutation,
    useGetWHFristCallAssignedOrderQuery,
    useGetOrderByNumberUsingForNdrDealerQuery,
    useUpdateNdrDealerDialerMutation,
    useUpdateOfferAppliedNdrOrderMutation,
    useGetMultiSearchOrderByMobAndOrderNoMutation,
} = OrderApi
