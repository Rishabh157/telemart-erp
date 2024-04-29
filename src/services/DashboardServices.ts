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
        getOrderSummay: builder.query({
            providesTags: ['dashboard'],
            query: (body: PaginationType) => ({
                url: '/dashboard/zm-dashboard/order-summary',
                method: 'POST',
                body,
            }),
        }),
        getZMDealerStatus: builder.query({
            providesTags: ['dashboard'],
            query: (body: PaginationType) => ({
                url: '/dashboard/zm-dashboard/dealer-summary',
                method: 'POST',
                body,
            }),
        }),
        getZMDealerStockStatus: builder.query({
            providesTags: ['dashboard'],
            query: (body: PaginationType) => ({
                url: '/dashboard/zm-dashboard/dealer-stock',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetAgentDataQuery, useGetOrderSummayQuery, useGetZMDealerStatusQuery ,useGetZMDealerStockStatusQuery} = customerComplainApi
