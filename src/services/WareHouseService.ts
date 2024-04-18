/// ==============================================
// Filename:WareHoouseService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddWarehouse, UpdateWarehouse } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const wareHouseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/

        //dealer warehouse
        getDealerWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (companyId) => ({
                url: `/warehouse/company/${companyId}/dealer-warehouse`,

                method: 'GET',
                // body,
            }),
        }),
        // company warehouse
        getWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (companyId) => ({
                url: `/warehouse/`,

                method: 'GET',
                // body,
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
    useGetPaginationWareHousesQuery,
    useDeleteWareHouseMutation,
    useGetDealerWareHousesQuery,
} = wareHouseApi
