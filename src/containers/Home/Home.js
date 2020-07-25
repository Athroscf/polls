import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Typography from '../../components/UI/Typography/Typography';
import classes from './Home.css';

const home = props => {
    useEffect(() => {
        document.title = 'Inicio'
    }, [])
    const nextPageHandler = ( page ) => {
        props.history.push({
            pathname: '/' + page
        })
    };

    return (
        <Aux>
            <div className={classes.Home}>
                <Typography variant="h4">Responde nuestra encuesta</Typography>
                <Button
                    click={() => nextPageHandler('polls')}>
                        Responder Encuesta
                </Button>
                { props.isAuth ?
                    <Button
                        click={() => nextPageHandler('stats')}>
                            Resultados
                    </Button> :
                    <Typography variant="h6">Para ver los resultados debes iniciar sesión!</Typography>
                }
            </div>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(home);