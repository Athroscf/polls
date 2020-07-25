import axios from 'axios';

import * as actionTypes from './actionTypes';
import Swal from '../../components/UI/SweetAlert/Message/Message';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = ( email, password, isSignIn ) => {
    return dispatch => {
        dispatch( authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw2nGmwB3w41m2nXNJkbh5UbHUco6PKVo'
        let show = false;
        let message = null;

        if ( !isSignIn ) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw2nGmwB3w41m2nXNJkbh5UbHUco6PKVo'
            show = true;
            message = 'Tu cuenta ha sido creada!'
        }

        axios.post(url, authData)
             .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                dispatch(authSuccess(response.data.idToken, response.data.localId, localStorage.getItem('email')));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                Swal({
                    show: show,
                    text: message,
                    icon: "success",
                    confirmButtonText: "Ok"
                })
             })
             .catch(err => {
                switch (err.response.data.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        Swal({
                            show: true,
                            text: 'No existe una cuenta con este correo electronico!',
                            icon: "error",
                            confirmButtonText: "Ok"
                        });
                        break;
                    case 'INVALID_PASSWORD':
                        Swal({
                            show: true,
                            text: 'Contraseña incorrecta',
                            icon: "error",
                            confirmButtonText: "Ok"
                        });
                        break;
                    case 'USER_DISABLED':
                        Swal({
                            show: true,
                            text: 'Tu cuenta ha sido bloqueada!',
                            icon: "error",
                            confirmButtonText: "Ok"
                        });
                        break;
                    case 'EMAIL_EXISTS':
                        Swal({
                            show: true,
                            text: 'Ya existe una cuenta con este correo electronico!',
                            icon: "warning",
                            confirmButtonText: "Ok"
                        });
                        break;
                    default:
                        break;
                }
                dispatch(authFail(err.response.data.error));
             })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};