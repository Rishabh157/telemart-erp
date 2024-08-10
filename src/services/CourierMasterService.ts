// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const CourierMasterService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCourierMaster: builder.query({
            providesTags: ['courierprefrence'],
            query: (body: PaginationType) => ({
                url: '/courier-preference',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL *****/
        getAllCourierMaster: builder.query({
            providesTags: ['courierprefrence'],
            query: () => ({
                url: '/courier-preference',
                method: 'GET',
            }),
        }),

        //***** GET BY ID *****/
        getCourierMasterById: builder.query({
            providesTags: ['courierprefrence'],
            query: (id) => ({
                url: `/courier-preference/${id}`,
                method: 'GET',
            }),
        }),

        //***** Add *****/
        AddCourierMaster: builder.mutation({
            invalidatesTags: ['courierprefrence'],
            query: ({ body }: any) => ({
                url: `/courier-preference/add`,
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateCourierMaster: builder.mutation({
            invalidatesTags: ['courierprefrence'],
            query: ({ id, body }: any) => ({
                url: `/courier-preference/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Get AWB Couriers *****/
        getAwbCouriers: builder.query({
            providesTags: ['courierprefrence'],
            query: () => ({
                url: `/courier-preference/awb-courier`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetCourierMasterQuery,
    useGetAllCourierMasterQuery,
    useGetCourierMasterByIdQuery,
    useAddCourierMasterMutation,
    useUpdateCourierMasterMutation,
    useGetAwbCouriersQuery,
} = CourierMasterService
