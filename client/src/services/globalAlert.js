import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAlert } from './alertContext';

const GlobalAlert = () => {
  const { alerts } = useAlert();

  return (
    <div>
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ marginTop: `${index * 70}px` }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default GlobalAlert;
