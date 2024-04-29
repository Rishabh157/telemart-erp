// |-- Internal Dependencies --|
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { setAccessToken, setRefreshToken } from 'src/redux/slices/authSlice'
// import { setAccessToken, setRefreshToken } from "src/redux/slices/AuthSlice";
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
    'rtv-master',
    'wts-master',
    'ndr-disposition',
]

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const authToken =
            (getState() as any)?.auth?.accessToken ||
            localStorage.getItem('authToken')
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
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error && result?.error?.status === 401) {
        if (!mutex?.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult: any = await baseQuery(
                    {
                        url: '/user/refresh-token',
                        method: 'POST',
                        body: {
                            refreshToken: localStorage.getItem('refreshToken'),
                        },
                    },
                    api,
                    extraOptions
                )
                if (refreshResult?.data) {
                    localStorage.setItem(
                        'authToken',
                        refreshResult?.data?.data?.token
                    )
                    localStorage.setItem(
                        'refreshToken',
                        refreshResult?.data?.data?.refreshToken
                    )
                    api.dispatch(
                        setAccessToken(refreshResult?.data?.data?.token)
                    )
                    api.dispatch(
                        setRefreshToken(refreshResult?.data?.data?.refreshToken)
                    )
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    localStorage.clear()
                    window.location.replace('/login')
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    tagTypes: tagTypes,
    endpoints: () => ({}),
})

export default apiSlice
