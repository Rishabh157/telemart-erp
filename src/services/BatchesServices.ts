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

        //***** ADD *****/
        addBatches: builder.mutation({
            invalidatesTags: ['batch-order'],
            query: (body) => ({
                url: '/batch/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Single Batch *****/
        getSingleBatchesOrders: builder.query({
            providesTags: ['batch-order'],
            query: (batchId) => ({
                url: `/batch/get-batch-order/${batchId}`,
                method: 'GET',
            }),
        }),

        //***** Get Batch Completed *****/
        updateBatchComplete: builder.mutation({
            invalidatesTags: ['batch-order'],
            query: (batchId: string) => ({
                url: `/batch/status-change/${batchId}`,
                method: 'PUT',
            }),
        }),

    }),
})

export const {
    useGetBatchesOrderQuery,
    useAddBatchesMutation,
    useGetSingleBatchesOrdersQuery,
    useUpdateBatchCompleteMutation,
} = createBatchApi
