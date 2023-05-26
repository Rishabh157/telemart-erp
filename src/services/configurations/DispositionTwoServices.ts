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
                url: '/disposition-Two',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAlldispositionTwo: builder.query({
            providesTags: ['dispositionTwo'],
            query: () => ({
                url: '/disposition-Two',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        adddispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: (body: AddDisPositionTwo) => ({
                url: '/disposition-Two/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatedispositionTwo: builder.mutation({
            invalidatesTags: ['dispositionTwo'],
            query: ({ body, id }: UpdateDispositionTwo) => ({
                url: `/disposition-Two/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getdispositionTwoById: builder.query({
            providesTags: ['dispositionTwo'],
            query: (id) => ({
                url: `/disposition-Two/${id}`,

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
                url: `/disposition-Two/${id}`,

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
} = dispositionTwoApi
