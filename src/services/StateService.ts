// |-- Internal Dependencies --|
import { UpdateState, AddState } from './../models/State.model'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const stateApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getState: builder.query({
            providesTags: ['State'],
            query: (body: PaginationType) => ({
                url: '/state',
                method: 'POST',
                body,
            }),
        }),

        //***** GET BY COUNTRY ID*****/
        getAllStateByCountry: builder.query({
            providesTags: ['State'],
            query: (id) => ({
                url: `/state/get-country-state/${id}`,
                method: 'GET',
                // body,
            }),
        }),

        //***** GET *****/
        getAllState: builder.query({
            providesTags: ['State'],
            query: () => ({
                url: '/state',
                method: 'GET',
                // body,
            }),
        }),

        getByAllStateUnauth: builder.query({
            providesTags: ['State'],
            query: () => ({
                url: `/state/unauth-state`,
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        AddState: builder.mutation({
            invalidatesTags: ['State'],
            query: (body: AddState) => ({
                url: '/state/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateState: builder.mutation({
            invalidatesTags: ['State'],
            query: ({ id, body }: UpdateState) => ({
                url: `/state/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // **** GET BY ID
        getStateById: builder.query({
            providesTags: ['State'],
            query: (id) => ({
                url: `/state/${id}`,
                method: 'GET',
            }),
        }),

        // **** Delete
        deleteState: builder.mutation({
            invalidatesTags: ['State', 'areaGroup'],
            query: (id) => ({
                url: `/state/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetStateQuery,
    useAddStateMutation,
    useUpdateStateMutation,
    useGetStateByIdQuery,
    useDeleteStateMutation,
    useGetAllStateQuery,
    useGetAllStateByCountryQuery,
    useGetByAllStateUnauthQuery,
} = stateApi
