// |-- In - Built Dependencies --|
import React from 'react'

// |-- External Dependencies --|
import ReactDOM from 'react-dom/client'

// |-- Internal Dependencies --|
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

document.title = process.env?.REACT_APP_APP_NAME || ''

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
