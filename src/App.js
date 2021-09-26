import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/layout/Layout';
import NewQuote from './pages/NewQuote';
import QuoteDetails from './pages/QuoteDetails';
import Quotes from './pages/Quotes';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Layout>
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
        </Layout>
    );
}

export default App;
