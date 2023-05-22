import { PaginationType } from 'src/models/common/paginationType'
import { AddArtist, UpdateArtist } from 'src/models/index'
import apiSlice from '../ApiSlice'

export const artistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getPaginationArtist: builder.query({
            providesTags: ['artist'],
            query: (body: PaginationType) => ({
                url: '/artist',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SINGLE DATA *****/
        getArtistById: builder.query({
            providesTags: ['artist'],
            query: (id) => ({
                url: `/artist/${id}`,
                method: 'GET',
            }),
        }),

        //***** GET SINGLE DATA *****/
        deletegetArtist: builder.mutation({
            invalidatesTags: ['artist'],
            query: (id) => ({
                url: `/artist/${id}`,
                method: 'DELETE',
            }),
        }),

        //***** ADD *****/
        addArtist: builder.mutation({
            invalidatesTags: ['artist'],
            query: (body: AddArtist) => ({
                url: '/artist/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateArtist: builder.mutation({
            invalidatesTags: ['artist'],
            query: ({ body, id }: UpdateArtist) => ({
                url: `/artist/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const {
    useAddArtistMutation,
    useGetPaginationArtistQuery,
    useUpdateArtistMutation,
    useGetArtistByIdQuery,
    useDeletegetArtistMutation,
} = artistApi
