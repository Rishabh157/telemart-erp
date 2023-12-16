/// ==============================================
// Filename:PinCodeService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { UpdatePincode, AddPincode } from './../models/Pincode.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const pincodeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getPincode: builder.query({
            providesTags: ['pincode'],
            query: (body: PaginationType) => ({
                url: '/pincode',
                method: 'POST',
                body,
            }),
        }),

        //***** GET pincide By coutryId *****/
        getAllPincodeByCountry: builder.query({
            providesTags: ['pincode'],
            query: (countryId) => ({
                url: `/pincode/get-country-pincode/${countryId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET pincide By DistrictID *****/
        getAllPincodeByDistrict: builder.query({
            providesTags: ['pincode'],
            query: (districtId) => ({
                url: `/pincode/get-district-pincode/${districtId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET pincide By tehsilId *****/
        getAllPincodeByTehsil: builder.query({
            providesTags: ['pincode'],
            query: (tehsilId) => ({
                url: `/pincode/get-tehsil-pincode/${tehsilId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllPincode: builder.query({
            providesTags: ['pincode'],
            query: () => ({
                url: '/pincode',
                method: 'GET',
                // body,
            }),
        }),

        getAllPincodeByTehsilUnauth: builder.query({
            providesTags: ['pincode'],
            query: (id: string) => ({
                url: `/pincode/get-tehsil-pincode/unauth/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        AddPincode: builder.mutation({
            invalidatesTags: ['pincode'],
            query: (body: AddPincode) => ({
                url: '/pincode/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updatePincode: builder.mutation({
            invalidatesTags: ['pincode'],
            query: ({ body, id }: UpdatePincode) => ({
                url: `/pincode/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getPincodeById: builder.query({
            providesTags: ['pincode'],
            query: (id) => ({
                url: `/pincode/${id}`,

                method: 'GET',
            }),
        }),

        // **** GET BY Pincode
        getAllInfoByPincode: builder.mutation({
            invalidatesTags: ['pincode'],
            query: (pincode: string) => ({
                url: `/state/get-all-by-pincode/unauth/${pincode}`,
                method: 'GET',
            }),
        }),

        //**** Export
        exportPincodeData: builder.mutation({
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
        deletePincode: builder.mutation({
            invalidatesTags: ['pincode', 'areaGroup'],
            query: (id) => ({
                url: `/pincode/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetPincodeQuery,
    useAddPincodeMutation,
    useUpdatePincodeMutation,
    useGetPincodeByIdQuery,
    useExportPincodeDataMutation,
    useDeletePincodeMutation,
    useGetAllPincodeQuery,
    useGetAllPincodeByTehsilQuery,
    useGetAllPincodeByCountryQuery,
    useGetAllPincodeByTehsilUnauthQuery,
    useGetAllPincodeByDistrictQuery,
    useGetAllInfoByPincodeMutation,
} = pincodeApi
