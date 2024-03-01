export const useGetLocalStorage = () => {
    const authToken = localStorage.getItem('authToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userData = JSON?.parse(localStorage.getItem('userData') || '{}')
    return {
        authToken,
        refreshToken,
        userData,
    }
}
