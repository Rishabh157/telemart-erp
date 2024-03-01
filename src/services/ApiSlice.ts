/// ==============================================
// Filename:ApiService.tsx
// Type: Service Component
// Last Updated: JULY 04, 2023
// Project: TELIMART - Front End
// ==============================================

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

// export const apiSlice = createApi({
//     reducerPath: 'apiSlice',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${BASE_URL}`,

//         prepareHeaders: (headers, { getState, endpoint }) => {
//             const authToken =
//                 (getState() as any)?.auth?.accessToken ||
//                 localStorage.getItem('authToken')
//             const deviceId = localStorage.getItem('device-id')

//             if (authToken) {
//                 headers.set('x-access-token', authToken)
//             }
//             if (deviceId) {
//                 headers.set(
//                     'device-id',
//                     endpoint !== 'logoutFromAll' ? deviceId : ''
//                 )
//             }

//             return headers
//         },
//     }),
//     tagTypes: tagTypes,

//     endpoints: () => ({}),
// })

// export default apiSlice

// import {
//   authTokenKeyName,
//   clearLocalStorage,
//   refreshTokenKeyName,
// } from "src/utils/configs/authConfig";
// import { BASE_URL } from "../utils/constants/index";

// const tagTypes = ["project", "ticket", "chats"];
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
                    // let userData = {
                    //     userId: userId,
                    //     fullName: firstName + lastName,
                    //     firstName: firstName,
                    //     lastName: lastName,
                    //     email: email,
                    //     mobile: mobile,
                    //     userName: userName,
                    //     companyId: companyId,
                    //     role: userType,
                    //     userRole: userRole,
                    //     branchId: branchId,
                    // }
                    // localStorage.setItem('userData', JSON.stringify(userData))
                    // localStorage.setItem(
                    //     "userData",
                    //     JSON.stringify({
                    //         name: refreshResult?.data?.data?.name,
                    //         mobile: refreshResult?.data?.data?.mobile,
                    //         email: refreshResult?.data?.data?.email,
                    //         userId: refreshResult?.data?.data?.userId,
                    //     })
                    // );
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
