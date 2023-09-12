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
    }),
})
export const {
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useGetOrderByIdQuery,
    useExportOrderDataMutation,
    useDeleteOrderMutation,
    useGetOrderFlowQuery,
    useGetAllOrderQuery,
} = OrderApi
