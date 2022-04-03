import React from 'react'
import { Container } from 'reactstrap'
import { InvestmentTable } from '../components/Investment'
import { Header } from '../components/Shared/Header'
import { InvestmentContextProvider } from '../contexts/Investment.Context'

export const DashBoard = () => {
    return <InvestmentContextProvider>
        <Header />
        <Container>
            <InvestmentTable isWithdrawn={true} />
        </Container>
    </InvestmentContextProvider>
}