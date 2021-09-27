import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
    const params = useParams();
    const [isAddingComment, setIsAddingComment] = useState(false);
    let comments;
    const { qID } = params;
    const {
        sendRequest,
        status,
        error,
        data: fetchedComments,
    } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(qID);
    }, [sendRequest, qID]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const onAddCommentHandler = useCallback(() => {
        sendRequest(qID);
        setIsAddingComment(false);
    }, [sendRequest, qID]);

    if (status === 'pending') {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        comments = (
            <div className="centered error">
                <h3>Oops! An error has occurred! :(</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (
        status === 'completed' &&
        (!fetchedComments || fetchedComments.length === 0)
    ) {
        comments = <div className="centered">No comments yet...</div>;
    }

    if (
        status === 'completed' &&
        (fetchedComments &&
        fetchedComments.length > 0)
    ) {
        comments = <CommentsList comments={fetchedComments} />;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={qID}
                    onAddComment={onAddCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;
