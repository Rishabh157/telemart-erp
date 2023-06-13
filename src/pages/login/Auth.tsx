import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'

const Auth = () => {
    const accessToken = localStorage.getItem('authToken')
    const navigation = useNavigate()
    const { pathname } = useLocation()
    console.log(pathname)
    useEffect(() => {
        if (accessToken) {
            navigation('/dashboard')
        }
    }, [accessToken, navigation])

    return <> {!accessToken && <LoginPage pathName={pathname} />}</>
}

export default Auth
