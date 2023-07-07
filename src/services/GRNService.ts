/// ==============================================
// Filename:GRNService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddGRN, UpdateGRN } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const grnApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationGRN: builder.query({
            providesTags: ['GRN'],
            query: (body: PaginationType) => ({
                url: '/grn',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addGRN: builder.mutation({
            invalidatesTags: ['GRN'],
            query: (body: AddGRN) => ({
                url: '/grn/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateGRN: builder.mutation({
            invalidatesTags: ['GRN'],
            query: ({ body, id }: UpdateGRN) => ({
                url: `/grn/${id}`,
                method: 'PUT',
                body,
            }),
        }),


        //***** get Grn With PoCODE *****/
        getGRNByPOCode: builder.query({
            providesTags: ['GRN-Pocode'],
            query: ({ pocode }: { pocode: string }) => ({
                url: `/grn/${pocode}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useAddGRNMutation,
    useUpdateGRNMutation,
    useGetPaginationGRNQuery,
    useGetGRNByPOCodeQuery
} = grnApi
