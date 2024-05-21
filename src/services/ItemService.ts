// |-- Internal Dependencies --|
import { AddItem, UpdateItem } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const itemsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getItems: builder.query({
            providesTags: ['Items'],
            query: (body: PaginationType) => ({
                url: '/item',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllItems: builder.query({
            providesTags: ['Items'],
            query: (companyId) => ({
                url: `/item`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addItems: builder.mutation({
            invalidatesTags: ['Items'],
            query: (body: AddItem) => ({
                url: '/item/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateItems: builder.mutation({
            invalidatesTags: ['Items'],
            query: ({ body, id }: UpdateItem) => ({
                url: `/item/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getItemsById: builder.query({
            providesTags: ['Items'],
            query: (id) => ({
                url: `/item/${id}`,

                method: 'GET',
            }),
        }),

        // **** Delete
        deleteItems: builder.mutation({
            invalidatesTags: ['Items'],
            query: (id) => ({
                url: `/item/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetItemsQuery,
    useAddItemsMutation,
    useUpdateItemsMutation,
    useGetItemsByIdQuery,
    useDeleteItemsMutation,
    useGetAllItemsQuery,
} = itemsApi
