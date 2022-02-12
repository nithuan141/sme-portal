import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export const PayProfitForm = ({ handleChange, payProfit }) => {
    const {
        paidAmount,
        paidDate,
    } = payProfit
    
    return <Form>
        <FormGroup>
            <Label for="paidAmount">Amount</Label>
            <Input
                id="paidAmount"
                name="paidAmount"
                placeholder="Profit Amount"
                value={paidAmount}
                type="number"
                min={1}
                onChange={handleChange}
            />
        </FormGroup>
     
        <FormGroup>
            <Label for="paidDate">Invested Date</Label>
            <Input
                id="paidDate"
                name="paidDate"
                placeholder="Paid Date"
                value={paidDate}
                type="date"
                onChange={handleChange}
            />
        </FormGroup>
    </Form>
}