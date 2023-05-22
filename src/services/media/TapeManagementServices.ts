import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddTapeManagement,
    UpdateTapeManagement,
} from 'src/models/tapeManagement.model'

export const tapeManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationTape: builder.query({
            providesTags: ['tape'],
            query: (body: PaginationType) => ({
                url: '/tape-master',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addTape: builder.mutation({
            invalidatesTags: ['tape'],
            query: (body: AddTapeManagement) => ({
                url: '/tape-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateTape: builder.mutation({
            invalidatesTags: ['tape'],
            query: ({ body, id }: UpdateTapeManagement) => ({
                url: `/tape-master/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getTapeById: builder.query({
            providesTags: ['tape'],
            query: (id) => ({
                url: `/tape-master/${id}`,

                method: 'GET',
            }),
        }),

        //***** Delete *****/
        deleteTape: builder.mutation({
            invalidatesTags: ['tape'],
            query: (id) => ({
                url: `/tape-master/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useAddTapeMutation,
    useGetPaginationTapeQuery,
    useUpdateTapeMutation,
    useGetTapeByIdQuery,
    useDeleteTapeMutation,
} = tapeManagementApi
