// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerToDealerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerToDealerOrder: builder.query({
            providesTags: ['dealer-to-dealer'],
            query: (body: PaginationType) => ({
                url: '/dtd-transfer/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET DATA BY ID *****/
        getDealerToDealerOrderById: builder.query({
            providesTags: ['dealer-to-dealer'],
            query: (id) => ({
                url: `/dtd-transfer/${id}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addDealerToDealerOrder: builder.mutation({
            invalidatesTags: ['dealer-to-dealer'],
            query: (body) => ({
                url: '/dtd-transfer/add',
                method: 'POST',
                body,
            }),
        }),

        //***** UPDATE REQUEST *****/
        approvealDealerToDealerOrder: builder.mutation({
            invalidatesTags: ['dealer-to-dealer'],
            query: ({ id, status }) => ({
                url: `/dtd-transfer/approve-dtd/${id}/status/${status}`,
                method: 'PUT',
            }),
        }),

        //update
        updateDealerToDealerOrder: builder.mutation({
            invalidatesTags: ['dealer-to-dealer'],
            query: ({ dtdData, id }) => ({
                url: `/dtd-transfer/update-dtd`,
                method: 'PUT',
                body: { dtdData: dtdData }
            }),
        }),

        //***** DELETE REQUEST *****/
        deleteDealerToDealerOrder: builder.mutation({
            invalidatesTags: ['dealer-to-dealer'],
            query: (id) => ({
                url: `/dtd-transfer/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetDealerToDealerOrderQuery,
    useGetDealerToDealerOrderByIdQuery,
    useAddDealerToDealerOrderMutation,
    useApprovealDealerToDealerOrderMutation,
    useDeleteDealerToDealerOrderMutation,
    useUpdateDealerToDealerOrderMutation
} = dealerToDealerApi
