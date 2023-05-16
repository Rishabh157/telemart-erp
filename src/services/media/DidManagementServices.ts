import { PaginationType } from "src/models/common/paginationType";
import { AddDidManagement, UpdateDidManagement } from "src/models/Media.model";
import apiSlice from "../ApiSlice";

export const didManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET PAGINATION DATA *****/
    getPaginationDid: builder.query({
      providesTags: ["did"],
      query: (body: PaginationType) => ({
        url: "/did",
        method: "POST",
        body,
      }),
    }),

    //***** ADD *****/
    addDid: builder.mutation({
      invalidatesTags: ["did"],
      query: (body: AddDidManagement) => ({
        url: "/did/add",
        method: "POST",
        body,
      }),
    }),

    //***** Update *****/
    updateDid: builder.mutation({
      invalidatesTags: ["did"],
      query: ({ body, id }: UpdateDidManagement) => ({
        url: `/did/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useAddDidMutation,
  useGetPaginationDidQuery,
  useUpdateDidMutation
} = didManagementApi;
