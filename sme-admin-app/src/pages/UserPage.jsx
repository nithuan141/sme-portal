import React from 'react'
import { Container } from 'reactstrap'
import { Header } from '../components/Shared/Header'
import { UserTable } from '../components/Users'
import { UsersContextProvider } from '../contexts/User.Context'

export const UserPage =() => {
    return <UsersContextProvider>
        <Header />
        <Container>
            <UserTable />
        </Container>
    </UsersContextProvider>
}