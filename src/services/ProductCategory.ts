import {  AddProductCategory, UpdateProductCategory } from "src/models/ProductCategory.model";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getProductCategory: builder.query({
      providesTags: ["productCategory"],
      query: (body: PaginationType) => ({
        url: "/product-code",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllProductCategory: builder.query({
      providesTags: ["productCategory"],
      query: () => ({
        url: "/product-code",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    addProductCategory: builder.mutation({
      invalidatesTags: ["productCategory"],
      query: (body: AddProductCategory) => ({
        url: "/product-code/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateProductCategory: builder.mutation({
      invalidatesTags: ["productCategory"],
      query: ({ body, id }: UpdateProductCategory) => ({
        url: `/product-code/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getProductCategoryById: builder.query({
      providesTags: ["productCategory"],
      query: (id) => ({
        url: `/product-code/${id}`,

        method: "GET",
      }),
    }),

    //**** Export
    exportProductCategoryData: builder.mutation({
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
    deleteProductCategory: builder.mutation({
      invalidatesTags: ["productCategory"],
      query: (id) => ({
        url: `/product-code/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetProductCategoryQuery,
  useGetAllProductCategoryQuery,
  useAddProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useGetProductCategoryByIdQuery,
  useDeleteProductCategoryMutation,
  useExportProductCategoryDataMutation,
} = productCategoryApi;
