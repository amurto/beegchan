import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Logout from '../auth/Logout';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const PrimaryAppBar = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" height="40" width="40" />
          <Typography variant="h6" style={{ paddingLeft: "10px" }} className={classes.title}>
            &nbsp;BeegChan
          </Typography>
          {!auth.isLoggedIn && (
              <Button color="inherit">
              <Link 
                style={{ 
                        color: "white", 
                        textDecoration: "none", 
                        fontSize: "16px" 
                      }} 
                to="/signin"
              >
                  Login
              </Link>
            </Button>
          )}
          {auth.isLoggedIn && (
            <Logout />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;