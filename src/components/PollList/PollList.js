import React from 'react';
import { List } from '@material-ui/core';

import ListItem from '../UI/ListItem/ListItem';
import Button from '../UI/Button/Button';
import classes from './PollList.css';

const PollList = ( props ) => {
    let transformedPolls = Object.keys( props.pollList )
        .map( igKey => {
            return [...Array( props.pollList[igKey] )].map( ( poll, i ) => {
                return <ListItem
                            key={igKey + i}
                            clicked={props.pollSelected}
                            pollName={poll.pollName}
                            index={poll.id} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedPolls.length === 0) {
        transformedPolls = <p>No se pudo cargar las encuestas! Recargue la pagina!</p>;
    }
    return (
        <div className={classes.PollList}>
            <h3>Encuestas</h3>
            <List>
                {transformedPolls}
            </List>
            <Button click={props.clicked}>
                Volver
            </Button>
        </div>
    )
}

export default PollList;
