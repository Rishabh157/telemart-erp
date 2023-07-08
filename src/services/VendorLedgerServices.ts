/// ==============================================
// Filename:VendorLedgerService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { VendorLedgerAdd, UpdateVendorLedger } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const vendorLedgerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getVendorLedger: builder.query({
            providesTags: ['ledger'],
            query: (body: PaginationType) => ({
                url: '/vendor-ledger',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL DATA *****/
        getAllVendorLedger: builder.query({
            providesTags: ['ledger'],
            query: (companyId) => ({
                url: `/vendor-ledger/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addVendorLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (body: VendorLedgerAdd) => ({
                url: '/vendor-ledger/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateVendorLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: ({ body, id }: UpdateVendorLedger) => ({
                url: `/vendor-ledger/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** delete *****/
        deleteVendorLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (id: string) => ({
                url: `/vendor-ledger/${id}`,
                method: 'DELETE',
            }),
        }),
        //***** deactive *****/
        deactiveVendorLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (id: string) => ({
                url: `/vendor-ledger/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetVendorLedgerQuery,
    useGetAllVendorLedgerQuery,
    useAddVendorLedgerMutation,
    useUpdateVendorLedgerMutation,
    useDeleteVendorLedgerMutation,
    useDeactiveVendorLedgerMutation,
} = vendorLedgerApi
