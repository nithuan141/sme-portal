import React from 'react'
import { InvestorContainer } from '../components/Investor/InvestorContainer'
import { Header } from '../components/Shared'
import { InvestmentContextProvider } from '../contexts/Investment.Context'

export const InvestorPage = () => {
    return <InvestmentContextProvider>
        <Header />
        <InvestorContainer />
    </InvestmentContextProvider>
}