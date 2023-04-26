import { UpdatePincode, AddPincode } from "./../models/Pincode.model";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const pincodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getPincode: builder.query({
      providesTags: ["pincode"],
      query: (body: PaginationType) => ({
        url: "/pincode",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllPincodeByDistrict: builder.query({
      providesTags: ["pincode"],
      query: (id) => ({
        url: `/pincode/get-country-pincode/${id}`,
        method: "GET",
        // body,
      }),
    }),

    //***** GET *****/
    getAllPincode: builder.query({
      providesTags: ["pincode"],
      query: () => ({
        url: "/pincode",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    AddPincode: builder.mutation({
      invalidatesTags: ["pincode"],
      query: (body: AddPincode) => ({
        url: "/pincode/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updatePincode: builder.mutation({
      invalidatesTags: ["pincode"],
      query: ({ body, id }: UpdatePincode) => ({
        url: `/pincode/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getPincodeById: builder.query({
      providesTags: ["pincode"],
      query: (id) => ({
        url: `/pincode/${id}`,

        method: "GET",
      }),
    }),

    //**** Export
    exportPincodeData: builder.mutation({
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
    deletePincode: builder.mutation({
      invalidatesTags: ["pincode", "areaGroup"],
      query: (id) => ({
        url: `/pincode/${id}`,

        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetPincodeQuery,
  useAddPincodeMutation,
  useUpdatePincodeMutation,
  useGetPincodeByIdQuery,
  useExportPincodeDataMutation,
  useDeletePincodeMutation,
  useGetAllPincodeQuery,
  useGetAllPincodeByDistrictQuery,
} = pincodeApi;
