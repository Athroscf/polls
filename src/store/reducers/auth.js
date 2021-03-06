import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: null
}

const authStart = ( state, action ) => {
    return updateObject(state, { error:null, loading: true });
};

const authSuccess = ( state, action ) => {
    if (!action.email) {
        let email = localStorage.getItem('email');
        return updateObject(state, {
            token: action.idToken,
            userId: action.userId,
            email: email,
            error: null,
            loading: null
        });
    }

    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        email: action.email,
        error: null,
        loading: null
    });
};

const authFail = ( state, action ) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = ( state, action ) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart( state, action );
        case actionTypes.AUTH_SUCCESS: return authSuccess( state, action );
        case actionTypes.AUTH_FAIL: return authFail( state, action );
        case actionTypes.AUTH_LOGOUT: return authLogout( state, action );
        default: return state;
    }
};

export default reducer;