/// ==============================================
// Filename:barcodeService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddBarcode, UpdateBarcode } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

type DispatchBarcodeBody = {
    barcodedata: {
        _id: string
        productGroupId: string
        barcodeGroupNumber: string
        cartonBoxId: string
        lotNumber: string
        isUsed: string
        wareHouseId: string
        dealerId: string
        companyId: string
        outerBoxbarCodeNumber: string
        barcodeNumber:string
        // status: string
    }[]
}









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

        //***** GET DEALER OUTWARD DISPATCHED BARCODE *****/
        getAllBarcodeOfDealerOutWardDispatch: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ id, groupId }: { id: string; groupId: string }) => ({
                url: `/bar-code/barcode/${id}/productgroupid/${groupId}`,
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

        dispatchDealerBarcode: builder.mutation({
            invalidatesTags: ['Barcode', 'bar-codeGroup'],
            query: (body: DispatchBarcodeBody) => ({
                url: `/bar-code/outwardinventory`,
                method: 'PUT',
                body,
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
    useGetAllBarcodeOfDealerOutWardDispatchMutation,
    useGetAllBarcodeQuery,
    useGetProductGroupBarcodeQuery,
    useGetAllByGroupQuery,
    useDispatchDealerBarcodeMutation,
} = barcodeApi
