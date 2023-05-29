import { PaginationType } from 'src/models/common/paginationType'
import { AddWebsite, UpdateWebsite } from 'src/models/index'
import apiSlice from '../ApiSlice'

export const WebsiteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsite: builder.query({
            providesTags: ['website'],
            query: (body: PaginationType) => ({
                url: '/website',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsite: builder.query({
            providesTags: ['website'],
            query: () => ({
                url: `/Website`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsiteById: builder.query({
            providesTags: ['website'],
            query: (id) => ({
                url: `/Website/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        deletegetWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: (id) => ({
                url: `/Website/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: (body: AddWebsite) => ({
                url: '/website/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: ({ body, id }: UpdateWebsite) => ({
                url: `/Website/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddWebsiteMutation,
    useGetPaginationWebsiteQuery,
    useUpdateWebsiteMutation,
    useGetAllWebsiteQuery,
    useGetWebsiteByIdQuery,
    useDeletegetWebsiteMutation,
} = WebsiteApi
