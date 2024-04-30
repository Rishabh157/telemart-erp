// |-- Internal Dependencies --|
import apiSlice from './ApiSlice'
import { PaginationType } from 'src/models/common/paginationType'

export const InventoryFlowService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getBarcodeFlow: builder.query({
            providesTags: ['barcode-flow'],
            query: (body: PaginationType) => ({
                url: '/barcode-flow',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const { useGetBarcodeFlowQuery } = InventoryFlowService
