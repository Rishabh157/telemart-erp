import { AddInventory, UpdateInventory } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const inventoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationInventories: builder.query({
            providesTags: ['inventories'],
            query: (body: PaginationType) => ({
                url: '/inventories',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addInventories: builder.mutation({
            invalidatesTags: ['inventories','Barcode'],
            query: (body: AddInventory) => ({
                url: '/inventories/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInventories: builder.mutation({
            invalidatesTags: ['inventories'],
            query: ({ body, id }: UpdateInventory) => ({
                url: `/inventories/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddInventoriesMutation,
    useUpdateInventoriesMutation,
    useGetPaginationInventoriesQuery,
} = inventoriesApi
