import {
    AddWebsiteTags,
    UpdateWebsiteTags,
} from 'src/models/website/WebsiteTags.model'
import { PaginationType } from '../../models/common/paginationType'
import apiSlice from '../ApiSlice'

export const WebsiteTagsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebsiteTags: builder.query({
            providesTags: ['websiteTags'],
            query: (body: PaginationType) => ({
                url: '/website-metatag',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllWebsiteTags: builder.query({
            providesTags: ['websiteTags'],
            query: (companyId) => ({
                url: `/website-metatag/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getWebsiteTagsById: builder.query({
            providesTags: ['websiteTags'],
            query: (id) => ({
                url: `/website-metatag/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        deleteWebsiteTags: builder.mutation({
            invalidatesTags: ['websiteTags'],
            query: (id) => ({
                url: `/website-metatag/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addWebsiteTags: builder.mutation({
            invalidatesTags: ['websiteTags'],
            query: (body: AddWebsiteTags) => ({
                url: '/website-metatag/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWebsiteTags: builder.mutation({
            invalidatesTags: ['websiteTags'],
            query: ({ body, id }: UpdateWebsiteTags) => ({
                url: `/website-metatag/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddWebsiteTagsMutation,
    useGetPaginationWebsiteTagsQuery,
    useUpdateWebsiteTagsMutation,
    useGetAllWebsiteTagsQuery,
    useGetWebsiteTagsByIdQuery,
    useDeleteWebsiteTagsMutation,
} = WebsiteTagsApi
