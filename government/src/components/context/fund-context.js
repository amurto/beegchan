import React, {createContext, useContext, useReducer} from 'react';

export const FundContext = createContext();

export const FundProvider = ({reducer, initialFund, children}) =>(
  <FundContext.Provider value={useReducer(reducer, initialFund)}>
    {children}
  </FundContext.Provider>
);

export const useFund = () => useContext(FundContext);