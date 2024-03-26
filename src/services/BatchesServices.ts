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

         //***** Get Single Batch *****/
         getUsersByDistributeDepartment: builder.query({
            providesTags: ['batch-order'],
            query: () => ({
                url: '/user/get-batch-assignes',
                method: 'GET',
            }),
        }),
        //
    }),
})

export const {
    useGetBatchesOrderQuery,
    useAddBatchesMutation,
    useGetSingleBatchesOrdersQuery,
    useGetUsersByDistributeDepartmentQuery
} = createBatchApi
