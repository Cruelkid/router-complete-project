import { Fragment, useEffect } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { qID } = params;
    const {
        sendRequest,
        status,
        error,
        data: fetchedQuote,
    } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(qID);
    }, [sendRequest, qID]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="centered error">
                <h3>Oops! An error has occurred! :(</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!fetchedQuote.text || !fetchedQuote.author) {
        return <p>Quote not found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote
                author={fetchedQuote.author}
                text={fetchedQuote.text}
            />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Show comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}`}>
                        Hide comments
                    </Link>
                </div>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetails;
