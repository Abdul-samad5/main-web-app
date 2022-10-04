import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Collections from './components/Collections'
import MyCustomers from './components/MyCustomers'
import StoreReviews from './components/StoreReviews'
import TransactionHistory from './components/TransactionHistory'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransactionHistory />
  </React.StrictMode>
)
