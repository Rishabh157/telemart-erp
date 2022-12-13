import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddVendor, UpdateVendor } from 'src/models';
import { PaginationType } from 'src/models/common/paginationType';
import { BASE_URL } from "src/utils/constants/index";

const authToken = localStorage.getItem('authToken') || ""
export const vendorApi = createApi({
    reducerPath: "vendorApi",
    tagTypes: ['vendor'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/vendor` }),
    endpoints: (builder) => ({

        //***** GET *****/
        getVendors: builder.query({
            providesTags: ['vendor'],
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
        addVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: (body: AddVendor) => ({
                url: "/register",
                method: "POST",
                headers: { 'x-access-token': authToken },
                body,
            })
        }),

        //***** Update *****/
        updateVendor: builder.mutation({
            invalidatesTags: ['vendor'],
            query: ({ body, id }: UpdateVendor) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "PUT",
                body,
            }),
        }),

        // **** GET BY ID
        getVendorById: builder.query({
            providesTags: ['vendor'],
            query: (id) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "GET",
            }),
        }),

    })
})
export const { useGetVendorsQuery, useAddVendorMutation, useUpdateVendorMutation, useGetVendorByIdQuery, } = vendorApi
