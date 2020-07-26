import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import Typography from '../../UI/Typography/Typography';
import classes from './NavigationItems.css'

const navigationItems = ( props ) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={props.link} exact={props.exact}>
                {props.children}
                <Typography variant={props.variant}>
                    {props.content}
                </Typography>
            </NavigationItem>
        </ul>
    )
}

export default navigationItems;
