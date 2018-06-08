import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
//import './css/reset.css';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <Router>
            <div>
              <h1>Highscores</h1>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
