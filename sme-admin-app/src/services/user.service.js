import httpHelper from './httpserviceutils/HttpHelper'

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const setLoggedInUser = (user) => {
    return localStorage.setItem('user', JSON.stringify(user))
}

export const authenticate = (user = {email, password}) => {
    return httpHelper.post('v1/user/login', user)
}

export const getAllUsers = () => {
    return httpHelper.get('v1/User')
}

export const saveUser = (user) => {
    return httpHelper.post('v1/User', user)
}