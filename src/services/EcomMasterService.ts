// |-- Internal Dependencies --|
import { AddEcomMaster, UpdateEcomMaster } from './../models/EcomMaster.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const ecomMasterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getEcomMaster: builder.query({
            providesTags: ['ecom-master'],
            query: (body: PaginationType) => ({
                url: '/ecom-master',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllEcomMaster: builder.query({
            providesTags: ['ecom-master'],
            query: () => ({
                url: `/ecom-master`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addEcomMaster: builder.mutation({
            invalidatesTags: ['ecom-master'],
            query: (body: AddEcomMaster) => ({
                url: '/ecom-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateEcomMaster: builder.mutation({
            invalidatesTags: ['ecom-master'],
            query: ({ body, id }: UpdateEcomMaster) => ({
                url: `/ecom-master/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getEcomMasterById: builder.query({
            providesTags: ['ecom-master'],
            query: (id) => ({
                url: `/ecom-master/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteEcomMaster: builder.mutation({
            invalidatesTags: ['ecom-master'],
            query: (id: any) => ({
                url: `/ecom-master/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetEcomMasterQuery,
    useAddEcomMasterMutation,
    useUpdateEcomMasterMutation,
    useGetEcomMasterByIdQuery,
    useDeleteEcomMasterMutation,
} = ecomMasterApi
