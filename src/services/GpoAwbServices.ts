// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const gpoAwbApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getGpoAwb: builder.query({
            providesTags: ['awb-master'],
            query: (body: PaginationType) => ({
                url: '/awb-master',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addGpoAwbExcelSheet: builder.mutation({
            invalidatesTags: ['awb-master'],
            query: (body: any) => ({
                url: '/awb-master/add',
                method: 'POST',
                body,
            }),
        }),
    }),
})
export const { useGetGpoAwbQuery, useAddGpoAwbExcelSheetMutation } = gpoAwbApi
