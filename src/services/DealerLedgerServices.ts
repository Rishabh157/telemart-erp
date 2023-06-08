import { LedgerAdd, UpdateLedger } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerLedgerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerLedger: builder.query({
            providesTags: ['ledger'],
            query: (body: PaginationType) => ({
                url: '/ledger',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL DATA *****/
        getAllDealerLedger: builder.query({
            providesTags: ['ledger'],
            query: (companyId) => ({
                url: `/ledger/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addDealerLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (body: LedgerAdd) => ({
                url: '/ledger/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealerLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: ({ body, id }: UpdateLedger) => ({
                url: `/ledger/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** delete *****/
        deleteDealerLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (id: string) => ({
                url: `/ledger/${id}`,
                method: 'DELETE',
            }),
        }),
        //***** deactive *****/
        deactiveDealerLedger: builder.mutation({
            invalidatesTags: ['ledger'],
            query: (id: string) => ({
                url: `/ledger/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetDealerLedgerQuery,
    useGetAllDealerLedgerQuery,
    useAddDealerLedgerMutation,
    useUpdateDealerLedgerMutation,
    useDeleteDealerLedgerMutation,
    useDeactiveDealerLedgerMutation,
} = dealerLedgerApi
