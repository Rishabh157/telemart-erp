/// ==============================================
// Filename:DispositionTwoServices.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    AddDisPositionTwo,
    UpdateDispositionTwo,
} from 'src/models/configurationModel/DispositionTwo.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const dispositionTwoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getdispositionTwo: builder.query({
            providesTags: ['dispositionTwo'],
            query: (body: PaginationType) => ({
                url: '/disposition-two',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAlldispositionTwo: builder.query({
            providesTags: ['dispositionTwo'],
            query: () => ({
                url: `/disposition-two`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET all by disposition One Without token  *****/
        getAlldispositionTwounauth: builder.query({
            providesTags: ['dispositionTwo'],
            query: (Id) => ({
                url: `/disposition-two/unauth/get-all/${Id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET all Without token *****/
        getAllUnAuthdispositionTwo: builder.query({
            providesTags: ['dispositionTwo'],
            query: (Id) => ({
                url: `/disposition-two/unauth/`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        adddispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: (body: AddDisPositionTwo) => ({
                url: '/disposition-two/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatedispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: ({ body, id }: UpdateDispositionTwo) => ({
                url: `/disposition-two/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getdispositionTwoById: builder.query({
            providesTags: ['dispositionTwo'],
            query: (id) => ({
                url: `/disposition-two/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportdispositionTwoData: builder.mutation({
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
        deletedispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: (id) => ({
                url: `/disposition-two/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetdispositionTwoQuery,
    useAdddispositionTwoMutation,
    useUpdatedispositionTwoMutation,
    useGetdispositionTwoByIdQuery,
    useExportdispositionTwoDataMutation,
    useDeletedispositionTwoMutation,
    useGetAlldispositionTwoQuery,
    useGetAlldispositionTwounauthQuery,
    useGetAllUnAuthdispositionTwoQuery,
} = dispositionTwoApi
