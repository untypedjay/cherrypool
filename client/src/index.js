import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Home from './components/pages/Home';
import TermsOfUse from './components/pages/TermsOfUse';
import NotFound from './components/pages/NotFound';
import './styles/index.css';

ReactDOM.render(<App/>, document.querySelector('#root'));

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/borrow">
          <Home/>
        </Route>
        <Route exact path="/exchange">
          <Home/>
        </Route>
        <Route exact path="/stake">
          <Home/>
        </Route>
        <Route exact path="/terms-of-use" component={TermsOfUse}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
