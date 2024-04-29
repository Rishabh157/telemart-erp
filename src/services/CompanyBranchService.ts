// |-- Internal Dependencies --|
import { AddCompanyBranch, UpdateCompanyBranch } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const companyBranchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCompanyBranch: builder.query({
            providesTags: ['companyBranch'],
            query: (body: PaginationType) => ({
                url: '/company-branch/',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllCompaniesBranch: builder.query({
            providesTags: ['companyBranch'],
            query: () => ({
                url: '/company-branch',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addCompanyBranch: builder.mutation({
            invalidatesTags: ['companyBranch'],
            query: (body: AddCompanyBranch) => ({
                url: '/company-branch/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateCompanyBranch: builder.mutation({
            invalidatesTags: ['companyBranch'],
            query: ({ body, id }: UpdateCompanyBranch) => ({
                url: `/company-branch/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getCompanyBranchById: builder.query({
            providesTags: ['companyBranch'],
            query: (id) => ({
                url: `/company-branch/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteCompanyBranch: builder.mutation({
            invalidatesTags: ['companyBranch'],
            query: (id) => ({
                url: `/company-branch/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetCompanyBranchQuery,
    useGetAllCompaniesBranchQuery,
    useAddCompanyBranchMutation,
    useGetCompanyBranchByIdQuery,
    useUpdateCompanyBranchMutation,
    useDeleteCompanyBranchMutation,
} = companyBranchApi
