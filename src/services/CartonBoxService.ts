import { AddCartonBox, UpdateCartonBox } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const cartonBoxApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getCartonBox: builder.query({
      providesTags: ["CartonBox"],
      query: (body: PaginationType) => ({
        url: "/carton-box",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllCartonBox: builder.query({
      providesTags: ["CartonBox"],
      query: () => ({
        url: "/carton-box",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    addCartonBox: builder.mutation({
      invalidatesTags: ["CartonBox"],
      query: (body: AddCartonBox) => ({
        url: "/carton-box/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateCartonBox: builder.mutation({
      invalidatesTags: ["CartonBox"],
      query: ({ body, id }: UpdateCartonBox) => ({
        url: `/carton-box/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getCartonBoxById: builder.query({
      providesTags: ["CartonBox"],
      query: (id) => ({
        url: `/carton-box/${id}`,

        method: "GET",
      }),
    }),

    //**** Export
    exportCartonBoxData: builder.mutation({
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
    deleteCartonBox: builder.mutation({
      invalidatesTags: ["CartonBox", "attributeGroup"],
      query: (id) => ({
        url: `/carton-box/${id}`,

        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetCartonBoxQuery,
  useAddCartonBoxMutation,
  useUpdateCartonBoxMutation,
  useGetCartonBoxByIdQuery,
  useExportCartonBoxDataMutation,
  useDeleteCartonBoxMutation,
  useGetAllCartonBoxQuery,
} = cartonBoxApi;
