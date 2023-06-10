import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddAssetsRequest, UpdateAssetsRequest } from 'src/models/index'

export const assetsRequestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAssetsRequest: builder.query({
            providesTags: ['AssetsRequest'],
            query: (body: PaginationType) => ({
                url: '/asset',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAssetsRequest: builder.query({
            providesTags: ['AssetsRequest'],
            query: () => ({
                url: '/asset',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAssetsRequest: builder.mutation({
            invalidatesTags: ['AssetsRequest'],
            query: (body: AddAssetsRequest) => ({
                url: '/asset/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateAssetsRequest: builder.mutation({
            invalidatesTags: ['AssetsRequest'],
            query: ({ body, id }: UpdateAssetsRequest) => ({
                url: `/asset/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getAssetsRequestById: builder.query({
            providesTags: ['AssetsRequest'],
            query: (id) => ({
                url: `/asset/${id}`,

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
            invalidatesTags: ['AssetsRequest'],
            query: (id) => ({
                url: `/asset/${id}`,

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
