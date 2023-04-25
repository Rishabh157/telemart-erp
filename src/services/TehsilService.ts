import { AddTehsil, UpdateTehsil } from "src/models/Tehsil.model";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const tehsilApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getTehsil: builder.query({
      providesTags: ["Tehsil"],
      query: (body: PaginationType) => ({
        url: "/tehsil",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllTehsil: builder.query({
      providesTags: ["Tehsil"],
      query: () => ({
        url: "/tehsil",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    AddTehsil: builder.mutation({
      invalidatesTags: ["Tehsil"],
      query: (body: AddTehsil) => ({
        url: "/tehsil/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateTehsil: builder.mutation({
      invalidatesTags: ["Tehsil"],
      query: ({ body, id }: UpdateTehsil) => ({
        url: `/tehsil/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getTehsilById: builder.query({
      providesTags: ["Tehsil"],
      query: (id) => ({
        url: `/tehsil/${id}`,

        method: "GET",
      }),
    }),

    //**** Export
    exportTehsilData: builder.mutation({
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
    deleteTehsil: builder.mutation({
      invalidatesTags: ["Tehsil", "areaGroup"],
      query: (id) => ({
        url: `/tehsil/${id}`,

        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetTehsilQuery,
  useAddTehsilMutation,
  useUpdateTehsilMutation,
  useGetTehsilByIdQuery,
  useExportTehsilDataMutation,
  useDeleteTehsilMutation,
  useGetAllTehsilQuery,
} = tehsilApi;
