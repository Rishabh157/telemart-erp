import apiSlice from '../ApiSlice'
// import { PaginationType } from 'src/models/common/paginationType'
// import { UpdateCartonBoxBarcode } from 'src/models/CartonBoxBarcode.model'
// import { CallerFormBody, UpdateCallerForm } from 'src/models'

export const callerPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        //***** ADD *****/
        addUserAccess: builder.mutation({
            // invalidatesTags: ['callerForm'],
            query: (body: any) => ({
                url: 'user-access/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        getUserAccess: builder.query({
            // invalidatesTags: ['callerForm'],
            query: ({ userRole }: { userRole: string }) => ({
                url: `/user-access`,
                params:{userRoleId:userRole},
                method: 'GET',

            }),
        }),

        // // **** Delete
        // deleteCartonBoxBarcode: builder.mutation({
        //     invalidatesTags: ['CartonBoxBarcode', 'attributeGroup'],
        //     query: (id) => ({
        //         url: `/cartonbox-barcode/${id}`,

        //         method: 'DELETE',
        //     }),
        // }),
    }),
})
export const { useAddUserAccessMutation, useGetUserAccessQuery } =
    callerPageApi
