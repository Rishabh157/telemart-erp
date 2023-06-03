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
        //***** GET Without PAGINATION DATA *****/
        getAllDid: builder.query({
            providesTags: ['did'],
            query: () => ({
                url: '/did-management',
                method: 'GET',
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
        //***** get by id *****/
        getDidById: builder.query({
            providesTags: ['did'],
            query: (id) => ({
                url: `/did-management/${id}`,
                method: 'GET',
            }),
        }),
        //***** get by id *****/
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

        //***** get by id *****/
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
    useAddDidMutation,
    useGetPaginationDidQuery,
    useUpdateDidMutation,
    useGetAllDidQuery,
    useGetDidByIdQuery,
    useDeleteDidMutation,
    useGetByDidNumberQuery
} = didManagementApi
