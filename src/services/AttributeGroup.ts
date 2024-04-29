// |-- Internal Dependencies --|
import { AddAttributesGroup, UpdateAttributesGroup } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const attributeGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getAttributeGroup: builder.query({
            providesTags: ['attributeGroup'],
            query: (body: PaginationType) => ({
                url: '/attributes-group',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllAttributeGroup: builder.query({
            providesTags: ['attributeGroup'],
            query: (companyId) => ({
                url: `/attributes-group/comapny/${companyId}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addAttributeGroup: builder.mutation({
            invalidatesTags: ['attributeGroup'],
            query: (body: AddAttributesGroup) => ({
                url: '/attributes-group/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateattributeGroup: builder.mutation({
            invalidatesTags: ['attributeGroup'],
            query: ({ body, id }: UpdateAttributesGroup) => ({
                url: `/attributes-group/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getattributeGroupById: builder.query({
            providesTags: ['attributeGroup'],
            query: (id) => ({
                url: `/attributes-group/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportattributeGroupData: builder.mutation({
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
        deleteattributeGroup: builder.mutation({
            invalidatesTags: ['attributeGroup'],
            query: (id) => ({
                url: `/attributes-group/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetAttributeGroupQuery,
    useAddAttributeGroupMutation,
    useUpdateattributeGroupMutation,
    useGetattributeGroupByIdQuery,
    useExportattributeGroupDataMutation,
    useDeleteattributeGroupMutation,
    useGetAllAttributeGroupQuery,
} = attributeGroupApi
