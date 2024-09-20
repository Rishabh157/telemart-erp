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

        //***** GET *****/
        getOrderBatches: builder.query({
            providesTags: ['order', 'batch-order'],
            query: (body: PaginationType) => ({
                url: '/order-inquiry/get-batch',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ORDER MUTATION *****/
        getOrderForExport: builder.mutation({
            invalidatesTags: ['order', 'batch-order'],
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

        //***** Get order details by phone number using courier ndr page *****/
        getWarehouseNdrOrderByPhoneNumber: builder.query({
            providesTags: ['order'],
            query: (phoneNo: string) => ({
                url: `/order-inquiry/get-warehouse-ndr/${phoneNo}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** Get order for manual mapping *****/
        getOrderByOrderNumberManualMapping: builder.query({
            providesTags: ['order'],
            query: ({ orderNumber, warehouseId }) => ({
                url: `/order-inquiry/get-by-order-number/manual-mapping/${orderNumber}/warehouseid/${warehouseId}`,
                method: 'GET',
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

        // GET ORDER DASHBOARD DATA
        getOrderDashboardData: builder.query({
            providesTags: ['order'],
            query: (body) => ({
                url: '/order-inquiry/get-all-order-status-count',
                method: 'POST',
                body,
            }),
        }),

        //**** Get Single Order History
        getOrderHistory: builder.query({
            providesTags: ['order'],
            query: (id) => ({
                url: `/order-inquiry-flow/${id}`,
                method: 'GET',
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
            query: ({
                orderId,
                transactionId,
            }: {
                orderId: string
                transactionId: string
            }) => ({
                url: `/order-inquiry/approve-order/${orderId}`,
                method: 'PUT',
                body: { transactionId: transactionId },
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
        //***** Get Old Order By Order Number *****/
        getInvoiceByOrderNumber: builder.query({
            // providesTags: ['order'],
            query: (orderNumber: any) => ({
                url: `/order-inquiry/get-by-order-number-for-invoice/${orderNumber}`,
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
        // get Couirier Label
        getGenerateCouriorLabelByAwbNumber: builder.mutation({
            invalidatesTags: ['order'],
            query: (body) => ({
                url: `/order-inquiry/get-order-label`,
                method: 'POST',
                body,
            }),
        }),
        // get Invoice
        getGenerateInvoiceByAwbNumber: builder.mutation({
            invalidatesTags: ['order'],
            query: (body) => ({
                url: `/order-inquiry/generate-order-invoice`,
                method: 'POST',
                body,
            }),
        }),

        // get Invoice
        dispatchGPOOrdersToWarehouse: builder.mutation({
            invalidatesTags: ['order'],
            query: (body) => ({
                url: `/order-inquiry/warehouse-order-dispatch`,
                method: 'PUT',
                body,
            }),
        }),

        // manual order dispatch
        dispatchManualOrders: builder.mutation({
            invalidatesTags: ['order'],
            query: (body) => ({
                url: `/order-inquiry/warehouse-manual-order-dispatch`,
                method: 'PUT',
                body,
            }),
        }),

        // warehouse status
        getGpoOrderStatus: builder.query({
            providesTags: ['order'],
            query: ({ warehouseId, dateFilter }) => ({
                url: `order-inquiry/get-gpo-order-status/${warehouseId}`,
                method: 'POST',
                body: { dateFilter: dateFilter },
            }),
        }),
        getShipayaariOrderStatus: builder.query({
            providesTags: ['order'],
            query: ({ warehouseId, dateFilter }) => ({
                url: `order-inquiry/get-shipyaari-order-status/${warehouseId}`,
                method: 'POST',
                body: { dateFilter: dateFilter },
            }),
        }),
        getStatusMarkAsDeleiverd: builder.mutation({
            invalidatesTags: ['order'],
            query: ({ orderId }: { orderId: string }) => ({
                url: `order-inquiry/mark-as-delivered/${orderId}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetOrderQuery,
    useGetOrderBatchesQuery,
    useGetOrderForExportMutation,
    useGetOrderByIdQuery,
    useGetWarehouseNdrOrderByPhoneNumberQuery,
    useGetOrderByOrderNumberManualMappingQuery,
    useUpdateCourierOrderDataMutation,
    useGetOrderDashboardDataQuery,
    useGetAllOrderGlobalSearchQuery,
    useExportOrderDataMutation,
    useGetOrderHistoryQuery,
    useDispatchedOrderBarcodeMutation,
    useGetDealerOfOrderQuery,
    useAssignOrderToDealerOrWarehouseMutation,
    useApprovedOrderStatusMutation,
    useGetInvoiceByOrderNumberQuery,
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
    useGetGenerateCouriorLabelByAwbNumberMutation,
    useGetGenerateInvoiceByAwbNumberMutation,
    useDispatchGPOOrdersToWarehouseMutation,
    useDispatchManualOrdersMutation,
    useGetGpoOrderStatusQuery,
    useGetShipayaariOrderStatusQuery,
    useGetStatusMarkAsDeleiverdMutation,
} = OrderApi
