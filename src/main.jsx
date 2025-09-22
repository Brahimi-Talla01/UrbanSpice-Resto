import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './contexts/StoreContext.jsx'
import { MenuProvider } from './contexts/MenuContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </StoreContextProvider>
  </BrowserRouter>,
)
