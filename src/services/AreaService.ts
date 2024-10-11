// |-- Internal Dependencies --|
import { AddArea, AddMultipleArea, UpdateArea } from 'src/models/Area.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const areaApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getArea: builder.query({
            providesTags: ['Area'],
            query: (body: PaginationType) => ({
                url: '/area',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllArea: builder.query({
            providesTags: ['Area'],
            query: () => ({
                url: '/area',
                method: 'GET',
                // body,
            }),
        }),

        getAllAreaUnauth: builder.query({
            providesTags: ['Area'],
            query: (id) => ({
                url: `area/get-area-by-pincode/unauth/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        getAllAreaByPincode: builder.query({
            providesTags: ['Area'],
            query: (id) => ({
                url: `area/get-area-by-pincode/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addArea: builder.mutation({
            invalidatesTags: ['Area'],
            query: (body: AddArea) => ({
                url: '/area/add',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD Multiple *****/
        addMultipleArea: builder.mutation({
            invalidatesTags: ['Area'],
            query: (body: AddMultipleArea) => ({
                url: '/area/multi-add',
                method: 'POST',
                body,
            }),
        }),

        //**** Update ****/
        updateArea: builder.mutation({
            invalidatesTags: ['Area'],
            query: ({ body, id }: UpdateArea) => ({
                url: `/area/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAreaById: builder.query({
            providesTags: ['Area'],
            query: (id) => ({
                url: `/area/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteArea: builder.mutation({
            invalidatesTags: ['Area', 'areaGroup'],
            query: (id) => ({
                url: `/area/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAreaQuery,
    useAddAreaMutation,
    useAddMultipleAreaMutation,
    useUpdateAreaMutation,
    useGetAreaByIdQuery,
    useDeleteAreaMutation,
    useGetAllAreaQuery,
    useGetAllAreaUnauthQuery,
    useGetAllAreaByPincodeQuery,
} = areaApi
