import { AddLanguage, UpdateLanguage } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const languageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getLanguage: builder.query({
            providesTags: ['Language'],
            query: (body: PaginationType) => ({
                url: '/language',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllLanguage: builder.query({
            providesTags: ['Language'],
            query: () => ({
                url: `/language`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addLanguage: builder.mutation({
            invalidatesTags: ['Language'],
            query: (body: AddLanguage) => ({
                url: '/language/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateLanguage: builder.mutation({
            invalidatesTags: ['Language'],
            query: ({ body, id }: UpdateLanguage) => ({
                url: `/language/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getLanguageById: builder.query({
            providesTags: ['Language'],
            query: (id) => ({
                url: `/language/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportLanguageData: builder.mutation({
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
        deleteLanguage: builder.mutation({
            invalidatesTags: ['Language'],
            query: (id) => ({
                url: `/language/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetLanguageQuery,
    useAddLanguageMutation,
    useUpdateLanguageMutation,
    useGetLanguageByIdQuery,
    useExportLanguageDataMutation,
    useDeleteLanguageMutation,
    useGetAllLanguageQuery,
} = languageApi
