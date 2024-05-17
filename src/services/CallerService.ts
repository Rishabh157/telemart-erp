import apiSlice from './ApiSlice'
import { PaginationType } from 'src/models/common/paginationType'

export const callerPageApi = apiSlice.injectEndpoints({
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

        // getPaginationInboundCaller: builder.query({
        //     providesTags: ['call'],
        //     query: (body: PaginationType) => ({
        //         url: 'call/unauth-call',
        //         method: 'POST',
        //         body,
        //     }),
        // }),

        //***** ADD *****/
        addCallerForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: (body: any) => ({
                url: '/call/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateCallerForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: ({ body, id }) => ({
                url: `/call/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // Get Listing
        getOrderNumberUnAuthCallerData: builder.query({
            providesTags: ['call'],
            query: ({ phoneNo }: { phoneNo: string }) => ({
                url: `/order-inquiry/unauth/${phoneNo}/get-by-phnumber`,
                method: 'GET',
            }),
        }),

        // Get Listing
        getPaginationUnAuthCallerData: builder.query({
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
    useAddCallerFormMutation,
    useUpdateCallerFormMutation,
    useGetOrderNumberUnAuthCallerDataQuery,
    useGetPaginationUnAuthCallerDataQuery,
    useGetPaginationComplaintQuery,
} = callerPageApi
