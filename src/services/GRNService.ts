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
            invalidatesTags: ['GRN', 'PurchaseOrder'],
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
            query: ({
                pocode,
                itemId,
            }: {
                pocode: string
                itemId: string
            }) => ({
                url: `/grn/pocode`,
                params: { pocode: pocode, itemid: itemId },
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useAddGRNMutation,
    useUpdateGRNMutation,
    useGetPaginationGRNQuery,
    useGetGRNByPOCodeQuery,
} = grnApi
