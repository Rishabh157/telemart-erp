import {
    AddDispositionThree,
    UpdateDispositionThree,
} from 'src/models/configurationModel/DispositionThree.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const dispositionThreeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getdispositionThree: builder.query({
            providesTags: ['dispositionThree'],
            query: (body: PaginationType) => ({
                url: '/disposition-three',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAlldispositionThree: builder.query({
            providesTags: ['dispositionThree'],
            query: () => ({
                url: '/disposition-three',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        adddispositionThree: builder.mutation({
            invalidatesTags: ['dispositionThree'],
            query: (body: AddDispositionThree) => ({
                url: '/disposition-three/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatedispositionThree: builder.mutation({
            invalidatesTags: ['dispositionThree'],
            query: ({ body, id }: UpdateDispositionThree) => ({
                url: `/disposition-three/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDispositionThreeById: builder.query({
            providesTags: ['dispositionThree'],
            query: (id) => ({
                url: `/disposition-three/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportdispositionThreeData: builder.mutation({
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
        deletedispositionThree: builder.mutation({
            invalidatesTags: ['dispositionThree'],
            query: (id) => ({
                url: `/disposition-three/${id}`,

                method: 'DELETE',
            }),
        }),

        // **** unauth Dispostion three by id two
        GetAllUnAuthDispositionThree: builder.query({
            providesTags: ['dispositionThree'],
            query: (id) => ({
                url: `/disposition-three//unauth/get-all/${id}`,

                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetdispositionThreeQuery,
    useAdddispositionThreeMutation,
    useUpdatedispositionThreeMutation,
    useGetDispositionThreeByIdQuery,
    useExportdispositionThreeDataMutation,
    useDeletedispositionThreeMutation,
    useGetAlldispositionThreeQuery,
    useGetAllUnAuthDispositionThreeQuery,
} = dispositionThreeApi
