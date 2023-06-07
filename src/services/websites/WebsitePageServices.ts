import {
    AddWebsitePage,
    UpdateWebsitePage,
} from 'src/models/website/WebsitePage.model'
import { PaginationType } from '../../models/common/paginationType'
import apiSlice from '../ApiSlice'

export const WebsitePageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsitePage: builder.query({
            providesTags: ['websitePage'],
            query: (body: PaginationType) => ({
                url: '/website-page',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsitePage: builder.query({
            providesTags: ['websitePage'],
            query: (companyId) => ({
                url: `/website-page/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsitePageById: builder.query({
            providesTags: ['websitePage'],
            query: (id) => ({
                url: `/website-page/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        deleteWebsitePage: builder.mutation({
            invalidatesTags: ['websitePage'],
            query: (id) => ({
                url: `/website-page/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsitePage: builder.mutation({
            invalidatesTags: ['websitePage'],
            query: (body: AddWebsitePage) => ({
                url: '/website-page/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsitePage: builder.mutation({
            invalidatesTags: ['websitePage'],
            query: ({ body, id }: UpdateWebsitePage) => ({
                url: `/Website-page/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddWebsitePageMutation,
    useGetPaginationWebsitePageQuery,
    useUpdateWebsitePageMutation,
    useGetAllWebsitePageQuery,
    useGetWebsitePageByIdQuery,
    useDeleteWebsitePageMutation,
} = WebsitePageApi
