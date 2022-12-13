import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddDealer, UpdateDealer } from 'src/models';
import { PaginationType } from 'src/models/common/paginationType';
import { BASE_URL } from "src/utils/constants/index";

const authToken = localStorage.getItem('authToken') || ""
export const dealerApi = createApi({
    reducerPath: "dealerApi",
    tagTypes: ['dealer'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/dealer` }),
    endpoints: (builder) => ({

        //***** GET *****/
        getDealers: builder.query({
            providesTags: ['dealer'],
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
        addDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (body: AddDealer) => ({
                url: "/register",
                method: "POST",
                headers: { 'x-access-token': authToken },
                body,
            })
        }),

        //***** Update *****/
        updateDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: ({ body, id }: UpdateDealer) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "PUT",
                body,
            }),
        }),

        // **** GET BY ID
        getDealerById: builder.query({
            providesTags: ['dealer'],
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
export const { useGetDealersQuery, useAddDealerMutation, useUpdateDealerMutation, useGetDealerByIdQuery, } = dealerApi
