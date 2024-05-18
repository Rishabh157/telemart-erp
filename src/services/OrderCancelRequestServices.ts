// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const orderCancelRequestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getOrderCancelRequest: builder.query({
            providesTags: ['cancelOrder'],
            query: (body: PaginationType) => ({
                url: '/order-cancel-request',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL *****/
        getAllProductGroupUnAuth: builder.query({
            providesTags: ['cancelOrder'],
            query: () => ({
                url: '/order-cancel-request',
                method: 'GET',
            }),
        }),

        //***** GET BY ID *****/
        getOrderCancelRequestById: builder.query({
            providesTags: ['cancelOrder'],
            query: (id: string) => ({
                url: `/order-cancel-request/${id}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addOrderCancelRequest: builder.mutation({
            invalidatesTags: ['cancelOrder'],
            query: (body) => ({
                url: '/order-cancel-request/add',
                method: 'POST',
                body,
            }),
        }),

        //***** UPDATE *****/
        updateOrderCancelRequest: builder.mutation({
            invalidatesTags: ['cancelOrder'],
            query: ({ id, body }) => ({
                url: `/order-cancel-request/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** UPDATE *****/
        orderCancelRequestApproval: builder.mutation({
            invalidatesTags: ['cancelOrder'],
            query: ({ orderNumber, id }) => ({
                url: `/order-cancel-request/cancel-order/${orderNumber}/cancel-request/${id}`,
                method: 'PUT',
            }),
        }),

        //***** DELETE *****/
        deleteOrderCancelRequest: builder.mutation({
            invalidatesTags: ['cancelOrder'],
            query: (id) => ({
                url: `/order-cancel-request/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetOrderCancelRequestQuery,
    useGetAllProductGroupUnAuthQuery,
    useGetOrderCancelRequestByIdQuery,
    useAddOrderCancelRequestMutation,
    useUpdateOrderCancelRequestMutation,
    useOrderCancelRequestApprovalMutation,
    useDeleteOrderCancelRequestMutation,
} = orderCancelRequestApi
