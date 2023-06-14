// import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const PrePaidOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //***** GET *****/
    getPrePaidOrder: builder.query({
      query: () => ({
        url: '/prepaid-order',
        method: 'GET',
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
