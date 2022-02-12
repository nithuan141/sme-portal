import React from 'react'
import { Container } from 'reactstrap'
import { ProfitTable } from '../components/Profit/ProfitTable'
import { Header } from '../components/Shared/Header'
import { ProfitContextProvider } from '../contexts/Profit.Context'

export const ProfitPage =() => {
    return <ProfitContextProvider>
        <Header />
        <Container>
           <ProfitTable /> 
        </Container>
    </ProfitContextProvider>
}