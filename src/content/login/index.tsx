import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { MReqUser } from 'src/models/master/User/User';

const defaultTheme = createTheme();
const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);

  const [register, setRegister] = React.useState<MReqUser>(new MReqUser());

  const Swal = require('sweetalert2');

  React.useEffect(() => {
    // Remove the 'AuthToken' from localStorage
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('Profile');
  }, []);

  React.useEffect(() => {
    if (authenticated) {
      window.location.href = '/home';
    }
  }, [authenticated]);

  const handleLogin = async () => {
    try {
      // Make a request to your login API
      const response = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/Login`,
        {
          params: {
            username,
            password
          },
          withCredentials: true // Include credentials (cookies)
        }
      );

      const resultCode = response.data.resultCode;

      // Check if the login was successful
      if (resultCode === '1000') {
        localStorage.setItem('AuthToken', response.data.data.token);
        localStorage.setItem(
          'Profile',
          JSON.stringify(response.data.data.user)
        );
        setAuthenticated(true);
      } else {
        // Handle failed login
        alert('Invalid username or password');
      }
    } catch (error) {
      const errorHandler = error.response;
      if (errorHandler.status === 404) {
        const resultMessage = error.response.data.resultMessage;

        Swal.fire({
          title: 'Error!',
          text: resultMessage,
          icon: 'error',
          confirmButtonText: 'Ok !'
        });
      } else {
        alert(errorHandler.status);
        Swal.fire({
          title: 'Error!',
          text: 'Internal Server Error',
          icon: 'error',
          confirmButtonText: 'Ok !'
        });
      }
    }
  };

  const handleRegister = async () => {
    try {
      // Make a request to your registration API
      const response = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}api/Authentication/RegisterUserPublic`,
        register
      );

      const resultCode = response.data.resultCode;

      // Check if the registration was successful
      if (resultCode === '1000') {
        Swal.fire({
          title: 'User Already Created!',
          text: response.data.resultMessage,
          icon: 'success',
          confirmButtonText: 'Ok !'
        });
      } else {
        // Handle failed registration
        alert('Invalid registration details');
      }
    } catch (error) {
      // Handle registration error
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Internal Server Error',
        icon: 'error',
        confirmButtonText: 'Ok !'
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/static/images/avatars/Login Form.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: '100% ', // Make the image cover the entire space
            backgroundPosition: 'center'
          }}
        />
        {/* <img src="/static/images/avatars/Login Form.jpg"></img> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Typography>
            {isRegister == false ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="Username"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="off"
                  autoFocus
                  value={null}
                  onChange={(e) =>
                    setRegister(
                      (prev) =>
                        ({
                          ...prev,
                          Username: e.target.value
                        } as MReqUser)
                    )
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Nama"
                  name="nama"
                  autoComplete="off"
                  value={null}
                  onChange={(e) =>
                    setRegister(
                      (prev) => ({ ...prev, Nama: e.target.value } as MReqUser)
                    )
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Alamat"
                  name="alamat"
                  value={register.Alamat}
                  onChange={(e) =>
                    setRegister(
                      (prev) =>
                        ({
                          ...prev,
                          Alamat: e.target.value
                        } as MReqUser)
                    )
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={register.Email}
                  onChange={(e) =>
                    setRegister(
                      (prev) =>
                        ({
                          ...prev,
                          Email: e.target.value
                        } as MReqUser)
                    )
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="nomorTelefon"
                  label="Nomor Telefon"
                  type="number"
                  value={register.NomorTelefon}
                  onChange={(e) =>
                    setRegister(
                      (prev) =>
                        ({
                          ...prev,
                          NomorTelefon: e.target.value
                        } as MReqUser)
                    )
                  }
                />
                {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              </>
            )}
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
