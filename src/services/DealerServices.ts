/// ==============================================
// Filename:DealerService.ts
// Type: Service Component
// Last Updated: JUNE 29, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddDealer, UpdateDealer } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAllDealers: builder.query({
            providesTags: ['dealer'],
            query: (companyId) => ({
                url: `/dealer/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET PAGINATION DATA *****/
        getDealers: builder.query({
            providesTags: ['dealer'],
            query: (body: PaginationType) => ({
                url: '/dealer',
                // params: {
                //   _page: body.page,
                //   _limit: body.limit,
                // },
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (body: AddDealer) => ({
                url: '/dealer/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: ({ body, id }: UpdateDealer) => ({
                url: `dealer/${id}`,

                method: 'PUT',
                body,
            }),
        }),
        //***** change status *****/
        changeDealerStatus: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (id) => ({
                url: `dealer/status-change/${id}`,
                method: 'PUT',
            }),
        }),

        //***** approve dealer status *****/
        approveDealerStatus: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (id) => ({
                url: `dealer/dealer-approve/${id}`,
                method: 'PUT',
            }),
        }),

        // **** GET BY ID
        getDealerById: builder.query({
            providesTags: ['dealer'],
            query: (id) => ({
                url: `dealer/${id}`,

                method: 'GET',
            }),
        }),

        //***** Delete *****/
        deleteDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (id) => ({
                url: `/dealer/${id}`,

                method: 'DELETE',
            }),
        }),

        //***** CHANGES PASSWORD *****/
        changePasswordDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (body: any) => ({
                url: '/dealer/change-dealer-password',
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useGetAllDealersQuery,
    useGetDealersQuery,
    useAddDealerMutation,
    useUpdateDealerMutation,
    useGetDealerByIdQuery,
    useDeleteDealerMutation,
    useChangeDealerStatusMutation,
    useApproveDealerStatusMutation,
    useChangePasswordDealerMutation
} = dealerApi
