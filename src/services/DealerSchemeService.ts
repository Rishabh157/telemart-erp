import { DealersSchemeAdd, UpdateDealersScheme } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const dealerSchemeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET PAGINATION DATA *****/
    getDealerScheme: builder.query({
      providesTags: ["dealerScheme"],
      query: (body: PaginationType) => ({
        url: "/dealer-scheme",
        method: "POST",
        body,
      }),
    }),

    //***** ADD *****/
    addDealerScheme: builder.mutation({
      invalidatesTags: ["dealerScheme"],
      query: (body: DealersSchemeAdd) => ({
        url: "/dealer-scheme/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateDealerScheme: builder.mutation({
      invalidatesTags: ["dealerScheme"],
      query: ({ body, id }: UpdateDealersScheme) => ({
        url: `/dealer-scheme/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {  
  useGetDealerSchemeQuery,
  useAddDealerSchemeMutation,
  useUpdateDealerSchemeMutation,  
} = dealerSchemeApi;
