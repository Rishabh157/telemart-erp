/// ==============================================
// Filename:Auth.tsx
// Type: Auth Component
// Last Updated: JUNE 27, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- Built-in Dependencies --|
import React, { useEffect } from 'react'

// |-- External Dependencies --|
import { useLocation, useNavigate } from 'react-router-dom'

// |-- Internal Dependencies --|
import LoginPage from './LoginPage'

const Auth = () => {
    const accessToken = localStorage.getItem('authToken')
    const navigation = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        if (accessToken) {
            navigation('/dashboard')
        }
    }, [accessToken, navigation])

    return <> {!accessToken && <LoginPage pathName={pathname} />}</>
}

export default Auth
