// |-- Internal Dependencies --|
import {
    AddWarehouseToComapny,
    UpdateWarehouseToComapny,
    UpdateSOApprovalLevel,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'
import { UpdateWarehouseToComapnyApproval } from 'src/models/WarehouseToComapny.model'

export const WarehouseToComapnyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationWarehouseToComapny: builder.query({
            providesTags: ['WarehouseToComapny'],
            query: (body: PaginationType) => ({
                url: '/wtc-master',
                method: 'POST',
                body,
            }),
        }),

        //***** GET PAGINATION DATA WITH PRODUCT GROUP *****/
        getPaginationWarehouseToComapnyByGroup: builder.query({
            providesTags: ['WarehouseToComapny'],
            query: (body: PaginationType) => ({
                url: '/wtc-master/groupby',
                method: 'POST',
                body,
            }),
        }),

        //***** GET WarehouseToComapny BY DEALER-ID DATA *****/
        getWarehouseToComapnyByDealerId: builder.query({
            providesTags: ['WarehouseToComapny'],
            query: (dealerId) => ({
                url: `/wtc-master/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addWarehouseToComapny: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: (body: AddWarehouseToComapny) => ({
                url: '/wtc-master/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateWarehouseToComapny: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: ({ body, id }: UpdateWarehouseToComapny) => ({
                url: `/wtc-master/update-wtc`,
                method: 'PUT',
                body: { wtcData: [...body] },
            }),
        }),

        //***** Update *****/
        updateWarehouseToComapnyApproval: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: ({ body, id }: UpdateWarehouseToComapnyApproval) => ({
                url: `/wtc-master/approval-level/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** Update *****/
        updateSoLevel: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: ({ body, id }: UpdateSOApprovalLevel) => ({
                url: `/wtc-master/approval-level/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteWarehouseToComapny: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: (id) => ({
                url: `/wtc-master/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getWarehouseToComapnyById: builder.query({
            providesTags: ['WarehouseToComapny'],
            query: (id) => ({
                url: `/wtc-master/${id}`,
                method: 'GET',
            }),
        }),

        //***** Dispached Barcode *****/
        dispatchWarehouseToCompanyBarcode: builder.mutation({
            invalidatesTags: ['WarehouseToComapny'],
            query: (body: any) => ({
                url: `bar-code/wtc/outwardinventory`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useGetPaginationWarehouseToComapnyQuery,
    useGetPaginationWarehouseToComapnyByGroupQuery,
    useGetWarehouseToComapnyByDealerIdQuery,
    useAddWarehouseToComapnyMutation,
    useUpdateWarehouseToComapnyMutation,
    useUpdateWarehouseToComapnyApprovalMutation,
    useGetWarehouseToComapnyByIdQuery,
    useDeleteWarehouseToComapnyMutation,
    useUpdateSoLevelMutation,
    useDispatchWarehouseToCompanyBarcodeMutation,
} = WarehouseToComapnyApi
