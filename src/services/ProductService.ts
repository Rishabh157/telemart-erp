import { AddProducts, UpdateProducts } from 'src/models/index'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getProduct: builder.query({
            providesTags: ['product'],
            query: (body: PaginationType) => ({
                url: '/product',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllProduct: builder.query({
            providesTags: ['product'],
            query: (companyId) => ({
                url: `/product/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addProduct: builder.mutation({
            invalidatesTags: ['product'],
            query: (body: AddProducts) => ({
                url: '/product/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateProduct: builder.mutation({
            invalidatesTags: ['product'],
            query: ({ body, id }: UpdateProducts) => ({
                url: `/product/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getProductById: builder.query({
            providesTags: ['product'],
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
        }),

        //**** Export
        exportProductData: builder.mutation({
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
        deleteProduct: builder.mutation({
            invalidatesTags: ['product'],
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetProductQuery,
    useGetAllProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useGetProductByIdQuery,
    useDeleteProductMutation,
    useExportProductDataMutation,
} = productApi
