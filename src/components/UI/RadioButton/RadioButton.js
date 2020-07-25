import React from 'react';
import RadioButton from '@material-ui/core/Radio';

const radioButton = ( props ) => {
    return (
        <div>
            <RadioButton
                className={props.class}
                name={props.name}
                value={props.value}
                onChange={props.changed}/>
                    {props.content}
        </div>
    )
}

export default radioButton
