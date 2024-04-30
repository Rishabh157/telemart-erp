// |-- Internal Dependencies --|
import { AddCallCenterMaster, UpdateCallCenterMaster } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const CallCenterMasterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getCallCenterMaster: builder.query({
            providesTags: ['CallCenterMaster'],
            query: (body: PaginationType) => ({
                url: '/call-center',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllCallCenterMaster: builder.query({
            providesTags: ['CallCenterMaster'],
            query: (companyId) => ({
                url: `/call-center/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addCallCenterMaster: builder.mutation({
            invalidatesTags: ['CallCenterMaster'],
            query: (body: AddCallCenterMaster) => ({
                url: '/call-center/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateCallCenterMaster: builder.mutation({
            invalidatesTags: ['CallCenterMaster'],
            query: ({ body, id }: UpdateCallCenterMaster) => ({
                url: `/call-center/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getCallCenterMasterById: builder.query({
            providesTags: ['CallCenterMaster'],
            query: (id) => ({
                url: `/call-center/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportCallCenterMasterData: builder.mutation({
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
        deleteCallCenterMaster: builder.mutation({
            invalidatesTags: ['CallCenterMaster', 'call-centerGroup'],
            query: (id) => ({
                url: `/call-center/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetCallCenterMasterQuery,
    useGetAllCallCenterMasterQuery,
    useAddCallCenterMasterMutation,
    useUpdateCallCenterMasterMutation,
    useGetCallCenterMasterByIdQuery,
    useExportCallCenterMasterDataMutation,
    useDeleteCallCenterMasterMutation,
} = CallCenterMasterApi
