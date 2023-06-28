import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </React.StrictMode>
  </Provider>
)

reportWebVitals()
