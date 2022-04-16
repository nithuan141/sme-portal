import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export const UserForm = ({handleChange, user}) => {
    const {role, name, phone, email, address, password, isActive} = user
    return <Form>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                type="text"
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
                id="phone"
                name="phone"
                placeholder="Phone"
                type="text"
                value={phone}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Input
                id="password"
                name="password"
                placeholder="Password"
                type="text"
                value={password}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="role"> Role</Label>
            <Input
                id="role"
                name="role"
                type="select"
                value={role}
                onChange={handleChange}
            >
                <option value="User">User</option>
                <option value="Investor">Investor</option>
                <option value="Admin">Admin</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="address">Address</Label>
            <Input
                id="address"
                name="address"
                placeholder="Address"
                type="textarea"
                value={address}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="isActive">Is Active</Label> 
            <Input
                id="isActive"
                name="isActive"
                placeholder="Is Active"
                type="checkbox"
                value={isActive}
                checked={isActive}
                onChange={handleChange}
            />
        </FormGroup>
    </Form>
}