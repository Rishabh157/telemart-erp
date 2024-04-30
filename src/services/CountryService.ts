// |-- Internal Dependencies --|
import { AddCountry, UpdateCountry } from './../models/Country.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const countryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCountry: builder.query({
            providesTags: ['Country'],
            query: (body: PaginationType) => ({
                url: '/country',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllCountry: builder.query({
            providesTags: ['Country'],
            query: () => ({
                url: `/country`,
                method: 'GET',
                // body,
            }),
        }),
        getAllCountryUnauth: builder.query({
            providesTags: ['Country'],
            query: () => ({
                url: '/country/inbound',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        AddCountry: builder.mutation({
            invalidatesTags: ['Country'],
            query: (body: AddCountry) => ({
                url: '/country/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateCountry: builder.mutation({
            invalidatesTags: ['country'],
            query: ({ body, id }: UpdateCountry) => ({
                url: `/country/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getCountryById: builder.query({
            providesTags: ['Country'],
            query: (id) => ({
                url: `/country/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportCountryData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        // **** Delete
        deleteCountry: builder.mutation({
            invalidatesTags: ['Country'],
            query: (id) => ({
                url: `/country/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetCountryQuery,
    useAddCountryMutation,
    useUpdateCountryMutation,
    useGetCountryByIdQuery,
    useExportCountryDataMutation,
    useDeleteCountryMutation,
    useGetAllCountryQuery,
    useGetAllCountryUnauthQuery,
} = countryApi
