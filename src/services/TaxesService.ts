import { AddTaxes, UpdateTaxes } from "src/models/taxes.model";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const taxtesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getTaxes: builder.query({
      providesTags: ["Taxes"],
      query: (body: PaginationType) => ({
        url: "/taxes",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllTaxes: builder.query({
      providesTags: ["Taxes"],
      query: () => ({
        url: "/taxes",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    addTaxes: builder.mutation({
      invalidatesTags: ["Taxes"],
      query: (body: AddTaxes) => ({
        url: "/taxes/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateTaxes: builder.mutation({
      invalidatesTags: ["Taxes"],
      query: ({ body, id }: UpdateTaxes) => ({
        url: `/taxes/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getTaxesById: builder.query({
      providesTags: ["Taxes"],
      query: (id) => ({
        url: `/taxes/${id}`,
        method: "GET",
      }),
    }),

    //**** Export
    exportTaxesData: builder.mutation({
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

    // **** Delete
    deleteTaxes: builder.mutation({
      invalidatesTags: ["Taxes"],
      query: (id) => ({
        url: `/taxes/${id}`,

        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetTaxesQuery,
  useAddTaxesMutation,
  useUpdateTaxesMutation,
  useGetTaxesByIdQuery,
  useExportTaxesDataMutation,
  useDeleteTaxesMutation,
  useGetAllTaxesQuery,
} = taxtesApi;
