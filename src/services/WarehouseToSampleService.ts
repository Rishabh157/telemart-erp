/// ==============================================
// Filename:WarehouseToSampleService.ts
// Type: Service Component
// Last Updated: OCOTOBER 12, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

interface ProductSalesOrder {
    productGroupId: string
    rate: number
    quantity: number
}

export type AddWarehouseToSamplePayload = {
    wtsNumber: string
    fromWarehouseId: string
    toName: string
    companyId: string
    remark?: string
    productSalesOrder: ProductSalesOrder[]
}

// APPROVEL UPDATE TYPE
type UpdateWarehouseToSampleApprovalPayload = {
    body: {
        type: 'FIRST' | 'SECOND'
        firstApprovedById?: string
        firstApproved?: string | boolean
        firstApprovedActionBy?: string
        firstApprovedAt?: string
        secondApprovedById?: string
        secondApproved?: string | boolean
        secondApprovedActionBy?: boolean | null
        secondApprovedAt?: string | null
    }
    id: string
}

type UpdateWarehouseToSamplePayload = {
    body: {
        soNumber: string
        dealerId: string
        dealerWareHouseId: string
        companyWareHouseId: string
        companyId: string
        productSalesOrder: {
            productGroupId: string
            rate: number
            quantity: number
        }[]
        firstApproved?: boolean | null
        firstApprovedActionBy?: string
        firstApprovedById?: string
        firstApprovedAt?: string
        secondApproved?: boolean | null
        secondApprovedById?: string
        secondApprovedAt?: string
        secondApprovedActionBy?: string
    }[]
    id: string
}

export const WarehouseToSampleService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationWarehouseToSampleByGroup: builder.query({
            providesTags: ['wts-master'],
            query: (body: PaginationType) => ({
                url: '/wts-master/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SALESORDER BY DEALER-ID DATA *****/
        getSalesOrderByDealerId: builder.query({
            providesTags: ['wts-master'],
            query: (dealerId) => ({
                url: `/sales-order/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addWarehouseToSample: builder.mutation({
            invalidatesTags: ['wts-master'],
            query: (body: AddWarehouseToSamplePayload) => ({
                url: '/wts-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWarehouseToSampleOrder: builder.mutation({
            invalidatesTags: ['wts-master'],
            query: ({ body, id }: UpdateWarehouseToSamplePayload) => ({
                url: `/wts-master/update-wts`,
                method: 'PUT',
                body: { wtsData: [...body] },
            }),
        }),

        //***** Approval Update *****/
        updateWarehouseToSampleApproval: builder.mutation({
            invalidatesTags: ['wts-master'],
            query: ({ body, id }: UpdateWarehouseToSampleApprovalPayload) => ({
                url: `/wts-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getWarehouseToSampleById: builder.query({
            providesTags: ['wts-master'],
            query: (id: string) => ({
                url: `/wts-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** Delete *****/
        deleteWarehouseToSampleOrder: builder.mutation({
            invalidatesTags: ['wts-master'],
            query: (id: string) => ({
                url: `/wts-master/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** Dispached Barcode *****/
        dispatchWarehouseToSampleBarcode: builder.mutation({
            invalidatesTags: ['wts-master'],
            query: (body: any) => ({
                url: `bar-code/wts/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useGetPaginationWarehouseToSampleByGroupQuery, // get group by data
    useGetSalesOrderByDealerIdQuery,
    useAddWarehouseToSampleMutation, // add warehouse to sample
    useUpdateWarehouseToSampleOrderMutation, // update or edit for return to vendor
    useUpdateWarehouseToSampleApprovalMutation, // first and second level approveed
    useGetWarehouseToSampleByIdQuery, // find by warehouse to sample no.
    useDeleteWarehouseToSampleOrderMutation, // delete
    useDispatchWarehouseToSampleBarcodeMutation, // barcode dispatced
} = WarehouseToSampleService
