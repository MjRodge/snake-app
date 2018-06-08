import React from 'react';
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

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        username: [],
        password: [],
        showPassword: false,
        passwordError: true,
        usernameError: false,
        errors: {
          name: ["shadfiuh"],
          password: ["erorrrrr"]
        }
      };
  }
  handleUsernameChange = username => event => {
    this.setState({ [username]: event.target.value });
  };
  handlePasswordChange = password => event => {
    this.setState({ [password]: event.target.value });
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleClickLoginButton = () => {
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
            Login
          </Typography>
          <TextField
            required
            autoComplete="off"
            error={this.state.usernameError ?
              true
              :
              false}
            helperText={this.state.usernameError ?
              this.state.errors.name
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
              Login
          </Button>
        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
