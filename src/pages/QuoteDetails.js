import { Fragment } from 'react';
import { Route, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Tony', text: 'First quote' },
    { id: 'q2', author: 'Cruelkid', text: 'Second quote' },
];

const QuoteDetails = () => {
    const params = useParams();

    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.qID);

    if (!quote) {
        return <p>Quote not found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote author={quote.author} text={quote.text} />
            <Route path="/quotes/:qID" exact>
                <div className="centered">
                    <Link className="btn--flat" to={`/quotes/${params.qID}/comments`}>
                        Show comments
                    </Link>
                </div>
            </Route>
            <Route path="/quotes/:qID/comments">
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetails;
