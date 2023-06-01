import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddInboundCaller,
    UpdateInboundCaller,
} from 'src/models/configurationModel/InboundCaller.model'

export const inboundCallerManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationInboundCaller: builder.query({
            providesTags: ['call'],
            query: (body: PaginationType) => ({
                url: '/call',
                method: 'POST',
                body,
            }),
        }),
        //***** GET Without PAGINATION DATA *****/
        getAllInboundCaller: builder.query({
            providesTags: ['call'],
            query: () => ({
                url: '/call',
                method: 'GET',
            }),
        }),
        //***** GET BY ID *****/
        getInboundCallerById: builder.query({
            providesTags: ['call'],
            query: (id) => ({
                url: `/call/${id}`,
                method: 'GET',
            }),
        }),
        //***** ADD *****/
        addInboundCaller: builder.mutation({
            invalidatesTags: ['call'],
            query: (body: AddInboundCaller) => ({
                url: '/call/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInboundCaller: builder.mutation({
            invalidatesTags: ['inboundCaller'],
            query: ({ body, id }: UpdateInboundCaller) => ({
                url: `/call/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** DELETE *****/
        deleteInboundCaller: builder.mutation({
            invalidatesTags: ['inboundCaller'],
            query: (id) => ({
                url: `/channel-master/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useAddInboundCallerMutation,
    useGetPaginationInboundCallerQuery,
    useUpdateInboundCallerMutation,
    useGetAllInboundCallerQuery,
    useGetInboundCallerByIdQuery,
    useDeleteInboundCallerMutation,
} = inboundCallerManagementApi
