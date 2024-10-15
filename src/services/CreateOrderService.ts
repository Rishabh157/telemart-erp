import apiSlice from './ApiSlice'
import { PaginationType } from 'src/models/common/paginationType'

export const callerPageApi = apiSlice.injectEndpoints({
    endpoints: (builder:any) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationInboundCaller: builder.query({
            providesTags: ['call'],
            query: (body: PaginationType) => ({
                url: '/call',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addOrderCreationForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: (body: any) => ({
                url: '/call/auth/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateOrderCreationCallerForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: ({ body, id }:any) => ({
                url: `/call/auth/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // Get Listing
        getOrderNumberCallerData: builder.query({
            providesTags: ['call'],
            query: ({ phoneNo }: { phoneNo: string }) => ({
                url: `/order-inquiry/${phoneNo}/get-by-phnumber`,
                method: 'GET',
            }),
        }),

        // Get Listing
        getPaginationCallerData: builder.query({
            providesTags: ['call'],
            query: ({ phoneNo, type }: { phoneNo: string; type: string }) => ({
                url: `/order-inquiry/unauth/phoneno/${phoneNo}/type/${type}`,
                method: 'GET',
            }),
        }),
        getPaginationComplaint: builder.query({
            providesTags: ['call'],
            query: (body: PaginationType) => ({
                url: '/complaint',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const {
    useGetPaginationInboundCallerQuery,
    useAddOrderCreationFormMutation,
    useUpdateOrderCreationCallerFormMutation,
    useGetOrderNumberCallerDataQuery,
    useGetPaginationCallerDataQuery,
    useGetPaginationComplaintQuery,
} = callerPageApi
