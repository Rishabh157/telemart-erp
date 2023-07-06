/// ==============================================
// Filename:ProductGroupService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    AddProductGroup,
    UpdateProductGroup,
} from 'src/models/ProductGroup.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const productGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getProductGroup: builder.query({
            providesTags: ['productGroup'],
            query: (body: PaginationType) => ({
                url: '/product-group',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL PRODUCTS GROUP *****/
        getAllProductGroupUnAuth: builder.query({
            // providesTags: ['scheme'],
            query: (companyId) => ({
                url: `/product-group/company/${companyId}/unauth/all-product-group`,
                method: 'GET',
            }),
        }),

        //***** GET *****/
        getAllProductGroup: builder.query({
            providesTags: ['productGroup'],
            query: (companyId) => ({
                url: `/product-group/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addProductGroup: builder.mutation({
            invalidatesTags: ['productGroup'],
            query: (body: AddProductGroup) => ({
                url: '/product-group/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateProductGroup: builder.mutation({
            invalidatesTags: ['productGroup'],
            query: ({ body, id }: UpdateProductGroup) => ({
                url: `/product-group/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getProductGroupById: builder.query({
            providesTags: ['productGroup'],
            query: (id) => ({
                url: `/product-group/${id}`,
                method: 'GET',
            }),
        }),

        //**** Export
        exportProductGroupData: builder.mutation({
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
        deleteProductGroup: builder.mutation({
            invalidatesTags: ['productGroup'],
            query: (id) => ({
                url: `/product-group/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetProductGroupQuery,
    useGetAllProductGroupUnAuthQuery,
    useGetAllProductGroupQuery,
    useAddProductGroupMutation,
    useUpdateProductGroupMutation,
    useGetProductGroupByIdQuery,
    useDeleteProductGroupMutation,
    useExportProductGroupDataMutation,
} = productGroupApi
