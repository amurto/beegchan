import React from 'react';
import uuid from 'uuid';
import { FundProvider } from '../context/fund-context';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import FundDiv from './FundDiv';

const Funds = () => {
    const initialFund = {allocatedFund: 0, remainingFund: 0, funds: [{id: uuid(), gov: "", fundValue: 0}]}

    const reducer = (state, action) => {
        let allocatedFund = state.allocatedFund;
        let funds = state.funds;
        let remainingFund = state.remainingFund;
        let sum = 0;
        switch (action.type) {
            case 'addFund':
                funds.push({id: uuid(), gov: "", fundValue: 0})
            return {
                ...state,
                funds: funds
            };

            case 'changeAllocatedFund':
                allocatedFund = action.newAllocatedFund;
            return {
                ...state,
                allocatedFund: allocatedFund
            };

            case 'updateFund':
                if (action.field === 'gov') {
                    for (let i=0; i<funds.length; i++) {
                        if (funds[i].id === action.uid) {
                            funds[i].gov = action.value
                        }
                    }
                } else if (action.field === 'fundValue') {
                    for (let i=0; i<funds.length; i++) {
                        if (funds[i].id === action.uid) {
                            funds[i].fundValue = action.value
                        }
                    }
                }
                for (let i=0;i<funds.length;i++) {
                    sum = sum + Number(funds[i].fundValue)
                }
                remainingFund = allocatedFund - sum
                if (remainingFund < 0) {
                    remainingFund = 0;
                }
                return {
                    ...state,
                    funds: funds,
                    remainingFund: remainingFund
                };

            case 'deleteFund':
                funds = funds.filter((fund) => fund.id !== action.uid);
                for (let i=0;i<funds.length;i++) {
                    sum = sum + Number(funds[i].fundValue)
                }
                remainingFund = allocatedFund - sum
                if (remainingFund < 0) {
                    remainingFund = 0;
                }
                return {
                    ...state,
                    funds: funds,
                    remainingFund: remainingFund
                }
                
            case 'resetFund':
                return {
                    allocatedFund: action.value,
                    remainingFund: 0,
                    funds: []
                }

            default:
                return state;
        }
    };

    return (
        <FundProvider initialFund={initialFund} reducer={reducer} >
            <CssBaseline />
            <Container maxWidth="lg">
                <div style={{ height: "60px" }}></div>
                    <Paper style={{ backgroundColor: 'white' }}>
                        <FundDiv />
                    </Paper>
                <div style={{ height: "100px" }}></div>
            </Container>
        </FundProvider>
    )
}

export default Funds;