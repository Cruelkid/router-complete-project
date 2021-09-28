import React from 'react';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const Quotes = React.lazy(() => import('./pages/Quotes'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Layout>
            <Suspense
                fallback={
                    <div className="centered">
                        <LoadingSpinner />
                    </div>
                }
            >
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/quotes" />
                    </Route>
                    <Route path="/quotes" exact>
                        <Quotes />
                    </Route>
                    <Route path="/quotes/:qID">
                        <QuoteDetails />
                    </Route>
                    <Route path="/new-quote">
                        <NewQuote />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
