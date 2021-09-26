import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Tony', text: 'First quote' },
    { id: 'q2', author: 'Cruelkid', text: 'Second quote' },
];

const Quotes = () => {
    return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default Quotes;
