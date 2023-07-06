/// ==============================================
// Filename:CompanyService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddCompany, UpdateCompany } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const companyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCompanies: builder.query({
            providesTags: ['company'],
            query: (body: PaginationType) => ({
                url: '/company',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllCompanies: builder.query({
            providesTags: ['company'],
            query: () => ({
                url: '/company',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: (body: AddCompany) => ({
                url: '/company/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: ({ body, id }: UpdateCompany) => ({
                url: `/company/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getCompanyById: builder.query({
            providesTags: ['company'],
            query: (id) => ({
                url: `/company/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportCompanyData: builder.mutation({
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
        deleteCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: (id) => ({
                url: `/company/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetCompaniesQuery,
    useAddCompanyMutation,
    useUpdateCompanyMutation,
    useGetCompanyByIdQuery,
    useExportCompanyDataMutation,
    useDeleteCompanyMutation,
    useGetAllCompaniesQuery,
} = companyApi
