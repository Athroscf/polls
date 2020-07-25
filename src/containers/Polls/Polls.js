import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as pollActions from '../../store/actions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import PollList from '../../components/PollList/PollList';
import Poll from '../../components/Poll/Poll';
import classes from './Polls.css';
import axios from '../../axios-polls';
import Spinner from '../../components/UI/Spinner/Spinner';

const polls = props => {
    const [ answers, setAnswers ] = useState({});
    const [ showPoll, setShowPoll ] = useState(false);

    const { onInitPolls, onAnsweringPoll } = props;

    useEffect(() => {
        onInitPolls( reloadPage );
        document.title = 'Encuestas - Responder Encuesta';
    }, [onInitPolls]);

    const goBackHandler = () => {
        props.history.goBack();
    };

    const selectPollHandler = ( id ) => {
        setTimeout(() => {
            setShowPoll(true);

            let poll = {...props}
            poll.pollId = id;
        }, 500)
    }

    const toHomeHandler = () => {
        props.history.push('/');
    }

    // const toStatsHandler = () => {
    //     props.history.push('/stats');
    // }

    const reloadPage = () => {
        window.location.reload()
    }

    const answerHandler = event => {
        event.preventDefault();

        const answer = answers;

        onAnsweringPoll(
            props.pollId,
            answer,
            toHomeHandler,
            reloadPage
        );
    }

    const onChangeHandler = ( event, inputIdentifier ) => {
        const updatedAnswerForm = {
            ...answers
        };

        const updatedFormElement = {
            ...updatedAnswerForm[inputIdentifier]
        };

        updatedFormElement.answer = event.target.value;
        updatedAnswerForm[inputIdentifier] = updatedFormElement;

        setTimeout( () => {
            setAnswers(updatedAnswerForm);
        }, 200)
    }

    let list = props.error ? null :
                             <Spinner />;

    if ( props.polls ) {
        list = (
            <Aux>
                <PollList
                    pollList={props.polls}
                    pollSelected={selectPollHandler}
                    clicked={goBackHandler} />
            </Aux>
        );
    }

    let answerPoll = null;

    if (showPoll) {
        answerPoll = (
            <Poll
                pollId={props.pollId}
                questions={props.polls[props.pollId]}
                changed={onChangeHandler}
                clicked={answerHandler} />
        )
    }

    if (props.answering) {
        answerPoll = <Spinner />
    }

    return (
        <div className={classes.Polls}>
            <Aux>
                {list}
                {answerPoll}
            </Aux>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.polls.error,
        polls: state.polls.polls,
        pollId: state.polls.pollId,
        loading: state.polls.loading,
        answering: state.polls.answering,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPolls: ( click ) => dispatch(pollActions.initPolls( click )),
        onAnsweringPoll: (pollId, answerData, OnConfirm, OnError) => dispatch(pollActions.addAnswer(pollId, answerData, OnConfirm, OnError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( polls, axios );