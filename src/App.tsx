import React, { createContext } from 'react'
import './App.css'
import { default as PageRoutes } from './PageRoutes'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Toaster } from 'react-hot-toast'

export const ThemeContext = createContext<{
    theme: string
    toggleTheme: () => void
}>({ theme: 'white', toggleTheme: () => {} })

function App() {
    const [theme, setTheme] = React.useState('white')
    const toggleTheme = () => {
        setTheme((curr) => (curr === 'white' ? 'black' : 'white'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Provider store={store}>
                <PageRoutes />
            </Provider>
            <Toaster />
        </ThemeContext.Provider>
    )
}

export default App
