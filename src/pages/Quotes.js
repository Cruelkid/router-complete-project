import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
// ];

const Quotes = () => {
    const {
        sendRequest,
        status,
        error,
        data: fetchedData,
    } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

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

    if (status === 'completed' && (!fetchedData || fetchedData.length === 0)) {
        return (
            <div className="centered">
                <NoQuotesFound />
            </div>
        );
    }

    return <QuoteList quotes={fetchedData} />;
};

export default Quotes;
