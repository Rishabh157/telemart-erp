import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const PrePaidOrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getPrePaidOrder: builder.query({
            providesTags: ['prepaidorder'],
            query: (body: PaginationType) => ({
                url: '/prepaid-order',
                method: 'POST',
                body,
            }),
        }),

        // **** GET BY ID
        getPrePaidOrderById: builder.query({
            providesTags: ['prepaidorder'],
            query: (id) => ({
                url: `/prepaid-order/${id}`,
                method: 'GET',
            }),
        }),

        //**** Change Approve Status
        updatePrePaidOrderStatus: builder.mutation({
            invalidatesTags: ['prepaidorder'],
            query: (id: string) => ({
                url: `/prepaid-order/approved-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetPrePaidOrderQuery,
    useGetPrePaidOrderByIdQuery,
    useUpdatePrePaidOrderStatusMutation,
} = PrePaidOrderApi
