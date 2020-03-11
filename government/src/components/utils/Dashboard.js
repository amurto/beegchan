import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Documents from '../documents/Documents';

const Dashboard = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div style={{ height: "60px" }}></div>
                    <Documents />
                <div style={{ height: "100px" }}></div>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard;