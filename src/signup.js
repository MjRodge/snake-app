import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import './css/login.css';

class Signup extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        username: [],
        password: [],
        showPassword: false,
        passwordError: false,
        usernameError: true,
        errors: {}
      };
      this.apiLink = "http://127.0.0.1:8080/auth/signup";
  }
  handleUsernameChange = username => event => {
    this.setState({ [username]: event.target.value });
  };
  handlePasswordChange = password => event => {
    this.setState({ [password]: event.target.value });
  };

  //functions to toggle password visibility
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickSignupButton = (event) => {
    event.preventDefault();
    alert("username: "+this.state.username+" password: "+this.state.password);
    /*axios.post(this.apiLink, {username: this.state.username, password: this.state.password})
      .then(function(response){
        console.log('saved successfully');
      })
      .catch(function(error){
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          var errors = error.response.data.errors;
          this.setState({errors: errors});
          console.log(this.state.errors.username);
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });*/
    console.log("username: "+this.state.username);
    console.log("password: "+this.state.password);
  }

  render() {
    return (
      <div>
        <Card className="login">
        <CardContent>
          <Typography
            className="login-heading"
            variant="headline"
            color="textSecondary"
            component="h2"
          >
              Sign Up
          </Typography>
          <TextField
            required
            autoComplete="off"
            error={this.state.usernameError ?
              true
              :
              false}
            helperText={this.state.usernameError ?
              this.state.errors.username
              :
              null}
            id="username"
            label="Username"
            className="login-textfield"
            onChange={this.handleUsernameChange('username')}
            margin="normal"
          />
          <FormControl className="login-textfield"
            required error={this.state.passwordError ?
              true
              :
              false}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handlePasswordChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {this.state.passwordError ?
              <FormHelperText>
                {this.state.errors.password}
              </FormHelperText>
              :
              null }
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="login-button"
            onClick={this.handleClickSignupButton}
            >
              Sign Up
          </Button>
        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Signup;
