
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddInitialCallerThree, UpdateInitialCallerThree } from 'src/models/configurationModel/InitialCallerThree.model'

export const initialCallerThreeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
      //***** GET *****/
      getInitialCallerThree: builder.query({
          providesTags: ['initialCallerThree'],
          query: (body: PaginationType) => ({
              url: '/initialcall-three',
              method: 'POST',
              body,
          }),
      }),

      //***** GET *****/
      getAllInitialCallerThree: builder.query({
          providesTags: ['initialCallerThree'],
          query: () => ({
              url: '/initialcall-three',
              method: 'GET',
              // body,
          }),
      }),

      //***** ADD *****/
      addInitialCallerThree: builder.mutation({
          invalidatesTags: ['initialCallerThree'],
          query: (body: AddInitialCallerThree) => ({
              url: '/initialcall-three/add',
              method: 'POST',
              body,
          }),
      }),

      //***** Update *****/
      updateInitialCallerThree: builder.mutation({
          invalidatesTags: ['initialCallerThree'],
          query: ({ body, id }: UpdateInitialCallerThree) => ({
              url: `/initialcall-three/${id}`,

              method: 'PUT',
              body,
          }),
      }),

      // **** GET BY ID
      getInitialCallerThreeById: builder.query({
          providesTags: ['initialCallerThree'],
          query: (id) => ({
              url: `/initialcall-three/${id}`,

              method: 'GET',
          }),
      }),

      //**** Export
      exportInitialCallerThreeData: builder.mutation({
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
      deleteInitialCallerThree: builder.mutation({
          invalidatesTags: ['initialCallerThree'],
          query: (id) => ({
              url: `/initialcall-three/${id}`,

              method: 'DELETE',
          }),
      }),
  }),
})
export const {
  useGetInitialCallerThreeQuery,
  useAddInitialCallerThreeMutation,
  useUpdateInitialCallerThreeMutation,
  useGetInitialCallerThreeByIdQuery,
  useExportInitialCallerThreeDataMutation,
  useDeleteInitialCallerThreeMutation,
  useGetAllInitialCallerThreeQuery,
} = initialCallerThreeApi
