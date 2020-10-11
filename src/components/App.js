import React from 'react';
import '../styles/style.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import Colors from './Colors';
import Users from './Users';
import Settings from './Settings';
import Loading from './Loading';


// Declare App and configure Routes
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Loading} />
        <Dashboard>
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/colors" exact component={Colors} />
          <Route path="/users" exact component={Users} />
          <Route path="/settings" exact component={Settings} />
        </Dashboard>
      </Switch>
    </Router>
  );
}

export default App;
