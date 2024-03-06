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

        // **** Delete
        deletedispositionOne: builder.mutation({
            invalidatesTags: ['dispositionOne'],
            query: (id) => ({
                url: `/disposition-one/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** Active
        deactiveDispositionOne: builder.mutation({
            invalidatesTags: ['dispositionOne'],
            query: (id: string) => ({
                url: `/disposition-one/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetdispositionOneQuery,
    useAdddispositionOneMutation,
    useUpdatedispositionOneMutation,
    useGetdispositionOneByIdQuery,
    useDeletedispositionOneMutation,
    useGetAlldispositionOneQuery,
    useDeactiveDispositionOneMutation,
} = dispositionOneApi
