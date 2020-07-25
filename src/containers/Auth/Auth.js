import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Typography from '../../components/UI/Typography/Typography';
import classes from './Auth.css';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [ authForm, setAuthForm] = useState({
            email: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Correo Electronico'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'textfield',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });

    const [ isSignIn, setIsSignIn ] = useState(true);
    const { onAuth } = props;

    useEffect(() => {
        if (!isSignIn) {
            document.title = "Encuestas - Crear Cuenta"
        } else {
            document.title = "Encuestas - Iniciar Sesión"
        };
    }, [isSignIn]);

    const inputChangeHandler = ( event, controlName ) => {
        const updateControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })}
        );

        setAuthForm(updateControls);
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        onAuth(
            authForm.email.value,
            authForm.password.value,
            isSignIn
        );
    };

    const switchAuthModeHandler = () => {
        const clearValue = updateObject(authForm, {
                email: updateObject(authForm.email, {
                    value: '',
                    touched: false
                }),
                password: updateObject(authForm.password, {
                    value: '',
                    touched: false
                }),
            });

        setAuthForm(clearValue);
        setIsSignIn(!isSignIn);
    };

    const formElementsArray = [];

    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={ ( event ) => inputChangeHandler(event, formElement.id)} />
    ));

    let auth = (
        <form onSubmit={submitHandler}>
            <Typography variant="h4">
                {isSignIn ? 'Iniciar Sesion' : 'Crear Cuenta'}
            </Typography>
            {form}
            <Button type="submit">
                {isSignIn ? 'Iniciar Sesion' : 'Registrarse'}
            </Button>
            <a onClick={switchAuthModeHandler}>
                {isSignIn ? 'Aun no tienes una cuenta? Registrate!' : 'Ya tienes una cuenta? Inicia Sesion'}
            </a>
        </form>
    )

    if (props.loading) {
        auth = <Spinner />
    }

    let authRedirect = null;

    if (props.isAuth) {
        authRedirect = <Redirect to="/" />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {auth}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);