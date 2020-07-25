import React from 'react';
import { ListItem } from '@material-ui/core';

import classes from './ListItem.css';

const listItem = ( props ) => {
    return (
        <ListItem
            className={classes.ListItem}
            button
            key={props.index}
            onClick={() => props.clicked(props.index)}>
            {props.pollName}
        </ListItem>
    )
}

export default listItem;
