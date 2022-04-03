import React from 'react'
import { AccountSummary } from './AccountSumary'
import { InvestmentChart } from './InvestmentChart'
import { InvestmentHistory } from './InvestmentHistory'
import { InvestorProfile } from './InvstorProfile'

export const InvestorContainer = () => {
    return <div className="grow-with-us profit p-20">
    <div className="content-wrapper d-block">
      <div className="grow-with-us__centre">
        <InvestorProfile />
        <div className="row gy-3 mt-4">
          <AccountSummary />
          {/* <InvestmentChart /> */}
          <div className="col-12">
            <InvestmentHistory />
          </div>
        </div>
      </div>
    </div>
  </div>
}