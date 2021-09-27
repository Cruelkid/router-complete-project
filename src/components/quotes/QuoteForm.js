import { Fragment, useRef, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './QuoteForm.module.css';

const QuoteForm = (props) => {
    const authorInputRef = useRef();
    const textInputRef = useRef();
    const [isEntering, setIsEntering] = useState(false);
    const history = useHistory();

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredText = textInputRef.current.value;

        if (enteredAuthor.length > 1 && enteredText.length > 1) {
            props.onAddQuote({ author: enteredAuthor, text: enteredText });
        } else {
            if (!props.hasError) {
                history.push('/quotes');
            }
        }
    }

    const formFocusHandler = () => {
        setIsEntering(true);
    };

    const finishEnteringHandler = () => {
        setIsEntering(false);
    };

    return (
        <Fragment>
            <Prompt
                when={isEntering}
                message="Are you sure you want to leave?"
            />
            <Card>
                <form
                    className={styles.form}
                    onFocus={formFocusHandler}
                    onSubmit={submitFormHandler}
                >
                    {props.isLoading && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    {props.hasError && (
                        <div className="centered">
                            An error has occurred! :(
                        </div>
                    )}

                    <div className={styles.control}>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" ref={authorInputRef} />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="text">Text</label>
                        <textarea
                            id="text"
                            rows="5"
                            ref={textInputRef}
                        ></textarea>
                    </div>
                    <div className={styles.actions}>
                        <button className="btn" onClick={finishEnteringHandler}>
                            Add Quote
                        </button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default QuoteForm;
