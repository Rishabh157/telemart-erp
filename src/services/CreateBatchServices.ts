// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const createBatchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getBatchesOrder: builder.query({
            providesTags: ['batch-order'],
            query: (body: PaginationType) => ({
                url: '/batch',
                method: 'POST',
                body,
            }),
        }),

        addBatches: builder.mutation({
            invalidatesTags: ['batch-order'],
            query: (body) => ({
                url: '/batch/add',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetBatchesOrderQuery, useAddBatchesMutation } = createBatchApi
