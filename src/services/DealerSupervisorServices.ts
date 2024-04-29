// |-- Internal Dependencies --|
import { DealersSupervisorAdd, UpdateDealersSupervisor } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const dealerSupervisorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/
        getDealerSupervisor: builder.query({
            providesTags: ['dealerSupervisor'],
            query: (body: PaginationType) => ({
                url: '/zonal-manager',
                method: 'POST',
                body,
            }),
        }),

        //***** GET ALL DATA *****/
        getAllDealerSupervisor: builder.query({
            providesTags: ['dealerSupervisor'],
            query: () => ({
                url: '/zonal-manager',
                method: 'GET',
                // body,
            }),
        }),

        //***** ADD *****/
        addDealerSupervisor: builder.mutation({
            invalidatesTags: ['dealerSupervisor'],
            query: (body: DealersSupervisorAdd) => ({
                url: '/zonal-manager/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateDealerSupervisor: builder.mutation({
            invalidatesTags: ['dealerSupervisor'],
            query: ({ body, id }: UpdateDealersSupervisor) => ({
                url: `/zonal-manager/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** delete *****/
        deleteDealerSupervisor: builder.mutation({
            invalidatesTags: ['dealerSupervisor'],
            query: (id: string) => ({
                url: `/zonal-manager/${id}`,
                method: 'DELETE',
            }),
        }),
        //***** deactive *****/
        deactiveDealerSupervisor: builder.mutation({
            invalidatesTags: ['dealerSupervisor'],
            query: (id: string) => ({
                url: `/zonal-manager/status-change/${id}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useGetDealerSupervisorQuery,
    useGetAllDealerSupervisorQuery,
    useAddDealerSupervisorMutation,
    useUpdateDealerSupervisorMutation,
    useDeleteDealerSupervisorMutation,
    useDeactiveDealerSupervisorMutation,
} = dealerSupervisorApi
