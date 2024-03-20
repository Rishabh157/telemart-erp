// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const houseArrestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getHouseArrest: builder.query({
            providesTags: ['house-arrest'],
            query: (body: PaginationType) => ({
                url: '/house-arrest',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllMoneybackOrder: builder.query({
            providesTags: ['house-arrest'],
            query: () => ({
                url: '/house-arrest',
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getHouseArrestById: builder.query({
            providesTags: ['house-arrest'],
            query: (id: string) => ({
                url: `/house-arrest/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET Logs *****/
        getAllHouseArrestLogsById: builder.query({
            // providesTags: ['house-arrest'],
            query: (moneybackId: string) => ({
                url: `house-arrest-logs/get-logs/${moneybackId}`,
                method: 'GET',
            }),
        }),

        // **** Add
        addHouseArrest: builder.mutation({
            invalidatesTags: ['house-arrest'],
            query: (body) => ({
                url: '/house-arrest/add',
                method: 'POST',
                body,
            }),
        }),

        // **** Manger First approval
        mangerFirstApproval: builder.mutation({
            invalidatesTags: ['house-arrest'],
            query: (body) => ({
                url: '/house-arrest/update-manager',
                method: 'PUT',
                body,
            }),
        }),

        // **** Customer info
        addCustomerInfo: builder.mutation({
            invalidatesTags: ['house-arrest'],
            query: (body) => ({
                url: '/money-back/cc-update-details',
                method: 'PUT',
                body,
            }),
        }),

        // **** Account approval
        addAccountApproval: builder.mutation({
            invalidatesTags: ['house-arrest'],
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
    useGetHouseArrestQuery,
    useGetAllMoneybackOrderQuery,
    useAddHouseArrestMutation,
    useGetHouseArrestByIdQuery,
    useGetAllHouseArrestLogsByIdQuery,
    useMangerFirstApprovalMutation,
    useAddCustomerInfoMutation,
    useAddAccountApprovalMutation,
    // useDeleteOrderMutation,
} = houseArrestApi
