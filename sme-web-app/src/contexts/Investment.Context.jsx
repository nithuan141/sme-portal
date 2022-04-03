import React, { useState, useEffect } from 'react'
import { getInvestment } from '../services/investment.service';
import { getLoggedInUser } from '../services/user.service';

export const InvestmentContext = React.createContext({investments: []})

export const InvestmentContextProvider = (props) => {
    const[investments, setInvestment] = useState();

    useEffect(() => {
        fetchInvestment()
    }, [])

    const fetchInvestment = () => {
        const user = getLoggedInUser()
        user?.id && getInvestment(user.id).then(res => {
            setInvestment(res.data)
        })
    }

    return <InvestmentContext.Provider value={{investments: investments, fetchInvestment}}>
        {props.children}
    </InvestmentContext.Provider>
}