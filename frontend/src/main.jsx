import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import { CompanyProvider } from './context/CompanyContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CompanyProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CompanyProvider>
    </Provider>
)
