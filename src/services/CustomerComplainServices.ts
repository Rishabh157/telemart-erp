// |-- Internal Dependencies --|import apiSlice from './ApiSlice'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const customerComplainApi = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        //***** GET *****/
        getComplaint: builder.query({
            providesTags: ['complaint'],
            query: (body: PaginationType) => ({
                url: '/complaint',
                method: 'POST',
                body,
            }),
        }),

        //***** GET Complaint By Mobile No *****/
        getComplaintByMobileNo: builder.query({
            providesTags: ['complaint'],
            query: (mobileNo: string) => ({
                url: `/complaint/get-by-number/${mobileNo}`,
                method: 'GET',
            }),
        }),

        //***** Search Complaint *****/
        getCustomerComplainDetailsBySearch: builder.mutation({
            // providesTags: ['complaint'],
            query: (body: any) => ({
                url: '/order-inquiry/get-customer-info',
                method: 'POST',
                body,
            }),
        }),

        //***** GET By Id *****/
        getComplaintById: builder.query({
            query: (id: string) => ({
                url: `/complaint/${id}`,
                method: 'GET',
            }),
        }),

        //***** Add Complain *****/
        addCustomerComplain: builder.mutation({
            invalidatesTags: ['complaint'],
            query: (body: any) => ({
                url: '/complaint/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update Complain *****/
        updateCustomerComplain: builder.mutation({
            invalidatesTags: ['complaint'],
            query: ({ id, body }: any) => ({
                url: `/complaint/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** View Single Complain Logs *****/
        getComplaintLogsById: builder.query({
            providesTags: ['complaint'],
            query: (id: string) => ({
                url: `/complaint-logs/get/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetComplaintQuery,
    useGetComplaintByMobileNoQuery,
    useGetCustomerComplainDetailsBySearchMutation,
    useGetComplaintByIdQuery,
    useAddCustomerComplainMutation,
    useUpdateCustomerComplainMutation,
    useGetComplaintLogsByIdQuery,
} = customerComplainApi
