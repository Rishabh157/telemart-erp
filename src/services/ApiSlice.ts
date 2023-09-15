/// ==============================================
// Filename:ApiService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Internal Dependencies --|
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'src/utils/constants/index'
const tagTypes = [
    'dashboard',
    'user',
    'newUser',
    'ProductGroup',
    'attributeGroup',
    'attributes',
    'dealerSchemePincode',
    'companyBranch',
]

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,

        prepareHeaders: (headers, { getState, endpoint }) => {
            const authToken = (getState() as any)?.auth?.accessToken
            const deviceId = localStorage.getItem('device-id')

            if (authToken) {
                headers.set('x-access-token', authToken)
            }
            if (deviceId) {
                headers.set(
                    'device-id',
                    endpoint !== 'logoutFromAll' ? deviceId : ''
                )
            }

            return headers
        },
    }),
    tagTypes: tagTypes,

    endpoints: () => ({}),
})

export default apiSlice
