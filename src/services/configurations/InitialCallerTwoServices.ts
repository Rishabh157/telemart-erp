
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddInitialCallerTwo, UpdateInitialCallerTwo } from 'src/models/configurationModel/InitialCallerTwo.model'

export const initialCallerTwoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      //***** GET *****/
      getinitialCallerTwo: builder.query({
          providesTags: ['initialCallerTwo'],
          query: (body: PaginationType) => ({
              url: '/initialcall-two',
              method: 'POST',
              body,
          }),
      }),

      //***** GET *****/
      getAllinitialCallerTwo: builder.query({
          providesTags: ['initialCallerTwo'],
          query: () => ({
              url: '/initialcall-two',
              method: 'GET',
              // body,
          }),
      }),

      //***** ADD *****/
      addinitialCallerTwo: builder.mutation({
          invalidatesTags: ['initialCallerTwo'],
          query: (body: AddInitialCallerTwo) => ({
              url: '/initialcall-two/add',
              method: 'POST',
              body,
          }),
      }),

      //***** Update *****/
      updateinitialCallerTwo: builder.mutation({
          invalidatesTags: ['initialCallerTwo'],
          query: ({ body, id }: UpdateInitialCallerTwo) => ({
              url: `/initialcall-two/${id}`,

              method: 'PUT',
              body,
          }),
      }),

      // **** GET BY ID
      getinitialCallerTwoById: builder.query({
          providesTags: ['initialCallerTwo'],
          query: (id) => ({
              url: `/initialcall-two/${id}`,

              method: 'GET',
          }),
      }),

      //**** Export
      exportinitialCallerTwoData: builder.mutation({
          query: (body: PaginationType) => ({
              url: '',

              params: {
                  _page: body.page,
                  _limit: body.limit,
              },
              method: 'GET',
              // body,
          }),
      }),

      // **** Delete
      deleteinitialCallerTwo: builder.mutation({
          invalidatesTags: ['initialCallerTwo'],
          query: (id) => ({
              url: `/initialcall-two/${id}`,

              method: 'DELETE',
          }),
      }),
  }),
})
export const {
  useGetinitialCallerTwoQuery,
  useAddinitialCallerTwoMutation,
  useUpdateinitialCallerTwoMutation,
  useGetinitialCallerTwoByIdQuery,
  useExportinitialCallerTwoDataMutation,
  useDeleteinitialCallerTwoMutation,
  useGetAllinitialCallerTwoQuery,
} = initialCallerTwoApi
