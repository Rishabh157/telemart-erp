import { PaginationType } from 'src/models/common/paginationType'
import { AddWebsite, UpdateWebsite } from 'src/models/index'
import apiSlice from '../ApiSlice'

export const WebsiteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsite: builder.query({
            providesTags: ['website'],
            query: (body: PaginationType) => ({
                url: '/website-master',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsite: builder.query({
            providesTags: ['website'],
            query: () => ({
                url: `/website-master`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsiteById: builder.query({
            providesTags: ['website'],
            query: (id) => ({
                url: `/website-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** DELETE SINGLE DATA *****/
        deletegetWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: (id) => ({
                url: `/website-master/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: (body: AddWebsite) => ({
                url: '/website-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsite: builder.mutation({
            invalidatesTags: ['website'],
            query: ({ body, id }: UpdateWebsite) => ({
                url: `/website-master/${id}`,
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
