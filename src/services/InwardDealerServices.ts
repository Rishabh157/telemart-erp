// |-- Internal Dependencies --|
import apiSlice from './ApiSlice'
import { PaginationType } from 'src/models/common/paginationType'

type UpdateTransferApprovalRequestPayload = {
    body: {
        type: 'SECOND'
        firstApprovedAt?: string
        secondApprovedAt?: string
        secondApprovedById?: string
        firstApprovedById?: string
        firstApprovedActionBy?: string
        secondApprovedActionBy?: string
        firstApproved?: boolean | null
        secondApproved?: boolean | null
    }
    id: string
}

export const InwardDealerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** Get dealer inward request pagination data *****/
        getPaginationInwardDealerOrder: builder.query({
            providesTags: ['inwardDealer'],
            query: (body: PaginationType) => ({
                url: 'dtw-master/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** dealer inward updat second level approval *****/
        updateInwardDealerApproval: builder.mutation({
            invalidatesTags: ['inwardDealer'],
            query: ({ body, id }: UpdateTransferApprovalRequestPayload) => ({
                url: `/dtw-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Inward Warehouse *****/
        inwardDealerBarcode: builder.mutation({
            invalidatesTags: ['inwardDealer'],
            query: (body) => ({
                url: `/bar-code/warehouse/inwardinventory`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useGetPaginationInwardDealerOrderQuery,
    useUpdateInwardDealerApprovalMutation,
    useInwardDealerBarcodeMutation,
} = InwardDealerApi
