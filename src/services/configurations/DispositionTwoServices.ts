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
            query: () => ({
                url: `/disposition-two/unauth-dp2`,
                method: 'GET',
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

        // **** Delete
        deletedispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: (id) => ({
                url: `/disposition-two/${id}`,

                method: 'DELETE',
            }),
        }),

        deactiveDispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: (id: string) => ({
                url: `/disposition-two/status-change/${id}`,
                method: 'PUT',
            }),
        }),

        // Get Disposition Two by One Id
        getDispostionTwoByOne: builder.query({
            providesTags: ['dispositionTwo'],
            query: (id: string) => ({
                url: `/disposition-two/get-all/${id}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetdispositionTwoQuery,
    useGetAlldispositionTwoQuery,
    useAdddispositionTwoMutation,
    useUpdatedispositionTwoMutation,
    useGetdispositionTwoByIdQuery,
    useDeletedispositionTwoMutation,
    useGetAlldispositionTwounauthQuery,
    useGetAllUnAuthdispositionTwoQuery,
    useDeactiveDispositionTwoMutation,
    useGetDispostionTwoByOneQuery,
} = dispositionTwoApi
