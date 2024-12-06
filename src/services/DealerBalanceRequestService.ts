import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerBalanceRequestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getDealerBalanceRequest: builder.query({
            providesTags: ['dealer-credit'],
            query: (body: PaginationType) => ({
                url: '/dealer-receipt',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Dealer Amount *****/
        getDealerBalanceAmountRequest: builder.query({
            providesTags: ['dealer-credit'],
            query: (dealerId: string) => ({
                url: `/dealer-receipt/get-amount/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** Approval *****/
        approvalDealerBalanceRequest: builder.mutation({
            invalidatesTags: ['dealer-credit'],
            query: ({ id, body }) => ({
                url: `/dealer-receipt/approve/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Synced Entries *****/
        syncedDealerCreditAmountRequest: builder.mutation({
            invalidatesTags: ['dealer-credit'],
            query: (id) => ({
                url: `/dealer-receipt/sync/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetDealerBalanceRequestQuery,
    // useGetDealerCreditAmountRequestQuery,
    useGetDealerBalanceAmountRequestQuery,
    useApprovalDealerBalanceRequestMutation,
    useSyncedDealerCreditAmountRequestMutation,
} = dealerBalanceRequestApi
