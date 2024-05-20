// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import {
    AddChannelManagement,
    UpdateChannelManagement,
} from 'src/models/Channel.model'
import apiSlice from '../ApiSlice'

export const channelManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationchannel: builder.query({
            providesTags: ['channel'],
            query: (body: PaginationType) => ({
                url: '/channel-master',
                method: 'POST',
                body,
            }),
        }),
        //***** GET ALL PAGINATION *****/
        getAllChannel: builder.query({
            providesTags: ['channel'],
            query: (companyId) => ({
                url: `/channel-master/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET BY ID *****/
        getChannelById: builder.query({
            providesTags: ['channel'],
            query: (id) => ({
                url: `/channel-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addChannel: builder.mutation({
            invalidatesTags: ['channel'],
            query: (body: AddChannelManagement) => ({
                url: '/channel-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateChannel: builder.mutation({
            invalidatesTags: ['channel'],
            query: ({ body, id }: UpdateChannelManagement) => ({
                url: `/channel-master/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** DELETE *****/
        deleteChannel: builder.mutation({
            invalidatesTags: ['channel'],
            query: (id) => ({
                url: `/channel-master/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useAddChannelMutation,
    useGetPaginationchannelQuery,
    useUpdateChannelMutation,
    useGetAllChannelQuery,
    useGetChannelByIdQuery,
    useDeleteChannelMutation,
} = channelManagementApi
