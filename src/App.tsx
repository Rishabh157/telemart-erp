/// ==============================================
// Filename:App.tsx
// Type: App Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- In - Built Dependencies --|
import React, { createContext } from 'react'

// |-- Internal Dependencies --|
import './App.css'
import { default as PageRoutes } from './PageRoutes'

// |-- External Dependencies --|
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

// |-- Redux --|
import store from './redux/store'
export const ThemeContext = createContext<{
    theme: string
    toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

function App() {
    const [theme, setTheme] = React.useState('black')

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'white' ? 'black' : 'white'))
    }
    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Provider store={store}>
                    <PageRoutes />
                </Provider>
                <Toaster />
            </ThemeContext.Provider>
        </>
    )
}

export default App
