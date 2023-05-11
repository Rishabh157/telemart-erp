import { AddUser, UpdateUser, ChangeCompany } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getUsers: builder.query({
      providesTags: ["user"],
      query: (body: PaginationType) => ({
        url: "",
        params: {
          _page: body.page,
          _limit: body.limit,
        },
        method: "GET",
        body,
      }),
    }),
    //***** LOGIN *****/
    changePassword: builder.mutation({
      invalidatesTags: ["user"],
      query: (body: {
        currentPassword: string;
        newPassword: string;
        userId: string;
      }) => ({
        url: "/admin/change-password",
        method: "PUT",
        body,
      }),
    }),
    //***** LOGIN *****/
    login: builder.mutation({
      invalidatesTags: ["user"],
      query: (body: { userName: string; password: string }) => ({
        url: "/admin/login",
        method: "POST",
        body,
      }),
    }),
    //***** LOG OUT *****/
    refreshToken: builder.mutation({
      invalidatesTags: ["user"],
      query: (body: { refreshToken: string }) => ({
        url: "/admin/refresh",
        method: "POST",
        body,
      }),
    }),

    //***** LOG OUT *****/
    logout: builder.mutation({
      invalidatesTags: ["user"],
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
    }),

    //***** LOG OUT FROM ALL DEVICES *****/
    logoutFromAll: builder.mutation({
      invalidatesTags: ["user"],
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
    }),

    //***** ADD *****/
    addUser: builder.mutation({
      invalidatesTags: ["user"],
      query: (body: AddUser) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    //***** Update *****/
    updateUser: builder.mutation({
      invalidatesTags: ["user"],
      query: ({ body, id }: UpdateUser) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getUserById: builder.query({
      providesTags: ["user"],
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    //***** Update Company By Admin *****/
    updateCompanyByAdmin: builder.mutation({
      invalidatesTags: ["user"],
      query: ({ body, id }: ChangeCompany) => (
        {
          url: `admin/${id}`,
          method: "PUT",
          body,
        }),
    }),
  }),
});
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
  useUpdateCompanyByAdminMutation,
} = userApi;
