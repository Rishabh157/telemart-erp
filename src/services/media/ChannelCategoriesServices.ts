import { PaginationType } from 'src/models/common/paginationType'
import {
    AddChannelCategory,
    UpdateChannelCategory,
} from 'src/models/ChannelCategory.model'
import apiSlice from '../ApiSlice'

export const channelCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *******/

        getPaginationChannelCategory: builder.query({
            providesTags: ['channel-category'],
            query: (body: PaginationType) => ({
                url: '/channel-category',
                method: 'POST',
                body,
            }),
        }),
        //***** GET Without PAGINATION DATA *****/
        getAllChannelCategory: builder.query({
            providesTags: ['channel-category'],
            query: () => ({
                url: '/channel-category',
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addChannelCategory: builder.mutation({
            invalidatesTags: ['channel-category'],
            query: (body: AddChannelCategory) => ({
                url: '/channel-category/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateChannelCategory: builder.mutation({
            invalidatesTags: ['channel-category'],
            query: ({ body, id }: UpdateChannelCategory) => ({
                url: `/channel-category/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getChannelCategoryById: builder.query({
            providesTags: ['channel-category'],
            query: (id) => ({
                url: `/channel-category/${id}`,

                method: 'GET',
            }),
        }),

        //***** Delete *****/
        deleteChannelCategory: builder.mutation({
            invalidatesTags: ['channel-category'],
            query: (id) => ({
                url: `/channel-category/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useAddChannelCategoryMutation,
    useGetPaginationChannelCategoryQuery,
    useUpdateChannelCategoryMutation,
    useGetAllChannelCategoryQuery,
    useGetChannelCategoryByIdQuery,
    useDeleteChannelCategoryMutation,
} = channelCategoryApi
