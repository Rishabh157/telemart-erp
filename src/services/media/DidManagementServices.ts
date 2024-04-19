// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import { AddDidManagement, UpdateDidManagement } from 'src/models/Media.model'
import apiSlice from '../ApiSlice'

export const didManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationDid: builder.query({
            providesTags: ['did'],
            query: (body: PaginationType) => ({
                url: '/did-management',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addDid: builder.mutation({
            invalidatesTags: ['did'],
            query: (body: AddDidManagement) => ({
                url: '/did-management/add',
                method: 'POST',
                body,
            }),
        }),

        //***** GET BY ID *****/
        getDidById: builder.query({
            providesTags: ['did'],
            query: (id) => ({
                url: `/did-management/${id}`,
                method: 'GET',
            }),
        }),

        //***** DELETE *****/
        deleteDid: builder.mutation({
            invalidatesTags: ['did'],
            query: (id) => ({
                url: `/did-management/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** Update *****/
        updateDid: builder.mutation({
            invalidatesTags: ['did'],
            query: ({ body, id }: UpdateDidManagement) => ({
                url: `/did-management/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** GET BY DID NUMBER *****/
        getByDidNumber: builder.query({
            providesTags: ['did'],
            query: (id) => ({
                url: `/did-management/unauth/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetPaginationDidQuery,
    useGetDidByIdQuery,
    useAddDidMutation,
    useUpdateDidMutation,
    useGetByDidNumberQuery,
    useDeleteDidMutation,
} = didManagementApi
