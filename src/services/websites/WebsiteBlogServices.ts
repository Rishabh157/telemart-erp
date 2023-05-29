import { PaginationType } from './../../models/common/paginationType';
import apiSlice from '../ApiSlice'
import { AddWebsiteBlog, UpdateWebsiteBlog } from '../../models/website/WebsiteBlog.model';

export const WebsiteBlogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsiteBlog: builder.query({
            providesTags: ['websiteBlog'],
            query: (body: PaginationType) => ({
                url: '/website-blog',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsiteBlog: builder.query({
            providesTags: ['websiteBlog'],
            query: () => ({
                url: `/website-blog`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsiteBlogById: builder.query({
            providesTags: ['websiteBlog'],
            query: (id) => ({
                url: `/website-blog/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        deleteWebsiteBlog: builder.mutation({
            invalidatesTags: ['websiteBlog'],
            query: (id) => ({
                url: `/website-blog/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsiteBlog: builder.mutation({
            invalidatesTags: ['websiteBlog'],
            query: (body: AddWebsiteBlog) => ({
                url: '/website-blog/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsiteBlog: builder.mutation({
            invalidatesTags: ['websiteBlog'],
            query: ({ body, id }: UpdateWebsiteBlog) => ({
                url: `/Website-blog/${id}`,
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
    useDeleteWebsiteBlogMutation,
} = WebsiteBlogApi
