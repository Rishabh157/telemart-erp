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

        //***** Get Agent Order Status *****/
        getAgentWiseComplaint: builder.query({
            // providesTags: ['agent-report'],
            query: (body) => ({
                url: '/report/agent-wise-complaint',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const {
    useGetAgentOrderStatusReportsQuery,
    useGetAgentWiseComplaintQuery,
} = reportsApi
