// import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { CallerFormBody } from 'src/models'

export const callerPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        // getCartonBoxBarcode: builder.query({
        //     providesTags: ['CartonBoxBarcode'],
        //     query: (body: PaginationType) => ({
        //         url: '/cartonbox-barcode',
        //         method: 'POST',
        //         body,
        //     }),
        // }),

        //***** GET *****/
        // getAllCartonBoxBarcode: builder.query({
        //     providesTags: ['CartonBoxBarcode'],
        //     query: () => ({
        //         url: '/cartonbox-barcode',
        //         method: 'GET',
        //         // body,
        //     }),
        // }),

        //***** ADD *****/
        addCallerForm: builder.mutation({
            // invalidatesTags: ['CartonBoxBarcode'],
            query: (body: any) => ({
                url: '/call/add',
                method: 'POST',
                body,
            }),
        }),

        // //***** Update *****/
        // updateCartonBoxBarcode: builder.mutation({
        //     invalidatesTags: ['CartonBoxBarcode'],
        //     query: ({ body, id }: UpdateCartonBoxBarcode) => ({
        //         url: `/cartonbox-barcode/${id}`,

        //         method: 'PUT',
        //         body,
        //     }),
        // }),

        // // **** Delete
        // deleteCartonBoxBarcode: builder.mutation({
        //     invalidatesTags: ['CartonBoxBarcode', 'attributeGroup'],
        //     query: (id) => ({
        //         url: `/cartonbox-barcode/${id}`,

        //         method: 'DELETE',
        //     }),
        // }),

        // getByCartonBoxBarcode: builder.query({
        //     providesTags: ['CartonBoxBarcode'],
        //     query: (cartonBoxId) => ({
        //         url: `/cartonbox-barcode/get-by-box/${cartonBoxId}`,
        //         method: 'GET',
        //     }),
        // }),
    }),
})
export const {
    useAddCallerFormMutation,
    //     useAddCartonBoxBarcodeMutation,
    //     useUpdateCartonBoxBarcodeMutation,
    //     useGetCartonBoxBarcodeByIdQuery,
    //     useExportCartonBoxBarcodeDataMutation,
    //     useDeleteCartonBoxBarcodeMutation,
    //     useGetAllCartonBoxBarcodeQuery,
    //     useGetByCartonBoxBarcodeQuery,
} = callerPageApi
