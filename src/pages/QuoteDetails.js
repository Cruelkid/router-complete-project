import { Fragment } from 'react';
import { useParams } from 'react-router';

const QuoteDetails = () => {
    const params = useParams();

    return (
        <Fragment>
            <h1>Quote details page</h1>
            <p>{params.qID}</p>
        </Fragment>
    );
};

export default QuoteDetails;
