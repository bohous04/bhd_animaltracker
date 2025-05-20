import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VisibilityProvider } from './providers/VisibilityProvider'
import './index.css'
import './lib/background/background.css'
import App from './App.tsx'
import { TranslationProvider } from './providers/TranslationsContext.tsx'
import { ToastContainer, Zoom } from 'react-toastify'
import { isEnvBrowser } from './lib/utils.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TranslationProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="dark"
          transition= {Zoom}
        />
      <VisibilityProvider>
        <div className={` ${isEnvBrowser() ? "" : ""} `}>
          <App />
        </div>
      </VisibilityProvider>
    </TranslationProvider>

  </StrictMode>
)
