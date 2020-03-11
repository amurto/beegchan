  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import card from './card.png';
import decentralized from './decentralized.png';
import invest from './invest.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  },
}));

const AutoGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper style={{ backgroundColor: '#FFFFFF' }} className={classes.paper}>
            <div>
                <img src={card} height="200" width="200" alt="card" />
                <h1 style={{ color: "black" }}>CONFIRM YOUR IDENTITY</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper style={{ backgroundColor: 'white', margin: 'auto' }} className={classes.paper}>
            <div>
              <img src={decentralized} height="200" width="200" alt="decentralized" />
              <h1 style={{ color: "black" }}>DECENTRALIZED DATA</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
          <Paper style={{ backgroundColor: 'white' }} className={classes.paper}>
            <div style={{ marginTop: "30px" }}>
              <img src={invest} height="150" width="150" alt="invest" />
              <h1 style={{ color: "black" }}>MANAGE YOUR FUNDS</h1>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AutoGrid;