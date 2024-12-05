import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const companyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getDealerCreditRequest: builder.query({
            providesTags: ['company'],
            query: (body: PaginationType) => ({
                url: '/dealer-receipt',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllDealerCreditRequest: builder.query({
            providesTags: ['company'],
            query: () => ({
                url: '/dealer-receipt/dealer',
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addDealerCreditAmountRequest: builder.mutation({
            invalidatesTags: ['company'],
            query: (body: any) => ({
                url: '/dealer-receipt/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateDealerCreditAmountRequest: builder.mutation({
            invalidatesTags: ['company'],
            query: ({ body, id }) => ({
                url: `/dealer-receipt/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDealerCreditAmountRequestById: builder.query({
            providesTags: ['company'],
            query: (id) => ({
                url: `/company/${id}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetDealerCreditRequestQuery,
    useGetAllDealerCreditRequestQuery,
    useAddDealerCreditAmountRequestMutation,
    useUpdateDealerCreditAmountRequestMutation,
    useGetDealerCreditAmountRequestByIdQuery,
} = companyApi
