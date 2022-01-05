import { Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'

export default function OptimizedSnackbar({ opened, setOpened, isAlert, setIsAlert, duration, setDuration, message, setMessage, type }) {
    const handleClose = (e, r) => {
        if (r === 'clickaway')
            return;

        resetSnack();
    }

    const resetSnack = () => {
        setOpened(false);
        setIsAlert(false);
        setDuration(null);
        setMessage(null);
    }

    const closeSnackAction = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    if (isAlert) {
        return (
            <Snackbar
                open={opened}
                autoHideDuration={duration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        );
    }

    return (
        <Snackbar
            open={opened}
            autoHideDuration={duration}
            message={message}
            onClose={handleClose}
            action={closeSnackAction}
        />
    );
}
