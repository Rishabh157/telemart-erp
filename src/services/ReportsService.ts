// |-- Internal Dependencies --|
// import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const reportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        //***** Get Agent Order Status *****/
        getAgentOrderStatusReports: builder.query({
            providesTags: ['DealerCategory'],
            query: (body) => ({
                url: `/report/agent-order-status`,
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        // addDealerCategory: builder.mutation({
        //     invalidatesTags: ['DealerCategory'],
        //     query: (body: AddDealersCategory) => ({
        //         url: '/dealers-category/add',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
    }),
})
export const {
    useGetAgentOrderStatusReportsQuery,
    // useAddDealerCategoryMutation
} = reportsApi
