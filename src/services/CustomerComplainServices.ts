/// ==============================================
// Filename:CustomerComplainServices.tsx
// Type: Service Component
// Last Updated: FEB 05, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|import apiSlice from './ApiSlice'
import apiSlice from './ApiSlice'

export const customerComplainApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        //***** GET *****/
        getCustomerComplainDetailsBySearch: builder.mutation({
            // providesTags: ['Asr'],
            query: (body: any) => ({
                url: '/order-inquiry/get-customer-info',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const { useGetCustomerComplainDetailsBySearchMutation } =
    customerComplainApi
