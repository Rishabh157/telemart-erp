import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL_FILE_PICKER } from 'src/utils/constants'

export const filePickerSlice = createApi({
    reducerPath: 'filePickerSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL_FILE_PICKER}`,
    }),
    // tagTypes: tagTypes,
    endpoints: (builder) => ({
        // ADD
        addFileUrl: builder.mutation({
            query: (body) => ({
                url: '/upload',
                method: 'POST',
                body,
            }),
        }),
        uploadDealerPincode: builder.mutation({
            query: ({ userId, body }) => ({
                url: '/upload-dealer-pincode',
                method: 'POST',
                body,
                params: { userId },
            }),
        }),
        uploadDealerScheme: builder.mutation({
            query: ({ userId, body }) => ({
                url: '/upload-dealer-scheme',
                method: 'POST',
                body,
                params: { userId },
            }),
        }),
    }),
})

export const { useAddFileUrlMutation, useUploadDealerPincodeMutation,useUploadDealerSchemeMutation } =
    filePickerSlice
