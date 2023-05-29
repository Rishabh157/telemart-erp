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
            providesTags: ['inboundCaller'],
            query: (body: PaginationType) => ({
                url: '/channel-master',
                method: 'POST',
                body,
            }),
        }),
        //***** GET Without PAGINATION DATA *****/
        getAllInboundCaller: builder.query({
            providesTags: ['inboundCaller'],
            query: () => ({
                url: '/inboundCaller-master',
                method: 'GET',
            }),
        }),
        //***** GET BY ID *****/
        getInboundCallerById: builder.query({
            providesTags: ['inboundCaller'],
            query: (id) => ({
                url: `/InboundCaller-master/${id}`,
                method: 'GET',
            }),
        }),
        //***** ADD *****/
        addInboundCaller: builder.mutation({
            invalidatesTags: ['inboundCaller'],
            query: (body: AddInboundCaller) => ({
                url: '/chaInboundCallerster/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInboundCaller: builder.mutation({
            invalidatesTags: ['inboundCaller'],
            query: ({ body, id }: UpdateInboundCaller) => ({
                url: `/channel-master/${id}`,
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
