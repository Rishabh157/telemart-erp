// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const transportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getTransport: builder.query({
            providesTags: ['Transport'],
            query: (body: PaginationType) => ({
                url: '/transport',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllTransport: builder.query({
            providesTags: ['Transport'],
            query: () => ({
                url: `/transport`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addTransport: builder.mutation({
            invalidatesTags: ['Transport'],
            query: (body: any) => ({
                url: '/transport/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateTransport: builder.mutation({
            invalidatesTags: ['Transport'],
            query: ({ body, id }: any) => ({
                url: `/transport/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getTransportById: builder.query({
            providesTags: ['Transport'],
            query: (id) => ({
                url: `/transport/${id}`,

                method: 'GET',
            }),
        }),

        // **** Delete
        deleteTransport: builder.mutation({
            invalidatesTags: ['Transport'],
            query: (id: any) => ({
                url: `/transport/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetTransportQuery,
    useAddTransportMutation,
    useUpdateTransportMutation,
    useGetTransportByIdQuery,
    useDeleteTransportMutation,
    useGetAllTransportQuery,
} = transportApi
