import React, { useState, useEffect } from 'react'
import { getAllInvestment } from '../services/investment.service';

export const InvestmentContext = React.createContext({investments: []})

export const InvestmentContextProvider = (props) => {
    const[investments, setInvestment] = useState();

    useEffect(() => {
        fetchInvestment()
    }, [])

    const fetchInvestment = () => {
        getAllInvestment().then(res => {
            setInvestment(res.data)
        })
    }

    return <InvestmentContext.Provider value={{investments: investments, fetchInvestment}}>
        {props.children}
    </InvestmentContext.Provider>
}