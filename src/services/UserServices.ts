import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddUser, UpdateUser } from 'src/models';
import { PaginationType } from 'src/models/common/paginationType';
import { BASE_URL } from "src/utils/constants/index";

const authToken = localStorage.getItem('authToken') || ""
export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/user` }),
    endpoints: (builder) => ({

        //***** GET *****/
        getUsers: builder.query({
            providesTags: ['user'],
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
        addUser: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: AddUser) => ({
                url: "/register",
                method: "POST",
                headers: { 'x-access-token': authToken },
                body,
            })
        }),

        //***** Update *****/
        updateUser: builder.mutation({
            invalidatesTags: ['user'],
            query: ({ body, id }: UpdateUser) => ({
                url: `/${id}`,
                headers: {
                    "x-access-token": authToken,
                },
                method: "PUT",
                body,
            }),
        }),

        // **** GET BY ID
        getUserById: builder.query({
            providesTags: ['user'],
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
export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useGetUserByIdQuery, } = userApi
