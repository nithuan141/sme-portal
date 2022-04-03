import React from 'react'
import { getLoggedInUser } from '../../services/user.service'

export const InvestorProfile = () => {
    const user = getLoggedInUser()

    return <div className="dashboard__profile">
        <div className="dashboard__profile-box">
            <div className="dashboard__profile-content">
                <div className="dashboard__profile-name">{user.name}</div>
                <div className="dashboard__profile-address">
                    {user.address} <br />
                    {user.email} <br />
                    {user.phone}
                </div>
            </div>
        </div>
    </div>
}