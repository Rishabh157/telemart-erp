import { AddVendor, UpdateVendor } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const vendorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getVendors: builder.query({
      providesTags: ["vendor"],
      query: (body: PaginationType) => ({
        url: "",

        method: "GET",
        body,
      }),
    }),

    //***** ADD *****/
    addVendor: builder.mutation({
      invalidatesTags: ["vendor"],
      query: (body: AddVendor) => ({
        url: "/register",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateVendor: builder.mutation({
      invalidatesTags: ["vendor"],
      query: ({ body, id }: UpdateVendor) => ({
        url: `/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getVendorById: builder.query({
      providesTags: ["vendor"],
      query: (id) => ({
        url: `/${id}`,

        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetVendorsQuery,
  useAddVendorMutation,
  useUpdateVendorMutation,
  useGetVendorByIdQuery,
} = vendorApi;
