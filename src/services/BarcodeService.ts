/// ==============================================
// Filename:barcodeService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddBarcode, UpdateBarcode } from 'src/models'
import { InwardInventoryBarcode } from 'src/models/Barcode.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const barcodeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getBarcode: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code',
                method: 'POST',
                body,
            }),
        }),
        //********* GET PRODUCT BARCODE GROUP *********//

        getProductGroupBarcode: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code/barcode-group',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllBarcode: builder.query({
            providesTags: ['Barcode'],
            query: () => ({
                url: `/bar-code`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllByGroup: builder.query({
            providesTags: ['Barcode'],
            query: (id) => ({
                url: `/bar-code/all-by-group/${id}`,
                method: 'GET',
                // body,
            }),
        }),
        //***** ADD *****/
        addBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (body: AddBarcode) => ({
                url: '/bar-code/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ body, id }: UpdateBarcode) => ({
                url: `/bar-code/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getBarcodeById: builder.query({
            providesTags: ['Barcode'],
            query: (id) => ({
                url: `/bar-code/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportBarcodeData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        // **** Delete
        deleteBarcode: builder.mutation({
            invalidatesTags: ['Barcode', 'bar-codeGroup'],
            query: (id) => ({
                url: `/bar-code/${id}`,

                method: 'DELETE',
            }),
        }),


        //***** GET by Barcode*****/
        getByBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (barcodeId: string) => ({
                url: `/bar-code/getby-barcode/${barcodeId}`,
                method: 'GET',
                // body,
            }),
        }),


        //***** Update *****/
        inwardInventoryBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (body: InwardInventoryBarcode) => ({
                url: `/bar-code/inwardinventory`,
                method: 'PUT',
                body,

            }),
        }),

        getInventoriesByBarcode: builder.query({
            providesTags: ['Barcode'],
            query: ({ body, companyId, warehouseId, status }: { body: PaginationType, companyId: string, warehouseId: string, status: string }) => ({
                url: `bar-code/inventory/companyid/${companyId}/warehouseid/${warehouseId}/status/${status}`,
                method: 'Post',
                body


            }),
        }),
    }),
})
export const {
    useGetBarcodeQuery,
    useAddBarcodeMutation,
    useUpdateBarcodeMutation,
    useGetBarcodeByIdQuery,
    useExportBarcodeDataMutation,
    useDeleteBarcodeMutation,
    useGetAllBarcodeQuery,
    useGetProductGroupBarcodeQuery,
    useGetAllByGroupQuery,
    useGetByBarcodeMutation,
    useInwardInventoryBarcodeMutation,
    useGetInventoriesByBarcodeQuery
} = barcodeApi
