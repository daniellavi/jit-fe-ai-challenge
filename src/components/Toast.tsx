import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export interface ToastProps {
  open: boolean;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  autoHideDuration?: number;
  onClose: () => void;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 4000,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
  >
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
