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
                url: '/tape',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addTape: builder.mutation({
            invalidatesTags: ['tape'],
            query: (body: AddTapeManagement) => ({
                url: '/tape/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateTape: builder.mutation({
            invalidatesTags: ['tape'],
            query: ({ body, id }: UpdateTapeManagement) => ({
                url: `/tape/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddTapeMutation,
    useGetPaginationTapeQuery,
    useUpdateTapeMutation,
} = tapeManagementApi
