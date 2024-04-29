// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const productReplacementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getProductReplacementOrder: builder.query({
            providesTags: ['product-replacement'],
            query: (body: PaginationType) => ({
                url: '/product-replacement',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllMoneybackOrder: builder.query({
            providesTags: ['product-replacement'],
            query: () => ({
                url: '/product-replacement',
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getProductReplacementById: builder.query({
            providesTags: ['moneyback'],
            query: (id: string) => ({
                url: `/product-replacement/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllProductReplacementLogsById: builder.query({
            // providesTags: ['product-replacement'],
            query: (moneybackId: string) => ({
                url: `product-replacement-logs/get-logs/${moneybackId}`,
                method: 'GET',
            }),
        }),

        // **** Manger First approval
        productReplacementMangerFirstApproval: builder.mutation({
            invalidatesTags: ['product-replacement', 'complaint'],
            query: (body) => ({
                url: '/product-replacement/update-manager',
                method: 'PUT',
                body,
            }),
        }),

        // **** Customer info
        addProductReplacementCustomerInfo: builder.mutation({
            invalidatesTags: ['product-replacement'],
            query: (body) => ({
                url: '/product-replacement/cc-update-details',
                method: 'PUT',
                body,
            }),
        }),

        // **** Account approval
        addProductReplacementAccountApproval: builder.mutation({
            invalidatesTags: ['product-replacement', 'complaint'],
            query: (body) => ({
                url: '/product-replacement/account-approval',
                method: 'PUT',
                body,
            }),
        }),

        //
    }),
})

export const {
    useGetProductReplacementOrderQuery,
    useGetAllMoneybackOrderQuery,
    useGetProductReplacementByIdQuery,
    useGetAllProductReplacementLogsByIdQuery,
    useProductReplacementMangerFirstApprovalMutation,
    useAddProductReplacementCustomerInfoMutation,
    useAddProductReplacementAccountApprovalMutation,
} = productReplacementApi
