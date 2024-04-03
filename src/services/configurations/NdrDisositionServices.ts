/// ==============================================
// Filename:DispositiononeServices.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
// import {
//   AddDisPositionOne,
//   UpdateDispositionOne,
// } from 'src/models/configurationModel/NdrDisposition.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

export const ndrDispositionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getNdrdisposition: builder.query({
            providesTags: ['ndr-disposition'],
            query: (body: PaginationType) => ({
                url: '/ndr-disposition',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllUnauthNdrDisposition: builder.query({
            providesTags: ['ndr-disposition'],
            query: () => ({
                url: `/ndr-disposition/unauth`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addNdrDisposition: builder.mutation({
            invalidatesTags: ['ndr-disposition'],
            query: (body: any) => ({
                url: '/ndr-disposition/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateNdrDisposition: builder.mutation({
            invalidatesTags: ['ndr-disposition'],
            query: ({ body, id }: any) => ({
                url: `/ndr-disposition/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getNdrdispositionById: builder.query({
            providesTags: ['ndr-disposition'],
            query: (id) => ({
                url: `/ndr-disposition/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteNdrDisposition: builder.mutation({
            invalidatesTags: ['ndr-disposition'],
            query: (id) => ({
                url: `/ndr-disposition/${id}`,

                method: 'DELETE',
            }),
        }),

        deactiveNdrDisposition: builder.mutation({
            invalidatesTags: ['ndr-disposition'],
            query: (id: string) => ({
                url: `/ndr-disposition/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetAllUnauthNdrDispositionQuery,
    useAddNdrDispositionMutation,
    useUpdateNdrDispositionMutation,
    useGetNdrdispositionByIdQuery,
    useDeleteNdrDispositionMutation,
    useGetNdrdispositionQuery,
    useDeactiveNdrDispositionMutation,
} = ndrDispositionApi
