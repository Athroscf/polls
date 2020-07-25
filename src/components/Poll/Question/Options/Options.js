import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

import RadioButton from '../../../UI/RadioButton/RadioButton';
import classes from './Options.css';
import { ObjectIding } from '../../../../shared/utility';

const options = ( props ) => {
    return (
        <RadioGroup className={classes.RadioGroup}>
            {ObjectIding(props.options).map( option => (
                <div className={classes.RadioButton} key={option.id}>
                    <RadioButton
                    name={option.option}
                    value={option.option}
                    content={option.option}
                    changed={(event) => props.changed(event, props.questionId)} />
                </div>
            ))}
        </RadioGroup>
    )
}

export default options;
