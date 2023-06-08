import { PaginationType } from 'src/models/common/paginationType'
import {
    AddChannelGroup,
    UpdateChannelGroup,
} from 'src/models/ChannelGroup.model'
import apiSlice from '../ApiSlice'

export const channelGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationChannelGroup: builder.query({
            providesTags: ['channel-group'],
            query: (body: PaginationType) => ({
                url: '/channel-group',
                method: 'POST',
                body,
            }),
        }),
        //***** GET Without PAGINATION DATA *****/
        getAllChannelGroup: builder.query({
            providesTags: ['channel-group'],
            query: (companyId) => ({
                url: `/channel-group/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addChannelGroup: builder.mutation({
            invalidatesTags: ['channel-group'],
            query: (body: AddChannelGroup) => ({
                url: '/channel-group/add',
                method: 'POST',
                body,
            }),
        }),
        //***** GET BY ID *****/
        getChannelGroupById: builder.query({
            providesTags: ['channel-group'],
            query: (id) => ({
                url: `/channel-group/${id}`,
                method: 'GET',
            }),
        }),
        //***** DELETE *****/
        deleteChannelGroup: builder.mutation({
            invalidatesTags: ['channel-group'],
            query: (id) => ({
                url: `/channel-group/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** Update *****/
        updateChannelGroup: builder.mutation({
            invalidatesTags: ['channel-group'],
            query: ({ body, id }: UpdateChannelGroup) => ({
                url: `/channel-group/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddChannelGroupMutation,
    useGetPaginationChannelGroupQuery,
    useUpdateChannelGroupMutation,
    useGetAllChannelGroupQuery,
    useGetChannelGroupByIdQuery,
    useDeleteChannelGroupMutation,
} = channelGroupApi
