import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.js'
import { store } from './redux/store.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </PersistGate>
    </Provider>
  </StrictMode>,
)
