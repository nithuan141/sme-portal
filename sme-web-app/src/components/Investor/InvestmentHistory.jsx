import React from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { InvestmentContext } from '../../contexts/Investment.Context'
import { withdrawInvestment } from '../../services/investment.service'
import { getCompoundIntrest, getIntrest } from './AccountSumary'

export const InvestmentHistory = () => {
    const {investments, fetchInvestment} = useContext(InvestmentContext)
    
    return <div className="db-card__box">
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Invested Date</th>
            <th>Amount</th>
            <th>Duration (Months)</th>
            <th>Interest</th>
            <th>Status</th>
            <th>Action</th>
            <th>Returned Date</th>
          </tr>
        </thead>
        <tbody>
          {investments && investments.sort((a, b) => a.status - b.status).map(item => <HistoryRow item={item} key={item.id} fetchInvestment={fetchInvestment}/>)}
        </tbody>
      </table>
    </div>
  </div>
}

const HistoryRow = ({item, fetchInvestment}) => {

    const getItemInt = (dep) => {
      if(dep.invetsmentType === 2) return getCompoundIntrest(dep)
      return getIntrest(dep)
    }

    const withdraw = () => {
        withdrawInvestment(item.id).then(res => {
            toast("Your request to withdraw the investment has been raised, the team will contact you for further update.")
            fetchInvestment()
        }).catch(err=>{
            toast.error("Some error occured, please try again.")
        })
    }
    return <tr>
    <td>{new Date(item.investedDate).toLocaleDateString()}</td>
    <td>
      <span className="db-amount number--blue"><svg width="14" height="19" viewBox="0 0 14 19" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.125 2.75V0.5H0.75V2.75H4.6875C6.15225 2.75 7.38862 3.69275 7.85437 5H0.75V7.25H7.85437C7.62344 7.90614 7.19504 8.47469 6.62799 8.87756C6.06095 9.28043 5.38309 9.49787 4.6875 9.5H0.75V12.2157L7.03425 18.5H10.2157L3.46575 11.75H4.6875C5.98346 11.7483 7.23918 11.2997 8.24294 10.48C9.2467 9.66025 9.93711 8.51948 10.1978 7.25H13.125V5H10.1978C10.0253 4.18123 9.66994 3.41204 9.15825 2.75H13.125Z"
            fill="#35CF85" />
        </svg>
        {item.investedAmount}
      </span>
    </td>
    <td>{item.investmentMonths}</td>
    <td>{(item.status === 0 || item.status === 1) ? getItemInt(item) : '-'}</td>
    <td>
      {getStatus(item.status)}
    </td>
    <td>
        {item.status === 0 &&  <button className="sr-btn db-btn" onClick={withdraw}>Withdraw</button>}
    </td>
    <td>
      {item.status === 2 ? item.returnedDate : '-'}
    </td>
  </tr>
}

const getStatus = (status) => {
    switch(status) {
        case 0:
            return <div className="tag tag--green">Active</div>
        case 1:
            return <div className="tag tag--red">Withdrawn Request</div>
        case 2:
            return <div className="tag tag--blue">Withdrawn</div>
        default:
            return <div className="tag tag--green">Active</div>
    }  
}