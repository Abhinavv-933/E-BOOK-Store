import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline,Typography, TextField, Link} from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';

const defaultTheme = createTheme();

export default function Signup(){
  const navigate = useNavigate();
  const [formData,setFormdata] = useState({
    email:'',
    firstName:'',
    lastName:'',
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
     console.log(formData);
     setLoading(false);
   };

   const handleSignInClick= () => {
     navigate('/login');
   }

  return (
    <>
      <ThemeProvider theme = {defaultTheme}>
         <Container component="main" maxwidth="xs">
            <CssBaseline />
            <Box 
                 sx={{
                   marginTop: 6,
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center'
                  }} 
            >
                <Avatar sx={{ m:1, bgcolor: 'primary.main'}}>
                   <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variants="h5">
                   Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt:3}}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                       <TextField 
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          value={formData.firstName}
                          onChange={handleInputChange}
                       />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                       <TextField 
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                       />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                      <TextField
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                     />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                       <TextField 
                          autoComplete="new-password"
                          name="password"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                       />
                    </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{mt:3, mb:2}}
                     disabled={!formData.email || !formData.firstName || !formData.lastName || !formData.password} 
                  >
                    {loading ? <CircularProgress color="success" size={24} /> : 'Sign Up'}
                  </Button>
                  <Grid container justifyContent="flex-end"> 
                     <Grid>
                        <Link variant="body2" onClick={handleSignInClick}>
                            Already have an account? Sign in
                        </Link>
                     </Grid>
                  </Grid>
                </Box>
            </Box>            
         </Container>
      </ThemeProvider>
    </>
  )
}