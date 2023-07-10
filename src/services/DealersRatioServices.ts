/// ==============================================
// Filename:DealerRatioService.ts
// Type: Service Component
// Last Updated: JUlY 10, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { AddDealer, UpdateDealer } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerRatioApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAllDealers: builder.query({
            providesTags: ['dealer-ratio'],
            query: (companyId) => ({
                url: `/dealer-ratio/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET PAGINATION DATA *****/
        getDealers: builder.query({
            providesTags: ['dealer-ratio'],
            query: (body: PaginationType) => ({
                url: '/dealer-ratio',
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
            invalidatesTags: ['dealer-ratio'],
            query: (body: AddDealer) => ({
                url: '/dealer-ratio/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealer: builder.mutation({
            invalidatesTags: ['dealer-ratio'],
            query: ({ body, id }: UpdateDealer) => ({
                url: `dealer/${id}`,

                method: 'PUT',
                body,
            }),
        }),
        //***** change status *****/
        changeDealerStatus: builder.mutation({
            invalidatesTags: ['dealer-ratio'],
            query: (id) => ({
                url: `dealer/status-change/${id}`,
                method: 'PUT',
            }),
        }),

        // **** GET BY ID
        getDealerById: builder.query({
            providesTags: ['dealer-ratio'],
            query: (id) => ({
                url: `dealer/${id}`,

                method: 'GET',
            }),
        }),

        //***** Delete *****/
        deleteDealer: builder.mutation({
            invalidatesTags: ['dealer-ratio'],
            query: (id) => ({
                url: `/dealer-ratio/${id}`,

                method: 'DELETE',
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
} = dealerRatioApi
