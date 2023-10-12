/// ==============================================
// Filename:ReturnToVendorService.tsx
// Type: Service Component
// Last Updated: OCOTOBER 11, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    // AddReturnToVendor,
    UpdateSaleOrder,
    // UpdateSOApprovalLevel,
} from 'src/models/ReturnToVendor.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
// import { UpdateSaleOrderApproval } from 'src/models/ReturnToVendor.model'

// type AddReturnToVendor = {
//     soNumber: string
//     dealerId: string
//     dealerWareHouseId: string
//     companyWareHouseId: string
//     companyId: string
//     productSalesOrder:
// }

// APPROVEL UPDATE TYPE
type UpdateReturnToVendorApproval = {
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

export const ReturnToVendorServiceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        // getPaginationSaleOrder: builder.query({
        //     providesTags: ['rtv-master'],
        //     query: (body: PaginationType) => ({
        //         url: 'rtv-master/',
        //         method: 'POST',
        //         body,
        //     }),
        // }),

        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationReturnToVendorByGroup: builder.query({
            providesTags: ['rtv-master'],
            query: (body: PaginationType) => ({
                url: '/rtv-master/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SALESORDER BY DEALER-ID DATA *****/
        getSalesOrderByDealerId: builder.query({
            providesTags: ['rtv-master'],
            query: (dealerId) => ({
                url: `/sales-order/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addReturnToVendor: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (body: any) => ({
                url: 'rtv-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateReturnToVendorOrder: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateSaleOrder) => ({
                url: `/rtv-master/update-rtv`,
                method: 'PUT',
                body: { rtvData: [...body] },
            }),
        }),

        //***** Update *****/
        updateReturnToVendorApproval: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateReturnToVendorApproval) => ({
                url: `/rtv-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteReturnToVendorOrder: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (id) => ({
                url: `/rtv-master/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getReturnToOrderById: builder.query({
            providesTags: ['rtv-master'],
            query: (id) => ({
                url: `/rtv-master/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    // useGetPaginationSaleOrderQuery,
    useGetPaginationReturnToVendorByGroupQuery, // get group by data
    useGetSalesOrderByDealerIdQuery,
    useAddReturnToVendorMutation, // add return to vendor
    useUpdateReturnToVendorOrderMutation, // update or edit for return to vendor
    useUpdateReturnToVendorApprovalMutation, // first and second level approveed
    useGetReturnToOrderByIdQuery, // find by rtv no.
    useDeleteReturnToVendorOrderMutation, // delete
} = ReturnToVendorServiceApi
