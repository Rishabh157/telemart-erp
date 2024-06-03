// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const courierReturnApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCourierReturn: builder.query({
            providesTags: ['courier-return'],
            query: (body: PaginationType) => ({
                url: '/courier-rto',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL *****/
        getAllCourierReturn: builder.query({
            providesTags: ['courier-return'],
            query: () => ({
                url: '/courier-rto',
                method: 'POST',
            }),
        }),

        //***** GET ALL INWARD INVETORIES STATUS *****/
        getInwardInventrioesStatus: builder.query({
            providesTags: ['courier-return'],
            query: ({ warehouseId, body }) => ({
                url: `/courier-rto/get-courier-return-status/${warehouseId}`,
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addCourierReturn: builder.mutation({
            invalidatesTags: ['courier-return'],
            query: (body) => ({
                url: `/courier-rto/add`,
                method: 'POST',
                body,
            }),
        }),

        //***** BULK ADD *****/
        addCourierReturnExcelSheet: builder.mutation({
            invalidatesTags: ['courier-return'],
            query: ({ warehouseId, body }) => ({
                url: `/courier-rto/bulk-upload/warehouseId/${warehouseId}`,
                method: 'POST',
                body,
            }),
        }),

        //***** CHANGE REQUEST STATUS *****/
        changeRequestStatus: builder.mutation({
            invalidatesTags: ['courier-return'],
            query: ({ _id, body }) => ({
                url: `/courier-rto/change-request-status/${_id}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update *****/
        updateCourierReturn: builder.mutation({
            invalidatesTags: ['courier-return'],
            query: ({ body }: any) => ({
                url: `/courier-rto`,
                method: 'PUT',
                body: { data: body },
            }),
        }),
    }),
})
export const {
    useGetCourierReturnQuery,
    useGetAllCourierReturnQuery,
    useGetInwardInventrioesStatusQuery,
    useAddCourierReturnMutation,
    useAddCourierReturnExcelSheetMutation,
    useChangeRequestStatusMutation,
    useUpdateCourierReturnMutation,
} = courierReturnApi
