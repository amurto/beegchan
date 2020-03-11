import React from 'react';
import Blog from '../blog/Blog';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useHttpClient } from '../hooks/http-hook';

const Dashboard = () => {
    // eslint-disable-next-line
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div style={{ height: "60px" }}></div>
                <Paper>
                    <Blog />
                </Paper>
                <div style={{ height: "100px" }}></div>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard;