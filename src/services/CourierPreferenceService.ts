// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const CourierPreferenceService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getCourierPreference: builder.query({
      providesTags: ['courierprefrence'],
      query: (body: PaginationType) => ({
        url: '/courier-preference',
        method: 'POST',
        body,
      }),
    }),




    //***** Update *****/
    updateCourierPrefernce: builder.mutation({
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
  useGetCourierPreferenceQuery,
  useUpdateCourierPrefernceMutation,
} = CourierPreferenceService
