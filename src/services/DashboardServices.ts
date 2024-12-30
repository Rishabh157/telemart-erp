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

        // warehouse Dashbord inventory
        getWHInventoryByWarehouseId: builder.query({
            providesTags: ['dashboard'],
            query: ({ warehousId }: { warehousId: string }) => ({
                url: `/dashboard/warehouse-inventory/${warehousId}`,
                method: 'GET',
                // body,
            }),
        }),

        getWHInwardInventoryByWarehouseId: builder.query({
            providesTags: ['dashboard'],
            query: ({
                warehousId,
                dateFilter,
            }: {
                warehousId: string
                dateFilter: PaginationType
            }) => ({
                url: `/dashboard/warehouse-inward-stock/${warehousId}`,
                method: 'POST',
                body: { dateFilter: dateFilter },
            }),
        }),
        getWHOutwardInventoryByWarehouseId: builder.query({
            providesTags: ['dashboard'],
            query: ({
                warehousId,
                dateFilter,
            }: {
                warehousId: string
                dateFilter: PaginationType
            }) => ({
                url: `/dashboard/warehouse-outward-stock/${warehousId}`,
                method: 'POST',
                body: { dateFilter: dateFilter },
            }),
        }),

        getSalesDepartmentData: builder.query({
            providesTags: ['dashboard'],
            query: (body: any) => ({
                url: 'dashboard/sales-dashboard',
                method: 'POST',
                body,
            }),
        }),

        // Get Basic Admin Information
        getBasicAdminDashboardData: builder.query({
            providesTags: ['dashboard'],
            query: () => ({
                url: 'dashboard/admin-basicinfo',
                method: 'GET',
            }),
        }),

        getCallCenterPerformace: builder.query({
            providesTags: ['dashboard'],
            query: () => ({
                url: '/report/callcenter-performance',
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useGetAgentDataQuery,
    useGetOrderSummayQuery,
    useGetZMDealerStatusQuery,
    useGetZMDealerStockStatusQuery,
    useGetWHInventoryByWarehouseIdQuery,
    useGetWHInwardInventoryByWarehouseIdQuery,
    useGetWHOutwardInventoryByWarehouseIdQuery,
    useGetSalesDepartmentDataQuery,
    useGetBasicAdminDashboardDataQuery,
    useGetCallCenterPerformaceQuery
} = customerComplainApi
