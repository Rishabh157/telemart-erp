/// ==============================================
// Filename:SlotManagementService.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddSlotManagement, UpdateSlotManagement } from 'src/models/Slot.model'

export const slotManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //***** GET PAGINATION DATA *****/
    getPaginationSlotView: builder.query({
      providesTags: ['slot'],
      query: (body: PaginationType) => ({
        url: '/slot-master',
        method: 'POST',
        body,
      }),
    }),

    //***** ADD *****/
    addSlotView: builder.mutation({
      invalidatesTags: ['slot'],
      query: (body: AddSlotManagement) => ({
        url: '/slot-master/add',
        method: 'POST',
        body,
      }),
    }),
    getSlotViewById: builder.query({
      providesTags: ['slot'],
      query: (id: string) => ({
        url: `/slot-master/${id}`,
        method: 'GET',
      }),
    }),

    //***** Update *****/
    updateSlotView: builder.mutation({
      invalidatesTags: ['slot'],
      query: ({ body, id }: UpdateSlotManagement) => ({
        url: `/slot-master/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteSlotView: builder.mutation({
      invalidatesTags: ['slot'],
      query: (id: string) => ({
        url: `/slot-master/${id}`,
        method: 'DELETE',
      }),
    }),

  }),
})

export const {
  useGetPaginationSlotViewQuery,
  useAddSlotViewMutation,
  useDeleteSlotViewMutation,
  useGetSlotViewByIdQuery,
  useUpdateSlotViewMutation

} = slotManagementApi
