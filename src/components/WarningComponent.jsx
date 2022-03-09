import { Snackbar, Alert } from '@mui/material'
import { useWarningProvider } from 'src/providers/contexts/WarningContext';
import { useEffect } from 'react'
export default function WarningComponent ()  {
    const { isActive, warningType, warningMessage } = useWarningProvider()


    return <Snackbar open={isActive} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={() => {}} severity={warningType} sx={{ width: '100%' }}>
          {warningMessage}
        </Alert>
      </Snackbar>
}