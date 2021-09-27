import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
    const history = useHistory();
    const { sendRequest, status, error } = useHttp(addQuote);

    useEffect(() => {
        if (status === 'completed' && !error) {
            history.push('/quotes');
        }
    }, [status, history, error]);

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    };

    return (
        <QuoteForm
            isLoading={status === 'pending'}
            hasError={error}
            onAddQuote={addQuoteHandler}
        />
    );
};

export default NewQuote;
