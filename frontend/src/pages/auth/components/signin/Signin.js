import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline,Typography, TextField, Link, Backdrop} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import { signin } from "../../services/auth/auth";
import {useSnackbar} from "notistack";
import { isAdminLoggedin, isCustomerLoggedin,saveToken } from "../../../../utils/common";

const defaultTheme = createTheme();

export default function Signin(){
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData,setFormdata] = useState({
    email:'',
    password:''
  });
   const [loading, setLoading] = useState(false);

   const handleInputChange = (event) => {
    const { name, value} = event.target;
     setFormdata({
        ...formData,
        [name]:value
     })
   }

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const response = await signin(formData);
       if(response.status === 200){
          console.log(response);
          const token =  response.data.token;
          saveToken(token);
          if(isAdminLoggedin()){
             navigate('/Admin/dashboard');
          }
          else if(isCustomerLoggedin()){
            navigate('/customer/dashboard');
          }
          
          enqueueSnackbar('Sign in successful!', { variant: 'success', autoHideDuration: 3000});
          
          // ✅ FIX 2: Clear form fields
          setFormdata({
            email: '',
            password: ''
          });
       }
     } catch (error) {
         enqueueSnackbar('Invalid Credentials!',{ variant: 'error', autoHideDuration: 5000});
     } finally {
      setLoading(false);
     }
   };

   const handleSignUpClick= () => {
     navigate('/register');
   }

  return (
    <>
      <ThemeProvider theme = {defaultTheme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box 
                 sx={{
                   marginTop: 7,
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center'
                  }} 
            >
                <Avatar sx={{ m:1, bgcolor: 'primary.main'}}>
                   <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt:3}}>
                      <TextField
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                     />
                       <TextField 
                          type="password"
                          autoComplete="new-password"
                          name="password"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                       />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{mt:3, mb:2}}
                     disabled={!formData.email || !formData.password} 
                  >
                    {loading ? <CircularProgress color="success" size={24} /> : 'Sign In'}
                  </Button>
                  <Grid container >
                     <Grid>
                        <Link variant="body2" onClick={handleSignUpClick} sx={{ cursor: 'pointer' }}>
                            Don't have an account? Sign up
                        </Link>
                     </Grid>
                  </Grid>
                </Box>
            </Box>            
         </Container>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme)=> theme.zIndex.drawer +1}}
        open={loading}
      >
         <CircularProgress color= "success" />
      </Backdrop>
    </>
  )
}