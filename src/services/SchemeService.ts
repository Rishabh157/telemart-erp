/// ==============================================
// Filename:SchemeService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddSchemes, UpdateScheme } from './../models/scheme.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const schemeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getScheme: builder.query({
            providesTags: ['scheme'],
            query: (companyId) => ({
                url: `/scheme/company/${companyId}`,
                method: 'GET',
            }),
        }),

        //***** GET ALL SCHEMES BY PRODUCT GROUP ID *****/
        getAllSchemeListByPgi: builder.query({
            // providesTags: ['scheme'],
            query: ({ companyId, productGroupId }) => ({
                url: `scheme/company/${companyId}/product-group/${productGroupId}`,
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
    }),
})
export const {
    useGetSchemeQuery,
    useGetAllSchemeListByPgiQuery,
    useAddSchemeMutation,
    useUpdateSchemeMutation,
    useGetSchemeByIdQuery,
    useGetAllSchemeQuery,
    useDeleteSchemeMutation,
    useInboundSchemeQuery,
} = schemeApi
