import { AddDealer, UpdateDealer } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const dealerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getAllDealers: builder.query({
      providesTags: ["dealer"],
      query: () => ({
        url: "/dealer",
        method: "GET",
        // body,
      }),
    }),

    //***** GET PAGINATION DATA *****/
    getDealers: builder.query({
      providesTags: ["dealer"],
      query: (body: PaginationType) => ({
        url: "/dealer",
        // params: {
        //   _page: body.page,
        //   _limit: body.limit,
        // },
        method: "POST",
        body,
      }),
    }),

    //***** ADD *****/
    addDealer: builder.mutation({
      invalidatesTags: ["dealer"],
      query: (body: AddDealer) => ({
        url: "/dealer/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateDealer: builder.mutation({
      invalidatesTags: ["dealer"],
      query: ({ body, id }: UpdateDealer) => ({
        url: `dealer/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getDealerById: builder.query({
      providesTags: ["dealer"],
      query: (id) => ({
        url: `dealer/${id}`,

        method: "GET",
      }),
    }),

    //***** Delete *****/
    deleteDealer: builder.mutation({
      invalidatesTags: ["dealer"],
      query: (id) => ({
        url: `/dealer/${id}`,

        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDealersQuery,
  useGetDealersQuery,
  useAddDealerMutation,
  useUpdateDealerMutation,
  useGetDealerByIdQuery,
  useDeleteDealerMutation,
} = dealerApi;
