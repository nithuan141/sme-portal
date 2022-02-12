import React from 'react'
import { useHistory } from 'react-router'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap'

export const Header = () => {
    const history = useHistory();
    const current = history.location.pathname;

    return <div>
        <Navbar color="light" expand="md" light >
            <NavbarBrand href="#/home">
                SME Admin Portal
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck() { }} />
            <Collapse navbar>
                <Nav className="me-auto" navbar>
                    <NavItem className={(current === '/home' ? 'activeMenu' : '')}>
                        <NavLink href="#/home">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem  className={(current === '/users' ? 'activeMenu' : '')}>
                        <NavLink href="#/users">
                            Users
                        </NavLink>
                    </NavItem>
                    <NavItem className={(current === '/course' ? 'activeMenu' : '')}>
                        <NavLink href="#/course">
                            Courses
                        </NavLink>
                    </NavItem>
                    <NavItem className={(current === '/investment' ? 'activeMenu' : '')}>
                        <NavLink href="#/investment">
                            Investment
                        </NavLink>
                    </NavItem> 
                    <NavItem className={(current === '/profit' ? 'activeMenu' : '')}>
                        <NavLink href="#/profit">
                            Profit Payments
                        </NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>
                    Logged in as {JSON.parse(localStorage.getItem('user'))?.name}
                </NavbarText> &nbsp;
                <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    localStorage.clear();
                    history.push('/')
                }}>Log out</a>
            </Collapse>
        </Navbar>
    </div>
}