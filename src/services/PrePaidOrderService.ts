import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const PrePaidOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //***** GET *****/
    getPrePaidOrder: builder.query({
      query: (body: PaginationType) => ({
        url: '/prepaid-order',
        method: 'POST',
        body
      }),
    }),

    // **** GET BY ID
    getPrePaidOrderById: builder.query({
      query: (id) => ({
        url: `/prepaid-order/${id}`,
        method: 'GET',
      }),
    }),

  }),
})

export const {
  useGetPrePaidOrderQuery,
  useGetPrePaidOrderByIdQuery
} = PrePaidOrderApi
