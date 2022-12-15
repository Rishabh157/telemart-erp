import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddCompany, UpdateCompany } from 'src/models';
import { PaginationType } from 'src/models/common/paginationType';
import { BASE_URL } from "src/utils/constants/index";

const authToken = localStorage.getItem('authToken') || ""
export const companyApi = createApi({
    reducerPath: "companyApi",
    tagTypes: ['company'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/company` }),
    endpoints: (builder) => ({

        //***** GET *****/
        getCompanies: builder.query({
            providesTags: ['company'],
            query: (body: PaginationType) => ({
                url: "",
                headers: {
                    'x-access-token': authToken
                },
                params: {
                    _page: body.page,
                    _limit: body.limit
                },
                method: "GET",
                // body,
            })
        }),

        //***** ADD *****/
        addCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: (body: AddCompany) => ({
                url: "",
                method: "POST",
                headers: { 'x-access-token': authToken },
                body,
            })
        }),

        //***** Update *****/
        updateCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: ({ body, id }: UpdateCompany) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "PUT",
                body,
            }),
        }),

        // **** GET BY ID
        getCompanyById: builder.query({
            providesTags: ['company'],
            query: (id) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "GET",
            }),
        }),

        //**** Export
        exportCompanyData: builder.mutation({
            query: (body: PaginationType) => ({
                url: "",
                headers: {
                    'x-access-token': authToken
                },
                params: {
                    _page: body.page,
                    _limit: body.limit
                },
                method: "GET",
                // body,
            })
        }),

        // **** Delete
        deleteCompany: builder.mutation({
            invalidatesTags: ['company'],
            query: (id) => ({
                url: `/${id}`,
                headers: {
                    'x-access-token': authToken
                },

                method: "DELETE",
            })
        })


    })
})
export const { useGetCompaniesQuery, useAddCompanyMutation, useUpdateCompanyMutation, useGetCompanyByIdQuery, useExportCompanyDataMutation, useDeleteCompanyMutation } = companyApi
