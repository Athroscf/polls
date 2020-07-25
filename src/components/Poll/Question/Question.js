import React from 'react';

import Label from '@material-ui/core/InputLabel';
import Options from './Options/Options';
import { ObjectIding } from '../../../shared/utility';

const question = ( props ) => {
    return (
        <div>
            {ObjectIding(props.questions).map( question => (
                <div key={question.id}>
                    <Label >{ question.question }</Label>
                    <Options
                        options={question.options}
                        questionId={question.id}
                        changed={props.changed} />
                </div>
            ))}
        </div>
    )
}

export default question
