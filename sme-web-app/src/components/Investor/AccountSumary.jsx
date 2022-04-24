import React, { useContext } from 'react'
import { InvestmentContext } from '../../contexts/Investment.Context'

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

export const getIntrest = (deposit) => {
    const months = monthDiff(new Date(deposit.investedDate), new Date())
    const int = deposit.profitPercentage || 3;
    return  (deposit.investedAmount*((int/12)/100) * months).toFixed(2);
}

export const getCompoundIntrest = (deposit) => {
    const months = monthDiff(new Date(deposit.investedDate), new Date())
    const int = deposit.profitPercentage || 3;
    if(months < 3) return 0;
    return  (deposit.investedAmount*((int/4)/100) * (Math.ceil(months/3))).toFixed(2);
}

export const AccountSummary = () => {
    const { investments } = useContext(InvestmentContext)
    const monthlyInvestments = investments ? investments.filter(x=>x.invetsmentType === 1 && (x.status === 0 || x.status === 1)) : []
    const totalMonthly = monthlyInvestments.reduce((partialSum, a) => partialSum + a.investedAmount, 0)
    const totalIntMonthly = monthlyInvestments.reduce((partialSum, a) => partialSum + Number(getIntrest(a)), 0)

    const compoundInvestment = investments ? investments.filter(x=>x.invetsmentType === 2 && (x.status === 0 || x.status === 1)) : []
    const totalCompound = compoundInvestment.reduce((partialSum, a) => partialSum + a.investedAmount, 0);
    const totalCompoundInt = compoundInvestment.reduce((partialSum, a) => partialSum + a.investedAmount, 0);

    return <><div className="col-12 col-md-5">
        <div className="db-card">
            <div className="track-box">
                <div className="item">
                    <span className="text">Account balance - Monthly</span>
                    <span className="number  number--blue">
                        <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.125 2.75V0.5H0.75V2.75H4.6875C6.15225 2.75 7.38862 3.69275 7.85437 5H0.75V7.25H7.85437C7.62344 7.90614 7.19504 8.47469 6.62799 8.87756C6.06095 9.28043 5.38309 9.49787 4.6875 9.5H0.75V12.2157L7.03425 18.5H10.2157L3.46575 11.75H4.6875C5.98346 11.7483 7.23918 11.2997 8.24294 10.48C9.24671 9.66025 9.93711 8.51948 10.1978 7.25H13.125V5H10.1978C10.0253 4.18123 9.66994 3.41205 9.15825 2.75H13.125Z"
                                fill="#11468F" />
                        </svg>
                        {totalMonthly}
                    </span>
                    <span>
                        Interest:  <strong>INR</strong> &nbsp; &nbsp;
                        {totalIntMonthly}
                    </span>
                </div>
                {/* <div className="item">
                    <span className="text">Profit</span>
                    <span className="number number--green"><svg width="14" height="19" viewBox="0 0 14 19" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.125 2.75V0.5H0.75V2.75H4.6875C6.15225 2.75 7.38862 3.69275 7.85437 5H0.75V7.25H7.85437C7.62344 7.90614 7.19504 8.47469 6.62799 8.87756C6.06095 9.28043 5.38309 9.49787 4.6875 9.5H0.75V12.2157L7.03425 18.5H10.2157L3.46575 11.75H4.6875C5.98346 11.7483 7.23918 11.2997 8.24294 10.48C9.2467 9.66025 9.93711 8.51948 10.1978 7.25H13.125V5H10.1978C10.0253 4.18123 9.66994 3.41204 9.15825 2.75H13.125Z"
                            fill="#35CF85" />
                    </svg>
                        12500000
                    </span>

                </div> */}
            </div>
        </div>
    </div>
        <div className="col-12 col-md-5">
            <div className="db-card">
                <div className="track-box">
                    <div className="item">
                        <span className="text">Account balance - Compounding</span>
                        <span className="number  number--blue">
                            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.125 2.75V0.5H0.75V2.75H4.6875C6.15225 2.75 7.38862 3.69275 7.85437 5H0.75V7.25H7.85437C7.62344 7.90614 7.19504 8.47469 6.62799 8.87756C6.06095 9.28043 5.38309 9.49787 4.6875 9.5H0.75V12.2157L7.03425 18.5H10.2157L3.46575 11.75H4.6875C5.98346 11.7483 7.23918 11.2997 8.24294 10.48C9.24671 9.66025 9.93711 8.51948 10.1978 7.25H13.125V5H10.1978C10.0253 4.18123 9.66994 3.41205 9.15825 2.75H13.125Z"
                                    fill="#11468F" />
                            </svg>
                            {totalCompound + totalCompoundInt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
}