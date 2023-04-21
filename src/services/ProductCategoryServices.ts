import {  AddProductCategory, UpdateProductCategory } from "src/models/ProductCategory.model";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET *****/
    getProductCategory: builder.query({
      providesTags: ["productCategory"],
      query: (body: PaginationType) => ({
        url: "/product-category",
        method: "POST",
        body,
      }),
    }),

    //***** GET *****/
    getAllProductCategory: builder.query({
      providesTags: ["productCategory"],
      query: () => ({
        url: "/product-category",
        method: "GET",
        // body,
      }),
    }),

    //***** ADD *****/
    addProductCategory: builder.mutation({
      invalidatesTags: ["productCategory"],
      query: (body: AddProductCategory) => ({
        url: "/product-category/add",
        method: "POST",

        body,
      }),
    }),

    //***** Update *****/
    updateProductCategory: builder.mutation({
      invalidatesTags: ["productCategory"],
      query: ({ body, id }: UpdateProductCategory) => ({
        url: `/product-category/${id}`,

        method: "PUT",
        body,
      }),
    }),

    // **** GET BY ID
    getProductCategoryById: builder.query({
      providesTags: ["productCategory"],
      query: (id) => ({
        url: `/product-category/${id}`,

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
        url: `/product-category/${id}`,
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
