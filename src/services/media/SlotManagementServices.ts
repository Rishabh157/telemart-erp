import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddSlotManagement, UpdateSlotManagement } from 'src/models/Slot.model'

export const slotManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationSlot: builder.query({
            providesTags: ['slot'],
            query: (body: PaginationType) => ({
                url: '/slot-master',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addSlot: builder.mutation({
            invalidatesTags: ['slot'],
            query: (body: AddSlotManagement) => ({
                url: '/slot-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateSlot: builder.mutation({
            invalidatesTags: ['slot'],
            query: ({ body, id }: UpdateSlotManagement) => ({
                url: `/slot-master/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddSlotMutation,
    useGetPaginationSlotQuery,
    useUpdateSlotMutation,
} = slotManagementApi
