
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddInitialCallerOne, UpdateInitialCallerOne } from 'src/models/configurationModel/InitialCallerOne.model'

export const initialCallerOneApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      //***** GET *****/
      getinitialCallerOne: builder.query({
          providesTags: ['initialCallerOne'],
          query: (body: PaginationType) => ({
              url: '/initialcall-one',
              method: 'POST',
              body,
          }),
      }),

      //***** GET *****/
      getAllinitialCallerOne: builder.query({
          providesTags: ['initialCallerOne'],
          query: () => ({
              url: '/initialcall-one',
              method: 'GET',
              // body,
          }),
      }),

      //***** ADD *****/
      addinitialCallerOne: builder.mutation({
          invalidatesTags: ['initialCallerOne'],
          query: (body: AddInitialCallerOne) => ({
              url: '/initialcall-one/add',
              method: 'POST',
              body,
          }),
      }),

      //***** Update *****/
      updateinitialCallerOne: builder.mutation({
          invalidatesTags: ['initialCallerOne'],
          query: ({ body, id }: UpdateInitialCallerOne) => ({
              url: `/initialcall-one/${id}`,

              method: 'PUT',
              body,
          }),
      }),

      // **** GET BY ID
      getinitialCallerOneById: builder.query({
          providesTags: ['initialCallerOne'],
          query: (id) => ({
              url: `/initialcall-one/${id}`,

              method: 'GET',
          }),
      }),

      //**** Export
      exportinitialCallerOneData: builder.mutation({
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
      deleteinitialCallerOne: builder.mutation({
          invalidatesTags: ['initialCallerOne'],
          query: (id) => ({
              url: `/initialcall-one/${id}`,

              method: 'DELETE',
          }),
      }),
  }),
})
export const {
  useGetinitialCallerOneQuery,
  useAddinitialCallerOneMutation,
  useUpdateinitialCallerOneMutation,
  useGetinitialCallerOneByIdQuery,
  useExportinitialCallerOneDataMutation,
  useDeleteinitialCallerOneMutation,
  useGetAllinitialCallerOneQuery,
} = initialCallerOneApi
