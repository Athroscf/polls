import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { StylesProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import pollsReducer from './store/reducers/polls';
import authReducer from './store/reducers/auth';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null;

const rootReducer = combineReducers({
    polls: pollsReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <StylesProvider injectFirst>
                <App/>
            </StylesProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById('root') );
registerServiceWorker();