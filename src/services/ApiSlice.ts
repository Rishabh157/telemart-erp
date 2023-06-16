import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'src/utils/constants/index'
const tagTypes = [
    'dashboard',
    'user',
    'ProductGroup',
    'attributeGroup',
    'attributes',
    'dealerSchemePincode',
]

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,

        prepareHeaders: (headers, { getState, endpoint }) => {
            const authToken = (getState() as any)?.auth?.accessToken
            const deviceId = (getState() as any)?.auth?.deviceId

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
