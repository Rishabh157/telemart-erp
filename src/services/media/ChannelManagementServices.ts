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
                url: '/channel',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addChannel: builder.mutation({
            invalidatesTags: ['channel'],
            query: (body: AddChannelManagement) => ({
                url: '/channel/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateChannel: builder.mutation({
            invalidatesTags: ['channel'],
            query: ({ body, id }: UpdateChannelManagement) => ({
                url: `/channel/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddChannelMutation,
    useGetPaginationchannelQuery,
    useUpdateChannelMutation,
} = channelManagementApi
