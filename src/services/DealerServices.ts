import { AddDealer, UpdateDealer } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const dealerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getDealers: builder.query({
      providesTags: ["dealer"],
      query: (body: PaginationType) => ({
        url: "",

        params: {
          _page: body.page,
          _limit: body.limit,
        },
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    addDealer: builder.mutation({
      invalidatesTags: ["dealer"],
      query: (body: AddDealer) => ({
        url: "/register",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateDealer: builder.mutation({
      invalidatesTags: ["dealer"],
      query: ({ body, id }: UpdateDealer) => ({
        url: `/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getDealerById: builder.query({
      providesTags: ["dealer"],
      query: (id) => ({
        url: `/${id}`,

        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetDealersQuery,
  useAddDealerMutation,
  useUpdateDealerMutation,
  useGetDealerByIdQuery,
} = dealerApi;
