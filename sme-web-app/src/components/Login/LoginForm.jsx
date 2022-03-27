import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import dots from '../../public/images/dots.svg'
import bg from '../../public/images/login-banner.png'
import logo from '../../public/images/logo.svg'
import { authenticate, setLoggedInUser } from '../../services/user.service'
import { ADMIN_ROLE, INVESTOR_ROLE, USER_ROLE } from '../../utils/constants'

export const LoginForm = () => {
    const[userName, setUserName] = useState('')
    const[password, setPassword] = useState('')
    const history = useHistory()

    const login = () => {
        authenticate({email: userName, password}).then(res=>{
            if(res.status === 200) {
                setLoggedInUser(res.data)
                if(res.data.role === INVESTOR_ROLE){
                    history.push('/investor')
                } else if(res.data.role === USER_ROLE) {
                    history.push('/course')
                } else if(res.data.role === ADMIN_ROLE) {
                    history.push('/course')
                }
            }
        }).catch(err=> alert('Login failed ! Please try again.'))
    }

    return <div className="login">
        <div className="row">
            <div className="col-sm-5 d-sm-block d-none login__left">
                <img src={bg} alt="login-banner" />
            </div>
            <div className="col-sm-7  login__right">

                <span className="login__dot">
                    <img src={dots} alt="" />
                </span>
                <span className="login__dot login__dot--top">
                    <img src={dots} alt="" />
                </span>

                <div className="login__form">
                    <img className="mb-4 d-sm-none d-block" src={logo} alt="SME" />
                    <h1 className="login__title">Login</h1>
                    <p>Username</p>
                    <input className="login__input" type="text" placeholder="Enter username" 
                        value={userName} onChange={e => setUserName(e.target.value)}/>
                    <p>Password</p>
                    <input className="login__input" type="password" placeholder="Enter password" 
                        value={password} onChange={e => setPassword(e.target.value)}/>
                    {/* <label className="chckbox">Remember me on this computer
                        <input type="checkbox" checked="checked" />
                        <span className="checkmark"></span>
                    </label> */}

                    <input type="submit" className="sr-btn" value="Login" onClick={login} />

                    <ul className="mt-4">
                        <li><a href="#" onClick={(e)=>{
                            alert("Please contact the support team for resetting the user name and password.")
                        }}>Forgot username or password?</a> </li>
                        {/* <li>|</li>
                        <li><a href="#">Forgot my username</a> </li> */}
                    </ul>
                </div>
            </div>
        </div>
    </div>
}