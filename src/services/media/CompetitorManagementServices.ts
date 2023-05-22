import { PaginationType } from 'src/models/common/paginationType'
import {
    AddCompetitorManagement,
    UpdateCompetitorManagement,
} from 'src/models/index'
import apiSlice from '../ApiSlice'

export const competitorManagementApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationcompetitor: builder.query({
            providesTags: ['competitor'],
            query: (body: PaginationType) => ({
                url: '/competitor',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SINGLE DATA *****/
        getCompetitorById: builder.query({
            providesTags: ['competitor'],
            query: (id) => ({
                url: `/competitor/${id}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addcompetitor: builder.mutation({
            invalidatesTags: ['competitor'],
            query: (body: AddCompetitorManagement) => ({
                url: '/competitor/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updatecompetitor: builder.mutation({
            invalidatesTags: ['competitor'],
            query: ({ body, id }: UpdateCompetitorManagement) => ({
                url: `/competitor/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddcompetitorMutation,
    useGetPaginationcompetitorQuery,
    useUpdatecompetitorMutation,
    useGetCompetitorByIdQuery,
} = competitorManagementApi
