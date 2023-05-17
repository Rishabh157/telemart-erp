import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddTabManagement,
    UpdateTabManagement,
} from 'src/models/tabManagement.model'

export const tabManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationTab: builder.query({
            providesTags: ['tab'],
            query: (body: PaginationType) => ({
                url: '/tab',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addTab: builder.mutation({
            invalidatesTags: ['tab'],
            query: (body: AddTabManagement) => ({
                url: '/tab/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateTab: builder.mutation({
            invalidatesTags: ['tab'],
            query: ({ body, id }: UpdateTabManagement) => ({
                url: `/tab/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddTabMutation,
    useGetPaginationTabQuery,
    useUpdateTabMutation,
} = tabManagementApi
