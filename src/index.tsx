import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import {CherryTokenProvider} from './context/CherryTokenContext';
import {CherryLiquidityProvider} from './context/CherryLiquidityContext';
import { AccountProvider } from './context/LoggedInContext';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Home from './components/pages/Home/Home';
import TermsOfUse from './components/pages/TermsOfUse/TermsOfUse';
import NotFound from './components/pages/NotFound/NotFound';
import './index.css';

ReactDOM.render(<App/>, document.querySelector('#root'));

export default function App() {
  return (
    <Web3Provider>
      <AccountProvider>
        <CherryTokenProvider>
          <CherryLiquidityProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={LandingPage}></Route>
                <Route exact path="/portfolio">
                  <Home/>
                </Route>
                <Route exact path="/swap">
                  <Home/>
                </Route>
                <Route exact path="/liquidity">
                  <Home/>
                </Route>
                <Route exact path="/faucet">
                  <Home/>
                </Route>
                <Route exact path="/terms-of-use" component={TermsOfUse}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </BrowserRouter>
          </CherryLiquidityProvider>
        </CherryTokenProvider>
      </AccountProvider>
    </Web3Provider>
  );
}