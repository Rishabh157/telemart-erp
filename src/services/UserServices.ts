import {
    AddUser,
    AddNewUser,
    UpdateUser,
    UpdateNewUser,
    ChangeCompany,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getUsers: builder.query({
            providesTags: ['user'],
            query: (body: PaginationType) => ({
                url: '',
                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                body,
            }),
        }),

        //***** LOGIN *****/
        changePassword: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: {
                currentPassword: string
                newPassword: string
                userId: string
            }) => ({
                url: '/admin/change-password',
                method: 'PUT',
                body,
            }),
        }),

        //***** LOGIN *****/
        login: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { userName: string; password: string }) => ({
                url: '/admin/login',
                method: 'POST',
                body,
            }),
        }),

        //***** LOG OUT *****/
        refreshToken: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { refreshToken: string }) => ({
                url: '/admin/refresh',
                method: 'POST',
                body,
            }),
        }),

        //***** LOG OUT *****/
        logout: builder.mutation({
            invalidatesTags: ['user'],
            query: () => ({
                url: '/admin/logout',
                method: 'POST',
            }),
        }),

        //***** LOG OUT FROM ALL DEVICES *****/
        logoutFromAll: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { logoutAll: boolean }) => ({
                url: '/admin/logout',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addUser: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: AddUser) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateUser: builder.mutation({
            invalidatesTags: ['user'],
            query: ({ body, id }: UpdateUser) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getUserById: builder.query({
            providesTags: ['user'],
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET NEW USERS *****/
        getNewUsers: builder.query({
            providesTags: ['newUser'],
            query: (body: PaginationType) => ({
                url: '/user',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD New User*****/
        addNewUser: builder.mutation({
            invalidatesTags: ['newUser'],
            query: (body: AddNewUser) => ({
                url: '/user/signup',
                method: 'POST',
                body,
            }),
        }),

        //***** Update New User *****/
        updateNewUser: builder.mutation({
            invalidatesTags: ['newUser'],
            query: ({ body, id }: UpdateNewUser) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update New User *****/
        updateCompanyByAdmin: builder.mutation({
            invalidatesTags: ['newUser'],
            query: ({ body, id }: ChangeCompany) => ({
                url: `/admin/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** get Manager And Executive via Distribution department   *****/
        getDistributionsRole: builder.mutation({
            invalidatesTags: ['user'],
            query: ({ comapnyId, role }: { comapnyId: string, role: string }) => ({
                url: `user/company/${comapnyId}/distribution/${role}`,
                method: 'GET',

            }),
        }),
    }),
})
export const {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useGetUserByIdQuery,
    useLoginMutation,
    useLogoutMutation,
    useLogoutFromAllMutation,
    useChangePasswordMutation,
    useRefreshTokenMutation,
    useGetNewUsersQuery,
    useAddNewUserMutation,
    useUpdateNewUserMutation,
    useUpdateCompanyByAdminMutation,
    useGetDistributionsRoleMutation
} = userApi
