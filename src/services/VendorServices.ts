// |-- Internal Dependencies --|
import { AddVendor, UpdateVendor } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const vendorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getVendors: builder.query({
            providesTags: ['vendor'],
            query: () => ({
                url: `/vendor`,
                method: 'GET',
            }),
        }),

        //***** GET PAGINATION DATA *****/
        getPaginationVendors: builder.query({
            providesTags: ['vendor'],
            query: (body: PaginationType) => ({
                url: '/vendor',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: (body: AddVendor) => ({
                url: '/vendor/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: ({ body, id }: UpdateVendor) => ({
                url: `/vendor/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: (id) => ({
                url: `/vendor/${id}`,

                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getVendorById: builder.query({
            providesTags: ['vendor'],
            query: (id) => ({
                url: `/vendor/${id}`,

                method: 'GET',
            }),
        }),

        //***** deactive *****/
        deactivateVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: (id: string) => ({
                url: `/vendor/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetVendorsQuery,
    useAddVendorMutation,
    useUpdateVendorMutation,
    useGetVendorByIdQuery,
    useGetPaginationVendorsQuery,
    useDeleteVendorMutation,
    useDeactivateVendorMutation,
} = vendorApi
