// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerOrderLedgerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerOrderLedger: builder.query({
            providesTags: ['orderLedger'],
            query: (body: PaginationType) => ({
                url: '/order-ledger',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useGetDealerOrderLedgerQuery } = dealerOrderLedgerApi
