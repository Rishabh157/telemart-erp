type LocalStorageDataType = {
    authToken: string | null
    refreshToken: string | null
    deviceId: string | null
    userData: {
        branchId: string
        companyId: string
        email: string
        firstName: string
        fullName: string
        lastName: string
        mobile: string
        role: string
        userDepartment: string
        userId: string
        userName: string
        userRole: string
    }
}

export const useGetLocalStorage = (): LocalStorageDataType => {
    const authToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const deviceId = localStorage.getItem('device-id')
    const userData = JSON?.parse(localStorage.getItem('userData') || '{}')
    return {
        authToken,
        refreshToken,
        userData,
        deviceId,
    }
}
