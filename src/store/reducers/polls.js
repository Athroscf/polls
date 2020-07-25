import * as actionTypes from '../actions/actionTypes';
import { updateObject, ObjectIding } from '../../shared/utility';

const initialState = {
    results: null,
    pollId: 0,
    polls: null,
    answering: false,
    loading: false,
    error: false
};

const fetchPollsStart = ( state, action ) => {
    return updateObject(state, { loading: true } );
};

const fetchPollsSuccess = ( state, action ) => {
    return updateObject( state, {
        polls: action.polls,
        loading: false,
        error: false
    });
};

const fetchPollsFailed = ( state, action ) => {
    return updateObject( state, {
        error: true,
        loading: false
    } );
};

const addAnswerInit = ( state, action ) => {
    return updateObject( state, { answering: true });
};

const addAnswerStart = ( state, action ) => {
    return updateObject( state, { answering: true } );
};

const addAnswerSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        answering: false
    });
};

const addAnswerFailed = ( state, action ) => {
    return updateObject( state, { answering: false } );
};

const setResults = ( state, action ) => {
    return updateObject( state, {
        results: updateResults(state)
    });
};

// The update results will be changed in the future in order to be dynamic.

const updateResults = ( state ) => {
    const { answers, pollName } = state.polls[state.pollId];
    let object = {
        pollName: pollName, si: 0, no: 0, accion: 0, deportes: 0, arcade: 0, otro: 0, horas1: 0, horas2: 0,
        horas3: 0, horas4: 0, si1: 0, no1: 0, cantidad1: 0, cantidad2: 0, cantidad3: 0, cantidad4: 0
    };

    for ( let key in answers) {
        const tempAnswer = ObjectIding(answers[key]);

        for (let subKey in tempAnswer) {
            if (tempAnswer[subKey].answer === "Si" && tempAnswer[subKey].id === "0") {
                object.si += 1;
            }
            if (tempAnswer[subKey].answer === "No" && tempAnswer[subKey].id === "0") {
                object.no += 1;
            }
            if (tempAnswer[subKey].answer === "Accion") {
                object.accion += 1;
            }
            if (tempAnswer[subKey].answer === "Deportes") {
                object.deportes += 1;
            }
            if (tempAnswer[subKey].answer === "Arcade") {
                object.arcade += 1;
            }
            if (tempAnswer[subKey].answer === "Otros") {
                object.otro += 1;
            }
            if (tempAnswer[subKey].answer === "0-1 hora") {
                object.horas1 += 1;
            }
            if (tempAnswer[subKey].answer === "1-3 horas") {
                object.horas2 += 1;
            }
            if (tempAnswer[subKey].answer === "3-5 horas") {
                object.horas3 += 1;
            }
            if (tempAnswer[subKey].answer === "Mas de 5 horas") {
                object.horas4 += 1;
            }
            if (tempAnswer[subKey].answer === "Si" && tempAnswer[subKey].id === "3") {
                object.si1 += 1;
            }
            if (tempAnswer[subKey].answer === "No" && tempAnswer[subKey].id === "3") {
                object.no1 += 1;
            }
            if (tempAnswer[subKey].answer === "$0-50") {
                object.cantidad1 += 1;
            }
            if (tempAnswer[subKey].answer === "$51-100") {
                object.cantidad2 += 1;
            }
            if (tempAnswer[subKey].answer === "$101-1000") {
                object.cantidad3 += 1;
            }
            if (tempAnswer[subKey].answer === "Mas de $1000") {
                object.cantidad4 += 1;
            }
        };
    };

    return countResults(object);
};

const countResults = (object) => {
    return {
        pollName: object.pollName,
        0: {
            Si: object.si,
            No: object.no
        },
        1: {
            Accion: object.accion,
            Deportes: object.deportes,
            Arcade: object.arcade,
            Otros: object.otro
        },
        2: {
            "0-1": object.horas1,
            "1-3": object.horas2,
            "3-5": object.horas3,
            ">5": object.horas4
        },
        3: {
            Si: object.si1,
            No: object.no1
        },
        4: {
            "0-50": object.cantidad1,
            "51-100": object.cantidad2,
            "101-1000": object.cantidad3,
            ">1000": object.cantidad4
        }
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type) {
        case actionTypes.FETCH_POLLS_START: return fetchPollsStart( state, action);
        case actionTypes.FETCH_POLLS_SUCCESS: return fetchPollsSuccess( state, action);
        case actionTypes.FETCH_POLLS_FAILED: return fetchPollsFailed( state, action );
        case actionTypes.ADD_ANSWER_INIT: return addAnswerInit( state, action );
        case actionTypes.ADD_ANSWER_START: return addAnswerStart( state, action );
        case actionTypes.ADD_ANSWER_SUCCESS: return addAnswerSuccess( state, action );
        case actionTypes.ADD_ANSWER_FAILED: return addAnswerFailed( state, action );
        case actionTypes.SET_RESULTS: return setResults( state, action );
        default: return state;
    }
}

export default reducer;