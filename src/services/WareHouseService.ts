// |-- Internal Dependencies --|
import { AddWarehouse, UpdateWarehouse } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const wareHouseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getDealerWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (companyId) => ({
                url: `/warehouse/company/${companyId}/dealer-warehouse`,
                method: 'GET',
            }),
        }),

        // Company warehouse
        getWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: () => ({
                url: `/warehouse`,
                method: 'GET',
            }),
        }),

        // Get Company warehouse by companyId
        getWareHousesByCompanyId: builder.query({
            providesTags: ['WareHouse'],
            query: (companyId: string) => ({
                url: `/warehouse/get-warehouse-by-company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET PAGINATION DATA company *****/
        getPaginationWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (body: PaginationType) => ({
                url: '/warehouse/all-warehouse',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Customer Warehouse Return *****/
        getCustomerWarehouseReturn: builder.query({
            providesTags: ['WareHouse'],
            query: (body: PaginationType) => ({
                url: '/customer-wh-return',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: (body: AddWarehouse) => ({
                url: '/warehouse/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: ({ body, id }: UpdateWarehouse) => ({
                url: `/warehouse/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: (id) => ({
                url: `/warehouse/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getWareHouseById: builder.query({
            providesTags: ['WareHouse'],
            query: (id) => ({
                url: `/warehouse/${id}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetWareHousesQuery,
    useAddWareHouseMutation,
    useUpdateWareHouseMutation,
    useGetWareHouseByIdQuery,
    useGetWareHousesByCompanyIdQuery,
    useGetPaginationWareHousesQuery,
    useGetCustomerWarehouseReturnQuery,
    useDeleteWareHouseMutation,
    useGetDealerWareHousesQuery,
} = wareHouseApi
