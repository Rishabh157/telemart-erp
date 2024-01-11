/// ==============================================
// Filename:UserService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    // AddUser,
    AddNewUser,
    // UpdateUser,
    UpdateNewUser,
    ChangeCompany,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** LOGIN *****/
        changePassword: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: {
                currentPassword: string
                newPassword: string
                userId: string
            }) => ({
                url: '/user/change-password',
                method: 'PUT',
                body,
            }),
        }),

        //***** LOGIN *****/
        login: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { userName: string; password: string }) => ({
                url: '/user/login',
                method: 'POST',
                body,
            }),
        }),

        //***** LOG OUT *****/
        refreshToken: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { refreshToken: string }) => ({
                url: '/user/refresh-token',
                method: 'POST',
                body,
            }),
        }),

        //***** LOG OUT *****/
        logout: builder.mutation({
            invalidatesTags: ['user'],
            query: () => ({
                url: '/user/logout',
                method: 'POST',
            }),
        }),

        //***** LOG OUT FROM ALL DEVICES *****/
        logoutFromAll: builder.mutation({
            invalidatesTags: ['user'],
            query: (body: { logoutAll: boolean }) => ({
                url: '/user/logout',
                method: 'POST',
                body,
            }),
        }),

        // **** GET BY ID
        getUserById: builder.query({
            providesTags: ['user', 'newUser'],
            query: (id) => ({
                url: `/user/${id}`,
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
                url: `/user/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** Update  User deactive *****/
        deactiveUser: builder.mutation({
            invalidatesTags: ['newUser'],
            query: (id: string) => ({
                url: `/user/status-change/${id}`,
                method: 'PUT',
            }),
        }),
        //***** get Manager And Executive via Distribution department   *****/
        getDistributionsRole: builder.mutation({
            invalidatesTags: ['user'],
            query: ({
                comapnyId,
                role,
            }: {
                comapnyId: string
                role: string
            }) => ({
                url: `user/company/${comapnyId}/distribution/${role}`,
                method: 'GET',
            }),
        }),

        // ****  Floor manger by call center
        getFloorMangerUserByCallCenterId: builder.query({
            providesTags: ['user', 'newUser'],
            query: ({
                companyId,
                callCenterId,
            }: {
                companyId: string
                callCenterId: string
            }) => ({
                url: `/user/get-floor-managers/company/${companyId}/call-center/${callCenterId}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
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
    useGetDistributionsRoleMutation,
    useDeactiveUserMutation,
    useGetFloorMangerUserByCallCenterIdQuery,
} = userApi
