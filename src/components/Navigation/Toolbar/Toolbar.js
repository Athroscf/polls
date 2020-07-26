import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PollIcon from '@material-ui/icons/Poll';

import { useWindowSize } from '../../../hooks/useWindowSize';
import NavigationItems from '../NavigationItems/NavigationItems';
import Typography from '../../UI/Typography/Typography';
import classes from './Toolbar.css';

const toolbar = ( props ) => {
    let toolbar = null;
    let windowSize = useWindowSize();
    let isMobile = windowSize.width <= 500;
    let welcome = null;

    if (props.isAuth) {
        welcome = <Typography variant="h6">
                      Bienvenido {props.email}
                  </Typography>
    }

    if (!isMobile) {
        toolbar = <Toolbar className={classes.Toolbar}>
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
    } else {
        toolbar = <Toolbar className={classes.Toolbar}>
                    <div>
                        <NavigationItems
                            content="Inicio"
                            variant="subtitle2"
                            link="/"
                            exact={true}>
                                <PollIcon />
                        </NavigationItems>
                    </div>
                    <div>
                        { !props.isAuth ?
                            <NavigationItems
                                content="Iniciar Sesión"
                                variant="subtitle2"
                                link="/auth"
                                exact={false} >
                                    <PersonOutlineIcon />
                            </NavigationItems> :
                            <NavigationItems
                                content="Cerrar Sesión"
                                variant="subtitle2"
                                link="/logout"
                                exact={false} >
                                    <PersonOutlineIcon fontSize="large"/>
                            </NavigationItems>
                        }
                    </div>
                </Toolbar>
    }

    return (
        <div>
            <AppBar position="static">
                {toolbar}
            </AppBar>
        </div>
    )
}

export default toolbar;
