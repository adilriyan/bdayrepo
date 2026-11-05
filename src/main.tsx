import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { storyContent } from './config/storyContent'
import './style.css'

if (typeof document !== 'undefined') {
  document.title = `Happy Birthday ${storyContent.recipientName} ✷`
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
