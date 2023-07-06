/// ==============================================
// Filename:App.tsx
// Type: App Component
// Last Updated: JULY 06, 2023
// Project: TELIMART - Front End
// ==============================================

// |-- In - Built Dependencies --|
import React from 'react'

// |-- Internal Dependencies --|
import './App.css'
import { default as PageRoutes } from './PageRoutes'

// |-- External Dependencies --|
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

// |-- Redux --|
import store from './redux/store'

function App() {
    return (
        <>
            <Provider store={store}>
                <PageRoutes />
            </Provider>
            <Toaster />
        </>
    )
}

export default App
