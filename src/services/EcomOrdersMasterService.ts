// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const EcomOrdersMasterService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET AMAZON *****/
        getAmzoneOrders: builder.query({
            providesTags: ['amazon-order'],
            query: (body: PaginationType) => ({
                url: '/amazon-order',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD AMAZON *****/
        addAmzoneOrderSheet: builder.mutation({
            invalidatesTags: ['amazon-order'],
            query: (body: any) => ({
                url: '/amazon-order/add',
                method: 'POST',
                body,
            }),
        }),

        //***** GET FLIPKART *****/
        getFlipkartOrders: builder.query({
            providesTags: ['flipkart-order'],
            query: (body: PaginationType) => ({
                url: '/flipkart-order',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD FLIPKART *****/
        addFlipkartOrderSheet: builder.mutation({
            invalidatesTags: ['flipkart-order'],
            query: (body: any) => ({
                url: '/flipkart-order/add',
                method: 'POST',
                body,
            }),
        }),

        //***** UPDATE STATUS OF AMAZON & FLIPKART *****/
        updateEcomOrderSheet: builder.mutation({
            invalidatesTags: ['amazon-order', 'flipkart-order'],
            query: (body: any) => ({
                url: '/amazon-order/update-status',
                method: 'POST',
                body,
            }),
        }),

        //***** SCAN ORDER *****/
        getBarcodeOfEcomOrder: builder.mutation({
            // invalidatesTags: ['amazon-order', 'flipkart-order'],
            query: ({ barcodeNumber, type }) => ({
                url: `/bar-code/dispatch-ecom-order-barcode/${barcodeNumber}/type/${type}`,
                method: 'GET',
            }),
        }),

        //***** DISPATCHED BARCODE *****/
        dispatchBarcodeOfEcomOrder: builder.mutation({
            invalidatesTags: ['amazon-order', 'flipkart-order'],
            query: (body) => ({
                url: '/bar-code/dispatch-ecom-orders',
                method: 'POST',
                body,
            }),
        }),

        //***** RTO DISPATCHED ORDER *****/
        dispatchRTOEcomOrder: builder.mutation({
            invalidatesTags: ['amazon-order', 'flipkart-order'],
            query: (body) => ({
                url: '/bar-code/ecom-rto',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const {
    useGetAmzoneOrdersQuery,
    useAddAmzoneOrderSheetMutation,
    useGetFlipkartOrdersQuery,
    useAddFlipkartOrderSheetMutation,
    useUpdateEcomOrderSheetMutation,
    useGetBarcodeOfEcomOrderMutation,
    useDispatchBarcodeOfEcomOrderMutation,
    useDispatchRTOEcomOrderMutation
} = EcomOrdersMasterService
