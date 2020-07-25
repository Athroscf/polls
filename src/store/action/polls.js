import * as actionTypes from './actionTypes';
import axios from '../../axios-polls';
import SweetAlert from '../../components/UI/SweetAlert/Message/Message';

export const initPolls = ( click ) => {
    return dispatch => {
        dispatch(fetchPollsStart())
        axios.get('/polls.json')
            .then( response => {
                const fetchedPolls = [];
                for ( let key in response.data ) {
                    fetchedPolls.push( {
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(setPolls(fetchedPolls));
                dispatch(setResults(fetchedPolls));
            })
            .catch( error => {
                SweetAlert({
                    show: true,
                    text: "No se han podido cargar las encuestas!",
                    icon: "error",
                    confirmButtonText: "Recargar pagina",
                    confirmClicked: click
                })
                dispatch(fetchPollsFailed( error ))
            })
    }
}

export const fetchPollsStart = () => {
    return {
        type: actionTypes.FETCH_POLLS_START
    }
}

export const setPolls = ( polls ) => {
    return {
        type: actionTypes.FETCH_POLLS_SUCCESS,
        polls: polls
    }
}

export const addAnswerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.ADD_ANSWER_SUCCESS,
        answerId: id,
        answerData: orderData
    }
}

export const addAnswerFailed = ( error ) => {
    return {
        type: actionTypes.ADD_ANSWER_FAILED,
        error: error
    }
}

export const addAnswerStart = () => {
    return {
        type: actionTypes.ADD_ANSWER_START
    }
}

export const addAnswer = ( id, answerData, onConfirm, onError ) => {
    return dispatch => {
        dispatch( addAnswerStart() );
        if (answerData == null || Object.keys(answerData).length < 5) {
            SweetAlert({
                show: true,
                text: "Porfavor responde todas las preguntas!",
                icon: "warning",
                confirmButtonText: "Ok"
            })
            dispatch( addAnswerFailed( 'Error' ) );
        } else {
            axios.post('/polls/'+ id +'/answers.json', answerData )
                .then( response => {
                    SweetAlert({
                        show: true,
                        text: "Tus respuestas han sido guardadas!",
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmClicked: onConfirm
                    })
                    dispatch( addAnswerSuccess( response.data.name, answerData ) );
                } )
                .catch( error => {
                    SweetAlert({
                        show: true,
                        text: "Tus respuestas no se han podido guardar!",
                        icon: "error",
                        confirmButtonText: "Recargar pagina",
                        confirmClicked: onError
                    })
                    dispatch( addAnswerFailed( error ) );
                }
            );
        }
    }
}

export const setResults = ( polls ) => {
    return {
        type: actionTypes.SET_RESULTS,
        results: polls
    }
}

export const fetchPollsFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_POLLS_FAILED
    }
}