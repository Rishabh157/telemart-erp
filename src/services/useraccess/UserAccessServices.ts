import apiSlice from '../ApiSlice'
// import { PaginationType } from 'src/models/common/paginationType'
// import { UpdateCartonBoxBarcode } from 'src/models/CartonBoxBarcode.model'
// import { CallerFormBody, UpdateCallerForm } from 'src/models'

export const callerPageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** ADD *****/
        addUserAccess: builder.mutation({
            invalidatesTags: ['callerForm'],
            query: (body: any) => ({
                url: 'user-access/add',
                method: 'POST',
                body,
            }),
        }),

        //***** get *****/
        getUserAccess: builder.query({
            // invalidatesTags: ['callerForm'],
            providesTags: ['callerForm'],
            query: ({
                userId,
                userRole,
            }: {
                userId: string | null
                userRole: string
            }) => {
                let params: any = { userRoleId: userRole }

                if (userId !== null) {
                    params.userId = userId
                }

                return {
                    url: `/user-access`,
                    params,
                    method: 'GET',
                }
            },
        }),

        //***** Update *****/
        updateUserAccess: builder.mutation({
            invalidatesTags: ['callerForm'],
            query: ({ body, userRole }: { body: any; userRole: string }) => ({
                url: `user-access/user-role/${userRole}`,
                method: 'PUT',
                body,
            }),
        }),

        //***** Update by userId *****/
        updateUserAccessByUserId: builder.mutation({
            invalidatesTags: ['callerForm'],
            query: ({ id, body }) => ({
                url: `user-access/${id}`,
                method: 'PUT',
                body: body,
            }),
        }),

        //***** user access already added *****/
        isUserExists: builder.query({
            providesTags: ['callerForm'],
            query: (id) => ({
                url: `user-access/user-exists/${id}`,
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
export const {
    useAddUserAccessMutation,
    useGetUserAccessQuery,
    useUpdateUserAccessMutation,
    useIsUserExistsQuery,
    useUpdateUserAccessByUserIdMutation,
} = callerPageApi
