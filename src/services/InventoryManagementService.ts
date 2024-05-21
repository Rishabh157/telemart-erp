// |-- Internal Dependencies --|
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import {
    addInventoryManagement,
    UpdateInventoryManagement,
    //UpdatePOApprovalLevel,
} from 'src/models/InventoryManagement.model'

export const inventoryManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: (body: PaginationType) => ({
                url: '/inventory-management',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: () => ({
                url: '/inventory-management',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: (body: addInventoryManagement) => ({
                url: '/inventory-management/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: ({ body, id }: UpdateInventoryManagement) => ({
                url: `/inventory-management/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getInventoryManagementById: builder.query({
            providesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteInventoryManagement: builder.mutation({
            invalidatesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'DELETE',
            }),
        }),

        getByIdInventoryManagement: builder.query({
            providesTags: ['inventoryManagement'],
            query: (id) => ({
                url: `/inventory-management/${id}`,
                method: 'get',
            }),
        }),
    }),
})
export const {
    useGetInventoryManagementQuery,
    useGetAllInventoryManagementQuery,
    useAddInventoryManagementMutation,
    useUpdateInventoryManagementMutation,
    useGetInventoryManagementByIdQuery,
    useDeleteInventoryManagementMutation,
    useGetByIdInventoryManagementQuery,
} = inventoryManagementApi
