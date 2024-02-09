/// ==============================================
// Filename:InitialCallerThreeServices.tsx
// Type: Service Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import {
    AddInitialCallerThree,
    UpdateInitialCallerThree,
} from './../../models/configurationModel/InitialCallerThree.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'

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

        // get all initial call two by one id and call type
        getAllinitialCallThreeByTwoByAndCallType: builder.query({
            providesTags: ['initialCallerTwo'],
            query: ({ id, callType }) => ({
                url: `/initialcall-three/get-all/${id}/calltype/${callType}`,
                method: 'GET',
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
        deactiveInitialCallerThree: builder.mutation({
            invalidatesTags: ['initialCallerThree'],
            query: (id: string) => ({
                url: `/initialcall-three/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})
export const {
    useGetInitialCallerThreeQuery,
    useAddInitialCallerThreeMutation,
    useGetAllinitialCallThreeByTwoByAndCallTypeQuery,
    useUpdateInitialCallerThreeMutation,
    useGetInitialCallerThreeByIdQuery,
    useExportInitialCallerThreeDataMutation,
    useDeleteInitialCallerThreeMutation,
    useGetAllInitialCallerThreeQuery,
    useDeactiveInitialCallerThreeMutation,
} = initialCallerThreeApi
