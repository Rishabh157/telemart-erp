// |-- Internal Dependencies --|
import { AddNewUser, UpdateNewUser, ChangeCompany } from 'src/models'
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

        //***** Update User Company *****/
        updateCompanyByAdmin: builder.mutation({
            invalidatesTags: ['newUser'],
            query: ({ id, body }: ChangeCompany) => ({
                url: `/user/update-user-company/${id}`,
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
                url: `/user/distribution/${role}`,
                method: 'GET',
            }),
        }),

        // ****  Floor manger by call center
        getFloorMangerUserByCallCenterId: builder.query({
            providesTags: ['user', 'newUser'],
            query: ({
                // companyId,
                callCenterId,
                departmentId,
            }: {
                // companyId: string
                callCenterId: string
                departmentId: string
            }) => ({
                url: `/user/get-floor-managers/call-center/${callCenterId}/department/${departmentId}`,
                method: 'GET',
            }),
        }),

        // ****  Floor manger by call center
        getTeamLeadUserByCallCenterId: builder.query({
            providesTags: ['user', 'newUser'],
            query: ({
                // companyId,
                callCenterId,
                departmentId,
            }: {
                // companyId: string
                callCenterId: string
                departmentId: string
            }) => ({
                url: `/user/get-team-leads/call-center/${callCenterId}/department/${departmentId}`,
                method: 'GET',
            }),
        }),

        // ****  get senior api
        getSeniorUsers: builder.query({
            providesTags: ['user', 'newUser'],
            query: ({
                userrole,
                body,
            }: {
                userrole: string
                body: {
                    department: string
                    callCenterId: string
                }
            }) => ({
                url: `/user/get-all-users/user-role/${userrole}`,
                method: 'POST',
                body,
            }),
        }),

        // ****  get senior api
        changeUserPassword: builder.mutation({
            invalidatesTags: ['user', 'newUser'],
            query: (body) => ({
                url: '/user/change-password/by-admin',
                method: 'PUT',
                body,
            }),
        }),

        // ****  get senior by zonal manger id
        getSeniorExicutivesByZmId: builder.query({
            providesTags: ['user', 'newUser'],
            query: (zmId) => ({
                url: `/user/get-sr-exicutive/${zmId}`,
                method: 'GET',
            }),
        }),

        // ****  get junior by senior manger id
        getJuniorExicutivesByZeId: builder.query({
            providesTags: ['user', 'newUser'],
            query: (zeId) => ({
                url: `/user/get-jr-exicutive/${zeId}`,
                method: 'GET',
            }),
        }),

        // **** Get ALL Agent by call center
        getAllAgentsByCallCenter: builder.query({
            providesTags: ['user', 'newUser'],
            query: (callcenterid: string) => ({
                url: `/user/get-agents/call-center/${callcenterid}`,
                method: 'GET',
            }),
        }),

        // **** Get ALL Agent of Customer Care Department
        getAllAgentsOfCustomerCareDepartment: builder.query({
            providesTags: ['user', 'newUser'],
            query: () => ({
                url: `/user/get-customer-care-agent`,
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
    useGetTeamLeadUserByCallCenterIdQuery,
    useGetSeniorUsersQuery,
    useChangeUserPasswordMutation,
    useGetSeniorExicutivesByZmIdQuery,
    useGetJuniorExicutivesByZeIdQuery,
    useGetAllAgentsByCallCenterQuery,
    useGetAllAgentsOfCustomerCareDepartmentQuery,
} = userApi
