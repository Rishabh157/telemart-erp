import { DealersPincodeAdd, UpdateDealersPincode } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { GetDealerPincode } from 'src/models/DealerPinCode.model'

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
        //***** deactive *****/
        deactiveDealerPincode: builder.mutation({
            invalidatesTags: ['dealerPincode'],
            query: (id: string) => ({
                url: `/dealer-pincode/status-change/${id}`,
                method: 'PUT',
            }),
        }),
        // **** Get all pincode of a dealer ****/
        getAllPincodeByDealer: builder.query({
            providesTags: ['dealerPincode'],
            query: ({ companyId, dealerId }: GetDealerPincode) => ({
                url: `/dealer-pincode/dealer/${dealerId}/company/${companyId}`,
                method: 'GET',
            }),
        }),
        //****Delete dealer pincode ****/
        deleteDealerPincode: builder.mutation({
            invalidatesTags: ['dealerPincode', 'dealerScheme'],
            query: ({ id, pincode }: { id: string; pincode: string }) => ({
                url: `/dealer-pincode/${id}/pincode/${pincode}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetDealerPincodeQuery,
    useAddDealerPincodeMutation,
    useUpdateDealerPincodeMutation,
    useDeactiveDealerPincodeMutation,
    useGetAllPincodeByDealerQuery,
    useDeleteDealerPincodeMutation,
} = dealerPincodeApi
