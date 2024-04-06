// |-- Internal Dependencies --|

import apiSlice from './ApiSlice'

type PaginationType = {
    startDate: string
    endDate: string
    dateFilterKey: string
}

export const customerComplainApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        //***** GET *****/
        getAgentData: builder.query({
            providesTags: ['dashboard'],
            query: (body: PaginationType) => ({
                url: '/dashboard/get-agent-dashboard-data',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetAgentDataQuery } = customerComplainApi
