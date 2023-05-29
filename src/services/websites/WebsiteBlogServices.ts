import { PaginationType } from 'src/models/common/paginationType'
import { AddWebsiteBlog, UpdateWebsiteBlog } from 'src/models/index'
import apiSlice from '../ApiSlice'

export const WebsiteBlogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsiteBlog: builder.query({
            providesTags: ['website-blog'],
            query: (body: PaginationType) => ({
                url: '/website-blog',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsiteBlog: builder.query({
            providesTags: ['website-blog'],
            query: () => ({
                url: `/website-blog`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsiteBlogById: builder.query({
            providesTags: ['website-blog'],
            query: (id) => ({
                url: `/website-blog/${id}`,
                method: 'GET',
            }),
        }),

        //***** DELETE SINGLE DATA *****/
        deletegetWebsiteBlog: builder.mutation({
            invalidatesTags: ['website-blog'],
            query: (id) => ({
                url: `/website-blog/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsiteBlog: builder.mutation({
            invalidatesTags: ['website-blog'],
            query: (body: AddWebsiteBlog) => ({
                url: '/website-blog/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsiteBlog: builder.mutation({
            invalidatesTags: ['website-blog'],
            query: ({ body, id }: UpdateWebsiteBlog) => ({
                url: `/website-blog/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddWebsiteBlogMutation,
    useGetPaginationWebsiteBlogQuery,
    useUpdateWebsiteBlogMutation,
    useGetAllWebsiteBlogQuery,
    useGetWebsiteBlogByIdQuery,
    useDeletegetWebsiteBlogMutation,
} = WebsiteBlogApi
