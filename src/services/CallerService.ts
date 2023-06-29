import apiSlice from './ApiSlice'
// import { PaginationType } from 'src/models/common/paginationType'
// import { UpdateCartonBoxBarcode } from 'src/models/CartonBoxBarcode.model'
// import { CallerFormBody, UpdateCallerForm } from 'src/models'

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

        //***** ADD *****/
        addCallerForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: (body: any) => ({
                url: '/call/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateCallerForm: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: ({ body, id }) => ({
                url: `/call/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // // **** Delete
        // deleteCartonBoxBarcode: builder.mutation({
        //     invalidatesTags: ['CartonBoxBarcode', 'attributeGroup'],
        //     query: (id) => ({
        //         url: `/cartonbox-barcode/${id}`,

        //         method: 'DELETE',
        //     }),
        // }),
    }),
})
export const { useAddCallerFormMutation, useUpdateCallerFormMutation } =
    callerPageApi
