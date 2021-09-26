import { Fragment } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Tony', text: 'First quote' },
    { id: 'q2', author: 'Cruelkid', text: 'Second quote' },
];

const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();

    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.qID);

    if (!quote) {
        return <p>Quote not found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote author={quote.author} text={quote.text} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Show comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetails;
