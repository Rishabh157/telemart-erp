import {  AddGRN, UpdateGRN } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const grnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET PAGINATION DATA *****/
    getPaginationGRN: builder.query({
      providesTags: ["GRN"],
      query: (body: PaginationType) => ({
        url: "/grn",
        method: "POST",
        body,
      }),
    }),

    //***** ADD *****/
    addGRN: builder.mutation({
      invalidatesTags: ["GRN"],
      query: (body: AddGRN) => ({
        url: "/grn/add",
        method: "POST",
        body,
      }),
    }),

    //***** Update *****/
    updateGRN: builder.mutation({
      invalidatesTags: ["GRN"],
      query: ({ body, id }: UpdateGRN) => ({
        url: `/grn/${id}`,
        method: "PUT",
        body,
      }),
    }),

  }),
});

export const {
    useAddGRNMutation,
    useUpdateGRNMutation,
    useGetPaginationGRNQuery,
} = grnApi;
