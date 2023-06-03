import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from '../ApiSlice'
import { AddInfluencer, UpdateInfluencer } from 'src/models/website/Influencer.model'

export const InfluencerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationInfluencer: builder.query({
            providesTags: ['influencer-management'],
            query: (body: PaginationType) => ({
                url: '/influencer-management',
                method: 'POST',
                body,
            }),
        }),

        //***** GET All DATA *****/
        getAllInfluencer: builder.query({
            providesTags: ['influencer-management'],
            query: () => ({
                url: `/influencer-management`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        getInfluencerById: builder.query({
            providesTags: ['influencer-management'],
            query: (id) => ({
                url: `/influencer-management/${id}`,
                method: 'GET',
            }),
        }),

        //***** DELETE SINGLE DATA *****/
        deletegetInfluencer: builder.mutation({
            invalidatesTags: ['influencer-management'],
            query: (id) => ({
                url: `/influencer-management/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addInfluencer: builder.mutation({
            invalidatesTags: ['influencer-management'],
            query: (body: AddInfluencer) => ({
                url: '/influencer-management/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateInfluencer: builder.mutation({
            invalidatesTags: ['influencer-management'],
            query: ({ body, id }: UpdateInfluencer) => ({
                url: `/influencer-management/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddInfluencerMutation,
    useGetPaginationInfluencerQuery,
    useUpdateInfluencerMutation,
    useGetAllInfluencerQuery,
    useGetInfluencerByIdQuery,
    useDeletegetInfluencerMutation,
} = InfluencerApi
