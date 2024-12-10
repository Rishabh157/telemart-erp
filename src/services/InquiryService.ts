// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const InquiryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getInquiry: builder.query({
            providesTags: ['inquiry'],
            query: (body: PaginationType) => ({
                url: '/inquiry',
                method: 'POST',
                body,
            }),
        }),

        //***** GET UnAuth *****/
        getInquiryUnAuth: builder.query({
            providesTags: ['inquiry'],
            query: (body: PaginationType) => ({
                url: '/inquiry/unauth-inquiry',
                method: 'POST',
                body,
            }),
        }),

        //***** GET UnAuth *****/
        getInquiryById: builder.query({
            providesTags: ['inquiry'],
            query: (id: string) => ({
                url: `/inquiry/${id}`,
                method: 'GET',
            }),
        }),

        //**** Status
        updateInquiryStatus: builder.mutation({
            invalidatesTags: ['inquiry'],
            query: (id) => ({
                url: `/inquiry/completed/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetInquiryQuery,
    useGetInquiryByIdQuery,
    useGetInquiryUnAuthQuery,
    useUpdateInquiryStatusMutation,
} = InquiryApi
