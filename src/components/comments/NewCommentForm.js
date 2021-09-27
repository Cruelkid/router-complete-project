import { Fragment, useEffect, useRef, useState } from 'react';
import { Prompt } from 'react-router';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
    const commentTextRef = useRef();
    const [isEntering, setIsEntering] = useState(false);

    const { sendRequest, status, error } = useHttp(addComment);

    const { onAddComment } = props;

    useEffect(() => {
        if (status === 'completed' && !error) {
            onAddComment();
        }
    }, [status, error, onAddComment]);

    const focusFormHandler = () => {
        setIsEntering(true);
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
        setIsEntering(false);

        const enteredComment = commentTextRef.current.value;

        sendRequest({
            quoteId: props.quoteId,
            commentData: { text: enteredComment },
        });
        // optional: Could validate here

        // send comment to server
    };

    return (
        <Fragment>
            <Prompt
                when={isEntering}
                message="Are you sure you want to leave?"
            />
            <form
                className={classes.form}
                onFocus={focusFormHandler}
                onSubmit={submitFormHandler}
            >
                <div className={classes.control} onSubmit={submitFormHandler}>
                    {status === 'pending' && (
                        <div className="centered">
                            <LoadingSpinner />
                        </div>
                    )}
                    <label htmlFor="comment">Your Comment</label>
                    <textarea
                        id="comment"
                        rows="5"
                        ref={commentTextRef}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button className="btn">Add Comment</button>
                </div>
            </form>
        </Fragment>
    );
};

export default NewCommentForm;
