import React, { useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useFund } from '../context/fund-context';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import FundsList from './FundsList';
import TextField from '@material-ui/core/TextField';
import Alert from "@material-ui/lab/Alert";
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../utils/LoadingSpinner';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '30px',
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%'
    },
}));

const FundDiv = () => {
    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [{ allocatedFund, remainingFund, funds }, dispatch] = useFund();
    const classes = useStyles();
    const [alert, setAlert] = useState();
    const [success, setSuccess] = useState();

    const fundSubmitHandler = async () => {
        try {
            const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + '/api/crab/createmoney',
            "POST",
            JSON.stringify({
                allocatedFund: allocatedFund,
                remainingFund: remainingFund,
                funds: funds
            }),
            {
                'Content-Type': 'application/json'
            }
            );
            console.log(responseData);
            dispatch({
                type: 'resetFund',
                value: remainingFund
            })
            setAlert("");
            setSuccess("Your funds have been allocated");
        } catch (err) {
            setAlert("Cannot create funds right now!")
        }
    }

    return (
        <div className={classes.root}>
            {isLoading && (
                <div style={{
                    padding: "50px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    }}>
                    <LoadingSpinner size={70} thickness={4} /> 
                </div>
            )}
            {!isLoading && (
                <div>
                    {success && (
                        <Alert
                        style={{ margin: "10px" }}
                            onClose={() => {
                            setSuccess("");
                            }}
                            severity="success"
                        >You have successfully registred the funds!</Alert>
                    )}
                    {alert && (
                        <Alert
                        style={{ margin: "10px" }}
                            onClose={() => {
                            setAlert("");
                            }}
                            severity="error"
                        >
                    {alert}
                  </Alert>
                )}
                <Grid container style={{ marginTop: "15px" }} spacing={2}>
                    <Grid item xs={3}>
                        <div style={{textAlign: 'center'}}>
                            <Typography variant='h6'>
                                Available Funds
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-number"
                            label="&#8377;"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={allocatedFund} 
                            onChange={(e) => dispatch({
                                type: 'changeAllocatedFund',
                                newAllocatedFund: e.target.value
                            })}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <p style={{ fontSize: '17px' }}>Remaining: &#8377;{remainingFund}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton 
                            aria-label="add" 
                            className={classes.margin}
                            onClick={() => dispatch({
                                type: 'addFund'
                        })}>
                            <AddToPhotosIcon color='primary' fontSize="large" />
                        </IconButton>
                    </Grid>
                        <FundsList items={funds} />
                    <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<NoteAddIcon />}
                                onClick={fundSubmitHandler}
                            >
                                Add Funds
                        </Button>
                    </Grid>
                </Grid>
                </div>
            )}
        </div>
    )
}

export default FundDiv;