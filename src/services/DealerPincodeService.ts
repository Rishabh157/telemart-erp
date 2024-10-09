// |-- Internal Dependencies --|
import { DealersPincodeAdd, UpdateDealersPincode } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { GetDealerPincode } from 'src/models/DealerPinCode.model'

export const dealerPincodeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerPincode: builder.query({
            providesTags: ['dealerPincode', 'file-picker'],
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
        // **** Get all pincode by district ****/
        getPincodesByDistrict: builder.query({
            providesTags: ['dealerPincode'],
            query: (districtId) => ({
                url: `/pincode/get-district-pincode/${districtId}`,
                method: 'GET',
            }),
        }),
        // **** Get all pincode of a dealer ****/
        getAllPincodeByDealer: builder.query({
            providesTags: ['dealerPincode'],
            query: ({ tehsilid, dealerId }: GetDealerPincode) => ({
                url: `/dealer-pincode/dealer/${dealerId}/tehsil/${tehsilid}`,
                method: 'GET',
            }),
        }),
        // **** Get all pincode of a dealer ****/

        getAllPincodeDealer: builder.query({
            providesTags: ['dealerPincode'],
            query: ({ body, dealerId }: any) => ({
                url: `/dealer-pincode/dealer/${dealerId}/get-scheme-pincode`,
                method: 'POST',

                body,
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
    useGetPincodesByDistrictQuery,
    useGetAllPincodeDealerQuery,
} = dealerPincodeApi
