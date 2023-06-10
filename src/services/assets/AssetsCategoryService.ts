import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddAssetsCategory, UpdateAssetsCategory } from 'src/models/index'

export const assetsCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAssetsCategory: builder.query({
            providesTags: ['AssetsCategory'],
            query: (body: PaginationType) => ({
                url: '/asset-category',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAssetsCategory: builder.query({
            providesTags: ['AssetsCategory'],
            query: (companyId) => ({
                url: `/asset-category/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAssetsCategory: builder.mutation({
            invalidatesTags: ['AssetsCategory'],
            query: (body: AddAssetsCategory) => ({
                url: '/asset-category/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateAssetsCategory: builder.mutation({
            invalidatesTags: ['AssetsCategory'],
            query: ({ body, id }: UpdateAssetsCategory) => ({
                url: `/asset-category/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAssetsCategoryById: builder.query({
            providesTags: ['AssetsCategory'],
            query: (id) => ({
                url: `/asset-category/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportAssetsCategoryData: builder.mutation({
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
        deleteAssetsCategory: builder.mutation({
            invalidatesTags: ['AssetsCategory'],
            query: (id) => ({
                url: `/asset-category/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAssetsCategoryQuery,
    useAddAssetsCategoryMutation,
    useUpdateAssetsCategoryMutation,
    useGetAssetsCategoryByIdQuery,
    useExportAssetsCategoryDataMutation,
    useDeleteAssetsCategoryMutation,
    useGetAllAssetsCategoryQuery,
} = assetsCategoryApi
