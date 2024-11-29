import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BlogsContext from './NotesContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlogsContext>
      <App />
    </BlogsContext>
  </StrictMode>,
)
