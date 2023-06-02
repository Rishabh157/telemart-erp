import { AddBatch } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const batchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getBatch: builder.query({
            providesTags: ['Batch'],
            query: (body: PaginationType) => ({
                url: '/batch',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addBatch: builder.mutation({
            invalidatesTags: ['Batch'],
            query: (body: AddBatch) => ({
                url: '/batch/add',
                method: 'POST',

                body,
            }),
        }),

        // //***** GET *****/
        // getAllBatch: builder.query({
        //     providesTags: ['Batch'],
        //     query: () => ({
        //         url: '/batch',
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        // **** Delete
        // deleteAsr: builder.mutation({
        //     invalidatesTags: ['Asr', 'asrGroup'],
        //     query: (id) => ({
        //         url: `/asr/${id}`,

        //         method: 'DELETE',
        //     }),
        // }),
    }),
})
export const { useGetBatchQuery, useAddBatchMutation } = batchApi
