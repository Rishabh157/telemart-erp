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
        AddCourierPrefernce: builder.mutation({
            invalidatesTags: ['courierprefrence'],
            query: ({ body }: any) => ({
                url: `/courier-preference/add`,
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateCourierPrefernce: builder.mutation({
            invalidatesTags: ['courierprefrence'],
            query: ({ body }: any) => ({
                url: `/courier-preference`,
                method: 'PUT',
                body: { data: body },
            }),
        }),
    }),
})
export const {
    useAddCourierPrefernceMutation,
    useGetCourierPreferenceQuery,
    useUpdateCourierPrefernceMutation,
} = CourierPreferenceService
