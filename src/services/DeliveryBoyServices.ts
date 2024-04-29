// |-- Internal Dependencies --|
import apiSlice from './ApiSlice'

export const deliveryBoyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET ALL *****/
        getAllDeliveryBoy: builder.query({
            providesTags: ['batch-order'],
            query: () => ({
                url: '/delivery-boy/get-delivery-boy',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetAllDeliveryBoyQuery } = deliveryBoyApi
