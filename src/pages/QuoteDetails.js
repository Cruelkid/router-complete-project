import { Fragment } from 'react';
import Comments from '../components/comments/Comments'
import { Route, useParams } from 'react-router';

const QuoteDetails = () => {
    const params = useParams();

    return (
        <Fragment>
            <h1>Quote details page</h1>
            <p>{params.qID}</p>
            <Route path='/quotes/:qID/comments'>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetails;
