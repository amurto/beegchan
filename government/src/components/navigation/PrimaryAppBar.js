import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import gov from './gov.png'

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: 'black' }} position="static">
        <Toolbar>
          <img src={gov} alt="gov" height="40" width="40" />
          <Typography variant="h6" style={{ color: 'white', paddingLeft: "10px" }} className={classes.title}>
            Government of India
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;