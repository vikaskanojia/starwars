import React, {Suspense, lazy } from "react";
import {Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import appStore from './store';

const login = lazy(()=> import('./login'));
const search = lazy(()=> import('./searchPage'));

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Router>
          <Suspense fallback={<div>...Loading Please Wait!!!</div>}>
            <Switch>
              <Route exact path="/" component={login} />
              <Route exact path="/search" component={search} />
              <Route path="*" render={()=>{
              return (
                  <h1>404</h1>
                )
            }}/>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
