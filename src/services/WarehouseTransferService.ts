// |-- Internal Dependencies --|
import {
    AddWarehouseTransfer,
    UpdateWarehouseTransfer,
    UpdateSOApprovalLevel,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { UpdateWarehouseTransferApproval } from 'src/models/WarehouseTransfer.model'

export const WarehouseTransferApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWarehouseTransfer: builder.query({
            providesTags: ['WarehouseTransfer'],
            query: (body: PaginationType) => ({
                url: '/wtw-master',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationWarehouseTransferByGroup: builder.query({
            providesTags: ['WarehouseTransfer'],
            query: (body: PaginationType) => ({
                url: '/wtw-master/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET WarehouseTransfer BY DEALER-ID DATA *****/
        getWarehouseTransferByDealerId: builder.query({
            providesTags: ['WarehouseTransfer'],
            query: (dealerId) => ({
                url: `/wtw-master/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addWarehouseTransfer: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: (body: AddWarehouseTransfer) => ({
                url: '/wtw-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWarehouseTransfer: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: ({ body, id }: UpdateWarehouseTransfer) => ({
                url: `/wtw-master/update-wtw`,
                method: 'PUT',
                body: { wtwData: [...body] },
            }),
        }),

        //***** Update Approval level *****/
        updateWarehouseTransferApproval: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: ({ body, id }: UpdateWarehouseTransferApproval) => ({
                url: `/wtw-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        updateSoLevel: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: ({ body, id }: UpdateSOApprovalLevel) => ({
                url: `/wtw-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteWarehouseTransfer: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: (id) => ({
                url: `/wtw-master/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getWarehouseTransferById: builder.query({
            providesTags: ['WarehouseTransfer'],
            query: (id) => ({
                url: `/wtw-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** Dispached Barcode *****/
        dispatchWarehouseToWarehouseBarcode: builder.mutation({
            invalidatesTags: ['WarehouseTransfer'],
            query: (body: any) => ({
                url: `bar-code/wtw/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Inward Warehouse *****/
        inwardWarehouseToWarehouseBarcode: builder.mutation({
            invalidatesTags: [
                'WarehouseTransfer',
                'WarehouseToComapny',
                'wts-master',
            ],
            query: (body) => ({
                url: `/bar-code/warehouse/inwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Get Invoice Data *****/
        getWarehouseTransferInvoiceDetails: builder.query({
            providesTags: ['WarehouseTransfer'],
            query: (wtwNumber: string) => ({
                url: `wtw-master/get-wtw-invoice/${wtwNumber}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetPaginationWarehouseTransferQuery,
    useGetPaginationWarehouseTransferByGroupQuery,
    useGetWarehouseTransferByDealerIdQuery,
    useAddWarehouseTransferMutation,
    useUpdateWarehouseTransferMutation,
    useUpdateWarehouseTransferApprovalMutation,
    useGetWarehouseTransferByIdQuery,
    useDeleteWarehouseTransferMutation,
    useUpdateSoLevelMutation,
    useDispatchWarehouseToWarehouseBarcodeMutation,
    useInwardWarehouseToWarehouseBarcodeMutation,
    useGetWarehouseTransferInvoiceDetailsQuery
} = WarehouseTransferApi
