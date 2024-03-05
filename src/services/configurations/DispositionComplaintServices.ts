/// ==============================================
// Filename:DispositionComplaintServices.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddDispositionComplaint,
    UpdateDispositionComplaint,
} from 'src/models/configurationModel/DispositionComplaint.model'

export const dispositionComplaintApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getdispositionComplaint: builder.query({
            providesTags: ['dispositionComplaint'],
            query: (body: PaginationType) => ({
                url: '/complaint-disposition',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAlldispositionComplaint: builder.query({
            providesTags: ['dispositionComplaint'],
            query: () => ({
                url: '/complaint-disposition',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        adddispositionComplaint: builder.mutation({
            invalidatesTags: ['dispositionComplaint'],
            query: (body: AddDispositionComplaint) => ({
                url: '/complaint-disposition/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatedispositionComplaint: builder.mutation({
            invalidatesTags: ['dispositionComplaint'],
            query: ({ body, id }: UpdateDispositionComplaint) => ({
                url: `/complaint-disposition/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getdispositionComplaintById: builder.query({
            providesTags: ['dispositionComplaint'],
            query: (id) => ({
                url: `/complaint-disposition/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportdispositionComplaintData: builder.mutation({
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
        deletedispositionComplaint: builder.mutation({
            invalidatesTags: ['dispositionComplaint'],
            query: (id) => ({
                url: `/complaint-disposition/${id}`,

                method: 'DELETE',
            }),
        }),

        // **** Delete
        deactivatedispositionComplaint: builder.mutation({
            invalidatesTags: ['dispositionComplaint'],
            query: (id: string) => ({
                url: `/complaint-disposition/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetdispositionComplaintQuery,
    useAdddispositionComplaintMutation,
    useUpdatedispositionComplaintMutation,
    useGetdispositionComplaintByIdQuery,
    useExportdispositionComplaintDataMutation,
    useDeletedispositionComplaintMutation,
    useGetAlldispositionComplaintQuery,
    useDeactivatedispositionComplaintMutation,
} = dispositionComplaintApi
