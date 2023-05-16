import { DealersPincodeAdd, UpdateDealersPincode } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerPincodeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerPincode: builder.query({
            providesTags: ['dealerPincode'],
            query: (body: PaginationType) => ({
                url: '/dealer-pincode',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addDealerPincode: builder.mutation({
            invalidatesTags: ['dealerPincode'],
            query: (body: DealersPincodeAdd) => ({
                url: '/dealer-pincode/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealerPincode: builder.mutation({
            invalidatesTags: ['dealerPincode'],
            query: ({ body, id }: UpdateDealersPincode) => ({
                url: `/dealer-pincode/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useGetDealerPincodeQuery,
    useAddDealerPincodeMutation,
    useUpdateDealerPincodeMutation,
} = dealerPincodeApi
