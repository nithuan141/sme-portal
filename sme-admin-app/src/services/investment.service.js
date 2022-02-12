import httpHelper from './httpserviceutils/HttpHelper'

export const getAllInvestment = () => {
    return httpHelper.get(`v1/Investment`)
}

export const saveInvestment = (investment) => {
    return httpHelper.post('v1/Investment', investment)
}

export const updateInvestment = (investment) => {
    return httpHelper.put('v1/Investment', investment)
}

export const savePayProfit = (profit) => {
    return httpHelper.post('v1/ProfitPaid', profit)
}

export const getAllProfit = () => {
    return httpHelper.get(`v1/ProfitPaid`)
}