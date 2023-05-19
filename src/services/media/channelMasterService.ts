import { PaginationType } from 'src/models/common/paginationType'

import apiSlice from '../ApiSlice'
import {
    AddChannelMaster,
    UpdateChannelMaster,
} from 'src/models/channelMaster.model'

export const channelMasterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/

        getPaginationChannelMaster: builder.query({
            providesTags: ['channel-Master'],
            query: (body: PaginationType) => ({
                url: '/channel-Master',
                method: 'POST',
                body,
            }),
        }),
        //***** GET Without PAGINATION DATA *****/
        getAllChannelMaster: builder.query({
            providesTags: ['channel-Master'],
            query: () => ({
                url: '/channel-Master',
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addChannelMaster: builder.mutation({
            invalidatesTags: ['channel-Master'],
            query: (body: AddChannelMaster) => ({
                url: '/channel-Master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateChannelMaster: builder.mutation({
            invalidatesTags: ['channel-Master'],
            query: ({ body, id }: UpdateChannelMaster) => ({
                url: `/channel-Master/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddChannelMasterMutation,
    useGetPaginationChannelMasterQuery,
    useUpdateChannelMasterMutation,
    useGetAllChannelMasterQuery,
} = channelMasterApi
