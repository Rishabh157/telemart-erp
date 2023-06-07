import { AddDealersCategory, UpdateDealersCategory } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getDealerCategory: builder.query({
            providesTags: ['DealerCategory'],
            query: (body: PaginationType) => ({
                url: '/dealers-category',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllDealerCategory: builder.query({
            providesTags: ['DealerCategory'],
            query: (companyId) => ({
                url: `/dealers-category/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addDealerCategory: builder.mutation({
            invalidatesTags: ['DealerCategory'],
            query: (body: AddDealersCategory) => ({
                url: '/dealers-category/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealerCategory: builder.mutation({
            invalidatesTags: ['DealerCategory'],
            query: ({ body, id }: UpdateDealersCategory) => ({
                url: `/dealers-category/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getDealerCategoryById: builder.query({
            providesTags: ['DealerCategory'],
            query: (id) => ({
                url: `/dealers-category/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportDealerCategoryData: builder.mutation({
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
        deleteDealerCategory: builder.mutation({
            invalidatesTags: ['DealerCategory', 'attributeGroup'],
            query: (id) => ({
                url: `/dealers-category/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetDealerCategoryQuery,
    useAddDealerCategoryMutation,
    useUpdateDealerCategoryMutation,
    useGetDealerCategoryByIdQuery,
    useExportDealerCategoryDataMutation,
    useDeleteDealerCategoryMutation,
    useGetAllDealerCategoryQuery,
} = dealerCategoryApi
