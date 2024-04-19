// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddSlotDefinition, UpdateSlotDefinition } from 'src/models/Slot.model'

export const slotManagementApi: any = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationSlot: builder.query({
            providesTags: ['slot'],
            query: (body: PaginationType) => ({
                url: '/slot-definition',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addSlot: builder.mutation({
            invalidatesTags: ['slot'],
            query: (body: AddSlotDefinition) => ({
                url: '/slot-definition/add',
                method: 'POST',
                body,
            }),
        }),

        //***** GET BY ID *****/
        getSlotMangementById: builder.query({
            providesTags: ['slot'],
            query: (id: string) => ({
                url: `/slot-definition/${id}`,
                method: 'GET',
            }),
        }),

        getSlotMangement: builder.query({
            providesTags: ['slot'],
            query: (companyid) => ({
                url: `/slot-definition/company/${companyid}`,
                method: 'GET',
            }),
        }),

        //***** UPDATE *****/
        updateSlot: builder.mutation({
            invalidatesTags: ['slot'],
            query: ({ body, id }: UpdateSlotDefinition) => ({
                url: `/slot-definition/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** SLOT PLAY PAUSE *****/
        updateSlotContinueStatus: builder.mutation({
            invalidatesTags: ['slot'],
            query: (id) => ({
                url: `/slot-definition/pause-play/${id}`,
                method: 'PUT',
            }),
        }),

        //***** DELETE *****/
        deleteSlotMangement: builder.mutation({
            invalidatesTags: ['slot'],
            query: (id: string) => ({
                url: `/slot-definition/${id}`,
                method: 'DELETE',
            }),
        }),

        FileUploader: builder.mutation({
            invalidatesTags: [''],
            query: (body: any) => ({
                url: `/file-manager/add`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {
    useAddSlotMutation,
    useGetPaginationSlotQuery,
    useUpdateSlotMutation,
    useGetSlotMangementByIdQuery,
    useDeleteSlotMangementMutation,
    useFileUploaderMutation,
    useUpdateSlotContinueStatusMutation,
    useGetSlotMangementQuery,
} = slotManagementApi
