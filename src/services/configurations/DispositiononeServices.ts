/// ==============================================
// Filename:DispositiononeServices.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    AddDisPositionOne,
    UpdateDispositionOne,
} from 'src/models/configurationModel/DisposiionOne.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const dispositionOneApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getdispositionOne: builder.query({
            providesTags: ['dispositionOne'],
            query: (body: PaginationType) => ({
                url: '/disposition-one',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAlldispositionOne: builder.query({
            providesTags: ['dispositionOne'],
            query: () => ({
                url: `/disposition-one`,
                method: 'GET',
                // body,
            }),
        }),
        getAlldispositionOneunauth: builder.query({
            providesTags: ['dispositionOne'],

            query: () => ({
                url: '/disposition-one/unauth/get-all',
                method: 'GET',
                extra: 'true,"dsfdsf',
                // body,
            }),
        }),

        //***** ADD *****/
        adddispositionOne: builder.mutation({
            invalidatesTags: ['dispositionOne'],
            query: (body: AddDisPositionOne) => ({
                url: '/disposition-one/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatedispositionOne: builder.mutation({
            invalidatesTags: ['dispositionOne'],
            query: ({ body, id }: UpdateDispositionOne) => ({
                url: `/disposition-one/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getdispositionOneById: builder.query({
            providesTags: ['dispositionOne'],
            query: (id) => ({
                url: `/disposition-one/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportdispositionOneData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        // **** Delete
        deletedispositionOne: builder.mutation({
            invalidatesTags: ['dispositionOne'],
            query: (id) => ({
                url: `/disposition-one/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetdispositionOneQuery,
    useAdddispositionOneMutation,
    useUpdatedispositionOneMutation,
    useGetdispositionOneByIdQuery,
    useExportdispositionOneDataMutation,
    useDeletedispositionOneMutation,
    useGetAlldispositionOneQuery,
    useGetAlldispositionOneunauthQuery,
} = dispositionOneApi
