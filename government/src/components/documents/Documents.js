import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../utils/LoadingSpinner';
import Button from '@material-ui/core/Button';  

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const DocumentItem = props => {
    const classes = useStyles();
    const aadharLink = `http://localhost:5000/api/crab/ipfs/${props.aadhar}`
    const incomeLink = `http://localhost:5000/api/crab/ipfs/${props.income}`

    return (
        <Paper style={{ margin: "20px" }}>
            <div style={{ backgroundColor: '#352961', color: 'white'}}>
                <Typography style={{ padding: "10px", fontWeight: "400" }}>
                    email id: {props.username}
                </Typography>
            </div>
            <div className={classes.root}>
                <Button variant="contained" color="primary" href={aadharLink} style={{ margin: "20px" }}>
                    VIEW AADHAR CARD
                </Button>
                <Button variant="contained" color="primary" href={incomeLink} style={{ margin: "20px" }}>
                    VIEW INCOME CERTIFICATE
                </Button>
                <Button onClick={() => {props.acceptHandler(props.username)}} variant="contained" color="primary" style={{ backgroundColor: 'green', margin: "20px" }}>
                    ACCEPT
                </Button>
                <Button onClick={() => {props.deleteHandler(props.username)}} variant="contained" color="primary" style={{ backgroundColor: 'red', margin: "20px" }}>
                    REJECT
                </Button>
            </div>
        </Paper>
    )
}

const DocumentList = props => {
    return (
        <div>
            {props.items.map((document,index) => 
                    <DocumentItem 
                        key={index} 
                        username={document.username}
                        aadhar={document.aadhar}
                        income={document.income}
                        acceptHandler={props.acceptHandler}
                        deleteHandler={props.deleteHandler}
                    />
                )}
        </div>
    )
}

const Documents = () => {
    const [loadedDocuments, setLoadedDocuments] = useState();
    const [countDocuments, setCountDocuments] = useState(0);

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/crab/show/sd_a_gmail.com`,
                );
                setLoadedDocuments(responseData);
                setCountDocuments(responseData.length);               
            } catch (err) {}
        };
        fetchDocuments();
        // setLoadedDocuments([
        //     { username: "amurtobasu@gmail.com", aadhar: "32h42", income: "435345" }, 
        //     { username: "princetonbaretto@gmail.com", aadhar: "32er42", income: "43435345" }, 
        //     { username: "pratikandelvis@gmail.com", aadhar: "32ad42", income: "43533435" }, 
        //     { username: "vedantsahai@gmail.com", aadhar: "32jyj42", income: "4353sdf45"}]);
        // setCountDocuments(3);
    }, [sendRequest]);

    const acceptHandler = (un) => {
        let docs = loadedDocuments;
        docs = docs.filter((doc) => doc.username !== un);
        setLoadedDocuments(docs);
        setCountDocuments(docs.length);
        const sendMail = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/crab/sendmymail`,
                    'POST',
                    JSON.stringify({
                        email: un,
                        status: true
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        sendMail();
    }

    const deleteHandler = (un) => {
        let docs = loadedDocuments;
        docs = docs.filter((doc) => doc.username !== un);
        setLoadedDocuments(docs);
        setCountDocuments(docs.length);
        const failMail = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/api/crab/sendmymail`,
                    'POST',
                    JSON.stringify({
                        email: un,
                        status: false
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        failMail();
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography style={{ paddingTop: "20px", color: "black", fontWeight: "500" }} variant="h4" gutterBottom>
                    Documents Pending for Verification
                </Typography>
                {isLoading && (
                    <div style={{
                        padding: "50px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                        }}>
                            <LoadingSpinner size="70px" thickness={4} />
                    </div>
                )}
                {!isLoading && (
                    <React.Fragment>
                        <hr></hr>
                        {countDocuments === 0 && (
                            <div style={{
                                padding: "50px",
                                paddingTop: "200px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                                }}>
                                    <Typography>Documents pending for verification are available here.</Typography>
                            </div>
                        )}
                        {loadedDocuments && <DocumentList items={loadedDocuments} acceptHandler={acceptHandler} deleteHandler={deleteHandler} />}
                    </React.Fragment>
                )}
                <div style={{ height: "100px" }}></div>
                <Paper style={{ marginTop: "20px" }}>                
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Documents;