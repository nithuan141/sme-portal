import httpHelper from './httpserviceutils/HttpHelper'

export const getInvestment = (userId) => {
    return httpHelper.get(`v1/Investment/${userId}`)
}

export const getAllProfit = () => {
    return httpHelper.get(`v1/ProfitPaid`)
}

export const withdrawInvestment = (id) => {
    return  httpHelper.get(`v1/Investment/withdraw/${id}`)
}