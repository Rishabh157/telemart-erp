import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddAssetsLocation,
    UpdateAssetsLocation,
} from 'src/models/assets/AssetsLocation.modal'

export const assetsLocationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAssetsLocation: builder.query({
            providesTags: ['AssetsLocation'],
            query: (body: PaginationType) => ({
                url: '/asset-location',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAssetsLocation: builder.query({
            providesTags: ['AssetsLocation'],
            query: () => ({
                url: '/asset-location',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAssetsLocation: builder.mutation({
            invalidatesTags: ['AssetsLocation'],
            query: (body: AddAssetsLocation) => ({
                url: '/asset-location/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateAssetsLocation: builder.mutation({
            invalidatesTags: ['AssetsLocation'],
            query: ({ body, id }: UpdateAssetsLocation) => ({
                url: `/asset-location/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAssetsLocationById: builder.query({
            providesTags: ['AssetsLocation'],
            query: (id) => ({
                url: `/asset-location/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportAssetsLocationData: builder.mutation({
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
        deleteAssetsLocation: builder.mutation({
            invalidatesTags: ['AssetsLocation'],
            query: (id) => ({
                url: `/asset-location/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAssetsLocationQuery,
    useAddAssetsLocationMutation,
    useUpdateAssetsLocationMutation,
    useGetAssetsLocationByIdQuery,
    useExportAssetsLocationDataMutation,
    useDeleteAssetsLocationMutation,
    useGetAllAssetsLocationQuery,
} = assetsLocationApi
