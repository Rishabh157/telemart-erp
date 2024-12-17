// |-- Internal Dependencies --|
import apiSlice from './ApiSlice'

export const reportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** Get Agent Order Status *****/
        getAgentOrderStatusReports: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: `/report/agent-order-status`,
                method: 'POST',
                body,
            }),
        }),

        //***** Get Agent Inquiries Status *****/
        getAgentInquiriesStatusReports: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: `/report/agent-inquiry-status`,
                method: 'POST',
                body,
            }),
        }),

        //***** Get Agent Order Status *****/
        getAgentWiseComplaint: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: '/report/agent-wise-complaint',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Agent Order Status *****/
        getAgentWiseEnquiry: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: '/report/all-inquiry',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Agent Order Status *****/
        getAgentWiseProductReports: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: `/report/agent-wise-product`,
                method: 'POST',
                body,
            }),
        }),

        //***** Get Scheme Wise Orders *****/
        getSchemeWiseOrdersReports: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: '/report/scheme-wise-orders',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Scheme Wise Orders *****/
        getAgentWiseOutCallReports: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: '/report/agent-wise-outcall',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {
    useGetAgentOrderStatusReportsQuery,
    useGetAgentInquiriesStatusReportsQuery,
    useGetAgentWiseComplaintQuery,
    useGetAgentWiseEnquiryQuery,
    useGetAgentWiseProductReportsQuery,
    useGetSchemeWiseOrdersReportsQuery,
    useGetAgentWiseOutCallReportsQuery,
} = reportsApi
