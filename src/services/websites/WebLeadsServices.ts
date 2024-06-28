// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const WebsiteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWebLeads: builder.query({
            providesTags: ['website'],
            query: (body: PaginationType) => ({
                url: '/webleads',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetPaginationWebLeadsQuery } = WebsiteApi
