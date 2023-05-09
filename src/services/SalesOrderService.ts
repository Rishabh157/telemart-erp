import { AddSaleOrder, UpdateSaleOrder } from "src/models";
import { PaginationType } from "src/models/common/paginationType";
import apiSlice from "./ApiSlice";

export const SalesOrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET PAGINATION DATA *****/
    getPaginationSaleOrder: builder.query({
      providesTags: ["SalesOrder"],
      query: (body: PaginationType) => ({
        url: "/sales-order",
        method: "POST",
        body,
      }),
    }),

    //***** ADD *****/
    addSalesOrder: builder.mutation({
      invalidatesTags: ["SalesOrder"],
      query: (body: AddSaleOrder) => ({
        url: "/sales-order/add",
        method: "POST",
        body,
      }),
    }),

    //***** Update *****/
    updateSalesOrder: builder.mutation({
      invalidatesTags: ["SalesOrder"],
      query: ({ body, id }: UpdateSaleOrder) => ({
        url: `/sales-order/${id}`,
        method: "PUT",
        body,
      }),
    }),

    //***** Delete *****/
    deleteSalesOrder: builder.mutation({
      invalidatesTags: ["SalesOrder"],
      query: (id) => ({
        url: `/sales-order/${id}`,
        method: "DELETE",
      }),
    }),

    // **** GET BY ID
    getSalesOrderById: builder.query({
      providesTags: ["SalesOrder"],
      query: (id) => ({
        url: `/sales-order/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useGetPaginationSaleOrderQuery,
    useAddSalesOrderMutation,
    useUpdateSalesOrderMutation,
    useGetSalesOrderByIdQuery,
    useDeleteSalesOrderMutation,
  } = SalesOrderApi;
