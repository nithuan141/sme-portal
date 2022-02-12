import React, { useState, useEffect } from 'react'
import { getAllProfit } from '../services/investment.service';

export const ProfitContext = React.createContext({profits: []})

export const ProfitContextProvider = (props) => {
    const[profits, setProfit] = useState();

    useEffect(() => {
        fetchProfit()
    }, [])

    const fetchProfit = () => {
        getAllProfit().then(res => {
            setProfit(res.data)
        })
    }

    return <ProfitContext.Provider value={{profits: profits, fetchProfit}}>
        {props.children}
    </ProfitContext.Provider>
}