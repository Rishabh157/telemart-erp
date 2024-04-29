// |-- Internal Dependencies --|
import {
    AddProductSubCategory,
    UpdateProductSubCategory,
} from '../models/index'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const productSubCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getProductSubCategory: builder.query({
            providesTags: ['ProductSubCategory'],
            query: (body: PaginationType) => ({
                url: '/product-sub-category',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllProductSubCategory: builder.query({
            providesTags: ['ProductSubCategory'],
            query: (companyId) => ({
                url: `/product-sub-category/comppany/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),
        //***** GET BY PARENT CATEGORY*****/
        getSubCategoryByParent: builder.query({
            providesTags: ['ProductSubCategory'],
            query: (id) => ({
                url: `/product-sub-category/get-by-parent-category/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //selection by productCategoryId
        getProductCategoryIdSubCategory: builder.query({
            providesTags: ['ProductSubCategory'],
            query: (id) => ({
                url: `product-sub-category/get-by-parent-category/${id}`,

                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addProductSubCategory: builder.mutation({
            invalidatesTags: ['ProductSubCategory'],
            query: (body: AddProductSubCategory) => ({
                url: '/product-sub-category/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateProductSubCategory: builder.mutation({
            invalidatesTags: ['ProductSubCategory'],
            query: ({ body, id }: UpdateProductSubCategory) => ({
                url: `/product-sub-category/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getProductSubCategoryById: builder.query({
            providesTags: ['ProductSubCategory'],
            query: (id) => ({
                url: `/product-sub-category/${id}`,
                method: 'GET',
            }),
        }),

        //**** Export
        exportProductSubCategoryData: builder.mutation({
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
        deleteProductSubCategory: builder.mutation({
            invalidatesTags: ['ProductSubCategory'],
            query: (id) => ({
                url: `/product-sub-category/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetProductSubCategoryQuery,
    useGetAllProductSubCategoryQuery,
    useAddProductSubCategoryMutation,
    useUpdateProductSubCategoryMutation,
    useGetProductSubCategoryByIdQuery,
    useDeleteProductSubCategoryMutation,
    useExportProductSubCategoryDataMutation,
    useGetSubCategoryByParentQuery,
} = productSubCategoryApi
