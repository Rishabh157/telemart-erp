/// ==============================================
// Filename:VendorWarehouseService.ts
// Type: Service Component
// Last Updated: JUNE 28, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddVendorWarehouse, UpdateVendorWarehouse } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const vendorWarehouseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getVendorWarehouse: builder.query({
            providesTags: ['vendorWarehouse'],
            query: (body: PaginationType) => ({
                url: '/vendor-warehouse',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addVendorWarehouse: builder.mutation({
            invalidatesTags: ['vendorWarehouse'],
            query: (body: AddVendorWarehouse) => ({
                url: '/vendor-warehouse/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateVendorWarehouse: builder.mutation({
            invalidatesTags: ['vendorWarehouse'],
            query: ({ body, id }: UpdateVendorWarehouse) => ({
                url: `/vendor-warehouse/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getVendorWarehouseById: builder.query({
            providesTags: ['vendorWarehouse'],
            query: (id: string) => ({
                url: `/vendor-warehouse/${id}`,

                method: 'GET',
            }),
        }),

        // **** GET BY  Company ID & Vendor Id
        getVendorWarehouseByVendorId: builder.query({
            providesTags: ['vendorWarehouse'],
            query: ({ companyId, vendorId }) => ({
                url: `/vendor-warehouse/company/${companyId}/vendor/${vendorId}`,
                method: 'GET',
            }),
        }),

        //****Delete vendor Warehouse ****/
        deleteVendorWarehouse: builder.mutation({
            invalidatesTags: ['vendorWarehouse'],
            query: (id: string) => ({
                url: `/vendor-warehouse/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetVendorWarehouseQuery,
    useAddVendorWarehouseMutation,
    useUpdateVendorWarehouseMutation,
    useGetVendorWarehouseByIdQuery,
    useGetVendorWarehouseByVendorIdQuery,
    useDeleteVendorWarehouseMutation,
} = vendorWarehouseApi
