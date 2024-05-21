// |-- Internal Dependencies --|
import apiSlice from './ApiSlice'

export const transportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getTransport: builder.query({
            providesTags: ['transport'],
            query: () => ({
                url: '/transport',
                method: 'GET',
            }),
        }),
    }),
})
export const { useGetTransportQuery } = transportApi
