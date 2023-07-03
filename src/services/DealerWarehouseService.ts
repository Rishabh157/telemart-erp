/// ==============================================
// Filename:DealerWarehouseService.ts
// Type: Service Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

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
                url: '/dealer-warehouse',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: (body: AddDealerWarehouse) => ({
                url: '/dealer-warehouse/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: ({ body, id }: UpdateDealerWarehouse) => ({
                url: `/dealer-warehouse/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDealerWarehouseById: builder.query({
            providesTags: ['dealerWarehouse'],
            query: (id: string) => ({
                url: `/dealer-warehouse/${id}`,

                method: 'GET',
            }),
        }),

        //****Delete dealer Warehouse ****/
        deleteDealerWarehouse: builder.mutation({
            invalidatesTags: ['dealerWarehouse'],
            query: (id: string) => ({
                url: `/dealer-warehouse/${id}`,
                method: 'DELETE',
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
} = dealerWarehouseApi
