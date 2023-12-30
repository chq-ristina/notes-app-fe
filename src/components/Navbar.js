import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, setUser } from '../redux/features/User';
import { removeUserToken } from '../redux/features/UserToken';
import HomeIcon from '@mui/icons-material/Home';

export default function Appbar({
  logged_in,
  username,
  pendingShared
}) {
  // const logged_in = useSelector((state) => state.user.value.logged_in);
  // const username = useSelector((state) => state.user.value.username);

  const dispatch = useDispatch();
  const history = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#57153a"
      }
    }
  });

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeUserToken());
    history("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start' }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'start' }}>
              <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                E-scribe
              </Link>
            </Typography>
            {logged_in &&
              <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home'
              >
                <HomeIcon
                size="large"
                aria-label="home button"
                color="inherit"/>
              </Link>
            }
            {logged_in &&
              <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/share-request'
              >
                <IconButton
                  size="large"
                  aria-label="show new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={pendingShared.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Link>
            }

            {logged_in &&
              <div>
                <span> Hi {username} </span>
                <Button color='inherit' onClick={handleLogout} sx={{ justifyContent: 'space-between' }}>Logout</Button>
              </div>
            }
            {!logged_in &&
              <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} to='/login'>Login</Link></Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}