// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import {
    AddCartonBoxBarcode,
    UpdateCartonBoxBarcode,
} from 'src/models/CartonBoxBarcode.model'

export const cartonBoxBarcodeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCartonBoxBarcode: builder.query({
            providesTags: ['CartonBoxBarcode'],
            query: (body: PaginationType) => ({
                url: '/cartonbox-barcode',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllCartonBoxBarcode: builder.query({
            providesTags: ['CartonBoxBarcode'],
            query: () => ({
                url: '/cartonbox-barcode',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addCartonBoxBarcode: builder.mutation({
            invalidatesTags: ['CartonBoxBarcode'],
            query: (body: AddCartonBoxBarcode) => ({
                url: '/cartonbox-barcode/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateCartonBoxBarcode: builder.mutation({
            invalidatesTags: ['CartonBoxBarcode'],
            query: ({ body, id }: UpdateCartonBoxBarcode) => ({
                url: `/cartonbox-barcode/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getCartonBoxBarcodeById: builder.query({
            providesTags: ['CartonBoxBarcode'],
            query: (id) => ({
                url: `/cartonbox-barcode/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportCartonBoxBarcodeData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        // **** Delete
        deleteCartonBoxBarcode: builder.mutation({
            invalidatesTags: ['CartonBoxBarcode', 'attributeGroup'],
            query: (id) => ({
                url: `/cartonbox-barcode/${id}`,

                method: 'DELETE',
            }),
        }),

        getByCartonBoxBarcode: builder.query({
            providesTags: ['CartonBoxBarcode'],
            query: (cartonBoxId) => ({
                url: `/cartonbox-barcode/get-by-box/${cartonBoxId}`,
                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetCartonBoxBarcodeQuery,
    useAddCartonBoxBarcodeMutation,
    useUpdateCartonBoxBarcodeMutation,
    useGetCartonBoxBarcodeByIdQuery,
    useExportCartonBoxBarcodeDataMutation,
    useDeleteCartonBoxBarcodeMutation,
    useGetAllCartonBoxBarcodeQuery,
    useGetByCartonBoxBarcodeQuery,
} = cartonBoxBarcodeApi
