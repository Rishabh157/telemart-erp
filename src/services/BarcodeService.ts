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
        //*** GET
        getBarcode: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code',
                method: 'POST',
                body,
            }),
        }),

        //*** GET PRODUCT BARCODE GROUP
        getProductGroupBarcode: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code/barcode-group',
                method: 'POST',
                body,
            }),
        }),

        //*** GET
        getAllBarcode: builder.query({
            providesTags: ['Barcode'],
            query: () => ({
                url: `/bar-code`,
                method: 'GET',
            }),
        }),

        //*** GET DEALER OUTWARD DISPATCHED BARCODE
        getAllBarcodeOfDealerOutWardDispatch: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({
                id,
                groupId,
                status,
            }: {
                id: string
                groupId: string
                status: string
            }) => ({
                url: `/bar-code/productgroupid/${groupId}/barcode/${id}/status/${status}`,
                method: 'GET',
            }),
        }),

        //*** barcode status change
        updateBarcodeFreezeStatus: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({
                barcodeNumber,
                status,
            }: {
                barcodeNumber: string
                status: boolean
            }) => ({
                url: `/bar-code/freeze-barcode/${barcodeNumber}/status/${status}`,
                method: 'PUT',
            }),
        }),

        //*** Get Customer Return Barcode
        getCustomerReturnBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ id, status }: { id: string; status: string }) => ({
                url: `/bar-code/customer-return/barcode/${id}/status/${status}`,
                method: 'GET',
            }),
        }),

        //*** GET
        getAllByGroup: builder.query({
            providesTags: ['Barcode'],
            query: (id) => ({
                url: `/bar-code/all-by-group/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //*** ADD
        addBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (body: AddBarcode) => ({
                url: '/bar-code/add',
                method: 'POST',
                body,
            }),
        }),

        //*** Update
        updateBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ body, id }: UpdateBarcode) => ({
                url: `/bar-code/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // *** GET BY ID
        getBarcodeById: builder.query({
            providesTags: ['Barcode'],
            query: (id) => ({
                url: `/bar-code/${id}`,
                method: 'GET',
            }),
        }),

        //*** Delete
        deleteBarcode: builder.mutation({
            invalidatesTags: ['Barcode', 'bar-codeGroup'],
            query: (id) => ({
                url: `/bar-code/${id}`,
                method: 'DELETE',
            }),
        }),

        //*** get barcode by id
        getByBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (barcodeId: string) => ({
                url: `/bar-code/getby-barcode/${barcodeId}`,
                method: 'GET',
            }),
        }),

        //*** Update
        inwardInventoryBarcode: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (body: InwardInventoryBarcode) => ({
                url: `/bar-code/inwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        //*** get inventory by barcode
        getInventoriesByBarcode: builder.query({
            providesTags: ['Barcode', 'courier-return'],
            query: ({
                body,
                warehouseId,
                status,
            }: {
                body: PaginationType
                warehouseId: string
                status: string
            }) => ({
                url: `bar-code/inventory/warehouseid/${warehouseId}/status/${status}`,
                method: 'Post',
                body,
            }),
        }),

        //*** Diapatch Dealer Outward Barcode
        dispatchDealerBarcode: builder.mutation({
            invalidatesTags: ['Barcode', 'bar-codeGroup', 'SalesOrder'],
            query: (body: DispatchBarcodeBody) => ({
                url: `/bar-code/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        //*** Get dealers inventory
        getDealersInventory: builder.query({
            providesTags: ['Barcode'],
            query: (body: PaginationType) => ({
                url: '/bar-code/get-dealer-inventory',
                method: 'POST',
                body,
            }),
        }),

        //*** Get Barocode by outerBox barcode number
        getBarcodeByOuterBoxNumber: builder.query({
            providesTags: ['Barcode'],
            query: (barcodeNumber) => ({
                url: `/bar-code/outer-box-barcode/${barcodeNumber}`,
                method: 'GET',
            }),
        }),

        //*** Customer Inward Barcode
        addCustomerInwardBarcodes: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ id, warehouseId, body }) => ({
                url: `/bar-code/customer-return-product/${id}/warehouse/${warehouseId}`,
                method: 'PUT',
                body,
            }),
        }),

        //*** warehouse barcode insert in Carton box
        getBarcodeOfWarehouse: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: (barcodeId: string) => ({
                url: `/bar-code/get-warehouse-barcode/${barcodeId}`,
                method: 'GET',
            }),
        }),

        //*** GET Warehouse barcode
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
            }),
        }),

        //*** customer return order barcodes
        getBarcodeByOrderNumber: builder.query({
            providesTags: ['Barcode-get'],
            query: ({ orderNumber }: { orderNumber: number }) => ({
                url: `/bar-code/customer-return-order-barcodes/${orderNumber}`,
                method: 'GET',
            }),
        }),
        // /bar-code/get-damage-expire-barcode/:barcode

        getBarcodeDamageAndExpiry: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ barcodeNumber, wareHouseId }: { barcodeNumber: string, wareHouseId: string }) => ({
                url: `/bar-code/get-damage-expire-barcode/${barcodeNumber}/warehouse/${wareHouseId}`,
                method: 'GET',
            }),
        }),

        updateExipyBarcodes: builder.mutation({
            invalidatesTags: ['Barcode'],
            query: ({ wareHouseId, barcodes }) => ({
                url: `/bar-code/barcode-close/${wareHouseId}`,
                method: 'PUT',
                body: { barcodes },
            }),
        }),

        //***** BULK ADD *****/
        uploadBulkBarcodeFile: builder.mutation({
            invalidatesTags: ['courier-return'],
            query: ({ warehouseId, body }) => ({
                url: `/bar-code/bulk-upload/barcode-to-close/${warehouseId}`,
                method: 'POST',
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
    useDeleteBarcodeMutation,
    useGetAllBarcodeOfDealerOutWardDispatchMutation,
    useUpdateBarcodeFreezeStatusMutation,
    useGetCustomerReturnBarcodeMutation,
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
    useGetWarehouseBarcodeMutation,
    useGetBarcodeByOrderNumberQuery,
    useGetBarcodeDamageAndExpiryMutation,
    useUpdateExipyBarcodesMutation,
    useUploadBulkBarcodeFileMutation
} = barcodeApi
