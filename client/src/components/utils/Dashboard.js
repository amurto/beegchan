import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AutoGrid from './AutoGrid';
import FileUpload from './FileUpload';
import { useHttpClient } from '../hooks/http-hook';

const Dashboard = () => {
    // eslint-disable-next-line
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div style={{ height: "60px" }}></div>
                <AutoGrid />
                <FileUpload />
                <div style={{ height: "100px" }}></div>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard;