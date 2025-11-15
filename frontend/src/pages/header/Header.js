import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdminLoggedin, isCustomerLoggedin, removeToken } from '../../utils/common';

export default function Header(){
  const [isAdmin , setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const fetchUserRoles =  async() => {
        try {
          const isAdmin = await isAdminLoggedin();
          const isCustomer = await isCustomerLoggedin();
          setIsAdmin(isAdmin);
          setIsCustomer(isCustomer);
        } catch (error) {
          console.error(`Error : error fetching roles :${error} `)
        }
    };
    fetchUserRoles();
  },[location]);

  const handleLogout = () =>{
    navigate('/login');
    removeToken();
  }

  return(
    <>
    {!isAdmin && !isCustomer &&(
      <Box sx ={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Toolbar>
              <IconButton 
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{mr: 2}}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                  Book App
              </Typography>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" color="inherit">Register</Button>
         </Toolbar>
      </AppBar>
      </Box>
    )} 

    {isAdmin &&(
      <Box sx ={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Toolbar>
              <IconButton 
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{mr: 2}}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                  Admin
              </Typography>
              <Button component={Link} to="/admin/dashboard" color="inherit">Dashboard</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
         </Toolbar>
      </AppBar>
      </Box>
    )} 

    {isCustomer &&(
      <Box sx ={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Toolbar>
              <IconButton 
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{mr: 2}}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                  CUSTOMER
              </Typography>
              <Button component={Link} to="/customer/dashboard" color="inherit">Dashboard</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
         </Toolbar>
      </AppBar>
      </Box>
    )}    

    </>
  )
}