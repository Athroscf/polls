import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import NavigationItems from '../NavigationItems/NavigationItems';
import Typography from '../../UI/Typography/Typography';
import classes from './Toolbar.css';

const toolbar = ( props ) => {
    let welcome = null;

    if (props.isAuth) {
        welcome = <Typography variant="h6">
                      Bienvenido {props.email}
                  </Typography>
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.Toolbar}>
                    <div>
                        <NavigationItems
                            content="Web de Encuestas"
                            variant="h5"
                            link="/"
                            exact={true} />
                    </div>
                    <div>
                        {welcome}
                    </div>
                    <div>
                        { !props.isAuth ?
                            <NavigationItems
                                content="Iniciar Sesión"
                                variant="h6"
                                link="/auth"
                                exact={false} /> :
                            <NavigationItems
                                content="Cerrar Sesión"
                                variant="h6"
                                link="/logout"
                                exact={false} />
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;
