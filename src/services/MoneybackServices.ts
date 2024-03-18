/// ==============================================
// Filename:MoneybackServices.tsx
// Type: Service Component
// Last Updated: March 14, 2024
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const moneybackApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getMoneybackOrder: builder.query({
            providesTags: ['moneyback'],
            query: (body: PaginationType) => ({
                url: '/money-back',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllMoneybackOrder: builder.query({
            providesTags: ['moneyback'],
            query: () => ({
                url: '/money-back',
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getMoneybackOrderById: builder.query({
            providesTags: ['moneyback'],
            query: (id:string) => ({
                url: `/money-back/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllMoneybackLogsById: builder.query({
            // providesTags: ['moneyback'],
            query: (moneybackId: string) => ({
                url: `money-back-logs/get-logs/${moneybackId}`,
                method: 'GET',
            }),
        }),

        // **** Manger First approval
        mangerFirstApproval: builder.mutation({
            invalidatesTags: ['moneyback'],
            query: (body) => ({
                url: '/money-back/update-manager',
                method: 'PUT',
                body,
            }),
        }),

        // **** Customer info
        addCustomerInfo: builder.mutation({
            invalidatesTags: ['moneyback'],
            query: (body) => ({
                url: '/money-back/cc-update-details',
                method: 'PUT',
                body,
            }),
        }),

        // **** Account approval
        addAccountApproval: builder.mutation({
            invalidatesTags: ['moneyback'],
            query: (body) => ({
                url: '/money-back/account-approval',
                method: 'PUT',
                body,
            }),
        }),

        //
    }),
})

export const {
    useGetMoneybackOrderQuery,
    useGetAllMoneybackOrderQuery,
    useGetMoneybackOrderByIdQuery,
    useGetAllMoneybackLogsByIdQuery,
    useMangerFirstApprovalMutation,
    useAddCustomerInfoMutation,
    useAddAccountApprovalMutation,
    // useDeleteOrderMutation,
} = moneybackApi
