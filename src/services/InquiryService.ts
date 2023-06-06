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

        //***** GET *****/
        getAllInquiry: builder.query({
            providesTags: ['inquiry'],
            query: () => ({
                url: '/inquiry',
                method: 'GET',
                // body,
            }),
        }),

        // **** GET BY ID
        getInquiryById: builder.query({
            providesTags: ['inquiry'],
            query: (id) => ({
                url: `/inquiry/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportInquiryData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
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

        // **** Delete
        deleteInquiry: builder.mutation({
            invalidatesTags: ['inquiry'],
            query: (id) => ({
                url: `/inquiry/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetInquiryQuery,
    useUpdateInquiryStatusMutation,
    useGetInquiryByIdQuery,
    useExportInquiryDataMutation,
    useDeleteInquiryMutation,
    useGetAllInquiryQuery,
} = InquiryApi
