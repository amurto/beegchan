import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFund } from '../context/fund-context';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

const FundItem = props => {
    // eslint-disable-next-line
    const [{ allocatedFund, funds }, dispatch] = useFund();
    const classes = useStyles();

    const handleGovChange = event => {
        dispatch({
            type: 'updateFund',
            field: 'gov',
            value: event.target.value,
            uid: props.id
        })
    };

    const handleFundValueChange = event => {
        dispatch({
            type: 'updateFund',
            field: 'fundValue',
            value: event.target.value,
            uid: props.id
        })
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <IconButton 
                        aria-label="delete" 
                        className={classes.margin}
                        color='primary' 
                    >
                        <SupervisorAccountIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="standard-helperText"
                        label="Organization"
                        onChange={handleGovChange} 
                        value={props.gov}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        label="Funds"
                        type="number"
                        onChange={handleFundValueChange} 
                        value={props.fundValue}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                &#8377;
                            </InputAdornment>
                        ),
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                        <IconButton 
                        aria-label="delete" 
                        className={classes.margin} 
                        onClick={() => dispatch({
                            type: 'deleteFund',
                            uid: props.id,
                        })}>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

const FundsList = props => {
    return (
        <Grid item xs={12}>
            {props.items.map((fund, index) => 
                    <FundItem 
                        key={fund.id} 
                        id={fund.id}
                        index={index}
                        gov={fund.gov}
                        fundValue={fund.fundValue}
                    />
                )}
        </Grid>
    )
}

export default FundsList;