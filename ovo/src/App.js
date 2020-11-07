import React from 'react';
import Home from './Scene/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import Detail from './Scene/Detail';
import Search from './Scene/Search';

export default function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/detail">
                    <Detail/>
                </Route>
                <Route path="/search">
                    <Search/>
                </Route>
            </Switch>
        </Router>
        
    </div>
  );
}
