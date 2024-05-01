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
                url: `/dealer`,
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

        //***** Get Dealer By Scheme Id *****/
        getAllDealerBySchemeId: builder.query({
            providesTags: ['dealer'],
            query: (schemeId: string) => ({
                url: `dealer/scheme-wise-dealer/${schemeId}`,
                method: 'GET',
            }),
        }),

        //***** Submit the multiple Dealer to scheme *****/
        saveMultipleDealerToSingleScheme: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (body) => ({
                url: 'dealer-scheme/scheme-to-dealer-mapping',
                method: 'POST',
                body,
            }),
        }),

        //***** Submit the multiple Dealer to scheme *****/
        saveMultipleSchemeToSingleDealer: builder.mutation({
            invalidatesTags: ['dealer'],
            query: (body) => ({
                url: 'dealer-scheme/dealer-to-scheme-mapping',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllDealersByZonalExe: builder.query({
            providesTags: ['dealer'],
            query: (companyId) => ({
                url: `/dealer/get-zme-dealers`,
                method: 'GET',
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
    useChangePasswordDealerMutation,
    useGetAllDealerBySchemeIdQuery,
    useSaveMultipleDealerToSingleSchemeMutation,
    useSaveMultipleSchemeToSingleDealerMutation,
    useGetAllDealersByZonalExeQuery,
} = dealerApi
