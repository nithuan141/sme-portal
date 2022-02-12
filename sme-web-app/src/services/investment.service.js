import httpHelper from './httpserviceutils/HttpHelper'

export const getAllInvestment = () => {
    return httpHelper.get(`v1/Investment`)
}

export const getAllProfit = () => {
    return httpHelper.get(`v1/ProfitPaid`)
}