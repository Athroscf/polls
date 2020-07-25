import React from 'react';
import TextField from '@material-ui/core/TextField';

import classes from './Input.css';

const input = ( props ) => {
    const inputClasses = [classes.InputElement];

    if ( props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid)
    }

    return (
        <div className={classes.Input}>
            <TextField
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                variant="outlined"
                value={props.value}
                onChange={props.changed} />
        </div>
    )
}

export default input;
