import React from 'react';
import Login from './login';
import Signup from './signup';
//import './css/reset.css';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <div>
            <h1>Highscores</h1>
            <Signup/>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
