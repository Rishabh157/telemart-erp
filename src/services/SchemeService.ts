// |-- Internal Dependencies --|
import { AddSchemes, UpdateScheme } from './../models/scheme.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const schemeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getScheme: builder.query({
            providesTags: ['scheme'],
            query: () => ({
                url: `/scheme`,
                method: 'GET',
            }),
        }),

        //***** GET ALL SCHEMES BY PRODUCT GROUP ID *****/
        getAllSchemeListByPgi: builder.query({
            // providesTags: ['scheme'],
            query: ({ companyId, productGroupId }) => ({
                url: `scheme/product-group/${productGroupId}/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET ALL SCHEMES BY PRODUCT GROUP ID *****/
        getAllSchemeListByPgiAuth: builder.query({
            // providesTags: ['scheme'],
            query: (productGroupId) => ({
                url: `scheme/product-group/${productGroupId}`,
                method: 'GET',
            }),
        }),

        //***** GET PAGINATION DATA *****/
        getAllScheme: builder.query({
            providesTags: ['scheme'],
            query: (body: PaginationType) => ({
                url: '/scheme',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        AddScheme: builder.mutation({
            invalidatesTags: ['scheme'],
            query: (body: AddSchemes) => ({
                url: '/scheme/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateScheme: builder.mutation({
            invalidatesTags: ['scheme'],
            query: ({ body, id }: UpdateScheme) => ({
                url: `/scheme/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getSchemeById: builder.query({
            providesTags: ['scheme'],
            query: (id) => ({
                url: `/scheme/${id}`,
                method: 'GET',
            }),
        }),

        // **** GET BY ID
        getSchemeByIdAuth: builder.query({
            providesTags: ['scheme'],
            query: (id) => ({
                url: `/scheme/${id}`,
                method: 'GET',
            }),
        }),

        // **** GET BY ID UnAuth
        getSchemeByIdUnAuth: builder.query({
            providesTags: ['scheme'],
            query: (id) => ({
                url: `/scheme/unauth/${id}`,
                method: 'GET',
            }),
        }),

        //delete
        deleteScheme: builder.mutation({
            invalidatesTags: ['scheme'],
            query: (id) => ({
                url: `/scheme/${id}`,
                method: 'DELETE',
            }),
        }),

        //inbound
        inboundScheme: builder.query({
            providesTags: ['scheme'],
            query: (body: PaginationType) => ({
                url: '/scheme/inbound',
                method: 'POST',
                body,
            }),
        }),

        //***** Get Schemes By Dealer Id *****/
        getAllSchemeByDealerId: builder.query({
            providesTags: ['dealer'],
            query: (dealerId: string) => ({
                url: `scheme/dealer-wise-scheme/${dealerId}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetSchemeQuery,
    useGetAllSchemeListByPgiQuery,
    useGetAllSchemeListByPgiAuthQuery,
    useGetSchemeByIdAuthQuery,
    useAddSchemeMutation,
    useUpdateSchemeMutation,
    useGetSchemeByIdQuery,
    useGetSchemeByIdUnAuthQuery,
    useGetAllSchemeQuery,
    useDeleteSchemeMutation,
    useInboundSchemeQuery,
    useGetAllSchemeByDealerIdQuery,
} = schemeApi
