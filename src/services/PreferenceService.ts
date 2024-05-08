// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const PreferenceService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getPrefernceCourier: builder.query({
      providesTags: ['courierprefrence'],
      query: (body: PaginationType) => ({
        url: '/courier-preference',
        method: 'POST',
        body,
      }),
    }),




    //***** Update *****/
    updatePrefernceCourier: builder.mutation({
      invalidatesTags: ['courierprefrence'],
      query: ({ body, id }: any) => ({
        url: `/courier-preference/${id}`,

        method: 'PUT',
        body,
      }),
    }),
  }),
})
export const {
  useGetPrefernceCourierQuery,
  useUpdatePrefernceCourierMutation,
} = PreferenceService
