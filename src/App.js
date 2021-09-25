import { Redirect, Route, Switch } from 'react-router';
import NewQuote from './pages/NewQuote';
import QuoteDetails from './pages/QuoteDetails';
import Quotes from './pages/Quotes';

function App() {
    return (
        <div>
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
            </Switch>
        </div>
    );
}

export default App;
