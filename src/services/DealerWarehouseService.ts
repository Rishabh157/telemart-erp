// |-- Internal Dependencies --|
import { AddDealerWarehouse, UpdateDealerWarehouse } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerWarehouseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerWarehouse: builder.query({
            providesTags: ['dealerWarehouse'],
            query: (body: PaginationType) => ({
                url: '/warehouse',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: (body: AddDealerWarehouse) => ({
                url: '/warehouse/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: ({ body, id }: UpdateDealerWarehouse) => ({
                url: `/warehouse/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDealerWarehouseById: builder.query({
            providesTags: ['dealerWarehouse'],
            query: (id: string) => ({
                url: `/warehouse/${id}`,
                method: 'GET',
            }),
        }),

        //****Delete dealer Warehouse ****/
        deleteDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: (id: string) => ({
                url: `/warehouse/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET ALL BY Dealer ID
        getAllWareHouseByDealerId: builder.query({
            providesTags: ['WareHouse'],
            query: ({ companyId, dealerId }) => ({
                url: `/warehouse/company/${companyId}/dealer/${dealerId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetDealerWarehouseQuery,
    useAddDealerWarehouseMutation,
    useUpdateDealerWarehouseMutation,
    useGetDealerWarehouseByIdQuery,
    useDeleteDealerWarehouseMutation,
    useGetAllWareHouseByDealerIdQuery,
} = dealerWarehouseApi
