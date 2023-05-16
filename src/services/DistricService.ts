import { AddDistrict, UpdateDistrict } from 'src/models/District.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const districtApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getDistict: builder.query({
            providesTags: ['District'],
            query: (body: PaginationType) => ({
                url: '/district',
                method: 'POST',
                body,
            }),
        }),
        //***** GET ALL BY STATE*****/
        getAllDistrict: builder.query({
            providesTags: ['District'],
            query: () => ({
                url: '/district',
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllDistrictByState: builder.query({
            providesTags: ['District'],
            query: (id) => ({
                url: `/district/get-state-district/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        AddDistrict: builder.mutation({
            invalidatesTags: ['District'],
            query: (body: AddDistrict) => ({
                url: '/district/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDistrict: builder.mutation({
            invalidatesTags: ['District'],
            query: ({ body, id }: UpdateDistrict) => ({
                url: `/district/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDistictById: builder.query({
            providesTags: ['District'],
            query: (id) => ({
                url: `/district/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportDistrictData: builder.mutation({
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
        deleteDistrict: builder.mutation({
            invalidatesTags: ['District', 'areaGroup'],
            query: (id) => ({
                url: `/district/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetDistictQuery,
    useAddDistrictMutation,
    useUpdateDistrictMutation,
    useGetDistictByIdQuery,
    useExportDistrictDataMutation,
    useDeleteDistrictMutation,
    useGetAllDistrictQuery,
    useGetAllDistrictByStateQuery,
} = districtApi
