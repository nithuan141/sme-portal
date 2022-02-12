import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../services/user.service'

export const UsersContext = React.createContext({users: []})

export const UsersContextProvider = (props) => {
    const[users, setUsers] = useState();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        getAllUsers().then(res => {
            setUsers(res.data)
        })
    }

    return <UsersContext.Provider value={{users: users, fetchUser}}>
        {props.children}
    </UsersContext.Provider>
}