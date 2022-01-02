import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import './Login.css'


const Login = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);

    const updatePassword = event => {
        setPassword(event.target.value)
        setError(null);
    }

    useEffect(() => {
        if (!!error)
            setErrorMessage(error.message);
        if (password === "")
            setErrorMessage("Password can't be empty");
        setPassword("");
    }, [error])

    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, "eteslib@gmail.com", password)
            .then((userCredentials) => {

            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setSnackOpen(true);
            })
    }

    const handleClose = (e, r) => {
        if (r === 'clickaway')
            return;

        setSnackOpen(false);
    }

    const snackAction = (
        <React.Fragment>
            <IconButton
                size='small'
                aira-label="close"
                color='inherit'
                onClick={handleClose} >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className='main-container-login'>
            <div className='form-side'>
                <h1 className='form-title'>Sign in</h1>
                <input type='password' placeholder='password' className='form-password' value={password} onChange={e => updatePassword(e)} />
                <div className='form-submit-button' onClick={handleLogin}>
                    <p>Sign in</p>
                </div>
                <p className='form-side-question'>You are ETES student and</p>
                <p className='form-side-question'>want to try the app?</p>
                <p className='form-side-answer'>Please contact <i>eteslib@gmail.com</i> for further instructions</p>
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    action={snackAction}
                >
                    <Alert severity='error' onClose={handleClose} sx={{ width: '100%' }}>{errorMessage}</Alert>
                </Snackbar>
            </div>
            <div className='info-side'>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/eteslib.appspot.com/o/justLogoIcon.png?alt=media&token=a08a2949-88d9-432d-84dd-fcac83fe6591"
                    alt="User Profile Image"
                    className="icon-login"
                />
                <h1 className='info-side-title'>ETES Library</h1>
                <h1 className='info-side-title'>System</h1>
                <p className='info-side-label'>Our library is now online, because doing everything in<br />library is old school</p>
                <p className='info-side-question'>Why can't you login?</p>
                <p className='info-side-label'>Unfortunately, web application is now only for admin.<br />I am doing my best to get everything working so I can make<br />web application functional for users.</p>
            </div>
        </div >
    )
}

export default Login;