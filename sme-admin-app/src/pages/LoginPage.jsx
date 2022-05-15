import React, { useState } from 'react'
import { useHistory } from 'react-router';
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import { authenticate, setLoggedInUser } from '../services/user.service';
  import './Login.css';

const LoginPage = (props) => {

    const[user, setUser] = useState({email: '', password: ''})
    const[isLoginError, setLoginError] = useState(false)

    const handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        setUser({...user, [name]: value});
    };

    const history = useHistory();

    const login = () => {
        authenticate(user).then(response => {
            if( response.status === 200 && response?.data.role == "Admin") {
                setLoginError(false)
                setLoggedInUser(response.data)
                history.push('/home')
            } else {
                setLoginError(true)
            }
        }).catch(err => {
            setLoginError(true)
        })
    }

    const {email, password} = user

    return (
        <div className="login">
          <h2>Admin Sign In</h2>
          <Form className="form">
            <FormGroup>
              <Label for="email">Username</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={handleChange}
              />
            </FormGroup>
            {isLoginError && <Alert color="danger">The credentials are invalid ! Please try again.</Alert>}
          <Button onClick={login} color="primary">Log In</Button>
        </Form>
      </div>
    );
}

export default LoginPage