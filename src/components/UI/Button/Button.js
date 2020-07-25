import React from 'react';
import { Button } from '@material-ui/core';

import classes from './Button.css';

const button = ( props ) => {
    return (
        <div>
            <Button
                type={props.type}
                className={classes.Button}
                variant="contained"
                onClick={props.click}>
                {props.children}
            </Button>
        </div>
    )
}

export default button;