import React from 'react';

import Typography from '@material-ui/core/Typography';

const typography = ( props ) => {
    return (
        <div>
            <Typography variant={props.variant}>
                {props.children}
            </Typography>
        </div>
    )
}

export default typography;
