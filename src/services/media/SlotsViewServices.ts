// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { UpdateSlotManagement } from 'src/models/Slot.model'

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

        //***** GET BY ID *****/
        getSlotViewById: builder.query({
            providesTags: ['slot'],
            query: (id: string) => ({
                url: `/slot-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** UPDATE *****/
        updateSlotView: builder.mutation({
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
    useGetPaginationSlotViewQuery,
    useGetSlotViewByIdQuery,
    useUpdateSlotViewMutation,
} = slotManagementApi
