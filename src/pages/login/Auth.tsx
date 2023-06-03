import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'

const Auth = () => {
    const accessToken = localStorage.getItem('authToken')
    const navigation = useNavigate()
    useEffect(() => {
        if (accessToken) {
            navigation('/dashboard')
        }
    
    }, [accessToken, navigation])

    return <> {!accessToken && <LoginPage />}</>
}

export default Auth
