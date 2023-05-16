import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import {
    AddTabManagement,
    UpdateTabManagement,
} from 'src/models/tabManagement.model'

export const TabManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationTab: builder.query({
            providesTags: ['Tab'],
            query: (body: PaginationType) => ({
                url: '/Tab',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addTab: builder.mutation({
            invalidatesTags: ['Tab'],
            query: (body: AddTabManagement) => ({
                url: '/Tab/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateTab: builder.mutation({
            invalidatesTags: ['Tab'],
            query: ({ body, id }: UpdateTabManagement) => ({
                url: `/Tab/${id}`,
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
} = TabManagementApi
