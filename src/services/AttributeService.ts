import { AddAttributes, UpdateAttributes } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const attributesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAttributes: builder.query({
            providesTags: ['attributes'],
            query: (body: PaginationType) => ({
                url: '/attribute',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAttributes: builder.query({
            providesTags: ['attributes'],
            query: (companyId) => ({
                url: `/attribute/company/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAttributes: builder.mutation({
            invalidatesTags: ['attributes'],
            query: (body: AddAttributes) => ({
                url: '/attribute/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateattributes: builder.mutation({
            invalidatesTags: ['attributes'],
            query: ({ body, id }: UpdateAttributes) => ({
                url: `/attribute/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getattributesById: builder.query({
            providesTags: ['attributes'],
            query: (id) => ({
                url: `/attribute/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportattributesData: builder.mutation({
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
        deleteattributes: builder.mutation({
            invalidatesTags: ['attributes', 'attributeGroup'],
            query: (id) => ({
                url: `/attribute/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAttributesQuery,
    useAddAttributesMutation,
    useUpdateattributesMutation,
    useGetattributesByIdQuery,
    useExportattributesDataMutation,
    useDeleteattributesMutation,
    useGetAllAttributesQuery,
} = attributesApi
