/// ==============================================
// Filename:AsrService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddASR, UpdateASR } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const asrApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAsr: builder.query({
            providesTags: ['Asr'],
            query: (body: PaginationType) => ({
                url: '/asr',
                method: 'POST',
                body,
            }),
        }),

        // //***** GET *****/
        // getAllAsr: builder.query({
        //     providesTags: ['Asr'],
        //     query: () => ({
        //         url: '/asr',
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        //***** ADD *****/
        addAsr: builder.mutation({
            invalidatesTags: ['Asr'],
            query: (body: AddASR) => ({
                url: '/asr/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateAsr: builder.mutation({
            invalidatesTags: ['Asr'],
            query: ({ body, id }: UpdateASR) => ({
                url: `/asr/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAsrById: builder.query({
            providesTags: ['Asr'],
            query: (id) => ({
                url: `/asr/${id}`,

                method: 'GET',
            }),
        }),

        // //**** Export
        // exportAsrData: builder.mutation({
        //     query: (body: PaginationType) => ({
        //         url: '',

        //         params: {
        //             _page: body.page,
        //             _limit: body.limit,
        //         },
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        //**** Status
        updateAsrStatus: builder.mutation({
            invalidatesTags: ['Asr'],
            query: (id) => ({
                url: `/asr/completed/${id}`,

                method: 'PUT',
            }),
        }),

        // **** Delete
        deleteAsr: builder.mutation({
            invalidatesTags: ['Asr', 'asrGroup'],
            query: (id) => ({
                url: `/asr/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAsrQuery,
    useAddAsrMutation,
    useUpdateAsrMutation,
    useUpdateAsrStatusMutation,
    useGetAsrByIdQuery,
    // useExportAsrDataMutation,
    useDeleteAsrMutation,
    // useGetAllAsrQuery,
} = asrApi
