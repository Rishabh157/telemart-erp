// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const WebsiteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA ONLINE LEADS *****/
        getPaginationWebLeads: builder.query({
            providesTags: ['website'],
            query: (body: PaginationType) => ({
                url: '/webleads',
                method: 'POST',
                body,
            }),
        }),

        // Download
        getAllWebLeads: builder.mutation({
            // providesTags: ['website'],
            query: (body: any) => ({
                url: '/webleads',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetPaginationWebLeadsQuery, useGetAllWebLeadsMutation } =
    WebsiteApi
