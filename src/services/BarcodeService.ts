// |-- Internal Dependencies --|
import { AddBarcode, UpdateBarcode } from 'src/models'
import { InwardInventoryBarcode } from 'src/models/Barcode.model'
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
        barcodeNumber: string
        // status: string
    }[]
    soId: string[]
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
            query: ({
                id,
                groupId,
                status,
                companyId,
            }: {
                id: string
                groupId: string
                status: string
                companyId: string
            }) => ({
                url: `/bar-code/productgroupid/${groupId}/barcode/${id}/status/${status}`,
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
            query: ({
                body,
                companyId,
                warehouseId,
                status,
            }: {
                body: PaginationType
                companyId: string
                warehouseId: string
                status: string
            }) => ({
                url: `bar-code/inventory/companyid/${companyId}/warehouseid/${warehouseId}/status/${status}`,
                method: 'Post',
                body,
            }),
        }),

        // Diapatch Dealer Outward Barcode
        dispatchDealerBarcode: builder.mutation({
            invalidatesTags: ['Barcode', 'bar-codeGroup', 'SalesOrder'],
            query: (body: DispatchBarcodeBody) => ({
                url: `/bar-code/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        // Get dealers inventory
        getDealersInventory: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code/get-dealer-inventory',
                method: 'POST',
                body,
            }),
        }),

        // Get Barocode by outerBox barcode number
        getBarcodeByOuterBoxNumber: builder.query({
            providesTags: ['Barcode'],
            query: (barcodeNumber) => ({
                url: `/bar-code/outer-box-barcode/${barcodeNumber}`,
                method: 'GET',
            }),
        }),

        // Customer Inward Barcode
        addCustomerInwardBarcodes: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ id, condition, warehouseId, body }) => ({
                url: `/bar-code/courier-return-product/${id}/condition/${condition}/warehouse/${warehouseId}`,
                method: 'PUT',
                body,
            }),
        }),
        //warehouse barcode insert in Carton box
        getBarcodeOfWarehouse: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (barcodeId: string) => ({
                url: `/bar-code/get-warehouse-barcode/${barcodeId}`,
                method: 'GET',
                // body,
            }),
        }),


        //***** GET Warehouse barcode *****/
        getWarehouseBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({
                warehouseId,
                barcode,
                status,
            }: {
                warehouseId: string
                barcode: string
                status: string
            }) => ({
                url: `/bar-code/dispatch-warehouse-order-barcode/${warehouseId}/barcode/${barcode}/status/${status}`,
                method: 'GET',
                // body,
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
    useGetByBarcodeMutation,
    useInwardInventoryBarcodeMutation,
    useGetInventoriesByBarcodeQuery,
    useDispatchDealerBarcodeMutation,
    useGetDealersInventoryQuery,
    useGetBarcodeByOuterBoxNumberQuery,
    useAddCustomerInwardBarcodesMutation,
    useGetBarcodeOfWarehouseMutation,
    useGetWarehouseBarcodeMutation
} = barcodeApi
