import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddAssetsRequest,
    UpdateAssetsRequest,
} from 'src/models/assets/AssetsRequest.model'

export const assetsRequestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAssetsRequest: builder.query({
            providesTags: ['AssetsRequest'],
            query: (body: PaginationType) => ({
                url: '/assets-request',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAssetsRequest: builder.query({
            providesTags: ['AssetsRequest'],
            query: () => ({
                url: '/assets-request',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAssetsRequest: builder.mutation({
            invalidatesTags: ['AssetsRequest'],
            query: (body: AddAssetsRequest) => ({
                url: '/assets-request/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateAssetsRequest: builder.mutation({
            invalidatesTags: ['AssetsRequest'],
            query: ({ body, id }: UpdateAssetsRequest) => ({
                url: `/assets-request/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAssetsRequestById: builder.query({
            providesTags: ['AssetsRequest'],
            query: (id) => ({
                url: `/assets-request/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportAssetsRequestData: builder.mutation({
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
        deleteAssetsRequest: builder.mutation({
            invalidatesTags: ['AssetsRequest', 'assets-requestGroup'],
            query: (id) => ({
                url: `/assets-request/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAssetsRequestQuery,
    useAddAssetsRequestMutation,
    useUpdateAssetsRequestMutation,
    useGetAssetsRequestByIdQuery,
    useExportAssetsRequestDataMutation,
    useDeleteAssetsRequestMutation,
    useGetAllAssetsRequestQuery,
} = assetsRequestApi
