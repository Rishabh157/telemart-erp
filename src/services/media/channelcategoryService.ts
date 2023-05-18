import { PaginationType } from 'src/models/common/paginationType'
import {
    AddChannelCategory,
    UpdateChannelCategory,
} from 'src/models/ChannelCategory.model'
import apiSlice from '../ApiSlice'

export const channelCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/

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
            providesTags: ['channel-Category'],
            query: () => ({
                url: '/channel-category',
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addChannelCategory: builder.mutation({
            invalidatesTags: ['channel-Category'],
            query: (body: AddChannelCategory) => ({
                url: '/channel-category/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateChannelCategory: builder.mutation({
            invalidatesTags: ['channel-Category'],
            query: ({ body, id }: UpdateChannelCategory) => ({
                url: `/channel-category/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddChannelCategoryMutation,
    useGetPaginationChannelCategoryQuery,
    useUpdateChannelCategoryMutation,
    useGetAllChannelCategoryQuery,
} = channelCategoryApi
