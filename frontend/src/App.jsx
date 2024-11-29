import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'
import { Snackbar, Alert } from '@mui/material';
import { useBlogsContext } from './NotesContext';


function App() {
  const { alertMsg, handleSnackbarClose } = useBlogsContext()

  return (
    <>
      <RouterProvider router={Routes} />
      <Snackbar
        open={alertMsg.snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={alertMsg.alertSeverity} sx={{ width: '100%' }}>
          {alertMsg.alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
