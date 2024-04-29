// |-- Internal Dependencies --|
import {
    // AddReturnToVendor,
    UpdateSaleOrder,
    // UpdateSOApprovalLevel,
} from 'src/models/ReturnToVendor.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

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
        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationReturnToVendorByGroup: builder.query({
            providesTags: ['rtv-master'],
            query: (body: PaginationType) => ({
                url: '/rtv-master/groupby',
                method: 'POST',
                body,
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

        //***** Update Aproval *****/
        updateReturnToVendorApproval: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: ({ body, id }: UpdateReturnToVendorApproval) => ({
                url: `/rtv-master/approval-level/${id}`,
                method: 'PUT',
                body,
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

        //***** Delete *****/
        deleteReturnToVendorOrder: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (id) => ({
                url: `/rtv-master/${id}`,
                method: 'DELETE',
            }),
        }),

        //*****  DISPATCHED BARCODE *****/
        // getAllBarcodeOfRTVOutWardDispatch: builder.mutation({
        //     invalidatesTags: ['Barcode'],
        //     query: ({ id, groupId }: { id: string; groupId: string }) => ({
        //         url: `/bar-code/barcode/${id}/productgroupid/${groupId}`,
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        //***** Dispached Barcode *****/
        dispatchReturnToVendorBarcode: builder.mutation({
            invalidatesTags: ['rtv-master'],
            query: (body: any) => ({
                url: `bar-code/rtv/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Barcode Rtv *****/
        getVendorRTVByBarcodeStatus: builder.query({
            providesTags: ['Barcode'],
            query: ({
                body,
                companyId,
                status,
            }: {
                body: PaginationType
                companyId: string
                status: string
            }) => ({
                url: `bar-code/inventory/companyid/${companyId}/status/${status}`,
                method: 'Post',
                body,
            }),
        }),
    }),
})

export const {
    useGetPaginationReturnToVendorByGroupQuery, // get group by data
    useAddReturnToVendorMutation, // add return to vendor
    useUpdateReturnToVendorOrderMutation, // update or edit for return to vendor
    useUpdateReturnToVendorApprovalMutation, // first and second level approveed
    useGetReturnToOrderByIdQuery, // find by rtv no.
    useDeleteReturnToVendorOrderMutation, // delete
    useDispatchReturnToVendorBarcodeMutation, // dispatch
    useGetVendorRTVByBarcodeStatusQuery,
} = ReturnToVendorServiceApi
