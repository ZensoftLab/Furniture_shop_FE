// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ---- Force LIGHT mode before React mounts ----
const html = document.documentElement
html.classList.remove('dark')
html.setAttribute('data-theme', 'light')
try { localStorage.removeItem('theme') } catch { /* ignore */ }

// Keep it light even if the OS theme changes
if (!window.__keepLightBound) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const keepLight = () => {
    html.classList.remove('dark')
    html.setAttribute('data-theme', 'light')
  }
  mq.addEventListener?.('change', keepLight)
  window.__keepLightBound = true
}
// ---------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
